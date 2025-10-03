import { User, BalanceOperation, GameData, RTPConfig } from './types';

export class BalanceManager {
  private user: User;
  private gameData: GameData;
  private rtpConfig: RTPConfig;

  constructor(user: User, gameData: GameData, rtpConfig: RTPConfig) {
    this.user = user;
    this.gameData = gameData;
    this.rtpConfig = rtpConfig;
  }

  /**
   * Calculate RTP percentage based on balance levels
   * Implements the complex logic from SlotSettings.php lines 285-292
   */
  public calculateRTP(): number {
    const { count_balance, address } = this.user;
    const { percent } = this.gameData.shop;

    // Address field fallback logic
    if (address > 0 && count_balance === 0) {
      return 0; // jpgPercentZero = true
    } else if (count_balance === 0) {
      return 100; // Maximum RTP when no count_balance
    }

    return percent; // Normal shop percentage
  }

  /**
   * Validate if user can afford the bet
   * Implements balance checking logic from Server.php
   */
  public canAffordBet(betAmount: number, lines: number): boolean {
    const totalBet = betAmount * lines;
    const { balance, count_balance } = this.user;

    // Convert to game denomination
    const totalBetDenom = totalBet * this.gameData.game.denomination;

    return balance >= totalBetDenom;
  }

  /**
   * Deduct bet from user balance with count_balance logic
   * Implements the complex SetBalance logic from SlotSettings.php lines 710-791
   */
  public deductBet(betAmount: number, lines: number, event: string = 'bet'): BalanceOperation {
    const totalBet = betAmount * lines;
    const totalBetDenom = totalBet * this.gameData.game.denomination;

    if (!this.canAffordBet(betAmount, lines)) {
      throw new Error('Insufficient balance for bet');
    }

    const previousBalance = this.user.balance;
    const previousCountBalance = this.user.count_balance;
    const previousAddress = this.user.address;

    let newBalance = previousBalance;
    let newCountBalance = previousCountBalance;
    let newAddress = previousAddress;
    let betRemains = 0;
    let betRemains0 = 0;

    // Complex count_balance deduction logic
    if (event === 'bet') {
      if (this.user.count_balance === 0) {
        // Use address field when count_balance is 0
        const betAmountDenom = totalBetDenom;
        if (this.user.address < betAmountDenom && this.user.address > 0) {
          newAddress = 0;
          betRemains = betAmountDenom - this.user.address;
        } else if (this.user.address > 0) {
          newAddress -= betAmountDenom;
        }
      } else if (this.user.count_balance > 0 && this.user.count_balance < totalBetDenom) {
        // Partial deduction from count_balance, remainder from address
        const remainingBet = totalBetDenom - this.user.count_balance;
        newCountBalance = 0;

        if (this.user.address > 0) {
          if (this.user.address < remainingBet) {
            newAddress = 0;
            betRemains0 = remainingBet - this.user.address;
          } else {
            newAddress -= remainingBet;
          }
        } else {
          betRemains0 = remainingBet;
        }
      } else if (this.user.count_balance >= totalBetDenom) {
        // Full deduction from count_balance
        newCountBalance -= totalBetDenom;
      }

      // Update main balance
      newBalance -= totalBetDenom;
    }

    // Update user object
    this.user.balance = Math.max(0, newBalance);
    this.user.count_balance = Math.max(0, newCountBalance);
    this.user.address = Math.max(0, newAddress);

    return {
      type: 'bet',
      amount: -totalBetDenom,
      event,
      timestamp: new Date(),
      previousBalance,
      newBalance: this.user.balance,
      countBalanceChange: newCountBalance - previousCountBalance,
      addressChange: newAddress - previousAddress
    };
  }

  /**
   * Add winnings to user balance
   * Implements win balance updates
   */
  public addWin(winAmount: number, event: string = 'win'): BalanceOperation {
    const winAmountDenom = winAmount * this.gameData.game.denomination;
    const previousBalance = this.user.balance;

    this.user.balance += winAmountDenom;

    return {
      type: 'win',
      amount: winAmountDenom,
      event,
      timestamp: new Date(),
      previousBalance,
      newBalance: this.user.balance
    };
  }

  /**
   * Add jackpot winnings
   */
  public addJackpotWin(amount: number, jackpotId: string): BalanceOperation {
    const amountDenom = amount * this.gameData.game.denomination;
    const previousBalance = this.user.balance;

    this.user.balance += amountDenom;

    return {
      type: 'jackpot',
      amount: amountDenom,
      event: `jackpot_${jackpotId}`,
      timestamp: new Date(),
      previousBalance,
      newBalance: this.user.balance
    };
  }

  /**
   * Get current balance in game denomination
   */
  public getBalance(): number {
    return this.user.balance / this.gameData.game.denomination;
  }

  /**
   * Get current count_balance in game denomination
   */
  public getCountBalance(): number {
    return this.user.count_balance / this.gameData.game.denomination;
  }

  /**
   * Get current address balance
   */
  public getAddress(): number {
    return this.user.address;
  }

  /**
   * Update user object reference
   */
  public updateUser(user: User): void {
    this.user = user;
  }

  /**
   * Get RTP configuration
   */
  public getRTPConfig(): RTPConfig {
    return this.rtpConfig;
  }

  /**
   * Check if user has sufficient balance for gameplay
   */
  public hasMinimumBalance(minimumBet: number): boolean {
    return this.getBalance() >= minimumBet;
  }

  /**
   * Format balance to proper decimal places
   */
  public formatBalance(amount: number): number {
    return Math.floor(amount * 100) / 100;
  }
}