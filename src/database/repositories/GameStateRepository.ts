import { DatabaseManager } from '../connection';
import {
  IGameStateRepository,
  DatabaseGameState,
  OptimisticLockError,
  DatabaseError
} from '../types';

export class GameStateRepository implements IGameStateRepository {
  private generateId(): string {
    return `state_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async create(state: Omit<DatabaseGameState, 'id' | 'last_updated' | 'version'>): Promise<DatabaseGameState> {
    const id = this.generateId();
    const now = new Date();

    const newState: DatabaseGameState = {
      ...state,
      id,
      last_updated: now,
      version: 1
    };

    const connection = await DatabaseManager.getConnection();
    try {
      await connection.query(`
        INSERT INTO game_states (
          id, session_id, game_id, user_id, state, configuration, last_updated, version
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        newState.id,
        newState.session_id,
        newState.game_id,
        newState.user_id,
        JSON.stringify(newState.state),
        JSON.stringify(newState.configuration),
        newState.last_updated,
        newState.version
      ]);

      return newState;
    } finally {
      await connection.release();
    }
  }

  async findBySessionId(sessionId: string): Promise<DatabaseGameState | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameState>(`
        SELECT id, session_id, game_id, user_id, state, configuration, last_updated, version
        FROM game_states
        WHERE session_id = $1
        ORDER BY last_updated DESC
        LIMIT 1
      `, [sessionId]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        ...row,
        state: typeof row.state === 'string' ? JSON.parse(row.state) : row.state,
        configuration: typeof row.configuration === 'string' ? JSON.parse(row.configuration) : row.configuration
      };
    } finally {
      await connection.release();
    }
  }

  async findByUserAndGame(userId: string, gameId: string): Promise<DatabaseGameState | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameState>(`
        SELECT id, session_id, game_id, user_id, state, configuration, last_updated, version
        FROM game_states
        WHERE user_id = $1 AND game_id = $2
        ORDER BY last_updated DESC
        LIMIT 1
      `, [userId, gameId]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        ...row,
        state: typeof row.state === 'string' ? JSON.parse(row.state) : row.state,
        configuration: typeof row.configuration === 'string' ? JSON.parse(row.configuration) : row.configuration
      };
    } finally {
      await connection.release();
    }
  }

  async update(
    id: string,
    updates: Partial<DatabaseGameState>,
    version: number
  ): Promise<DatabaseGameState> {
    const now = new Date();

    await DatabaseManager.withTransaction(async (connection) => {
      // Check version for optimistic locking
      const currentResult = await connection.query<{ version: number }>(
        'SELECT version FROM game_states WHERE id = $1',
        [id]
      );

      if (currentResult.rows.length === 0) {
        throw new DatabaseError('GAME_STATE_NOT_FOUND', `Game state with id ${id} not found`);
      }

      if (currentResult.rows[0].version !== version) {
        throw new OptimisticLockError('game_state', id);
      }

      // Update game state
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id' && key !== 'last_updated') {
          if (key === 'state' || key === 'configuration') {
            updateFields.push(`${key} = $${paramIndex++}`);
            updateValues.push(JSON.stringify(value));
          } else {
            updateFields.push(`${key} = $${paramIndex++}`);
            updateValues.push(value);
          }
        }
      });

      updateFields.push(`last_updated = $${paramIndex++}`);
      updateValues.push(now);
      updateFields.push(`version = $${paramIndex++}`);
      updateValues.push(version + 1);

      updateValues.push(id); // WHERE clause

      if (updateFields.length > 2) { // More than just last_updated and version
        await connection.query(`
          UPDATE game_states
          SET ${updateFields.join(', ')}
          WHERE id = $${paramIndex}
        `, updateValues);
      }
    });

    // Return updated state
    const updated = await this.findById(id);
    if (!updated) {
      throw new DatabaseError('GAME_STATE_UPDATE_FAILED', 'Failed to retrieve updated game state');
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const connection = await DatabaseManager.getConnection();
    try {
      await connection.query('DELETE FROM game_states WHERE id = $1', [id]);
    } finally {
      await connection.release();
    }
  }

  async saveConfiguration(gameId: string, config: Record<string, any>): Promise<void> {
    const connection = await DatabaseManager.getConnection();
    try {
      // Check if configuration already exists
      const existingResult = await connection.query(
        'SELECT id FROM game_configurations WHERE game_id = $1',
        [gameId]
      );

      const now = new Date();

      if (existingResult.rows.length > 0) {
        // Update existing configuration
        await connection.query(`
          UPDATE game_configurations
          SET config = $1, updated_at = $2
          WHERE game_id = $3
        `, [JSON.stringify(config), now, gameId]);
      } else {
        // Insert new configuration
        await connection.query(`
          INSERT INTO game_configurations (game_id, config, created_at, updated_at)
          VALUES ($1, $2, $3, $4)
        `, [gameId, JSON.stringify(config), now, now]);
      }
    } finally {
      await connection.release();
    }
  }

  async getConfiguration(gameId: string): Promise<Record<string, any> | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query(
        'SELECT config FROM game_configurations WHERE game_id = $1',
        [gameId]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const config = result.rows[0].config;
      return typeof config === 'string' ? JSON.parse(config) : config;
    } finally {
      await connection.release();
    }
  }

  // Helper method to find by ID
  private async findById(id: string): Promise<DatabaseGameState | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameState>(`
        SELECT id, session_id, game_id, user_id, state, configuration, last_updated, version
        FROM game_states
        WHERE id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        ...row,
        state: typeof row.state === 'string' ? JSON.parse(row.state) : row.state,
        configuration: typeof row.configuration === 'string' ? JSON.parse(row.configuration) : row.configuration
      };
    } finally {
      await connection.release();
    }
  }

  // Get all game states for a user
  async getUserGameStates(userId: string): Promise<DatabaseGameState[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameState>(`
        SELECT id, session_id, game_id, user_id, state, configuration, last_updated, version
        FROM game_states
        WHERE user_id = $1
        ORDER BY last_updated DESC
      `, [userId]);

      return result.rows.map(row => ({
        ...row,
        state: typeof row.state === 'string' ? JSON.parse(row.state) : row.state,
        configuration: typeof row.configuration === 'string' ? JSON.parse(row.configuration) : row.configuration
      }));
    } finally {
      await connection.release();
    }
  }

  // Get game states by game ID
  async getGameStates(gameId: string): Promise<DatabaseGameState[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameState>(`
        SELECT id, session_id, game_id, user_id, state, configuration, last_updated, version
        FROM game_states
        WHERE game_id = $1
        ORDER BY last_updated DESC
      `, [gameId]);

      return result.rows.map(row => ({
        ...row,
        state: typeof row.state === 'string' ? JSON.parse(row.state) : row.state,
        configuration: typeof row.configuration === 'string' ? JSON.parse(row.configuration) : row.configuration
      }));
    } finally {
      await connection.release();
    }
  }

  // Clean up old game states (keep only recent ones per user/game combination)
  async cleanupOldStates(keepRecent: number = 5): Promise<number> {
    const connection = await DatabaseManager.getConnection();
    try {
      // This is a complex query that keeps only the most recent N states per user/game combination
      const result = await connection.query(`
        WITH ranked_states AS (
          SELECT id,
                 ROW_NUMBER() OVER (PARTITION BY user_id, game_id ORDER BY last_updated DESC) as rn
          FROM game_states
        )
        DELETE FROM game_states
        WHERE id IN (
          SELECT id FROM ranked_states WHERE rn > $1
        )
      `, [keepRecent]);

      return result.rowCount;
    } finally {
      await connection.release();
    }
  }

  // Get state statistics
  async getStateStatistics(): Promise<{
    totalStates: number;
    activeGames: number;
    statesByGame: Array<{ game_id: string; count: number }>;
  }> {
    const connection = await DatabaseManager.getConnection();
    try {
      const totalResult = await connection.query('SELECT COUNT(*) as count FROM game_states');
      const totalStates = parseInt(totalResult.rows[0].count);

      const activeResult = await connection.query('SELECT COUNT(DISTINCT game_id) as count FROM game_states');
      const activeGames = parseInt(activeResult.rows[0].count);

      const byGameResult = await connection.query(`
        SELECT game_id, COUNT(*) as count
        FROM game_states
        GROUP BY game_id
        ORDER BY count DESC
      `);

      const statesByGame = byGameResult.rows.map(row => ({
        game_id: row.game_id,
        count: parseInt(row.count)
      }));

      return {
        totalStates,
        activeGames,
        statesByGame
      };
    } finally {
      await connection.release();
    }
  }

  // Migrate game state from one session to another (useful for resuming games)
  async migrateState(fromSessionId: string, toSessionId: string): Promise<DatabaseGameState | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const state = await this.findBySessionId(fromSessionId);
      if (!state) {
        return null;
      }

      // Create new state for target session
      const newState = await this.create({
        session_id: toSessionId,
        game_id: state.game_id,
        user_id: state.user_id,
        state: state.state,
        configuration: state.configuration
      });

      // Optionally delete old state
      await this.delete(state.id);

      return newState;
    } finally {
      await connection.release();
    }
  }
}