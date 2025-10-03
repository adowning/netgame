import { GameService } from './services/GameService';
import { SessionMiddleware } from './middleware/session';
import { createGameRoutes } from './routes/game';
import { config } from './config';

// Initialize core services
const gameService = new GameService();
const sessionMiddleware = SessionMiddleware.create();

// Create route handlers
const gameRoutes = createGameRoutes({
  gameService,
  sessionMiddleware
});

// Request logging middleware
async function requestLogger(request: Request): Promise<void> {
  if (config.get('logging').enableRequestLogging) {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const url = request.url;
    const userAgent = request.headers.get('User-Agent') || 'Unknown';

    console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
  }
}

// CORS headers
function corsHeaders(origin: string | null): Record<string, string> {
  const corsConfig = config.get('cors');
  const allowedOrigin = Array.isArray(corsConfig.origin)
    ? corsConfig.origin.includes(origin || '') ? origin : corsConfig.origin[0]
    : corsConfig.origin;

  return {
    'Access-Control-Allow-Origin': allowedOrigin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-ID, X-Session-ID',
    'Access-Control-Allow-Credentials': corsConfig.credentials.toString(),
    'Access-Control-Max-Age': '86400' // 24 hours
  };
}

// Error response helper
function createErrorResponse(
  status: number,
  error: string,
  message: string,
  details?: any
): Response {
  const errorBody = {
    error,
    message,
    timestamp: new Date().toISOString(),
    ...(config.isDevelopment() && details && { details })
  };

  return new Response(JSON.stringify(errorBody), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(null)
    }
  });
}

// Route handler
async function handleRequest(request: Request): Promise<Response> {
  const startTime = Date.now();

  try {
    // Log request
    await requestLogger(request);

    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;
    const origin = request.headers.get('Origin');

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin)
      });
    }

    // Add CORS headers to all responses
    const cors = corsHeaders(origin);

    // Health check endpoint
    if (path === '/health' && method === 'GET') {
      const response = await gameRoutes.health(request);
      // Add CORS headers
      const newHeaders = new Headers(response.headers);
      Object.entries(cors).forEach(([key, value]) => newHeaders.set(key, value));

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders
      });
    }

    // Game routes
    const gameRouteMatch = path.match(/^\/game\/([^\/]+)\/(.+)$/);
    if (gameRouteMatch) {
      const [, gameName, action] = gameRouteMatch;

      switch (action) {
        case 'spin':
          if (method === 'POST') {
            const response = await gameRoutes.spin(request, gameName);
            const newHeaders = new Headers(response.headers);
            Object.entries(cors).forEach(([key, value]) => newHeaders.set(key, value));
            return new Response(response.body, {
              status: response.status,
              headers: newHeaders
            });
          }
          break;

        case 'session':
          if (method === 'GET') {
            const response = await gameRoutes.getSession(request, gameName);
            const newHeaders = new Headers(response.headers);
            Object.entries(cors).forEach(([key, value]) => newHeaders.set(key, value));
            return new Response(response.body, {
              status: response.status,
              headers: newHeaders
            });
          } else if (method === 'POST') {
            const response = await gameRoutes.createSession(request, gameName);
            const newHeaders = new Headers(response.headers);
            Object.entries(cors).forEach(([key, value]) => newHeaders.set(key, value));
            return new Response(response.body, {
              status: response.status,
              headers: newHeaders
            });
          }
          break;

        case 'balance':
          if (method === 'GET') {
            const response = await gameRoutes.getBalance(request, gameName);
            const newHeaders = new Headers(response.headers);
            Object.entries(cors).forEach(([key, value]) => newHeaders.set(key, value));
            return new Response(response.body, {
              status: response.status,
              headers: newHeaders
            });
          }
          break;
      }
    }

    // 404 Not Found
    return createErrorResponse(404, 'NOT_FOUND', `Route ${method} ${path} not found`);

  } catch (error) {
    const executionTime = Date.now() - startTime;

    console.error('Request handling error:', error);

    // Log performance for errors too
    if (config.get('logging').enablePerformanceLogging) {
      console.log(`Request error performance: ${executionTime}ms`);
    }

    return createErrorResponse(
      500,
      'INTERNAL_ERROR',
      'Internal server error',
      config.isDevelopment() ? error : undefined
    );
  }
}

// Graceful shutdown handling
let server: ReturnType<typeof Bun.serve>;

function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.stop();
  }

  // Close session manager
  sessionMiddleware.getSessionManager().shutdown()
    .then(() => {
      console.log('Session manager shut down successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during session manager shutdown:', error);
      process.exit(1);
    });
}

// Register shutdown handlers
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Validate configuration before starting
const configValidation = config.validateConfig();
if (!configValidation.valid) {
  console.error('Configuration validation failed:');
  configValidation.errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

// Start the server
try {
  server = Bun.serve({
    port: config.get('port'),
    hostname: config.get('host'),
    fetch: handleRequest,

    // Server events
    error(error) {
      console.error('Server error:', error);
    }
  });

  console.log(`🚀 Game server started successfully!`);
  console.log(`📍 Listening on http://${config.get('host')}:${config.get('port')}`);
  console.log(`🌍 Environment: ${config.get('environment')}`);
  console.log(`🔧 CORS Origins: ${Array.isArray(config.get('cors').origin)
    ? config.get('cors').origin.join(', ')
    : config.get('cors').origin}`);
  console.log(`📊 Request Logging: ${config.get('logging').enableRequestLogging ? 'Enabled' : 'Disabled'}`);
  console.log(`⚡ Performance Logging: ${config.get('logging').enablePerformanceLogging ? 'Enabled' : 'Disabled'}`);

  // Log available routes
  console.log('\n📋 Available endpoints:');
  console.log('  GET  /health');
  console.log('  POST /game/:gameName/spin');
  console.log('  GET  /game/:gameName/session');
  console.log('  POST /game/:gameName/session');
  console.log('  GET  /game/:gameName/balance');

} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

// Export for testing
export { server, gameService, sessionMiddleware };