#!/usr/bin/env bun

/**
 * Test script for the TypeScript Game Session architecture
 * Uses MockPHPCalculator for testing without PHP dependencies
 */

import { GameSessionManager, MockPHPCalculator, DEFAULT_RTP_CONFIG, DEFAULT_SESSION_CONFIG } from './src/game-session/index';

// Test data
const testGameData = {
  user: {
    id: 'test_user_123',
    balance: 1000.00, // In game denomination
    count_balance: 500.00,
    address: 100.00,
    shop_id: 'test_shop',
    username: 'testuser',
    email: 'test@example.com',
    status: 'active' as const
  },
  game: {
    id: 'AfricanKingNG',
    name: 'African King NG',
    denomination: 1,
    bet: ['0.01', '0.02', '0.05', '0.10', '0.20', '0.50', '1.00', '2.00'],
    stat_in: 10000,
    stat_out: 9500,
    bank: 5000,
    shop_id: 'test_shop',
    view: true,
    slotBonus: true,
    increaseRTP: 1,
    slotWildMpl: 1,
    slotFreeMpl: 1,
    slotFreeCount: 8
  },
  shop: {
    id: 'test_shop',
    name: 'Test Casino',
    percent: 95,
    max_win: 10000,
    currency: 'USD',
    is_blocked: false
  },
  bank: 5000,
  jackpots: [
    {
      id: 'jackpot_1',
      balance: 1000,
      percent: 1,
      user_id: null,
      shop_id: 'test_shop'
    }
  ]
};

// Line configurations (simplified - just first 5 lines)
const testLinesId = [
  [2, 2, 2, 2, 2], // Line 1: middle row
  [1, 1, 1, 1, 1], // Line 2: top row
  [3, 3, 3, 3, 3], // Line 3: bottom row
  [1, 2, 3, 2, 1], // Line 4: V shape
  [3, 2, 1, 2, 3]  // Line 5: inverted V
];

async function testGameSession() {
  console.log('🧪 Testing TypeScript Game Session Architecture\n');

  try {
    // Initialize components
    console.log('📦 Initializing components...');
    const mockCalculator = new MockPHPCalculator();
    const sessionManager = new GameSessionManager(mockCalculator, DEFAULT_SESSION_CONFIG);

    // Test connection
    console.log('🔗 Testing PHP calculator connection...');
    const connected = await mockCalculator.testConnection();
    console.log(`✅ Connection test: ${connected ? 'PASSED' : 'FAILED'}\n`);

    // Create session
    console.log('🎮 Creating game session...');
    const session = await sessionManager.createSession(
      'test_user_123',
      'AfricanKingNG',
      testGameData,
      DEFAULT_RTP_CONFIG
    );
    console.log(`✅ Session created: ${session['sessionId']}\n`);

    // Test initial state
    console.log('📊 Initial session state:');
    console.log(`   Balance: $${session.getBalance().toFixed(2)}`);
    console.log(`   RTP: ${session.getRTP()}%`);
    console.log(`   Game State:`, session.getGameState());
    console.log();

    // Execute multiple spins
    console.log('🎰 Executing test spins...\n');

    for (let i = 1; i <= 10; i++) {
      try {
        console.log(`🔄 Spin ${i}:`);
        const spinResult = await session.executeSpin('bet', 0.01, 5, testLinesId);

        console.log(`   Total Win: $${spinResult.totalWin.toFixed(2)}`);
        console.log(`   Scatters: ${spinResult.scattersCount}`);
        console.log(`   Reels: ${JSON.stringify(spinResult.reels)}`);
        console.log(`   Balance after: $${session.getBalance().toFixed(2)}`);

        // Check game state changes
        const gameState = session.getGameState();
        if (gameState.freeGames > 0) {
          console.log(`   🎁 Bonus triggered! Free games: ${gameState.freeGames}`);
        }

        console.log();

      } catch (error) {
        console.error(`❌ Spin ${i} failed:`, error.message);
        break;
      }
    }

    // Test session statistics
    console.log('📈 Session statistics:');
    const spinHistory = session.getSpinHistory();
    console.log(`   Total spins: ${spinHistory.length}`);
    const totalWagered = spinHistory.reduce((sum, spin) => sum + spin.bet, 0);
    const totalWon = spinHistory.reduce((sum, spin) => sum + spin.win, 0);
    console.log(`   Total wagered: $${totalWagered.toFixed(2)}`);
    console.log(`   Total won: $${totalWon.toFixed(2)}`);
    console.log(`   Net result: $${(totalWon - totalWagered).toFixed(2)}`);
    console.log();

    // Test balance operations
    console.log('💰 Balance operations:');
    const events = session.getEvents();
    const balanceOps = events.filter(e => e.type === 'balance_deducted' || e.type === 'balance_win');
    console.log(`   Balance operations: ${balanceOps.length}`);
    balanceOps.slice(-3).forEach(op => {
      console.log(`   ${op.type}: ${JSON.stringify(op.data)}`);
    });
    console.log();

    // End session
    console.log('🏁 Ending session...');
    await sessionManager.endSession(session['sessionId']);
    console.log('✅ Session ended\n');

    // Test session manager stats
    const stats = sessionManager.getStats();
    console.log('📊 Session manager statistics:');
    console.log(`   Total sessions: ${stats.totalSessions}`);
    console.log(`   Active sessions: ${stats.activeSessions}`);
    console.log(`   Total users: ${stats.totalUsers}`);
    console.log();

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testGameSession().catch(error => {
  console.error('💥 Unhandled error:', error);
  process.exit(1);
});