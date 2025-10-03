// Main exports for the Game Session architecture
export { GameSession, GameError } from './GameSession';
export { GameSessionManager } from './GameSessionManager';
export { BalanceManager } from './BalanceManager';
export { PHPCalculator } from './PHPCalculator';
export { MockPHPCalculator } from './MockPHPCalculator';

// Type exports
export type {
  // Core data types
  User,
  Game,
  Shop,
  Jackpot,
  GameData,

  // Spin types
  SpinRequest,
  SpinResponse,
  SpinResult,

  // Game state types
  GameState,
  SessionEvent,
  SpinHistory,
  BalanceOperation,

  // Configuration types
  RTPConfig,
  GameConfig,

  // Error and session types
  GameError as GameErrorType,
  SessionData,

  // PHP integration types
  PHPProcessResult,

  // Manager config
  SessionManagerConfig
} from './types';

// Default RTP configuration
export const DEFAULT_RTP_CONFIG: RTPConfig = {
  basePercent: 95,
  countBalanceThreshold: 0,
  addressThreshold: 0,
  adjustmentFactors: {
    lowBalance: 100,
    highBalance: 95,
    bonusGames: 100
  }
};

// Default session manager configuration
export const DEFAULT_SESSION_CONFIG = {
  maxSessionsPerUser: 5,
  sessionTimeoutMs: 30 * 60 * 1000, // 30 minutes
  cleanupIntervalMs: 5 * 60 * 1000, // 5 minutes
  persistenceEnabled: true
};