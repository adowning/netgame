import { DatabaseConnection } from '../types';

export const migration = {
  id: '001_initial_schema',
  name: 'Initial database schema for game persistence layer',
  up: async (db: DatabaseConnection): Promise<void> => {
    // Create game_sessions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS game_sessions (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        game_id VARCHAR(50) NOT NULL,
        state JSONB NOT NULL DEFAULT '{}',
        last_activity TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        version INTEGER NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT true,

        INDEX idx_sessions_user_id (user_id),
        INDEX idx_sessions_game_id (game_id),
        INDEX idx_sessions_active (is_active),
        INDEX idx_sessions_last_activity (last_activity)
      )
    `);

    // Create session_events table
    await db.query(`
      CREATE TABLE IF NOT EXISTS session_events (
        id VARCHAR(50) PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

        FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
        INDEX idx_session_events_session_id (session_id),
        INDEX idx_session_events_type (type),
        INDEX idx_session_events_timestamp (timestamp)
      )
    `);

    // Create spin_history table
    await db.query(`
      CREATE TABLE IF NOT EXISTS spin_history (
        id VARCHAR(50) PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        bet DECIMAL(15,2) NOT NULL,
        lines INTEGER NOT NULL,
        win DECIMAL(15,2) NOT NULL,
        reels JSONB NOT NULL,
        win_lines JSONB NOT NULL,
        scatters_count INTEGER NOT NULL DEFAULT 0,
        bonus_triggered BOOLEAN NOT NULL DEFAULT false,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

        FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
        INDEX idx_spin_history_session_id (session_id),
        INDEX idx_spin_history_timestamp (timestamp)
      )
    `);

    // Create balance_operations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS balance_operations (
        id VARCHAR(50) PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('bet', 'win', 'jackpot', 'refund')),
        amount DECIMAL(15,2) NOT NULL,
        event VARCHAR(100) NOT NULL,
        previous_balance DECIMAL(15,2) NOT NULL,
        new_balance DECIMAL(15,2) NOT NULL,
        count_balance_change DECIMAL(15,2),
        address_change DECIMAL(15,2),
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

        FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
        INDEX idx_balance_ops_session_id (session_id),
        INDEX idx_balance_ops_type (type),
        INDEX idx_balance_ops_timestamp (timestamp)
      )
    `);

    // Create user_balances table
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_balances (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        balance DECIMAL(15,2) NOT NULL DEFAULT 0,
        count_balance DECIMAL(15,2) NOT NULL DEFAULT 0,
        address DECIMAL(15,2) NOT NULL DEFAULT 0,
        last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        version INTEGER NOT NULL DEFAULT 1,

        INDEX idx_user_balances_user_id (user_id),
        INDEX idx_user_balances_last_updated (last_updated)
      )
    `);

    // Create balance_transactions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS balance_transactions (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('bet', 'win', 'deposit', 'withdrawal', 'jackpot', 'refund')),
        amount DECIMAL(15,2) NOT NULL,
        balance_before DECIMAL(15,2) NOT NULL,
        balance_after DECIMAL(15,2) NOT NULL,
        game_id VARCHAR(50),
        session_id VARCHAR(50),
        description TEXT,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        external_reference VARCHAR(100),

        FOREIGN KEY (user_id) REFERENCES user_balances(user_id) ON DELETE CASCADE,
        INDEX idx_balance_tx_user_id (user_id),
        INDEX idx_balance_tx_type (type),
        INDEX idx_balance_tx_game_id (game_id),
        INDEX idx_balance_tx_session_id (session_id),
        INDEX idx_balance_tx_timestamp (timestamp)
      )
    `);

    // Create game_statistics table
    await db.query(`
      CREATE TABLE IF NOT EXISTS game_statistics (
        id VARCHAR(50) PRIMARY KEY,
        game_id VARCHAR(50) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        session_id VARCHAR(50),
        stat_in DECIMAL(15,2) NOT NULL DEFAULT 0,
        stat_out DECIMAL(15,2) NOT NULL DEFAULT 0,
        rtp_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
        total_spins INTEGER NOT NULL DEFAULT 0,
        total_wins DECIMAL(15,2) NOT NULL DEFAULT 0,
        total_bets DECIMAL(15,2) NOT NULL DEFAULT 0,
        bonus_games_triggered INTEGER NOT NULL DEFAULT 0,
        free_spins_used INTEGER NOT NULL DEFAULT 0,
        jackpot_wins INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

        INDEX idx_game_stats_game_id (game_id),
        INDEX idx_game_stats_user_id (user_id),
        INDEX idx_game_stats_session_id (session_id),
        INDEX idx_game_stats_created_at (created_at)
      )
    `);

    // Create game_states table
    await db.query(`
      CREATE TABLE IF NOT EXISTS game_states (
        id VARCHAR(50) PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        game_id VARCHAR(50) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        state JSONB NOT NULL DEFAULT '{}',
        configuration JSONB NOT NULL DEFAULT '{}',
        last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        version INTEGER NOT NULL DEFAULT 1,

        FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
        INDEX idx_game_states_session_id (session_id),
        INDEX idx_game_states_game_id (game_id),
        INDEX idx_game_states_user_id (user_id),
        INDEX idx_game_states_last_updated (last_updated)
      )
    `);

    // Create game_configurations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS game_configurations (
        game_id VARCHAR(50) PRIMARY KEY,
        config JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

        INDEX idx_game_configs_updated_at (updated_at)
      )
    `);

    // Create migrations table to track applied migrations
    await db.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id VARCHAR(100) PRIMARY KEY,
        name TEXT NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )
    `);
  },

  down: async (db: DatabaseConnection): Promise<void> => {
    // Drop tables in reverse order due to foreign key constraints
    const tables = [
      'schema_migrations',
      'game_configurations',
      'game_states',
      'game_statistics',
      'balance_transactions',
      'user_balances',
      'balance_operations',
      'spin_history',
      'session_events',
      'game_sessions'
    ];

    for (const table of tables) {
      await db.query(`DROP TABLE IF EXISTS ${table}`);
    }
  }
};