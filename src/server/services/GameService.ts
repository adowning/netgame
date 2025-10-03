import { GameSession, GameError } from '../../game-session/GameSession';
import { PHPCalculator, GameData, SpinData } from './PHPCalculator';
import { BalanceManager } from '../../game-session/BalanceManager';
import { GameSessionManager } from '../../game-session/GameSessionManager';
import { config } from '../config';

export interface GameServiceOptions {
  phpCalculator?: PHPCalculator;
  balanceManager?: BalanceManager;
  sessionManager?: GameSessionManager;
}

export interface SpinRequestData {
  lines: number;
  betLine: number;
  linesId: number[][];
  slotEvent?: 'bet' | 'freespin';
}

export interface GameServiceResponse {
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  performance?: {
    executionTime: number;
    phpTime: number;
  };
}

export class GameService {
  private phpCalculators: Map<string, PHPCalculator> = new Map();
  private balanceManager: BalanceManager;
  private sessionManager: GameSessionManager;

  constructor(options: GameServiceOptions = {}) {
    this.balanceManager = options.balanceManager || new BalanceManager();
    this.sessionManager = options.sessionManager || new GameSessionManager(this.phpCalculator);
  }

  /**
   * Get or create a PHP calculator for a specific game
   */
  private getPHPCalculator(gameName: string): PHPCalculator {
    if (!this.phpCalculators.has(gameName)) {
      this.phpCalculators.set(gameName, new PHPCalculator(gameName));
    }
    return this.phpCalculators.get(gameName)!;
  }

