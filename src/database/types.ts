// Database-specific types and interfaces for the persistence layer

export type DatabaseType = 'postgresql' | 'mysql';

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  max?: number;
  min?: number;
}

export interface DatabaseConnection {
  query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }>;
  transaction<T>(callback: (client: DatabaseConnection) => Promise<T>): Promise<T>;
  release(): Promise<void>;
}

export interface DatabasePool {
  connect(): Promise<DatabaseConnection>;
  end(): Promise<void>;
  totalCount: number;
  idleCount: number;
  waitingCount: number;
}

// Database entity interfaces
export interface DatabaseSession {
  id: string;
  user_id: string;
  game_id: string;
  state: Record<string, any>;
  events: DatabaseSessionEvent[];
  spin_history: DatabaseSpinHistory[];
  balance_operations: DatabaseBalanceOperation[];
  last_activity: Date;
  created_at: Date;
  updated_at: Date;
  version: number; // For optimistic locking
  is_active: boolean;
}

export interface DatabaseSessionEvent {
  id: string;
  session_id: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
}

export interface DatabaseSpinHistory {
  id: string;
  session_id: string;
  bet: number;
  lines: number;
  win: number;
  reels: string[][];
  win_lines: any[];
  scatters_count: number;
  bonus_triggered: boolean;
  timestamp: Date;
}

export interface DatabaseBalanceOperation {
  id: string;
  session_id: string;
  type: 'bet' | 'win' | 'jackpot' | 'refund';
  amount: number;
  event: string;
  previous_balance: number;
  new_balance: number;
  count_balance_change?: number;
  address_change?: number;
  timestamp: Date;
}

export interface DatabaseGameStats {
  id: string;
  game_id: string;
  user_id: string;
  session_id?: string;
  stat_in: number;
  stat_out: number;
  rtp_percentage: number;
  total_spins: number;
  total_wins: number;
  total_bets: number;
  bonus_games_triggered: number;
  free_spins_used: number;
  jackpot_wins: number;
  created_at: Date;
  updated_at: Date;
}

export interface DatabaseUserBalance {
  id: string;
  user_id: string;
  balance: number;
  count_balance: number;
  address: number;
  last_updated: Date;
  version: number; // For optimistic locking
}

export interface DatabaseGameState {
  id: string;
  session_id: string;
  game_id: string;
  user_id: string;
  state: Record<string, any>;
  configuration: Record<string, any>;
  last_updated: Date;
  version: number; // For optimistic locking
}

export interface DatabaseTransaction {
  id: string;
  user_id: string;
  type: 'bet' | 'win' | 'deposit' | 'withdrawal' | 'jackpot' | 'refund';
  amount: number;
  balance_before: number;
  balance_after: number;
  game_id?: string;
  session_id?: string;
  description?: string;
  timestamp: Date;
  external_reference?: string;
}

// Repository interfaces
export interface ISessionRepository {
  create(session: Omit<DatabaseSession, 'id' | 'created_at' | 'updated_at' | 'version'>): Promise<DatabaseSession>;
  findById(id: string): Promise<DatabaseSession | null>;
  findByUserId(userId: string): Promise<DatabaseSession[]>;
  findActiveByUserId(userId: string): Promise<DatabaseSession | null>;
  update(id: string, updates: Partial<DatabaseSession>, version: number): Promise<DatabaseSession>;
  delete(id: string): Promise<void>;
  cleanupExpired(olderThan: Date): Promise<number>;
}

export interface IGameStatsRepository {
  create(stats: Omit<DatabaseGameStats, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseGameStats>;
  findByGameId(gameId: string): Promise<DatabaseGameStats[]>;
  findByUserId(userId: string): Promise<DatabaseGameStats[]>;
  findBySessionId(sessionId: string): Promise<DatabaseGameStats | null>;
  update(id: string, updates: Partial<DatabaseGameStats>): Promise<DatabaseGameStats>;
  incrementStats(id: string, increments: Partial<Pick<DatabaseGameStats, 'total_spins' | 'total_wins' | 'total_bets' | 'bonus_games_triggered' | 'free_spins_used' | 'jackpot_wins'>>): Promise<DatabaseGameStats>;
  aggregateGameStats(gameId: string, dateRange?: { start: Date; end: Date }): Promise<DatabaseGameStats>;
}

export interface IBalanceRepository {
  findByUserId(userId: string): Promise<DatabaseUserBalance | null>;
  create(balance: Omit<DatabaseUserBalance, 'id' | 'last_updated' | 'version'>): Promise<DatabaseUserBalance>;
  updateBalance(userId: string, updates: Partial<Pick<DatabaseUserBalance, 'balance' | 'count_balance' | 'address'>>, version: number): Promise<DatabaseUserBalance>;
  addTransaction(transaction: Omit<DatabaseTransaction, 'id' | 'timestamp'>): Promise<DatabaseTransaction>;
  getTransactionHistory(userId: string, limit?: number): Promise<DatabaseTransaction[]>;
  validateBalance(userId: string, requiredAmount: number): Promise<boolean>;
}

export interface IGameStateRepository {
  create(state: Omit<DatabaseGameState, 'id' | 'last_updated' | 'version'>): Promise<DatabaseGameState>;
  findBySessionId(sessionId: string): Promise<DatabaseGameState | null>;
  findByUserAndGame(userId: string, gameId: string): Promise<DatabaseGameState | null>;
  update(id: string, updates: Partial<DatabaseGameState>, version: number): Promise<DatabaseGameState>;
  delete(id: string): Promise<void>;
  saveConfiguration(gameId: string, config: Record<string, any>): Promise<void>;
  getConfiguration(gameId: string): Promise<Record<string, any> | null>;
}

// Migration types
export interface Migration {
  id: string;
  name: string;
  up: (db: DatabaseConnection) => Promise<void>;
  down: (db: DatabaseConnection) => Promise<void>;
  created_at: Date;
}

export interface MigrationRecord {
  id: string;
  name: string;
  executed_at: Date;
}

// Error types
export class DatabaseError extends Error {
  public code: string;
  public details?: Record<string, any>;

  constructor(code: string, message: string, details?: Record<string, any>) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'DatabaseError';
  }
}

export class OptimisticLockError extends DatabaseError {
  constructor(resource: string, id: string) {
    super('OPTIMISTIC_LOCK', `Concurrent modification detected for ${resource} with id ${id}`);
  }
}

export class ConnectionError extends DatabaseError {
  constructor(message: string, details?: Record<string, any>) {
    super('CONNECTION_ERROR', message, details);
  }
}

export class TransactionError extends DatabaseError {
  constructor(message: string, details?: Record<string, any>) {
    super('TRANSACTION_ERROR', message, details);
  }
}