import { GameSession, GameError } from './GameSession';
import { PHPCalculator } from './PHPCalculator';
import {
  GameData,
  RTPConfig,
  SessionData
} from './types';

export interface SessionManagerConfig {
  maxSessionsPerUser: number;
  sessionTimeoutMs: number;
  cleanupIntervalMs: number;
  persistenceEnabled: boolean;
}

export class GameSessionManager {
  private sessions: Map<string, GameSession> = new Map();
  private userSessions: Map<string, Set<string>> = new Map();
  private phpCalculator: PHPCalculator;
  private config: SessionManagerConfig;
  private cleanupTimer?: Timer;

  constructor(
    phpCalculator: PHPCalculator,
    config: Partial<SessionManagerConfig> = {}
  ) {
    this.phpCalculator = phpCalculator;
    this.config = {
      maxSessionsPerUser: 5,
      sessionTimeoutMs: 30 * 60 * 1000, // 30 minutes
      cleanupIntervalMs: 5 * 60 * 1000, // 5 minutes
      persistenceEnabled: true,
      ...config
    };

    this.startCleanupTimer();
  }

  /**
   * Create a new game session
   */
  public async createSession(
    userId: string,
    gameId: string,
    gameData: GameData,
    rtpConfig: RTPConfig
  ): Promise<GameSession> {
    // Check session limits
    const userSessionIds = this.userSessions.get(userId) || new Set();
    if (userSessionIds.size >= this.config.maxSessionsPerUser) {
      throw new GameError('SESSION_LIMIT_EXCEEDED', 'Maximum sessions per user exceeded');
    }

    // Generate unique session ID
    const sessionId = this.generateSessionId(userId, gameId);

    // Check for existing session
    if (this.sessions.has(sessionId)) {
      throw new GameError('SESSION_EXISTS', 'Session already exists');
    }

    // Create new session
    const session = new GameSession(
      sessionId,
      userId,
      gameId,
      gameData,
      this.phpCalculator,
      rtpConfig
    );

    // Store session
    this.sessions.set(sessionId, session);
    userSessionIds.add(sessionId);
    this.userSessions.set(userId, userSessionIds);

    // Persist if enabled
    if (this.config.persistenceEnabled) {
      await this.persistSession(session);
    }

    return session;
  }

  /**
   * Get existing session
   */
  public getSession(sessionId: string): GameSession | null {
    const session = this.sessions.get(sessionId);

    if (session && !session.isSessionActive()) {
      // Clean up inactive session
      this.removeSession(sessionId);
      return null;
    }

    return session || null;
  }

  /**
   * Load session from persistence
   */
  public async loadSession(sessionId: string): Promise<GameSession | null> {
    // Check if already in memory
    let session = this.getSession(sessionId);
    if (session) {
      return session;
    }

    // Try to load from persistence
    if (this.config.persistenceEnabled) {
      const sessionData = await this.loadSessionData(sessionId);
      if (sessionData) {
        session = await this.restoreSession(sessionData);
        if (session) {
          this.sessions.set(sessionId, session);
          const userSessionIds = this.userSessions.get(sessionData.userId) || new Set();
          userSessionIds.add(sessionId);
          this.userSessions.set(sessionData.userId, userSessionIds);
          return session;
        }
      }
    }

    return null;
  }

  /**
   * End session
   */
  public async endSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.endSession();

      // Final persistence
      if (this.config.persistenceEnabled) {
        await this.persistSession(session);
      }

      this.removeSession(sessionId);
    }
  }

  /**
   * Get all active sessions for a user
   */
  public getUserSessions(userId: string): GameSession[] {
    const sessionIds = this.userSessions.get(userId);
    if (!sessionIds) {
      return [];
    }

    const sessions: GameSession[] = [];
    for (const sessionId of sessionIds) {
      const session = this.getSession(sessionId);
      if (session) {
        sessions.push(session);
      }
    }

    return sessions;
  }

  /**
   * Clean up expired sessions
   */
  public async cleanupExpiredSessions(): Promise<void> {
    const now = Date.now();
    const expiredSessions: string[] = [];

    for (const [sessionId, session] of this.sessions) {
      const lastActivity = session['lastActivity'] as Date;
      if (now - lastActivity.getTime() > this.config.sessionTimeoutMs) {
        session.endSession();
        expiredSessions.push(sessionId);

        // Final persistence for expired sessions
        if (this.config.persistenceEnabled) {
          await this.persistSession(session);
        }
      }
    }

    // Remove expired sessions
    for (const sessionId of expiredSessions) {
      this.removeSession(sessionId);
    }
  }

  /**
   * Get session statistics
   */
  public getStats(): {
    totalSessions: number;
    activeSessions: number;
    totalUsers: number;
  } {
    let activeSessions = 0;
    for (const session of this.sessions.values()) {
      if (session.isSessionActive()) {
        activeSessions++;
      }
    }

    return {
      totalSessions: this.sessions.size,
      activeSessions,
      totalUsers: this.userSessions.size
    };
  }

  /**
   * Shutdown manager and cleanup
   */
  public async shutdown(): Promise<void> {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    // End all active sessions
    const sessionIds = Array.from(this.sessions.keys());
    for (const sessionId of sessionIds) {
      await this.endSession(sessionId);
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(userId: string, gameId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${userId}_${gameId}_${timestamp}_${random}`;
  }

  /**
   * Remove session from memory
   */
  private removeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      const userId = session['userId'] as string;
      const userSessionIds = this.userSessions.get(userId);
      if (userSessionIds) {
        userSessionIds.delete(sessionId);
        if (userSessionIds.size === 0) {
          this.userSessions.delete(userId);
        }
      }
      this.sessions.delete(sessionId);
    }
  }

  /**
   * Start cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanupExpiredSessions().catch(error => {
        console.error('Session cleanup error:', error);
      });
    }, this.config.cleanupIntervalMs);
  }

  /**
   * Persist session data (placeholder - implement based on storage system)
   */
  private async persistSession(session: GameSession): Promise<void> {
    // TODO: Implement actual persistence logic
    // This could save to database, Redis, or file system
    const sessionData = session.getSessionData();
    console.log('Persisting session:', sessionData.sessionId);
  }

  /**
   * Load session data from persistence (placeholder)
   */
  private async loadSessionData(sessionId: string): Promise<SessionData | null> {
    // TODO: Implement actual loading logic
    // This could load from database, Redis, or file system
    console.log('Loading session:', sessionId);
    return null;
  }

  /**
   * Restore session from persisted data
   */
  private async restoreSession(sessionData: SessionData): Promise<GameSession | null> {
    // TODO: Implement session restoration
    // This would need to reconstruct GameSession from SessionData
    console.log('Restoring session:', sessionData.sessionId);
    return null;
  }
}