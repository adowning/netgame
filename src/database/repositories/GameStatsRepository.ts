import { DatabaseManager } from '../connection';
import {
  IGameStatsRepository,
  DatabaseGameStats,
  DatabaseError
} from '../types';

export class GameStatsRepository implements IGameStatsRepository {
  private generateId(): string {
    return `stats_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async create(stats: Omit<DatabaseGameStats, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseGameStats> {
    const id = this.generateId();
    const now = new Date();

    const newStats: DatabaseGameStats = {
      ...stats,
      id,
      created_at: now,
      updated_at: now
    };

    const connection = await DatabaseManager.getConnection();
    try {
      await connection.query(`
        INSERT INTO game_statistics (
          id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
          total_spins, total_wins, total_bets, bonus_games_triggered,
          free_spins_used, jackpot_wins, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
        newStats.id,
        newStats.game_id,
        newStats.user_id,
        newStats.session_id || null,
        newStats.stat_in,
        newStats.stat_out,
        newStats.rtp_percentage,
        newStats.total_spins,
        newStats.total_wins,
        newStats.total_bets,
        newStats.bonus_games_triggered,
        newStats.free_spins_used,
        newStats.jackpot_wins,
        newStats.created_at,
        newStats.updated_at
      ]);

      return newStats;
    } finally {
      await connection.release();
    }
  }

  async findByGameId(gameId: string): Promise<DatabaseGameStats[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameStats>(`
        SELECT id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
               total_spins, total_wins, total_bets, bonus_games_triggered,
               free_spins_used, jackpot_wins, created_at, updated_at
        FROM game_statistics
        WHERE game_id = $1
        ORDER BY created_at DESC
      `, [gameId]);

      return result.rows;
    } finally {
      await connection.release();
    }
  }

  async findByUserId(userId: string): Promise<DatabaseGameStats[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameStats>(`
        SELECT id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
               total_spins, total_wins, total_bets, bonus_games_triggered,
               free_spins_used, jackpot_wins, created_at, updated_at
        FROM game_statistics
        WHERE user_id = $1
        ORDER BY created_at DESC
      `, [userId]);

      return result.rows;
    } finally {
      await connection.release();
    }
  }

  async findBySessionId(sessionId: string): Promise<DatabaseGameStats | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameStats>(`
        SELECT id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
               total_spins, total_wins, total_bets, bonus_games_triggered,
               free_spins_used, jackpot_wins, created_at, updated_at
        FROM game_statistics
        WHERE session_id = $1
        ORDER BY created_at DESC
        LIMIT 1
      `, [sessionId]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await connection.release();
    }
  }

  async update(id: string, updates: Partial<DatabaseGameStats>): Promise<DatabaseGameStats> {
    const now = new Date();

    const connection = await DatabaseManager.getConnection();
    try {
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      // Build dynamic update query
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id' && key !== 'created_at') {
          updateFields.push(`${key} = $${paramIndex++}`);
          updateValues.push(value);
        }
      });

      updateFields.push(`updated_at = $${paramIndex++}`);
      updateValues.push(now);

      updateValues.push(id); // WHERE clause

      if (updateFields.length > 1) { // More than just updated_at
        await connection.query(`
          UPDATE game_statistics
          SET ${updateFields.join(', ')}
          WHERE id = $${paramIndex}
        `, updateValues);
      }

      // Return updated stats
      const updated = await this.findById(id);
      if (!updated) {
        throw new DatabaseError('STATS_UPDATE_FAILED', 'Failed to retrieve updated statistics');
      }

      return updated;
    } finally {
      await connection.release();
    }
  }

  async incrementStats(
    id: string,
    increments: Partial<Pick<DatabaseGameStats,
      'total_spins' | 'total_wins' | 'total_bets' | 'bonus_games_triggered' | 'free_spins_used' | 'jackpot_wins'
    >>
  ): Promise<DatabaseGameStats> {
    const now = new Date();

    const connection = await DatabaseManager.getConnection();
    try {
      const incrementFields: string[] = [];
      const incrementValues: any[] = [];
      let paramIndex = 1;

      // Build increment query
      Object.entries(increments).forEach(([key, value]) => {
        if (value !== undefined && value !== 0) {
          incrementFields.push(`${key} = ${key} + $${paramIndex++}`);
          incrementValues.push(value);
        }
      });

      if (incrementFields.length > 0) {
        incrementFields.push(`updated_at = $${paramIndex++}`);
        incrementValues.push(now);

        incrementValues.push(id); // WHERE clause

        await connection.query(`
          UPDATE game_statistics
          SET ${incrementFields.join(', ')}
          WHERE id = $${paramIndex}
        `, incrementValues);
      }

      // Return updated stats
      const updated = await this.findById(id);
      if (!updated) {
        throw new DatabaseError('STATS_INCREMENT_FAILED', 'Failed to retrieve updated statistics');
      }

      return updated;
    } finally {
      await connection.release();
    }
  }

  async aggregateGameStats(
    gameId: string,
    dateRange?: { start: Date; end: Date }
  ): Promise<DatabaseGameStats> {
    const connection = await DatabaseManager.getConnection();
    try {
      let query = `
        SELECT
          COUNT(*) as total_sessions,
          SUM(stat_in) as total_stat_in,
          SUM(stat_out) as total_stat_out,
          AVG(rtp_percentage) as avg_rtp,
          SUM(total_spins) as total_spins,
          SUM(total_wins) as total_wins,
          SUM(total_bets) as total_bets,
          SUM(bonus_games_triggered) as total_bonus_games,
          SUM(free_spins_used) as total_free_spins,
          SUM(jackpot_wins) as total_jackpots
        FROM game_statistics
        WHERE game_id = $1
      `;

      const params: any[] = [gameId];
      let paramIndex = 2;

      if (dateRange) {
        query += ` AND created_at >= $${paramIndex++} AND created_at <= $${paramIndex++}`;
        params.push(dateRange.start, dateRange.end);
      }

      const result = await connection.query(query, params);

      if (result.rows.length === 0) {
        return {
          id: this.generateId(),
          game_id: gameId,
          user_id: '', // Aggregate doesn't belong to specific user
          stat_in: 0,
          stat_out: 0,
          rtp_percentage: 0,
          total_spins: 0,
          total_wins: 0,
          total_bets: 0,
          bonus_games_triggered: 0,
          free_spins_used: 0,
          jackpot_wins: 0,
          created_at: new Date(),
          updated_at: new Date()
        };
      }

      const row = result.rows[0];

      return {
        id: this.generateId(),
        game_id: gameId,
        user_id: '', // Aggregate
        stat_in: parseFloat(row.total_stat_in) || 0,
        stat_out: parseFloat(row.total_stat_out) || 0,
        rtp_percentage: parseFloat(row.avg_rtp) || 0,
        total_spins: parseInt(row.total_spins) || 0,
        total_wins: parseInt(row.total_wins) || 0,
        total_bets: parseFloat(row.total_bets) || 0,
        bonus_games_triggered: parseInt(row.total_bonus_games) || 0,
        free_spins_used: parseInt(row.total_free_spins) || 0,
        jackpot_wins: parseInt(row.total_jackpots) || 0,
        created_at: new Date(),
        updated_at: new Date()
      };
    } finally {
      await connection.release();
    }
  }

  // Helper method to find by ID (used internally)
  private async findById(id: string): Promise<DatabaseGameStats | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseGameStats>(`
        SELECT id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
               total_spins, total_wins, total_bets, bonus_games_triggered,
               free_spins_used, jackpot_wins, created_at, updated_at
        FROM game_statistics
        WHERE id = $1
      `, [id]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await connection.release();
    }
  }

  // Additional utility methods
  async getTopPerformingGames(limit: number = 10): Promise<Array<{ game_id: string; total_wins: number; rtp_percentage: number }>> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query(`
        SELECT
          game_id,
          SUM(total_wins) as total_wins,
          AVG(rtp_percentage) as rtp_percentage
        FROM game_statistics
        GROUP BY game_id
        ORDER BY total_wins DESC
        LIMIT $1
      `, [limit]);

      return result.rows.map(row => ({
        game_id: row.game_id,
        total_wins: parseInt(row.total_wins) || 0,
        rtp_percentage: parseFloat(row.rtp_percentage) || 0
      }));
    } finally {
      await connection.release();
    }
  }

  async getUserGameHistory(userId: string, gameId?: string): Promise<DatabaseGameStats[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      let query = `
        SELECT id, game_id, user_id, session_id, stat_in, stat_out, rtp_percentage,
               total_spins, total_wins, total_bets, bonus_games_triggered,
               free_spins_used, jackpot_wins, created_at, updated_at
        FROM game_statistics
        WHERE user_id = $1
      `;

      const params: any[] = [userId];
      let paramIndex = 2;

      if (gameId) {
        query += ` AND game_id = $${paramIndex++}`;
        params.push(gameId);
      }

      query += ' ORDER BY created_at DESC';

      const result = await connection.query<DatabaseGameStats>(query, params);
      return result.rows;
    } finally {
      await connection.release();
    }
  }
}