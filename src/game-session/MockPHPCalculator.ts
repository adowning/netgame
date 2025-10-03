import { PHPCalculator } from './PHPCalculator';
import { SpinRequest, PHPProcessResult, SpinResult } from './types';

/**
 * Mock PHP Calculator for testing TypeScript architecture
 * Returns deterministic, pristine test data that matches expected PHP responses
 */
export class MockPHPCalculator extends PHPCalculator {
  private mockResults: Map<string, SpinResult> = new Map();
  private callCount: number = 0;

  constructor() {
    super(''); // Empty path since we don't use actual PHP
    this.initializeMockResults();
  }

  /**
   * Override calculateSpin to return mock data
   */
  public async calculateSpin(request: SpinRequest): Promise<PHPProcessResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 10));

    this.callCount++;

    try {
      // Validate request (reuse parent validation)
      this.validateSpinRequest(request);

      // Generate mock result based on request
      const mockResult = this.generateMockResult(request);

      return {
        success: true,
        result: mockResult,
        executionTime: 10
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Mock calculation failed',
        executionTime: 10
      };
    }
  }

  /**
   * Generate deterministic mock spin result
   */
  private generateMockResult(request: SpinRequest): SpinResult {
    const { slotEvent, betLine, lines } = request;

    // Use deterministic seed based on call count for reproducible results
    const seed = this.callCount % 100;

    // Generate reels with some variety but deterministic
    const reels = this.generateDeterministicReels(seed);

    // Calculate wins based on reels
    const { totalWin, scattersCount, winString } = this.calculateMockWins(reels, betLine, lines, seed);

    // Format symbol string for client
    const symb = this.formatSymbolString(reels);

    return {
      totalWin,
      reels,
      winString,
      symb,
      scattersCount
    };
  }

  /**
   * Generate deterministic reel results
   */
  private generateDeterministicReels(seed: number): SpinResult['reels'] {
    // Predefined reel strips (simplified)
    const reelStrips = [
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Reel 1
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Reel 2
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Reel 3
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Reel 4
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']  // Reel 5
    ];

    const reels: SpinResult['reels'] = {
      reel1: [],
      reel2: [],
      reel3: [],
      reel4: [],
      reel5: [],
      rp: []
    };

    // Generate positions with some determinism
    for (let i = 0; i < 5; i++) {
      const strip = reelStrips[i];
      const stripLength = strip.length;
      const pos = (seed + i * 7) % (stripLength - 2); // Ensure valid position

      reels[`reel${i + 1}` as keyof typeof reels] = [
        strip[pos],
        strip[(pos + 1) % stripLength],
        strip[(pos + 2) % stripLength]
      ];
      (reels.rp as number[]).push(pos);
    }

    return reels;
  }

  /**
   * Calculate mock wins based on reel positions
   */
  private calculateMockWins(
    reels: SpinResult['reels'],
    betLine: number,
    lines: number,
    seed: number
  ): { totalWin: number; scattersCount: number; winString: string } {
    let totalWin = 0;
    let scattersCount = 0;
    let winString = '';

    // Count scatters (symbol '9')
    for (let r = 1; r <= 5; r++) {
      const reel = reels[`reel${r}` as keyof typeof reels] as string[];
      for (const symbol of reel) {
        if (symbol === '9') scattersCount++;
      }
    }

    // Generate wins based on seed (deterministic but varied)
    if (seed % 10 === 0) {
      // Big win every 10th call
      totalWin = betLine * lines * 50;
      winString = ',"slotWin":{"totalWin":"' + totalWin + '","lineWinAmounts":[],"canGamble":"false"}';
    } else if (seed % 5 === 0) {
      // Medium win every 5th call
      totalWin = betLine * lines * 10;
      winString = ',"slotWin":{"totalWin":"' + totalWin + '","lineWinAmounts":[],"canGamble":"false"}';
    } else if (seed % 3 === 0) {
      // Small win
      totalWin = betLine * lines * 2;
      winString = ',"slotWin":{"totalWin":"' + totalWin + '","lineWinAmounts":[],"canGamble":"false"}';
    } else if (scattersCount >= 3) {
      // Scatter win triggers bonus
      totalWin = betLine * lines * 5;
      winString = ',"slotWin":{"totalWin":"' + totalWin + '","lineWinAmounts":[{"type":"Bonus","bonusName":"PickBonus","params":{"fields":"25","freeSpins":"8"},"amount":"' + totalWin + '","wonSymbols":[]}],"canGamble":"false"}';
    }
    // else: no win (totalWin = 0, winString = '')

    return { totalWin, scattersCount, winString };
  }

  /**
   * Format symbol string for client compatibility
   */
  private formatSymbolString(reels: SpinResult['reels']): string {
    const symbols = [];
    for (let row = 0; row < 3; row++) {
      const rowSymbols = [];
      for (let reel = 1; reel <= 5; reel++) {
        const reelSymbols = reels[`reel${reel}` as keyof typeof reels] as string[];
        rowSymbols.push(reelSymbols[row]);
      }
      symbols.push('["' + rowSymbols.join('","') + '"]');
    }
    return symbols.join(',');
  }

  /**
   * Override test connection to always succeed
   */
  public async testConnection(): Promise<boolean> {
    return true;
  }

  /**
   * Get call count for testing
   */
  public getCallCount(): number {
    return this.callCount;
  }

  /**
   * Reset call count
   */
  public resetCallCount(): void {
    this.callCount = 0;
  }

  /**
   * Initialize predefined mock results for specific test cases
   */
  private initializeMockResults(): void {
    // Can add specific test cases here if needed
  }
}