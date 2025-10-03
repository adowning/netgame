/**
 * Centralized error handling middleware for game routes
 */

export interface GameError {
  code: string;
  message: string;
  details?: any;
  statusCode?: number;
}

export class ErrorHandler {
  /**
   * Creates a standardized error response
   */
  static createErrorResponse(
    error: GameError | Error | string,
    defaultStatusCode: number = 500
  ): Response {
    let errorData: GameError;

    if (typeof error === 'string') {
      errorData = {
        code: 'INTERNAL_ERROR',
        message: error,
        statusCode: defaultStatusCode
      };
    } else if (error instanceof Error) {
      errorData = {
        code: 'INTERNAL_ERROR',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        statusCode: defaultStatusCode
      };
    } else {
      errorData = {
        ...error,
        statusCode: error.statusCode || defaultStatusCode
      };
    }

    return new Response(
      JSON.stringify({
        error: errorData.code,
        message: errorData.message,
        ...(errorData.details && { details: errorData.details })
      }),
      {
        status: errorData.statusCode,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  /**
   * Wraps route handlers with error handling
   */
  static withErrorHandling<T extends any[], R>(
    handler: (...args: T) => Promise<R>,
    context?: string
  ) {
    return async (...args: T): Promise<R | Response> => {
      try {
        return await handler(...args);
      } catch (error) {
        console.error(`${context || 'Route'} error:`, error);
        return this.createErrorResponse(error as Error);
      }
    };
  }

  /**
   * Common error types for game operations
   */
  static readonly Errors = {
    SESSION_REQUIRED: {
      code: 'SESSION_REQUIRED',
      message: 'Valid game session required',
      statusCode: 401
    },
    SESSION_NOT_FOUND: {
      code: 'SESSION_NOT_FOUND',
      message: 'Session not found',
      statusCode: 404
    },
    INVALID_JSON: {
      code: 'INVALID_JSON',
      message: 'Request body must be valid JSON',
      statusCode: 400
    },
    MISSING_PARAMETERS: (params: string) => ({
      code: 'MISSING_PARAMETERS',
      message: `${params} are required`,
      statusCode: 400
    }),
    SPIN_FAILED: {
      code: 'SPIN_FAILED',
      message: 'Spin execution failed',
      statusCode: 500
    },
    BALANCE_ERROR: {
      code: 'BALANCE_ERROR',
      message: 'Failed to retrieve balance',
      statusCode: 500
    },
    SESSION_CREATION_FAILED: {
      code: 'SESSION_CREATION_FAILED',
      message: 'Failed to create session',
      statusCode: 500
    },
    INTERNAL_ERROR: (message: string = 'Internal server error') => ({
      code: 'INTERNAL_ERROR',
      message,
      statusCode: 500
    })
  };
}