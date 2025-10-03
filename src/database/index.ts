// Database persistence layer for game sessions
// Exports all repositories, connection management, and utilities

// Core database management
export { DatabaseManager, DatabaseFactory } from './connection';
export type {
  DatabaseType,
  DatabaseConfig,
  DatabaseConnection,
  DatabasePool
} from './types';

// Repositories
export { SessionRepository } from './repositories/SessionRepository';
export { GameStatsRepository } from './repositories/GameStatsRepository';
export { BalanceRepository } from './repositories/BalanceRepository';
export { GameStateRepository } from './repositories/GameStateRepository';

export type {
  ISessionRepository,
  IGameStatsRepository,
  IBalanceRepository,
  IGameStateRepository
} from './types';

// Migration system
export {
  MigrationManager,
  runMigrations,
  rollbackMigrations,
  showMigrationStatus
} from './migrations';

// Database entities
export type {
  DatabaseSession,
  DatabaseSessionEvent,
  DatabaseSpinHistory,
  DatabaseBalanceOperation,
  DatabaseGameStats,
  DatabaseUserBalance,
  DatabaseGameState,
  DatabaseTransaction,
  Migration,
  MigrationRecord
} from './types';

// Error types
export {
  DatabaseError,
  OptimisticLockError,
  ConnectionError,
  TransactionError
} from './types';

// Convenience class for accessing all repositories
export class DatabaseService {
  private static instance: DatabaseService;
  private sessionRepo: SessionRepository;
  private gameStatsRepo: GameStatsRepository;
  private balanceRepo: BalanceRepository;
  private gameStateRepo: GameStateRepository;

  private constructor() {
    this.sessionRepo = new SessionRepository();
    this.gameStatsRepo = new GameStatsRepository();
    this.balanceRepo = new BalanceRepository();
    this.gameStateRepo = new GameStateRepository();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Repository getters
  get sessions(): SessionRepository {
    return this.sessionRepo;
  }

  get gameStats(): GameStatsRepository {
    return this.gameStatsRepo;
  }

  get balances(): BalanceRepository {
    return this.balanceRepo;
  }

  get gameStates(): GameStateRepository {
    return this.gameStateRepo;
  }

  // Utility methods
  async initializeDatabase(): Promise<void> {
    // Run migrations to ensure schema is up to date
    await runMigrations();
  }

  async healthCheck(): Promise<boolean> {
    return await DatabaseManager.healthCheck();
  }

  async close(): Promise<void> {
    await DatabaseManager.close();
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Helper function to initialize the database
export async function initializeDatabase(): Promise<void> {
  // Initialize database connection
  DatabaseManager.initialize();

  // Run migrations
  await db.initializeDatabase();

  console.log('Database initialized and migrated successfully');
}

// Helper function for transactions
export async function withTransaction<T>(
  callback: (db: DatabaseService) => Promise<T>
): Promise<T> {
  return DatabaseManager.withTransaction(async () => {
    return callback(db);
  });
}