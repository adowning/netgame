import { BalanceManager } from './BalanceManager';
import { PHPCalculator } from './PHPCalculator';
import {
  GameData,
  GameState,
  SessionEvent,
  SpinHistory,
  BalanceOperation,
  SpinRequest,
  SpinResult,
  RTPConfig,
  GameError
} from './types';

export class GameSession {
  private sessionId: string;
  private userId: string;
  private gameId: string;
  private balanceManager: BalanceManager;
  private phpCalculator: PHPCalculator;
  private gameState: GameState;
  private events: SessionEvent[];
  private spinHistory: SpinHistory[];
  private balanceOperations: BalanceOperation[];
  private lastActivity: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private isActive: boolean;

  constructor(
    sessionId: string,
    userId: string,
    gameId: string,
    gameData: GameData,
    phpCalculator: PHPCalculator,
    rtpConfig: RTPConfig
  ) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.gameId = gameId;
    this.balanceManager = new BalanceManager(gameData.user, gameData, rtpConfig);
    this.phpCalculator = phpCalculator;

    // Initialize game state
    this.gameState = {
      bonusWin: 0,
      freeGames: 0,
      currentFreeGame: 0,
      bonusSymbol: -1,
      totalWin: 0,
      freeBalance: 0,
      freeStartWin: 0
    };

    this.events = [];
    this.spinHistory = [];
    this.balanceOperations = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.lastActivity = new Date();
    this.isActive = true;

