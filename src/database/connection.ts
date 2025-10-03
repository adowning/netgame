import { Pool as PgPool, PoolClient as PgClient } from 'pg';
import mysql from 'mysql2/promise';
import {
  DatabaseType,
  DatabaseConfig,
  DatabaseConnection,
  DatabasePool,
  ConnectionError,
  TransactionError
} from './types';

// PostgreSQL connection wrapper
class PostgreSQLConnection implements DatabaseConnection {
  constructor(private client: PgClient) {}

  async query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
    try {
      const result = await this.client.query(sql, params);
      return {
        rows: result.rows as T[],
        rowCount: result.rowCount || 0
      };
    } catch (error) {
      throw new ConnectionError(`PostgreSQL query failed: ${error.message}`, { sql, params, error });
    }
  }

  async transaction<T>(callback: (client: DatabaseConnection) => Promise<T>): Promise<T> {
    try {
      await this.client.query('BEGIN');
      const result = await callback(this);
      await this.client.query('COMMIT');
      return result;
    } catch (error) {
      await this.client.query('ROLLBACK');
      throw new TransactionError(`Transaction failed: ${error.message}`, { error });
    }
  }

  async release(): Promise<void> {
    this.client.release();
  }
}

// MySQL connection wrapper
class MySQLConnection implements DatabaseConnection {
  constructor(private connection: mysql.Connection) {}

  async query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
    try {
      const [rows, fields] = await this.connection.execute(sql, params);
      return {
        rows: rows as T[],
        rowCount: Array.isArray(rows) ? rows.length : 1
      };
    } catch (error) {
      throw new ConnectionError(`MySQL query failed: ${error.message}`, { sql, params, error });
    }
  }

  async transaction<T>(callback: (client: DatabaseConnection) => Promise<T>): Promise<T> {
    try {
      await this.connection.beginTransaction();
      const result = await callback(this);
      await this.connection.commit();
      return result;
    } catch (error) {
      await this.connection.rollback();
      throw new TransactionError(`Transaction failed: ${error.message}`, { error });
    }
  }

  async release(): Promise<void> {
    await this.connection.end();
  }
}

// PostgreSQL pool wrapper
class PostgreSQLPool implements DatabasePool {
  constructor(private pool: PgPool) {}

  async connect(): Promise<DatabaseConnection> {
    try {
      const client = await this.pool.connect();
      return new PostgreSQLConnection(client);
    } catch (error) {
      throw new ConnectionError(`Failed to connect to PostgreSQL: ${error.message}`, { error });
    }
  }

  async end(): Promise<void> {
    await this.pool.end();
  }

  get totalCount(): number {
    return this.pool.totalCount;
  }

  get idleCount(): number {
    return this.pool.idleCount;
  }

  get waitingCount(): number {
    return this.pool.waitingCount;
  }
}

// MySQL pool wrapper
class MySQLPool implements DatabasePool {
  private connections: mysql.Connection[] = [];
  private maxConnections: number;
  private activeConnections = 0;

  constructor(config: DatabaseConfig) {
    this.maxConnections = config.max || 10;
  }

  async connect(): Promise<DatabaseConnection> {
    if (this.activeConnections >= this.maxConnections) {
      throw new ConnectionError('Maximum connections reached');
    }

    try {
      const config: mysql.ConnectionOptions = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_SSL === 'true' ? {} : undefined,
        connectTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000'),
        acquireTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '60000'),
      };

      const connection = await mysql.createConnection(config);
      this.connections.push(connection);
      this.activeConnections++;

      return new MySQLConnection(connection);
    } catch (error) {
      throw new ConnectionError(`Failed to connect to MySQL: ${error.message}`, { error });
    }
  }

  async end(): Promise<void> {
    const promises = this.connections.map(conn => conn.end());
    await Promise.all(promises);
    this.connections = [];
    this.activeConnections = 0;
  }

  get totalCount(): number {
    return this.connections.length;
  }

  get idleCount(): number {
    return this.connections.length - this.activeConnections;
  }

  get waitingCount(): number {
    // MySQL2 doesn't provide waiting count, return 0
    return 0;
  }
}

// Database factory
export class DatabaseFactory {
  static createPool(config: DatabaseConfig): DatabasePool {
    switch (config.type) {
      case 'postgresql':
        const pgPool = new PgPool({
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.username,
          password: config.password,
          ssl: config.ssl,
          connectionTimeoutMillis: config.connectionTimeoutMillis || 10000,
          idleTimeoutMillis: config.idleTimeoutMillis || 30000,
          max: config.max || 20,
          min: config.min || 2,
        });

        // Handle pool errors
        pgPool.on('error', (err) => {
          console.error('PostgreSQL pool error:', err);
        });

        return new PostgreSQLPool(pgPool);

      case 'mysql':
        return new MySQLPool(config);

      default:
        throw new ConnectionError(`Unsupported database type: ${config.type}`);
    }
  }

  static createConfigFromEnv(): DatabaseConfig {
    const type = (process.env.DB_TYPE as DatabaseType) || 'postgresql';

    const baseConfig = {
      type,
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'netgame',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.DB_SSL === 'true',
      connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000'),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
      max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
      min: parseInt(process.env.DB_MIN_CONNECTIONS || '2'),
    };

    if (type === 'postgresql') {
      return {
        ...baseConfig,
        port: parseInt(process.env.DB_PORT || '5432'),
      };
    } else if (type === 'mysql') {
      return {
        ...baseConfig,
        port: parseInt(process.env.DB_PORT || '3306'),
      };
    }

    throw new ConnectionError(`Unsupported database type: ${type}`);
  }
}

// Global database instance
let globalPool: DatabasePool | null = null;

export class DatabaseManager {
  private static pool: DatabasePool | null = null;

  static initialize(config?: DatabaseConfig): void {
    if (this.pool) {
      throw new ConnectionError('Database already initialized');
    }

    const dbConfig = config || DatabaseFactory.createConfigFromEnv();
    this.pool = DatabaseFactory.createPool(dbConfig);
    globalPool = this.pool;
  }

  static async getConnection(): Promise<DatabaseConnection> {
    if (!this.pool) {
      throw new ConnectionError('Database not initialized. Call DatabaseManager.initialize() first.');
    }

    return await this.pool.connect();
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      globalPool = null;
    }
  }

  static getPool(): DatabasePool | null {
    return this.pool;
  }

  static async healthCheck(): Promise<boolean> {
    try {
      const connection = await this.getConnection();
      await connection.query('SELECT 1');
      await connection.release();
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  static async withTransaction<T>(
    callback: (connection: DatabaseConnection) => Promise<T>
  ): Promise<T> {
    const connection = await this.getConnection();
    try {
      return await connection.transaction(callback);
    } finally {
      await connection.release();
    }
  }
}

// Export singleton instance
export const db = DatabaseManager;