import { DatabaseManager } from '../connection';
import { Migration, MigrationRecord, DatabaseError } from '../types';
import { migration as initialSchema } from './001_initial_schema';

// Import all migrations here as they are created
const migrations: Migration[] = [
  initialSchema
  // Add new migrations here as they are created
];

export class MigrationManager {
  /**
   * Run all pending migrations
   */
  static async migrate(): Promise<void> {
    console.log('Starting database migrations...');

    await DatabaseManager.withTransaction(async (connection) => {
      // Ensure migrations table exists
      await this.ensureMigrationsTable(connection);

      // Get applied migrations
      const appliedMigrations = await this.getAppliedMigrations(connection);
      const appliedIds = new Set(appliedMigrations.map(m => m.id));

      // Find pending migrations
      const pendingMigrations = migrations.filter(m => !appliedIds.has(m.id));

      if (pendingMigrations.length === 0) {
        console.log('No pending migrations to run.');
        return;
      }

      console.log(`Found ${pendingMigrations.length} pending migration(s).`);

      // Run migrations in order
      for (const migration of pendingMigrations) {
        console.log(`Running migration: ${migration.id} - ${migration.name}`);

        try {
          await migration.up(connection);

          // Record migration as applied
          await this.recordMigration(connection, migration);

          console.log(`✓ Migration ${migration.id} completed successfully.`);
        } catch (error) {
          console.error(`✗ Migration ${migration.id} failed:`, error);
          throw new DatabaseError(
            'MIGRATION_FAILED',
            `Migration ${migration.id} failed: ${error.message}`,
            { migrationId: migration.id, error }
          );
        }
      }

      console.log('All migrations completed successfully.');
    });
  }

  /**
   * Rollback the last migration
   */
  static async rollback(steps: number = 1): Promise<void> {
    console.log(`Rolling back ${steps} migration(s)...`);

    await DatabaseManager.withTransaction(async (connection) => {
      // Get applied migrations in reverse order
      const appliedMigrations = await this.getAppliedMigrations(connection);
      const migrationsToRollback = appliedMigrations
        .sort((a, b) => b.executed_at.getTime() - a.executed_at.getTime())
        .slice(0, steps);

      if (migrationsToRollback.length === 0) {
        console.log('No migrations to rollback.');
        return;
      }

      for (const appliedMigration of migrationsToRollback) {
        const migration = migrations.find(m => m.id === appliedMigration.id);

        if (!migration) {
          console.warn(`Migration ${appliedMigration.id} not found in migration files, skipping rollback.`);
          continue;
        }

        console.log(`Rolling back migration: ${migration.id} - ${migration.name}`);

        try {
          await migration.down(connection);

          // Remove migration record
          await this.removeMigrationRecord(connection, migration.id);

          console.log(`✓ Migration ${migration.id} rolled back successfully.`);
        } catch (error) {
          console.error(`✗ Rollback of migration ${migration.id} failed:`, error);
          throw new DatabaseError(
            'ROLLBACK_FAILED',
            `Rollback of migration ${migration.id} failed: ${error.message}`,
            { migrationId: migration.id, error }
          );
        }
      }

      console.log('Rollback completed successfully.');
    });
  }

  /**
   * Get migration status
   */
  static async status(): Promise<{
    applied: MigrationRecord[];
    pending: Migration[];
    total: number;
  }> {
    const connection = await DatabaseManager.getConnection();
    try {
      const appliedMigrations = await this.getAppliedMigrations(connection);
      const appliedIds = new Set(appliedMigrations.map(m => m.id));

      const pendingMigrations = migrations.filter(m => !appliedIds.has(m.id));

      return {
        applied: appliedMigrations,
        pending: pendingMigrations,
        total: migrations.length
      };
    } finally {
      await connection.release();
    }
  }

  /**
   * Create a new migration file template
   */
  static createMigrationTemplate(name: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const id = `${timestamp}_${name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;

    return `import { DatabaseConnection } from '../types';

export const migration = {
  id: '${id}',
  name: '${name}',
  up: async (db: DatabaseConnection): Promise<void> => {
    // Add migration logic here
    // Example:
    // await db.query(\`
    //   ALTER TABLE users ADD COLUMN email VARCHAR(255)
    // \`);
  },

  down: async (db: DatabaseConnection): Promise<void> => {
    // Add rollback logic here
    // Example:
    // await db.query(\`
    //   ALTER TABLE users DROP COLUMN email
    // \`);
  }
};
`;
  }

  // Private helper methods
  private static async ensureMigrationsTable(connection: any): Promise<void> {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id VARCHAR(100) PRIMARY KEY,
        name TEXT NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )
    `);
  }

  private static async getAppliedMigrations(connection: any): Promise<MigrationRecord[]> {
    const result = await connection.query<MigrationRecord>(
      'SELECT id, name, executed_at FROM schema_migrations ORDER BY executed_at ASC'
    );
    return result.rows;
  }

  private static async recordMigration(connection: any, migration: Migration): Promise<void> {
    await connection.query(
      'INSERT INTO schema_migrations (id, name, executed_at) VALUES ($1, $2, $3)',
      [migration.id, migration.name, new Date()]
    );
  }

  private static async removeMigrationRecord(connection: any, migrationId: string): Promise<void> {
    await connection.query('DELETE FROM schema_migrations WHERE id = $1', [migrationId]);
  }
}

// CLI helper functions for running migrations
export async function runMigrations(): Promise<void> {
  try {
    await MigrationManager.migrate();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

export async function rollbackMigrations(steps: number = 1): Promise<void> {
  try {
    await MigrationManager.rollback(steps);
  } catch (error) {
    console.error('Rollback failed:', error);
    process.exit(1);
  }
}

export async function showMigrationStatus(): Promise<void> {
  try {
    const status = await MigrationManager.status();
    console.log('Migration Status:');
    console.log(`Total migrations: ${status.total}`);
    console.log(`Applied: ${status.applied.length}`);
    console.log(`Pending: ${status.pending.length}`);

    if (status.pending.length > 0) {
      console.log('\nPending migrations:');
      status.pending.forEach(migration => {
        console.log(`  - ${migration.id}: ${migration.name}`);
      });
    }

    if (status.applied.length > 0) {
      console.log('\nApplied migrations:');
      status.applied.forEach(migration => {
        console.log(`  - ${migration.id}: ${migration.name} (${migration.executed_at.toISOString()})`);
      });
    }
  } catch (error) {
    console.error('Failed to get migration status:', error);
    process.exit(1);
  }
}