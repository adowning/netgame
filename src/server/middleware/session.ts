import { GameSessionManager } from '../../game-session/GameSessionManager';
import { PHPCalculator } from '../../game-session/PHPCalculator';
import { config } from '../config';
import { GameSession, GameError } from '../../game-session/GameSession';

// Extend Bun's Context to include session data
declare module 'bun' {
  interface Context {
    session?: GameSession;
    sessionId?: string;
    userId?: string;
    gameId?: string;
  }
}

export interface SessionMiddlewareOptions {
  sessionManager?: GameSessionManager;
  requireSession?: boolean;
  autoCreateSession?: boolean;
}

export class SessionMiddleware {
  private sessionManager: GameSessionManager;

  constructor(options: SessionMiddlewareOptions = {}) {
    this.sessionManager = options.sessionManager || this.createDefaultSessionManager();
  }

  private createDefaultSessionManager(): GameSessionManager {
    const phpCalculator = new PHPCalculator('', config.get('php').timeoutMs);
    return new GameSessionManager(phpCalculator, {
      maxSessionsPerUser: config.get('session').maxSessionsPerUser,
      sessionTimeoutMs: config.get('session').sessionTimeoutMs,
      cleanupIntervalMs: config.get('session').cleanupIntervalMs,
      persistenceEnabled: config.get('session').persistenceEnabled
    });
  }

  /**
   * Middleware function for handling session management
   */
  public middleware(options: SessionMiddlewareOptions = {}) {
    const requireSession = options.requireSession ?? true;
    const autoCreateSession = options.autoCreateSession ?? false;

    return async (ctx: any) => {
      try {
        // Extract session information from request
        const sessionId = this.extractSessionId(ctx);
        const userId = this.extractUserId(ctx);
        const gameId = this.extractGameId(ctx);

        if (sessionId) {
          // Try to load existing session
          const session = await this.sessionManager.loadSession(sessionId);
          if (session) {
            ctx.session = session;
            ctx.sessionId = sessionId;
            ctx.userId = session['userId'] as string;
            ctx.gameId = session['gameId'] as string;
            return;
          }
        }

        // Handle session requirements
        if (requireSession) {
          if (autoCreateSession && userId && gameId) {
            // Auto-create session if possible
            try {
              const session = await this.createSessionFromRequest(ctx);
              if (session) {
                ctx.session = session;
                ctx.sessionId = session['sessionId'] as string;
                ctx.userId = userId;
                ctx.gameId = gameId;
                return;
              }
            } catch (error) {
              console.warn('Failed to auto-create session:', error);
            }
          }

          // Session required but not found
          return new Response(
            JSON.stringify({
              error: 'SESSION_REQUIRED',
              message: 'Valid game session required for this operation'
            }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Session not required, continue without session
        ctx.sessionId = sessionId;
        ctx.userId = userId;
        ctx.gameId = gameId;

      } catch (error) {
        console.error('Session middleware error:', error);

        if (requireSession) {
          return new Response(
            JSON.stringify({
              error: 'SESSION_ERROR',
              message: 'Session processing failed'
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }
    };
  }

  /**
   * Extract session ID from request headers/cookies/query params
   */
  private extractSessionId(ctx: any): string | null {
    // Check Authorization header (Bearer token)
    const authHeader = ctx.request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check session cookie
    const sessionCookie = ctx.request.headers.get('Cookie')?.match(/sessionId=([^;]+)/)?.[1];
    if (sessionCookie) {
      return sessionCookie;
    }

    // Check query parameter
    const url = new URL(ctx.request.url);
    const sessionParam = url.searchParams.get('sessionId');
    if (sessionParam) {
      return sessionParam;
    }

    return null;
  }

  /**
   * Extract user ID from request
   */
  private extractUserId(ctx: any): string | null {
    // Check headers
    const userId = ctx.request.headers.get('X-User-ID');
    if (userId) {
      return userId;
    }

    // Check query parameter
    const url = new URL(ctx.request.url);
    return url.searchParams.get('userId');
  }

  /**
   * Extract game ID from request URL
   */
  private extractGameId(ctx: any): string | null {
    const url = new URL(ctx.request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    // Extract from path like /game/:gameId/...
    if (pathParts[0] === 'game' && pathParts[1]) {
      return pathParts[1];
    }

    // Check query parameter
    return url.searchParams.get('gameId');
  }

  /**
   * Create a new session from request data
   * This is a placeholder - in real implementation, you'd need to fetch user/game/shop data
   */
  private async createSessionFromRequest(ctx: any): Promise<GameSession | null> {
    try {
      const userId = this.extractUserId(ctx);
      const gameId = this.extractGameId(ctx);

      if (!userId || !gameId) {
        return null;
      }

      // TODO: Fetch actual user, game, and shop data from database
      // For now, return null to indicate session creation failed
      // This would need to be implemented based on your data access layer

      console.warn('Session auto-creation not implemented - requires database integration');
      return null;

    } catch (error) {
      console.error('Failed to create session from request:', error);
      return null;
    }
  }

  /**
   * Get the session manager instance
   */
  public getSessionManager(): GameSessionManager {
    return this.sessionManager;
  }

  /**
   * Create session middleware with default options
   */
  public static create(options: SessionMiddlewareOptions = {}): SessionMiddleware {
    return new SessionMiddleware(options);
  }

  /**
   * Helper method to get session from context
   */
  public static getSession(ctx: any): GameSession | null {
    return ctx.session || null;
  }

  /**
   * Helper method to require session in route handler
   */
  public static requireSession(ctx: any): GameSession {
    const session = ctx.session;
    if (!session) {
      throw new Error('Session required but not found');
    }
    return session;
  }
}

// Export factory function for easy middleware creation
export const sessionMiddleware = (options: SessionMiddlewareOptions = {}) => {
  const middleware = new SessionMiddleware(options);
  return middleware.middleware(options);
};