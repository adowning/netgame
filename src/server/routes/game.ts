import { GameService, SpinRequestData } from '../services/GameService';
import { SessionMiddleware } from '../middleware/session';
import { config } from '../config';

export interface GameRouteContext {
  gameService: GameService;
  sessionMiddleware: SessionMiddleware;
}

export function createGameRoutes(context: GameRouteContext) {
  const { gameService, sessionMiddleware } = context;

  return {
    /**
     * POST /game/:gameName/spin - Execute a spin
     */
    async spin(request: Request, gameName: string): Promise<Response> {
      try {
        // Apply session middleware
        const sessionResult = await sessionMiddleware.middleware({ requireSession: true })({
          request,
          gameId: gameName
        });

        if (sessionResult instanceof Response) {
          return sessionResult; // Session middleware returned an error response
        }

        // Get session from context (would be set by middleware)
        const ctx = { request, gameId: gameName };
        const session = SessionMiddleware.getSession(ctx);

        if (!session) {
          return new Response(
            JSON.stringify({
              error: 'SESSION_REQUIRED',
              message: 'Valid game session required'
            }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Parse request body
        let requestData: SpinRequestData;
        try {
          requestData = await request.json();
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: 'INVALID_JSON',
              message: 'Request body must be valid JSON'
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Validate required fields
        if (!requestData.lines || !requestData.betLine || !requestData.linesId) {
          return new Response(
            JSON.stringify({
              error: 'MISSING_PARAMETERS',
              message: 'lines, betLine, and linesId are required'
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Set PHP script path for this game
        gameService.setGameScriptPath(gameName);

        // Execute spin
        const result = await gameService.executeSpin(session, requestData);

        if (!result.success) {
          return new Response(
            JSON.stringify({
              error: result.error?.code || 'SPIN_FAILED',
              message: result.error?.message || 'Spin execution failed',
              details: config.isDevelopment() ? result.error?.details : undefined
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Log performance if enabled
        if (config.get('logging').enablePerformanceLogging && result.performance) {
          console.log(`Spin performance - Total: ${result.performance.executionTime}ms, PHP: ${result.performance.phpTime}ms`);
        }

        return new Response(
          JSON.stringify(result.data),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (error) {
        console.error('Spin route error:', error);

        return new Response(
          JSON.stringify({
            error: 'INTERNAL_ERROR',
            message: 'Internal server error during spin execution'
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    },

    /**
     * GET /game/:gameName/session - Get session information
     */
    async getSession(request: Request, gameName: string): Promise<Response> {
      try {
        // Apply session middleware
        const sessionResult = await sessionMiddleware.middleware({ requireSession: true })({
          request,
          gameId: gameName
        });

        if (sessionResult instanceof Response) {
          return sessionResult;
        }

        const ctx = { request, gameId: gameName };
        const session = SessionMiddleware.getSession(ctx);

        if (!session) {
          return new Response(
            JSON.stringify({
              error: 'SESSION_NOT_FOUND',
              message: 'Session not found'
            }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Return session information
        const sessionData = session.getSessionData();

        return new Response(
          JSON.stringify({
            sessionId: sessionData.sessionId,
            userId: sessionData.userId,
            gameId: sessionData.gameId,
            state: sessionData.state,
            lastActivity: sessionData.lastActivity,
            createdAt: sessionData.createdAt,
            isActive: session.isSessionActive()
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (error) {
        console.error('Get session route error:', error);

        return new Response(
          JSON.stringify({
            error: 'INTERNAL_ERROR',
            message: 'Failed to retrieve session information'
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    },

    /**
     * GET /game/:gameName/balance - Get user balance
     */
    async getBalance(request: Request, gameName: string): Promise<Response> {
      try {
        // Apply session middleware
        const sessionResult = await sessionMiddleware.middleware({ requireSession: true })({
          request,
          gameId: gameName
        });

        if (sessionResult instanceof Response) {
          return sessionResult;
        }

        const ctx = { request, gameId: gameName };
        const session = SessionMiddleware.getSession(ctx);

        if (!session) {
          return new Response(
            JSON.stringify({
              error: 'SESSION_NOT_FOUND',
              message: 'Session not found'
            }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Get balance information
        const balanceResult = await gameService.getBalance(session);

        if (!balanceResult.success) {
          return new Response(
            JSON.stringify({
              error: balanceResult.error?.code || 'BALANCE_ERROR',
              message: balanceResult.error?.message || 'Failed to retrieve balance'
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        return new Response(
          JSON.stringify(balanceResult.data),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (error) {
        console.error('Get balance route error:', error);

        return new Response(
          JSON.stringify({
            error: 'INTERNAL_ERROR',
            message: 'Failed to retrieve balance information'
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    },

    /**
     * POST /game/:gameName/session - Create new session
     */
    async createSession(request: Request, gameName: string): Promise<Response> {
      try {
        // Parse request body for session creation data
        let sessionData;
        try {
          sessionData = await request.json();
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: 'INVALID_JSON',
              message: 'Request body must be valid JSON'
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Validate required fields
        if (!sessionData.userId || !sessionData.gameData) {
          return new Response(
            JSON.stringify({
              error: 'MISSING_PARAMETERS',
              message: 'userId and gameData are required'
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Create session
        const result = await gameService.createSession(
          sessionData.userId,
          gameName,
          sessionData.gameData
        );

        if (!result.success) {
          return new Response(
            JSON.stringify({
              error: result.error?.code || 'SESSION_CREATION_FAILED',
              message: result.error?.message || 'Failed to create session'
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        return new Response(
          JSON.stringify(result.data),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (error) {
        console.error('Create session route error:', error);

        return new Response(
          JSON.stringify({
            error: 'INTERNAL_ERROR',
            message: 'Failed to create session'
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    },

    /**
     * GET /health - Service health check
     */
    async health(request: Request): Promise<Response> {
      const health = gameService.getHealthStatus();
      const configValid = config.validateConfig();

      const overallHealth = health.phpCalculator && health.balanceManager && configValid.valid;

      return new Response(
        JSON.stringify({
          status: overallHealth ? 'healthy' : 'unhealthy',
          timestamp: new Date().toISOString(),
          services: {
            phpCalculator: health.phpCalculator,
            balanceManager: health.balanceManager,
            config: configValid.valid
          },
          config: configValid.valid ? undefined : configValid.errors
        }),
        {
          status: overallHealth ? 200 : 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}