    this.logEvent('session_created', { sessionId, userId, gameId });
  }

  /**
   * Execute a spin with balance management and PHP calculation
   */
  public async executeSpin(
    slotEvent: 'bet' | 'freespin',
    betLine: number,
    lines: number,
    linesId: number[][]
  ): Promise<SpinResult> {
    try {
      this.validateSpinRequest(betLine, lines, linesId);

      // Handle balance deduction for regular bets
      let balanceOperation: BalanceOperation | null = null;
      if (slotEvent === 'bet') {
        if (!this.balanceManager.canAffordBet(betLine, lines)) {
          throw new GameError('INSUFFICIENT_BALANCE', 'Not enough balance for this bet');
        }

        balanceOperation = this.balanceManager.deductBet(betLine, lines, slotEvent);
        this.balanceOperations.push(balanceOperation);
        this.logEvent('balance_deducted', balanceOperation);
      }

      // Prepare spin request for PHP calculator
      const spinRequest: SpinRequest = {
        action: 'calculateSpin',
        slotEvent,
        lines,
        betLine,
        linesId,
        gameData: this.getGameData()
      };

      // Execute PHP calculation
      const phpResult = await this.phpCalculator.calculateSpin(spinRequest);

      if (!phpResult.success || !phpResult.result) {
        // Refund bet if PHP calculation failed
        if (balanceOperation) {
          const refundOperation = this.balanceManager.addWin(
            Math.abs(balanceOperation.amount) / this.getGameData().game.denomination,
            'refund'
          );
          this.balanceOperations.push(refundOperation);
          this.logEvent('balance_refunded', refundOperation);
        }
        throw new GameError('PHP_CALCULATION_FAILED', phpResult.error || 'PHP calculation failed');
      }

      const spinResult = phpResult.result;

      // Handle winnings
      if (spinResult.totalWin > 0) {
        const winOperation = this.balanceManager.addWin(spinResult.totalWin, 'win');
        this.balanceOperations.push(winOperation);
        this.logEvent('balance_win', winOperation);
      }

      // Update game state
      this.updateGameState(spinResult, slotEvent);

      // Record spin history
      this.recordSpinHistory(spinResult, betLine, lines, slotEvent);

      // Update activity timestamp
      this.lastActivity = new Date();
      this.updatedAt = new Date();

      this.logEvent('spin_completed', {
        slotEvent,
        betLine,
        lines,
        totalWin: spinResult.totalWin,
        scattersCount: spinResult.scattersCount
      });

      return spinResult;

    } catch (error) {
      this.logEvent('spin_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        slotEvent,
        betLine,
        lines
      });
      throw error;
    }
  }

  /**
   * Validate spin request parameters
   */
  private validateSpinRequest(betLine: number, lines: number, linesId: number[][]): void {
    if (betLine <= 0) {
      throw new GameError('INVALID_BET', 'Bet amount must be greater than 0');
    }

    if (lines < 1 || lines > 30) {
      throw new GameError('INVALID_LINES', 'Lines must be between 1 and 30');
    }

    if (!linesId || linesId.length !== lines) {
      throw new GameError('INVALID_LINE_CONFIG', 'LinesId array must match lines count');
    }

    // Validate line configurations
    for (const line of linesId) {
      if (line.length !== 5) {
        throw new GameError('INVALID_LINE_CONFIG', 'Each line must have 5 positions');
      }
      for (const pos of line) {
        if (pos < 1 || pos > 3) {
          throw new GameError('INVALID_LINE_CONFIG', 'Line positions must be 1-3');
        }
      }
    }
  }

  /**
   * Update game state based on spin results
   */
  private updateGameState(spinResult: SpinResult, slotEvent: string): void {
    if (slotEvent === 'freespin') {
      this.gameState.currentFreeGame++;
      this.gameState.bonusWin += spinResult.totalWin;
      this.gameState.totalWin += spinResult.totalWin;
    } else {
      this.gameState.totalWin = spinResult.totalWin;
    }

    // Handle bonus game triggers
    if (spinResult.scattersCount >= 3) {
      this.gameState.freeGames = (this.gameState.freeGames || 0) + 8; // Default free spin count
      this.gameState.freeStartWin = spinResult.totalWin;
      this.gameState.bonusWin = spinResult.totalWin;
      this.gameState.picks = 3;
      this.gameState.bonusState = 2;
      this.gameState.selectedItems = [];
      this.gameState.items = [];
    }

    // Check if free games are completed
    if (this.gameState.currentFreeGame >= this.gameState.freeGames && this.gameState.freeGames > 0) {
      this.gameState.freeGames = 0;
      this.gameState.currentFreeGame = 0;
    }
  }

  /**
   * Record spin in history
   */
  private recordSpinHistory(
    spinResult: SpinResult,
    betLine: number,
    lines: number,
    slotEvent: string
  ): void {
    const historyEntry: SpinHistory = {
      id: this.generateId(),
      timestamp: new Date(),
      bet: betLine * lines,
      lines,
      win: spinResult.totalWin,
      reels: [
        spinResult.reels.reel1,
        spinResult.reels.reel2,
        spinResult.reels.reel3,
        spinResult.reels.reel4,
        spinResult.reels.reel5
      ],
      winLines: [], // Would be parsed from winString
      scattersCount: spinResult.scattersCount,
      bonusTriggered: spinResult.scattersCount >= 3
    };

    this.spinHistory.push(historyEntry);

    // Keep only last 50 spins
    if (this.spinHistory.length > 50) {
      this.spinHistory = this.spinHistory.slice(-50);
    }
  }

  /**
   * Get current game data for PHP calculator
   */
  private getGameData(): GameData {
    // Get updated user from balance manager
    const updatedUser = { ...this.gameData.user };
    // Update with current balance values
    updatedUser.balance = this.balanceManager.getBalance() * this.gameData.game.denomination;
    updatedUser.count_balance = this.balanceManager.getCountBalance() * this.gameData.game.denomination;
    updatedUser.address = this.balanceManager.getAddress();

    return {
      user: updatedUser,
      game: { ...this.gameData.game },
      shop: { ...this.gameData.shop },
      bank: this.gameData.bank || 1000,
      jackpots: this.gameData.jackpots || [],
      sessionData: this.serializeGameState(),
      staticData: this.gameData.staticData || {}
    };
  }

  /**
   * Serialize current game state
   */
  private serializeGameState(): Record<string, any> {
    return { ...this.gameState };
  }

  /**
   * Log session event
   */
  private logEvent(type: string, data: Record<string, any>): void {
    const event: SessionEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      type: type as any,
      data
    };

    this.events.push(event);

    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${this.sessionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get current balance
   */
  public getBalance(): number {
    return this.balanceManager.getBalance();
  }

  /**
   * Get current game state
   */
  public getGameState(): GameState {
    return { ...this.gameState };
  }

  /**
   * Get spin history
   */
  public getSpinHistory(limit?: number): SpinHistory[] {
    const history = [...this.spinHistory];
    return limit ? history.slice(-limit) : history;
  }

  /**
   * Get session events
   */
  public getEvents(limit?: number): SessionEvent[] {
    const events = [...this.events];
    return limit ? events.slice(-limit) : events;
  }

  /**
   * Check if session is active
   */
  public isSessionActive(): boolean {
    return this.isActive;
  }

  /**
   * End session
   */
  public endSession(): void {
    this.isActive = false;
    this.logEvent('session_ended', { sessionId: this.sessionId });
  }

  /**
   * Get session data for persistence
   */
  public getSessionData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      gameId: this.gameId,
      state: this.gameState,
      events: this.events,
      spinHistory: this.spinHistory,
      balanceOperations: this.balanceOperations,
      lastActivity: this.lastActivity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Get RTP percentage
   */
  public getRTP(): number {
    return this.balanceManager.calculateRTP();
  }
}

// Custom error class
export class GameError extends Error {
  public code: string;
  public details?: Record<string, any>;

  constructor(code: string, message: string, details?: Record<string, any>) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'GameError';
  }
}