  /**
   * Execute a spin request for a game session
   */
  public async executeSpin(
    session: GameSession,
    spinData: SpinRequestData
  ): Promise<GameServiceResponse> {
    const startTime = Date.now();

    try {
      // Validate session and spin data
      this.validateSpinRequest(session, spinData);

      // Get game data from session
      const gameData = session.getGameData();

      // Calculate total bet
      const totalBet = spinData.lines * spinData.betLine;

      // Check balance before spin
      if (gameData.user.balance < totalBet) {
        throw new GameError('INSUFFICIENT_BALANCE', 'Insufficient balance for spin');
      }

      // Prepare spin request for PHP calculator
      const spinRequest: SpinRequest = {
        action: 'calculateSpin',
        slotEvent: spinData.slotEvent || 'bet',
        lines: spinData.lines,
        betLine: spinData.betLine,
        linesId: spinData.linesId,
        gameData: gameData
      };

      // Execute PHP calculation
      const phpResult = await this.phpCalculator.calculateSpin(spinRequest);

      if (!phpResult.success) {
        throw new GameError('PHP_CALCULATION_FAILED', phpResult.error || 'PHP calculation failed');
      }

      // Process spin result
      const result = await this.processSpinResult(session, phpResult.result!, totalBet);

      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: result,
        performance: {
          executionTime,
          phpTime: phpResult.executionTime
        }
      };

    } catch (error) {
      const executionTime = Date.now() - startTime;

      console.error('Game service spin execution error:', error);

      return {
        success: false,
        error: {
          code: error instanceof GameError ? error.code : 'SPIN_EXECUTION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown spin execution error',
          details: config.isDevelopment() ? error : undefined
        },
        performance: {
          executionTime,
          phpTime: 0
        }
      };
    }
  }

  /**
   * Get user balance for a session
   */
  public async getBalance(session: GameSession): Promise<GameServiceResponse> {
    try {
      const gameData = session.getGameData();

      return {
        success: true,
        data: {
          balance: gameData.user.balance,
          count_balance: gameData.user.count_balance,
          address: gameData.user.address
        }
      };

    } catch (error) {
      console.error('Game service balance query error:', error);

      return {
        success: false,
        error: {
          code: 'BALANCE_QUERY_ERROR',
          message: error instanceof Error ? error.message : 'Failed to retrieve balance'
        }
      };
    }
  }

  /**
   * Create or load a game session
   */
  public async createSession(
    userId: string,
    gameId: string,
    gameData: GameData
  ): Promise<GameServiceResponse> {
    try {
      // Create default RTP config
      const rtpConfig: RTPConfig = {
        basePercent: gameData.shop.percent,
        countBalanceThreshold: 0,
        addressThreshold: 0,
        adjustmentFactors: {
          lowBalance: 1.0,
          highBalance: 1.0,
          bonusGames: 1.0
        }
      };

      // Create session through session manager
      const session = await this.sessionManager.createSession(userId, gameId, gameData, rtpConfig);

      return {
        success: true,
        data: {
          sessionId: session.getSessionId(),
          userId: session.getUserId(),
          gameId: session.getGameId(),
          createdAt: session.getCreatedAt()
        }
      };

    } catch (error) {
      console.error('Game service session creation error:', error);

      return {
        success: false,
        error: {
          code: error instanceof GameError ? error.code : 'SESSION_CREATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create session'
        }
      };
    }
  }

  /**
   * Validate spin request data
   */
  private validateSpinRequest(session: GameSession, spinData: SpinRequestData): void {
    if (!spinData.lines || spinData.lines < 1 || spinData.lines > 30) {
      throw new GameError('INVALID_LINES', 'Lines must be between 1 and 30');
    }

    if (!spinData.betLine || spinData.betLine <= 0) {
      throw new GameError('INVALID_BET', 'Bet per line must be greater than 0');
    }

    if (!spinData.linesId || !Array.isArray(spinData.linesId) || spinData.linesId.length !== spinData.lines) {
      throw new GameError('INVALID_LINE_IDS', 'Line IDs must match the number of lines');
    }

    if (spinData.slotEvent && !['bet', 'freespin'].includes(spinData.slotEvent)) {
      throw new GameError('INVALID_SLOT_EVENT', 'Slot event must be bet or freespin');
    }

    // Validate that session is active
    if (!session.isSessionActive()) {
      throw new GameError('SESSION_INACTIVE', 'Game session is not active');
    }
  }

  /**
   * Process the result from PHP calculation and update session/balance
   */
  private async processSpinResult(
    session: GameSession,
    spinResult: SpinResult,
    totalBet: number
  ): Promise<any> {
    try {
      const gameData = session.getGameData();

      // Calculate net win/loss
      const netResult = spinResult.totalWin - totalBet;

      // Update balance through balance manager
      await this.balanceManager.updateBalance(
        gameData.user.id,
        netResult,
        spinResult.totalWin > 0 ? 'win' : 'bet'
      );

      // Update session with spin result
      session.recordSpin({
        bet: totalBet,
        win: spinResult.totalWin,
        reels: [
          spinResult.reels.reel1,
          spinResult.reels.reel2,
          spinResult.reels.reel3,
          spinResult.reels.reel4,
          spinResult.reels.reel5
        ],
        winLines: [], // TODO: Parse win lines from PHP result
        scattersCount: spinResult.scattersCount,
        bonusTriggered: false // TODO: Determine from result
      });

      // Prepare response data matching original serverResponse format
      const responseData = {
        BonusSymbol: -1, // TODO: Extract from result
        slotLines: spinData.lines,
        slotBet: spinData.betLine,
        totalFreeGames: 0, // TODO: Extract from result
        currentFreeGames: 0, // TODO: Extract from result
        Balance: gameData.user.balance + netResult, // Updated balance
        afterBalance: gameData.user.balance + netResult,
        bonusWin: 0, // TODO: Extract from result
        freeStartWin: 0, // TODO: Extract from result
        totalWin: spinResult.totalWin,
        winLines: [], // TODO: Parse from result
        bonusInfo: [], // TODO: Extract from result
        Jackpots: [], // TODO: Extract from result
        reelsSymbols: {
          reel1: spinResult.reels.reel1,
          reel2: spinResult.reels.reel2,
          reel3: spinResult.reels.reel3,
          reel4: spinResult.reels.reel4,
          reel5: spinResult.reels.reel5,
          rp: spinResult.reels.rp
        }
      };

      return responseData;

    } catch (error) {
      console.error('Error processing spin result:', error);
      throw new GameError('RESULT_PROCESSING_ERROR', 'Failed to process spin result');
    }
  }

  /**
   * Update PHP calculator script path for a specific game
   */
  public setGameScriptPath(gameName: string): void {
    const scriptPath = config.getPHPScriptPath(gameName);
    this.phpCalculator.setScriptPath(scriptPath);
  }

  /**
   * Test PHP calculator connectivity for a game
   */
  public async testGameConnection(gameName: string): Promise<boolean> {
    try {
      this.setGameScriptPath(gameName);
      return await this.phpCalculator.testConnection();
    } catch (error) {
      console.error(`PHP connection test failed for ${gameName}:`, error);
      return false;
    }
  }

  /**
   * Get service health status
   */
  public getHealthStatus(): {
    phpCalculator: boolean;
    balanceManager: boolean;
    config: boolean;
  } {
    return {
      phpCalculator: true, // TODO: Implement actual health check
      balanceManager: true, // TODO: Implement actual health check
      config: config.validateConfig().valid
    };
  }
}