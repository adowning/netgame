import { RTPConfig } from '../../game-session/types';

export interface ServerConfig {
  // Server settings
  port: number;
  host: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };

  // PHP Calculator settings
  php: {
    scriptPath: string;
    timeoutMs: number;
    maxConcurrentProcesses: number;
  };

  // Session management
  session: {
    maxSessionsPerUser: number;
    sessionTimeoutMs: number;
    cleanupIntervalMs: number;
    persistenceEnabled: boolean;
  };

  // Database settings (placeholder for future implementation)
  database?: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };

  // RTP configuration
  rtp: RTPConfig;

  // Logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableRequestLogging: boolean;
    enablePerformanceLogging: boolean;
  };

  // Environment
  environment: 'development' | 'staging' | 'production';
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: ServerConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): ServerConfig {
    const env = process.env.NODE_ENV || 'development';

    // Base configuration
    const baseConfig: ServerConfig = {
      port: parseInt(process.env.PORT || '3000'),
      host: process.env.HOST || '0.0.0.0',
      cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
        credentials: true
      },
      php: {
        scriptPath: process.env.PHP_SCRIPT_PATH || './new',
        timeoutMs: parseInt(process.env.PHP_TIMEOUT_MS || '5000'),
        maxConcurrentProcesses: parseInt(process.env.PHP_MAX_CONCURRENT || '10')
      },
      session: {
        maxSessionsPerUser: parseInt(process.env.MAX_SESSIONS_PER_USER || '5'),
        sessionTimeoutMs: parseInt(process.env.SESSION_TIMEOUT_MS || '1800000'), // 30 minutes
        cleanupIntervalMs: parseInt(process.env.SESSION_CLEANUP_INTERVAL_MS || '300000'), // 5 minutes
        persistenceEnabled: process.env.SESSION_PERSISTENCE_ENABLED === 'true'
      },
      rtp: {
        basePercent: parseFloat(process.env.RTP_BASE_PERCENT || '95'),
        countBalanceThreshold: parseFloat(process.env.RTP_COUNT_BALANCE_THRESHOLD || '1000'),
        addressThreshold: parseFloat(process.env.RTP_ADDRESS_THRESHOLD || '5000'),
        adjustmentFactors: {
          lowBalance: parseFloat(process.env.RTP_LOW_BALANCE_FACTOR || '1.05'),
          highBalance: parseFloat(process.env.RTP_HIGH_BALANCE_FACTOR || '0.95'),
          bonusGames: parseFloat(process.env.RTP_BONUS_GAMES_FACTOR || '1.02')
        }
      },
      logging: {
        level: (process.env.LOG_LEVEL as ServerConfig['logging']['level']) || 'info',
        enableRequestLogging: process.env.REQUEST_LOGGING !== 'false',
        enablePerformanceLogging: process.env.PERFORMANCE_LOGGING === 'true'
      },
      environment: env as ServerConfig['environment']
    };

    // Environment-specific overrides
    if (env === 'production') {
      return {
        ...baseConfig,
        cors: {
          origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['https://yourgame.com'],
          credentials: true
        },
        logging: {
          ...baseConfig.logging,
          level: 'warn',
          enablePerformanceLogging: true
        },
        session: {
          ...baseConfig.session,
          persistenceEnabled: true
        }
      };
    }

    if (env === 'staging') {
      return {
        ...baseConfig,
        cors: {
          origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['https://staging.yourgame.com'],
          credentials: true
        },
        logging: {
          ...baseConfig.logging,
          level: 'debug',
          enablePerformanceLogging: true
        }
      };
    }

    // Development defaults
    return baseConfig;
  }

  public getConfig(): ServerConfig {
    return { ...this.config };
  }

  public get<K extends keyof ServerConfig>(key: K): ServerConfig[K] {
    return this.config[key];
  }

  public updateConfig(updates: Partial<ServerConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public isDevelopment(): boolean {
    return this.config.environment === 'development';
  }

  public isProduction(): boolean {
    return this.config.environment === 'production';
  }

  public getPHPScriptPath(gameName: string): string {
    return `${this.config.php.scriptPath}/${gameName}/DirectPHPHandler.php`;
  }

  public validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.config.port < 1 || this.config.port > 65535) {
      errors.push('Port must be between 1 and 65535');
    }

    if (this.config.php.timeoutMs < 1000) {
      errors.push('PHP timeout must be at least 1000ms');
    }

    if (this.config.session.sessionTimeoutMs < 60000) {
      errors.push('Session timeout must be at least 60000ms (1 minute)');
    }

    if (this.config.rtp.basePercent < 0 || this.config.rtp.basePercent > 100) {
      errors.push('RTP base percent must be between 0 and 100');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const config = ConfigManager.getInstance();