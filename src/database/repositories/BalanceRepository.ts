import { DatabaseManager } from '../connection';
import {
  IBalanceRepository,
  DatabaseUserBalance,
  DatabaseTransaction,
  OptimisticLockError,
  DatabaseError
} from '../types';

export class BalanceRepository implements IBalanceRepository {
  private generateId(): string {
    return `bal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async findByUserId(userId: string): Promise<DatabaseUserBalance | null> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseUserBalance>(`
        SELECT id, user_id, balance, count_balance, address, last_updated, version
        FROM user_balances
        WHERE user_id = $1
      `, [userId]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await connection.release();
    }
  }

  async create(balance: Omit<DatabaseUserBalance, 'id' | 'last_updated' | 'version'>): Promise<DatabaseUserBalance> {
    const id = this.generateId();
    const now = new Date();

    const newBalance: DatabaseUserBalance = {
      ...balance,
      id,
      last_updated: now,
      version: 1
    };

    const connection = await DatabaseManager.getConnection();
    try {
      await connection.query(`
        INSERT INTO user_balances (id, user_id, balance, count_balance, address, last_updated, version)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        newBalance.id,
        newBalance.user_id,
        newBalance.balance,
        newBalance.count_balance,
        newBalance.address,
        newBalance.last_updated,
        newBalance.version
      ]);

      return newBalance;
    } finally {
      await connection.release();
    }
  }

  async updateBalance(
    userId: string,
    updates: Partial<Pick<DatabaseUserBalance, 'balance' | 'count_balance' | 'address'>>,
    version: number
  ): Promise<DatabaseUserBalance> {
    const now = new Date();

    await DatabaseManager.withTransaction(async (connection) => {
      // Check version for optimistic locking
      const currentResult = await connection.query<{ version: number }>(
        'SELECT version FROM user_balances WHERE user_id = $1',
        [userId]
      );

      if (currentResult.rows.length === 0) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `Balance for user ${userId} not found`);
      }

      if (currentResult.rows[0].version !== version) {
        throw new OptimisticLockError('user_balance', userId);
      }

      // Update balance
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          updateFields.push(`${key} = $${paramIndex++}`);
          updateValues.push(value);
        }
      });

      updateFields.push(`last_updated = $${paramIndex++}`);
      updateValues.push(now);
      updateFields.push(`version = $${paramIndex++}`);
      updateValues.push(version + 1);

      updateValues.push(userId); // WHERE clause

      if (updateFields.length > 2) { // More than just last_updated and version
        await connection.query(`
          UPDATE user_balances
          SET ${updateFields.join(', ')}
          WHERE user_id = $${paramIndex}
        `, updateValues);
      }
    });

    // Return updated balance
    const updated = await this.findByUserId(userId);
    if (!updated) {
      throw new DatabaseError('BALANCE_UPDATE_FAILED', 'Failed to retrieve updated balance');
    }

    return updated;
  }

  async addTransaction(transaction: Omit<DatabaseTransaction, 'id' | 'timestamp'>): Promise<DatabaseTransaction> {
    const id = this.generateTransactionId();
    const now = new Date();

    const newTransaction: DatabaseTransaction = {
      ...transaction,
      id,
      timestamp: now
    };

    const connection = await DatabaseManager.getConnection();
    try {
      await connection.query(`
        INSERT INTO balance_transactions (
          id, user_id, type, amount, balance_before, balance_after,
          game_id, session_id, description, timestamp, external_reference
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        newTransaction.id,
        newTransaction.user_id,
        newTransaction.type,
        newTransaction.amount,
        newTransaction.balance_before,
        newTransaction.balance_after,
        newTransaction.game_id || null,
        newTransaction.session_id || null,
        newTransaction.description || null,
        newTransaction.timestamp,
        newTransaction.external_reference || null
      ]);

      return newTransaction;
    } finally {
      await connection.release();
    }
  }

  async getTransactionHistory(userId: string, limit: number = 50): Promise<DatabaseTransaction[]> {
    const connection = await DatabaseManager.getConnection();
    try {
      const result = await connection.query<DatabaseTransaction>(`
        SELECT id, user_id, type, amount, balance_before, balance_after,
               game_id, session_id, description, timestamp, external_reference
        FROM balance_transactions
        WHERE user_id = $1
        ORDER BY timestamp DESC
        LIMIT $2
      `, [userId, limit]);

      return result.rows;
    } finally {
      await connection.release();
    }
  }

  async validateBalance(userId: string, requiredAmount: number): Promise<boolean> {
    const balance = await this.findByUserId(userId);
    if (!balance) {
      return false;
    }

    return balance.balance >= requiredAmount;
  }

  // Complex balance deduction logic (ported from BalanceManager)
  async deductBet(
    userId: string,
    betAmount: number,
    lines: number,
    event: string = 'bet'
  ): Promise<{
    balance: DatabaseUserBalance;
    transaction: DatabaseTransaction;
    actualDeduction: number;
  }> {
    const totalBet = betAmount * lines;

    return await DatabaseManager.withTransaction(async (connection) => {
      // Get current balance
      const currentBalance = await this.findByUserId(userId);
      if (!currentBalance) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `No balance found for user ${userId}`);
      }

      if (!this.canAffordBet(currentBalance, betAmount, lines)) {
        throw new DatabaseError('INSUFFICIENT_BALANCE', 'Not enough balance for this bet');
      }

      const previousBalance = currentBalance.balance;
      const previousCountBalance = currentBalance.count_balance;
      const previousAddress = currentBalance.address;

      let newBalance = previousBalance;
      let newCountBalance = previousCountBalance;
      let newAddress = previousAddress;
      let actualDeduction = 0;

      // Complex count_balance deduction logic
      if (event === 'bet') {
        if (currentBalance.count_balance === 0) {
          // Use address field when count_balance is 0
          const betAmountDenom = totalBet;
          if (currentBalance.address < betAmountDenom && currentBalance.address > 0) {
            newAddress = 0;
            actualDeduction = currentBalance.address;
          } else if (currentBalance.address > 0) {
            newAddress -= betAmountDenom;
            actualDeduction = betAmountDenom;
          }
        } else if (currentBalance.count_balance > 0 && currentBalance.count_balance < totalBet) {
          // Partial deduction from count_balance, remainder from address
          const remainingBet = totalBet - currentBalance.count_balance;
          newCountBalance = 0;
          actualDeduction = currentBalance.count_balance;

          if (currentBalance.address > 0) {
            if (currentBalance.address < remainingBet) {
              newAddress = 0;
              actualDeduction += currentBalance.address;
            } else {
              newAddress -= remainingBet;
              actualDeduction += remainingBet;
            }
          }
        } else if (currentBalance.count_balance >= totalBet) {
          // Full deduction from count_balance
          newCountBalance -= totalBet;
          actualDeduction = totalBet;
        }

        // Update main balance
        newBalance -= actualDeduction;
      }

      // Update balance in database
      const updatedBalance = await this.updateBalance(userId, {
        balance: Math.max(0, newBalance),
        count_balance: Math.max(0, newCountBalance),
        address: Math.max(0, newAddress)
      }, currentBalance.version);

      // Create transaction record
      const transaction = await this.addTransaction({
        user_id: userId,
        type: 'bet',
        amount: -actualDeduction,
        balance_before: previousBalance,
        balance_after: updatedBalance.balance,
        game_id: undefined, // Will be set by caller if needed
        session_id: undefined, // Will be set by caller if needed
        description: `Bet deduction: ${betAmount} x ${lines} lines`,
        external_reference: undefined
      });

      return {
        balance: updatedBalance,
        transaction,
        actualDeduction
      };
    });
  }

  // Add winnings to balance
  async addWin(
    userId: string,
    winAmount: number,
    event: string = 'win'
  ): Promise<{
    balance: DatabaseUserBalance;
    transaction: DatabaseTransaction;
  }> {
    return await DatabaseManager.withTransaction(async (connection) => {
      const currentBalance = await this.findByUserId(userId);
      if (!currentBalance) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `No balance found for user ${userId}`);
      }

      const previousBalance = currentBalance.balance;
      const newBalance = previousBalance + winAmount;

      // Update balance
      const updatedBalance = await this.updateBalance(userId, {
        balance: newBalance
      }, currentBalance.version);

      // Create transaction record
      const transaction = await this.addTransaction({
        user_id: userId,
        type: 'win',
        amount: winAmount,
        balance_before: previousBalance,
        balance_after: newBalance,
        game_id: undefined, // Will be set by caller if needed
        session_id: undefined, // Will be set by caller if needed
        description: `Win: ${winAmount}`,
        external_reference: undefined
      });

      return {
        balance: updatedBalance,
        transaction
      };
    });
  }

  // Helper method for bet validation
  private canAffordBet(balance: DatabaseUserBalance, betAmount: number, lines: number): boolean {
    const totalBet = betAmount * lines;
    return balance.balance >= totalBet;
  }

  // Get balance summary for user
  async getBalanceSummary(userId: string): Promise<{
    current: DatabaseUserBalance;
    recentTransactions: DatabaseTransaction[];
    totalBets: number;
    totalWins: number;
    netResult: number;
  }> {
    const connection = await DatabaseManager.getConnection();
    try {
      const current = await this.findByUserId(userId);
      if (!current) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `No balance found for user ${userId}`);
      }

      const recentTransactions = await this.getTransactionHistory(userId, 10);

      // Calculate totals from transactions
      const totalsResult = await connection.query(`
        SELECT
          COALESCE(SUM(CASE WHEN type = 'bet' THEN amount END), 0) as total_bets,
          COALESCE(SUM(CASE WHEN type IN ('win', 'jackpot') THEN amount END), 0) as total_wins
        FROM balance_transactions
        WHERE user_id = $1
      `, [userId]);

      const totals = totalsResult.rows[0];

      return {
        current,
        recentTransactions,
        totalBets: Math.abs(parseFloat(totals.total_bets)),
        totalWins: parseFloat(totals.total_wins),
        netResult: parseFloat(totals.total_wins) + parseFloat(totals.total_bets)
      };
    } finally {
      await connection.release();
    }
  }

  // Transfer balance between users (for administrative purposes)
  async transferBalance(
    fromUserId: string,
    toUserId: string,
    amount: number,
    description?: string
  ): Promise<{
    fromBalance: DatabaseUserBalance;
    toBalance: DatabaseUserBalance;
    fromTransaction: DatabaseTransaction;
    toTransaction: DatabaseTransaction;
  }> {
    return await DatabaseManager.withTransaction(async (connection) => {
      // Get both balances
      const fromBalance = await this.findByUserId(fromUserId);
      const toBalance = await this.findByUserId(toUserId);

      if (!fromBalance) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `No balance found for user ${fromUserId}`);
      }
      if (!toBalance) {
        throw new DatabaseError('BALANCE_NOT_FOUND', `No balance found for user ${toUserId}`);
      }

      if (fromBalance.balance < amount) {
        throw new DatabaseError('INSUFFICIENT_BALANCE', 'Insufficient balance for transfer');
      }

      // Update balances
      const updatedFromBalance = await this.updateBalance(fromUserId, {
        balance: fromBalance.balance - amount
      }, fromBalance.version);

      const updatedToBalance = await this.updateBalance(toUserId, {
        balance: toBalance.balance + amount
      }, toBalance.version);

      // Create transaction records
      const fromTransaction = await this.addTransaction({
        user_id: fromUserId,
        type: 'withdrawal',
        amount: -amount,
        balance_before: fromBalance.balance,
        balance_after: updatedFromBalance.balance,
        description: description || `Transfer to ${toUserId}`,
        external_reference: `transfer_${Date.now()}`
      });

      const toTransaction = await this.addTransaction({
        user_id: toUserId,
        type: 'deposit',
        amount: amount,
        balance_before: toBalance.balance,
        balance_after: updatedToBalance.balance,
        description: description || `Transfer from ${fromUserId}`,
        external_reference: `transfer_${Date.now()}`
      });

      return {
        fromBalance: updatedFromBalance,
        toBalance: updatedToBalance,
        fromTransaction,
        toTransaction
      };
    });
  }
}