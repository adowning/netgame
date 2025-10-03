# Database Persistence Layer

A comprehensive TypeScript database persistence layer for casino slot game sessions, designed to replace Laravel database operations with efficient, type-safe database interactions.

## Features

- **Multi-Database Support**: PostgreSQL and MySQL with unified interface
- **Connection Pooling**: Efficient connection management with configurable pools
- **Type Safety**: Strongly typed database operations and entities
- **Optimistic Locking**: Concurrent access protection with version checking
- **Transaction Management**: ACID-compliant database transactions
- **Migration System**: Database schema versioning and rollback support
- **Performance Optimized**: Connection pooling, indexing, and query optimization
- **Error Handling**: Comprehensive error types and recovery mechanisms

## Architecture

```
src/database/
├── types.ts                    # TypeScript interfaces and types
├── connection.ts              # Database connection management
├── index.ts                   # Main exports and service class
├── repositories/              # Data access layer
│   ├── SessionRepository.ts   # Game session CRUD operations
│   ├── GameStatsRepository.ts # Statistics tracking
│   ├── BalanceRepository.ts   # User balance management
│   └── GameStateRepository.ts # Game state persistence
└── migrations/                # Database schema management
    ├── index.ts              # Migration runner
    └── 001_initial_schema.ts # Initial database schema
```

## Quick Start

### 1. Environment Configuration

Set up your database connection in environment variables:

```bash
# PostgreSQL
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=netgame
DB_USER=postgres
DB_PASSWORD=your_password

# MySQL
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=netgame
DB_USER=root
DB_PASSWORD=your_password

# Connection settings
DB_SSL=false
DB_CONNECTION_TIMEOUT=10000
DB_IDLE_TIMEOUT=30000
DB_MAX_CONNECTIONS=20
DB_MIN_CONNECTIONS=2
```

### 2. Initialize Database

```typescript
import { initializeDatabase, db } from './src/database';

// Initialize connection and run migrations
await initializeDatabase();

// Database is now ready to use
```

### 3. Basic Usage

```typescript
import { db } from './src/database';

// Create a game session
const session = await db.sessions.create({
  user_id: 'user123',
  game_id: 'african_king_ng',
  state: { bonusWin: 0, freeGames: 0 },
  last_activity: new Date(),
  is_active: true
});

// Update user balance
const balanceUpdate = await db.balances.deductBet('user123', 1.0, 30, 'bet');

// Record game statistics
await db.gameStats.create({
  game_id: 'african_king_ng',
  user_id: 'user123',
  session_id: session.id,
  stat_in: 30.0,
  stat_out: 25.0,
  rtp_percentage: 83.33,
  total_spins: 1,
  total_wins: 5.0,
  total_bets: 30.0
});
```

## Repositories

### SessionRepository

Manages game session lifecycle, events, spin history, and balance operations.

```typescript
// Create session
const session = await db.sessions.create(sessionData);

// Find active session
const activeSession = await db.sessions.findActiveByUserId('user123');

// Update with optimistic locking
await db.sessions.update(sessionId, updates, currentVersion);

// Cleanup expired sessions
const cleanedCount = await db.sessions.cleanupExpired(new Date(Date.now() - 24 * 60 * 60 * 1000));
```

### BalanceRepository

Handles complex user balance logic with count_balance and address field management.

```typescript
// Deduct bet with complex balance logic
const result = await db.balances.deductBet('user123', 1.0, 30, 'bet');
console.log('Actual deduction:', result.actualDeduction);

// Add winnings
await db.balances.addWin('user123', 15.0, 'win');

// Get balance summary
const summary = await db.balances.getBalanceSummary('user123');
```

### GameStatsRepository

Tracks game statistics, RTP calculations, and performance metrics.

```typescript
// Record game statistics
await db.gameStats.create(statsData);

// Get aggregate stats for a game
const aggregates = await db.gameStats.aggregateGameStats('african_king_ng');

// Increment statistics
await db.gameStats.incrementStats(statsId, {
  total_spins: 1,
  total_wins: 5.0,
  bonus_games_triggered: 1
});
```

### GameStateRepository

Manages game state persistence and configuration storage.

