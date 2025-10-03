import { DatabaseManager } from '../connection';
import {
  ISessionRepository,
  DatabaseSession,
  DatabaseSessionEvent,
  DatabaseSpinHistory,
  DatabaseBalanceOperation,
  OptimisticLockError,
  DatabaseError
} from '../types';

export class SessionRepository implements ISessionRepository {
  private generateId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async create(session: Omit<DatabaseSession, 'id' | 'created_at' | 'updated_at' | 'version'>): Promise<DatabaseSession> {
    const id = this.generateId();
    const now = new Date();

    const newSession: DatabaseSession = {
      ...session,
      id,
      created_at: now,
      updated_at: now,
      version: 1
    };

    await DatabaseManager.withTransaction(async (connection) => {
      // Insert main session record
      await connection.query(`
        INSERT INTO game_sessions (
          id, user_id, game_id, state, last_activity, created_at, updated_at, version, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        newSession.id,
        newSession.user_id,
        newSession.game_id,
        JSON.stringify(newSession.state),
        newSession.last_activity,
        newSession.created_at,
        newSession.updated_at,
        newSession.version,
        newSession.is_active
      ]);

      // Insert events
      if (newSession.events.length > 0) {
        const eventValues = newSession.events.map(event => `('${event.id}', '${newSession.id}', '${event.type}', '${JSON.stringify(event.data)}', '${event.timestamp.toISOString()}')`).join(', ');
        await connection.query(`
          INSERT INTO session_events (id, session_id, type, data, timestamp)
          VALUES ${eventValues}
        `);
      }

      // Insert spin history
      if (newSession.spin_history.length > 0) {
        const spinValues = newSession.spin_history.map(spin =>
          `('${spin.id}', '${newSession.id}', ${spin.bet}, ${spin.lines}, ${spin.win}, '${JSON.stringify(spin.reels)}', '${JSON.stringify(spin.win_lines)}', ${spin.scatters_count}, ${spin.bonus_triggered}, '${spin.timestamp.toISOString()}')`
        ).join(', ');
        await connection.query(`
          INSERT INTO spin_history (id, session_id, bet, lines, win, reels, win_lines, scatters_count, bonus_triggered, timestamp)
          VALUES ${spinValues}
        `);
      }

      // Insert balance operations
      if (newSession.balance_operations.length > 0) {
        const balanceValues = newSession.balance_operations.map(op =>
          `('${op.id}', '${newSession.id}', '${op.type}', ${op.amount}, '${op.event}', ${op.previous_balance}, ${op.new_balance}, ${op.count_balance_change || 'NULL'}, ${op.address_change || 'NULL'}, '${op.timestamp.toISOString()}')`
        ).join(', ');
        await connection.query(`
          INSERT INTO balance_operations (id, session_id, type, amount, event, previous_balance, new_balance, count_balance_change, address_change, timestamp)
          VALUES ${balanceValues}
        `);
      }
    });

    return newSession;
  }

  async findById(id: string): Promise<DatabaseSession | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const sessionResult = await connection.query<DatabaseSession>(`
        SELECT id, user_id, game_id, state, last_activity, created_at, updated_at, version, is_active
        FROM game_sessions
        WHERE id = $1
      `, [id]);

      if (sessionResult.rows.length === 0) {
        return null;
      }

      const session = sessionResult.rows[0];

      // Load related data
      const [events, spinHistory, balanceOperations] = await Promise.all([
        this.loadSessionEvents(connection, id),
        this.loadSpinHistory(connection, id),
        this.loadBalanceOperations(connection, id)
      ]);

      return {
        ...session,
        state: typeof session.state === 'string' ? JSON.parse(session.state) : session.state,
        events,
        spin_history: spinHistory,
        balance_operations: balanceOperations
      };
    } finally {
      await connection.release();
    }
  }

  async findByUserId(userId: string): Promise<DatabaseSession[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const sessionsResult = await connection.query<DatabaseSession>(`
        SELECT id, user_id, game_id, state, last_activity, created_at, updated_at, version, is_active
        FROM game_sessions
        WHERE user_id = $1
        ORDER BY last_activity DESC
      `, [userId]);

      const sessions: DatabaseSession[] = [];

      for (const session of sessionsResult.rows) {
        const [events, spinHistory, balanceOperations] = await Promise.all([
          this.loadSessionEvents(connection, session.id),
          this.loadSpinHistory(connection, session.id),
          this.loadBalanceOperations(connection, session.id)
        ]);

        sessions.push({
          ...session,
          state: typeof session.state === 'string' ? JSON.parse(session.state) : session.state,
          events,
          spin_history: spinHistory,
          balance_operations: balanceOperations
        });
      }

      return sessions;
    } finally {
      await connection.release();
    }
  }

  async findActiveByUserId(userId: string): Promise<DatabaseSession | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const sessionResult = await connection.query<DatabaseSession>(`
        SELECT id, user_id, game_id, state, last_activity, created_at, updated_at, version, is_active
        FROM game_sessions
        WHERE user_id = $1 AND is_active = true
        ORDER BY last_activity DESC
        LIMIT 1
      `, [userId]);

      if (sessionResult.rows.length === 0) {
        return null;
      }

      const session = sessionResult.rows[0];

      const [events, spinHistory, balanceOperations] = await Promise.all([
        this.loadSessionEvents(connection, session.id),
        this.loadSpinHistory(connection, session.id),
        this.loadBalanceOperations(connection, session.id)
      ]);

      return {
        ...session,
        state: typeof session.state === 'string' ? JSON.parse(session.state) : session.state,
        events,
        spin_history: spinHistory,
        balance_operations: balanceOperations
      };
    } finally {
      await connection.release();
    }
  }

  async update(id: string, updates: Partial<DatabaseSession>, version: number): Promise<DatabaseSession> {
    const now = new Date();

    await DatabaseManager.withTransaction(async (connection) => {
      // Check version for optimistic locking
      const currentResult = await connection.query<{ version: number }>(
        'SELECT version FROM game_sessions WHERE id = $1',
        [id]
      );

      if (currentResult.rows.length === 0) {
        throw new DatabaseError('SESSION_NOT_FOUND', `Session with id ${id} not found`);
      }

      if (currentResult.rows[0].version !== version) {
        throw new OptimisticLockError('session', id);
      }

      // Update main session record
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      if (updates.state !== undefined) {
        updateFields.push(`state = $${paramIndex++}`);
        updateValues.push(JSON.stringify(updates.state));
      }
      if (updates.last_activity !== undefined) {
        updateFields.push(`last_activity = $${paramIndex++}`);
        updateValues.push(updates.last_activity);
      }
      if (updates.is_active !== undefined) {
        updateFields.push(`is_active = $${paramIndex++}`);
        updateValues.push(updates.is_active);
      }

      updateFields.push(`updated_at = $${paramIndex++}`);
      updateValues.push(now);
      updateFields.push(`version = $${paramIndex++}`);
      updateValues.push(version + 1);

      updateValues.push(id); // WHERE clause

      if (updateFields.length > 2) { // More than just updated_at and version
        await connection.query(`
          UPDATE game_sessions
          SET ${updateFields.join(', ')}
          WHERE id = $${paramIndex}
        `, updateValues);
      }

      // Update related data if provided
      if (updates.events) {
        await this.updateSessionEvents(connection, id, updates.events);
      }
      if (updates.spin_history) {
        await this.updateSpinHistory(connection, id, updates.spin_history);
      }
      if (updates.balance_operations) {
        await this.updateBalanceOperations(connection, id, updates.balance_operations);
      }
    });

    // Return updated session
    const updated = await this.findById(id);
    if (!updated) {
      throw new DatabaseError('SESSION_UPDATE_FAILED', 'Failed to retrieve updated session');
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    await DatabaseManager.withTransaction(async (connection) => {
      // Delete in correct order due to foreign key constraints
      await connection.query('DELETE FROM balance_operations WHERE session_id = $1', [id]);
      await connection.query('DELETE FROM spin_history WHERE session_id = $1', [id]);
      await connection.query('DELETE FROM session_events WHERE session_id = $1', [id]);
      await connection.query('DELETE FROM game_sessions WHERE id = $1', [id]);
    });
  }

  async cleanupExpired(olderThan: Date): Promise<number> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query(
        'DELETE FROM game_sessions WHERE last_activity < $1 AND is_active = false',
        [olderThan]
      );
      return result.rowCount;
    } finally {
      await connection.release();
    }
  }

  // Helper methods for loading related data
  private async loadSessionEvents(connection: any, sessionId: string): Promise<DatabaseSessionEvent[]> {
    const result = await connection.query<DatabaseSessionEvent>(
      'SELECT id, session_id, type, data, timestamp FROM session_events WHERE session_id = $1 ORDER BY timestamp ASC',
      [sessionId]
    );

    return result.rows.map(event => ({
      ...event,
      data: typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    }));
  }

  private async loadSpinHistory(connection: any, sessionId: string): Promise<DatabaseSpinHistory[]> {
    const result = await connection.query<DatabaseSpinHistory>(
      'SELECT id, session_id, bet, lines, win, reels, win_lines, scatters_count, bonus_triggered, timestamp FROM spin_history WHERE session_id = $1 ORDER BY timestamp DESC',
      [sessionId]
    );

    return result.rows.map(spin => ({
      ...spin,
      reels: typeof spin.reels === 'string' ? JSON.parse(spin.reels) : spin.reels,
      win_lines: typeof spin.win_lines === 'string' ? JSON.parse(spin.win_lines) : spin.win_lines
    }));
  }

  private async loadBalanceOperations(connection: any, sessionId: string): Promise<DatabaseBalanceOperation[]> {
    const result = await connection.query<DatabaseBalanceOperation>(
      'SELECT id, session_id, type, amount, event, previous_balance, new_balance, count_balance_change, address_change, timestamp FROM balance_operations WHERE session_id = $1 ORDER BY timestamp ASC',
      [sessionId]
    );

    return result.rows;
  }

  // Helper methods for updating related data
  private async updateSessionEvents(connection: any, sessionId: string, events: DatabaseSessionEvent[]): Promise<void> {
    // Delete existing events
    await connection.query('DELETE FROM session_events WHERE session_id = $1', [sessionId]);

    // Insert new events
    if (events.length > 0) {
      const eventValues = events.map(event => `('${event.id}', '${sessionId}', '${event.type}', '${JSON.stringify(event.data)}', '${event.timestamp.toISOString()}')`).join(', ');
      await connection.query(`
        INSERT INTO session_events (id, session_id, type, data, timestamp)
        VALUES ${eventValues}
      `);
    }
  }

  private async updateSpinHistory(connection: any, sessionId: string, spinHistory: DatabaseSpinHistory[]): Promise<void> {
    // Delete existing spin history
    await connection.query('DELETE FROM spin_history WHERE session_id = $1', [sessionId]);

    // Insert new spin history
    if (spinHistory.length > 0) {
      const spinValues = spinHistory.map(spin =>
        `('${spin.id}', '${sessionId}', ${spin.bet}, ${spin.lines}, ${spin.win}, '${JSON.stringify(spin.reels)}', '${JSON.stringify(spin.win_lines)}', ${spin.scatters_count}, ${spin.bonus_triggered}, '${spin.timestamp.toISOString()}')`
      ).join(', ');
      await connection.query(`
        INSERT INTO spin_history (id, session_id, bet, lines, win, reels, win_lines, scatters_count, bonus_triggered, timestamp)
        VALUES ${spinValues}
      `);
    }
  }

  private async updateBalanceOperations(connection: any, sessionId: string, balanceOperations: DatabaseBalanceOperation[]): Promise<void> {
    // Delete existing balance operations
    await connection.query('DELETE FROM balance_operations WHERE session_id = $1', [sessionId]);

    // Insert new balance operations
    if (balanceOperations.length > 0) {
      const balanceValues = balanceOperations.map(op =>
        `('${op.id}', '${sessionId}', '${op.type}', ${op.amount}, '${op.event}', ${op.previous_balance}, ${op.new_balance}, ${op.count_balance_change || 'NULL'}, ${op.address_change || 'NULL'}, '${op.timestamp.toISOString()}')`
      ).join(', ');
      await connection.query(`
        INSERT INTO balance_operations (id, session_id, type, amount, event, previous_balance, new_balance, count_balance_change, address_change, timestamp)
        VALUES ${balanceValues}
      `);
    }
  }
}