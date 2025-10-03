import { spawn } from 'bun';
import { SpinRequest, SpinResponse, SpinResult, PHPProcessResult, GameError } from './types';

export class PHPCalculator {
  private phpScriptPath: string;
  private timeoutMs: number;

  constructor(phpScriptPath: string, timeoutMs: number = 5000) {
    this.phpScriptPath = phpScriptPath;
    this.timeoutMs = timeoutMs;
  }

  /**
   * Execute PHP calculation script with game data
   */
  public async calculateSpin(request: SpinRequest): Promise<PHPProcessResult> {
    const startTime = Date.now();

    try {
      // Validate request
      this.validateSpinRequest(request);

      // Prepare input data for PHP script
      const inputData = this.marshalRequestData(request);

      // Execute PHP script
      const result = await this.executePHPScript(inputData);

      // Parse and validate response
      const spinResult = this.parsePHPResponse(result);

      const executionTime = Date.now() - startTime;

      return {
        success: true,
        result: spinResult,
        executionTime
      };

    } catch (error) {
      const executionTime = Date.now() - startTime;
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown PHP execution error',
        executionTime
      };
    }
  }

  /**
   * Validate spin request data
   */
  private validateSpinRequest(request: SpinRequest): void {
    if (!request.action || request.action !== 'calculateSpin') {
      throw new Error('Invalid action: must be calculateSpin');
    }

    if (!request.slotEvent || !['bet', 'freespin'].includes(request.slotEvent)) {
      throw new Error('Invalid slotEvent: must be bet or freespin');
    }

    if (!request.lines || request.lines < 1 || request.lines > 100) { // Increased limit to 100
      throw new Error('Invalid lines: must be between 1 and 100');
    }

    if (!request.betLine || request.betLine <= 0) {
      throw new Error('Invalid betLine: must be greater than 0');
    }

    if (!request.linesId || !Array.isArray(request.linesId) || request.linesId.length !== request.lines) {
      throw new Error('Invalid linesId: must be array matching lines count');
    }

    if (!request.gameData) {
      throw new Error('Missing gameData');
    }

    // Validate gameData structure
    const { user, game, shop } = request.gameData;
    if (!user || !game || !shop) {
      throw new Error('Incomplete gameData: missing user, game, or shop');
    }
  }

  /**
   * Marshal request data for PHP input
   */
  private marshalRequestData(request: SpinRequest): string {
    // Convert TypeScript objects to plain objects for JSON serialization
    const marshaledData = {
      action: request.action,
      slotEvent: request.slotEvent,
      lines: request.lines,
      betLine: request.betLine,
      linesId: request.linesId,
      gameData: {
        user: { ...request.gameData.user },
        game: { ...request.gameData.game },
        shop: { ...request.gameData.shop },
        bank: request.gameData.bank,
        jackpots: request.gameData.jackpots?.map(j => ({ ...j })) || [],
        sessionData: request.gameData.sessionData || {},
        staticData: request.gameData.staticData || {}
      }
    };

    return JSON.stringify(marshaledData);
  }

  /**
   * Execute PHP script using Bun spawn
   */
  private async executePHPScript(inputData: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const phpProcess = spawn(['php', this.phpScriptPath], {
        stdin: 'pipe',
        stdout: 'pipe',
        stderr: 'pipe',
        cwd: process.cwd()
      });

      const timeout = setTimeout(() => {
        phpProcess.kill();
        reject(new Error(`PHP execution timeout after ${this.timeoutMs}ms`));
      }, this.timeoutMs);

      try {
        // Write input data to stdin
        phpProcess.stdin.write(inputData);
        phpProcess.stdin.end();

        // Read output and errors using Bun's stream APIs
        const stdout = await new Response(phpProcess.stdout).text();
        const stderr = await new Response(phpProcess.stderr).text();
        
        // Wait for the process to exit and get the exit code
        const exitCode = await phpProcess.exited;
        
        clearTimeout(timeout);

        if (exitCode !== 0) {
          reject(new Error(`PHP process exited with code ${exitCode}: ${stderr}`));
          return;
        }
        
        if (stderr && !stdout) {
          reject(new Error(`PHP stderr: ${stderr}`));
          return;
        }

        resolve(stdout);
      } catch (error) {
          clearTimeout(timeout);
          reject(error);
      }
    });
  }

  /**
   * Parse and validate PHP response
   */
  private parsePHPResponse(responseData: string): SpinResult {
    try {
      const response: SpinResponse = JSON.parse(responseData.trim());

      if (response.status !== 'success') {
        throw new Error(`PHP calculation failed: ${response.message || 'Unknown error'}`);
      }

      if (!response.data) {
        throw new Error('PHP response missing data');
      }

      const data = response.data;

      // Validate required fields
      if (typeof data.totalWin !== 'number') {
        throw new Error('Invalid totalWin in PHP response');
      }

      if (!data.reels || typeof data.reels !== 'object') {
        throw new Error('Invalid reels in PHP response');
      }

      if (!Array.isArray(data.reels.reel1) || !Array.isArray(data.reels.reel2) ||
          !Array.isArray(data.reels.reel3) || !Array.isArray(data.reels.reel4) ||
          !Array.isArray(data.reels.reel5)) {
        throw new Error('Invalid reel arrays in PHP response');
      }

      if (!Array.isArray(data.reels.rp)) {
        throw new Error('Invalid reel positions in PHP response');
      }

      return {
        totalWin: data.totalWin,
        reels: {
          reel1: data.reels.reel1,
          reel2: data.reels.reel2,
          reel3: data.reels.reel3,
          reel4: data.reels.reel4,
          reel5: data.reels.reel5,
          rp: data.reels.rp
        },
        winString: data.winString || '',
        symb: data.symb || '',
        scattersCount: data.scattersCount || 0
      };

    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        throw new Error(`Invalid JSON response from PHP: ${responseData.substring(0, 200)}...`);
      }
      throw parseError;
    }
  }

  /**
   * Update PHP script path
   */
  public setScriptPath(path: string): void {
    this.phpScriptPath = path;
  }

  /**
   * Update execution timeout
   */
  public setTimeout(timeoutMs: number): void {
    this.timeoutMs = timeoutMs;
  }

  /**
   * Test PHP script connectivity
   */
  public async testConnection(): Promise<boolean> {
    try {
      const testRequest: SpinRequest = {
        action: 'calculateSpin',
        slotEvent: 'bet',
        lines: 1,
        betLine: 0.01,
        linesId: [[1, 1, 1, 1, 1]],
        gameData: {
          user: {
            id: 'test',
            balance: 100,
            count_balance: 0,
            address: 0,
            shop_id: 'test',
            username: 'test',
            email: 'test@test.com',
            status: 'active'
          },
          game: {
            id: 'test',
            name: 'test',
            denomination: 1,
            bet: ['0.01'],
            stat_in: 0,
            stat_out: 0,
            bank: 1000,
            shop_id: 'test',
            view: true
          },
          shop: {
            id: 'test',
            name: 'test',
            percent: 95,
            max_win: 10000,
            currency: 'USD',
            is_blocked: false
          },
          bank: 1000,
          jackpots: []
        }
      };

      const result = await this.calculateSpin(testRequest);
      return result.success;
    } catch (error) {
      console.error('PHP connection test failed:', error);
      return false;
    }
  }
}