```typescript
// Save game state
await db.gameStates.create({
  session_id: sessionId,
  game_id: 'african_king_ng',
  user_id: 'user123',
  state: gameState,
  configuration: gameConfig
});

// Retrieve game state
const state = await db.gameStates.findBySessionId(sessionId);

// Save game configuration
await db.gameStates.saveConfiguration('african_king_ng', config);
```

## Transactions

All repository methods support transactions. Use the `withTransaction` helper for multi-operation transactions:

```typescript
import { withTransaction } from './src/database';

await withTransaction(async (db) => {
  // Multiple operations in a single transaction
  const session = await db.sessions.create(sessionData);
  await db.balances.deductBet(userId, betAmount, lines, 'bet');
  await db.gameStats.create(statsData);

  // If any operation fails, all are rolled back
});
```

## Migrations

### Running Migrations

```typescript
import { runMigrations, showMigrationStatus } from './src/database/migrations';

// Check migration status
await showMigrationStatus();

// Run pending migrations
await runMigrations();
```

### Creating New Migrations

1. Create a new migration file in `src/database/migrations/`
2. Use the template from `MigrationManager.createMigrationTemplate()`
3. Add the migration to the `migrations` array in `index.ts`

```typescript
// Example migration
export const migration = {
  id: '002_add_user_preferences',
  name: 'Add user preferences table',
  up: async (db: DatabaseConnection): Promise<void> => {
    await db.query(`
      CREATE TABLE user_preferences (
        user_id VARCHAR(50) PRIMARY KEY,
        preferences JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )
    `);
  },
  down: async (db: DatabaseConnection): Promise<void> => {
    await db.query('DROP TABLE IF EXISTS user_preferences');
  }
};
```

## Error Handling

The persistence layer provides specific error types:

```typescript
import {
  DatabaseError,
  OptimisticLockError,
  ConnectionError,
  TransactionError
} from './src/database';

try {
  await db.sessions.update(id, updates, version);
} catch (error) {
  if (error instanceof OptimisticLockError) {
    // Handle concurrent modification
    console.log('Session was modified by another process');
  } else if (error instanceof ConnectionError) {
    // Handle connection issues
    console.log('Database connection failed');
  } else if (error instanceof TransactionError) {
    // Handle transaction failures
    console.log('Transaction rolled back');
  }
}
```

## Performance Considerations

### Connection Pooling

- Configurable pool size with `DB_MAX_CONNECTIONS` and `DB_MIN_CONNECTIONS`
- Automatic connection recycling and health checks
- Timeout management for idle and active connections

### Indexing Strategy

The schema includes optimized indexes for common query patterns:
- User ID indexes for balance and session lookups
- Game ID indexes for statistics aggregation
- Timestamp indexes for time-based queries
- Composite indexes for complex filtering

### Query Optimization

- Parameterized queries prevent SQL injection
- Efficient batch operations for bulk inserts
- JSONB storage for flexible state data
- Proper foreign key relationships

## Database Schema

### Core Tables

- `game_sessions`: Session management and state
- `session_events`: Event logging and audit trail
- `spin_history`: Detailed spin records
- `balance_operations`: Balance change tracking
- `user_balances`: User balance with complex logic
- `balance_transactions`: Transaction history
- `game_statistics`: Performance and RTP tracking
- `game_states`: Game state persistence
- `game_configurations`: Game configuration storage
- `schema_migrations`: Migration tracking

## Testing

```typescript
// Health check
const isHealthy = await db.healthCheck();

// Close connections
await db.close();
```

## Integration with GameSessionManager

The persistence layer integrates seamlessly with the existing `GameSession` class:

```typescript
import { GameSession } from '../game-session/GameSession';
import { db } from '../database';

// Load session from database
const sessionData = await db.sessions.findById(sessionId);
if (sessionData) {
  // Reconstruct GameSession from persisted data
  const gameSession = new GameSession(/* ... */);
}

// Persist session changes
const sessionData = gameSession.getSessionData();
await db.sessions.update(sessionId, {
  state: sessionData.state,
  last_activity: sessionData.lastActivity
}, sessionData.version);
```

## Migration from Laravel

This persistence layer is designed to replace Laravel Eloquent operations:

- **Users**: Balance operations replace `User::find()->update()`
- **Games**: Statistics replace `Game::find()->increment()`
- **Sessions**: Direct database operations replace model relationships
- **Transactions**: Explicit transaction management replaces implicit Laravel transactions

The layer maintains the same business logic while providing better performance and type safety.