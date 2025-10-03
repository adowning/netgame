/**
 * Generic PHP Calculator for executing spins across all games
 * Consolidates all game-specific PHP execution logic into a single, reusable class
 */

import { spawn } from 'child_process';
import { config } from '../config';

export interface GameData {
  user: {
    id: string;
    balance: number;
    count_balance: number;
    address: number;
  };
  game: {
    id: string;
    name: string;
    denomination: number;
    rtp: number;
    bet: string[];
    slotBonus: boolean;
    slotWildMpl: number;
    slotFreeMpl: number;
    increaseRTP: number;
  };
  shop: {
    percent: number;
    max_win: number;
  };
  bank: number;
  stat_in: number;
  stat_out: number;
}

export interface SpinData {
  lines: number;
  betLine: number;
  linesId: number;
  totalFreeGames?: number;
  currentFreeGames?: number;
  bonusWin?: number;
  freeStartWin?: number;
}

export interface PHPExecutionResult {
  serverResponse: any;
  winString: string;
  gameState: any;
  scattersCount: number;
  symb: any;
}

export interface ExecutionMetrics {
  executionTime: number;
  phpTime?: number;
}

export class PHPCalculator {
  private gameName: string;
  private scriptPath: string;

  constructor(gameName: string) {
    this.gameName = gameName;
    this.scriptPath = `new/DirectPHPHandler.php`;
  }

  /**
   * Execute a spin using the PHP calculator
   */
  async executeSpin(gameData: GameData, spinData: SpinData): Promise<{
    success: boolean;
    data?: PHPExecutionResult;
    error?: { code: string; message: string; details?: any };
    performance?: ExecutionMetrics;
  }> {
    const startTime = Date.now();

    try {
      // Validate inputs
      if (!this.validateInputs(gameData, spinData)) {
        return {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Invalid game data or spin data provided'
          }
        };
      }

      // Prepare input data for PHP script
      const inputData = {
        gameName: this.gameName,
        gameData,
        spinData
      };

      // Execute PHP process
      const result = await this.executePHPProcess(inputData);

      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: result,
        performance: {
          executionTime,
          phpTime: result.phpTime
        }
      };

    } catch (error) {
      console.error(`PHP execution error for ${this.gameName}:`, error);

      return {
        success: false,
        error: {
          code: 'PHP_EXECUTION_ERROR',
          message: `Failed to execute PHP calculator for ${this.gameName}`,
          details: config.isDevelopment() ? error : undefined
        },
        performance: {
          executionTime: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Execute the PHP process with timeout and error handling
   */
  private async executePHPProcess(inputData: any): Promise<PHPExecutionResult> {
    return new Promise((resolve, reject) => {
      const phpProcess = spawn('php', [this.scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      // Set timeout
      const timeout = setTimeout(() => {
        phpProcess.kill('SIGTERM');
        reject(new Error(`PHP process timeout after ${config.get('php.timeout', 30000)}ms`));
      }, config.get('php.timeout', 30000));

      // Handle stdout
      phpProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      // Handle stderr
      phpProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      // Handle process completion
      phpProcess.on('close', (code) => {
        clearTimeout(timeout);

        if (code !== 0) {
          reject(new Error(`PHP process exited with code ${code}: ${stderr}`));
          return;
        }

        try {
          const result = JSON.parse(stdout.trim());

          // Validate result structure
          if (!this.validateResult(result)) {
            reject(new Error('Invalid PHP result structure'));
            return;
          }

          resolve(result);
        } catch (parseError) {
          reject(new Error(`Failed to parse PHP output: ${parseError.message}`));
        }
      });

      // Handle process errors
      phpProcess.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      // Send input data
      try {
        phpProcess.stdin.write(JSON.stringify(inputData));
        phpProcess.stdin.end();
      } catch (error) {
        clearTimeout(timeout);
        reject(new Error(`Failed to send data to PHP process: ${error.message}`));
      }
    });
  }

  /**
   * Validate input data before sending to PHP
   */
  private validateInputs(gameData: GameData, spinData: SpinData): boolean {
    // Basic validation - can be extended based on requirements
    return !!(
      gameData &&
      gameData.user &&
      gameData.game &&
      spinData &&
      typeof spinData.lines === 'number' &&
      typeof spinData.betLine === 'number'
    );
  }

  /**
   * Validate PHP execution result
   */
  private validateResult(result: any): result is PHPExecutionResult {
    return !!(
      result &&
      result.serverResponse &&
      typeof result.winString === 'string' &&
      result.gameState &&
      typeof result.scattersCount === 'number'
    );
  }

  /**
   * Get health status of PHP calculator
   */
  async getHealthStatus(): Promise<{ available: boolean; lastExecutionTime?: number }> {
    try {
      // Simple health check - try to execute with minimal data
      const testResult = await this.executePHPProcess({
        gameData: {
          user: { id: 'health-check', balance: 1000, count_balance: 0, address: 0 },
          game: { id: 'health-check', name: 'test', denomination: 1, rtp: 95, bet: ['1'], slotBonus: false, slotWildMpl: 1, slotFreeMpl: 1, increaseRTP: 0 },
          shop: { percent: 1, max_win: 1000 },
          bank: 10000,
          stat_in: 0,
          stat_out: 0
        },
        spinData: {
          lines: 20,
          betLine: 0.01,
          linesId: 1
        }
      });

      return {
        available: !!testResult,
        lastExecutionTime: Date.now()
      };
    } catch (error) {
      return { available: false };
    }
  }
}