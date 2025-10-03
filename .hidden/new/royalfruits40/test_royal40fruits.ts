#!/usr/bin/env bun

/**
 * Test script for the Royal40FruitsNG PHP Calculator integration.
 */

import { PHPCalculator } from './src/game-session/PHPCalculator';
import { SpinRequest } from './src/game-session/types';
import { exit } from 'process';

// Test data tailored for Royal40FruitsNG
const testGameData = {
    user: {
        id: 'test_user_456',
        balance: 2000.00,
        count_balance: 1000.00,
        address: 0,
        shop_id: 'test_shop_b',
        username: 'testuser_b',
        email: 'test_b@example.com',
        status: 'active' as const
    },
    game: {
        id: 'Royal40FruitsNG',
        name: 'Royal 40 Fruits NG',
        denomination: 0.01,
        bet: ['1', '2', '3', '4', '5', '10', '15', '20', '30', '40', '50', '100', '200'],
        stat_in: 15000,
        stat_out: 14000,
        bank: 7500,
        shop_id: 'test_shop_b',
        view: true,
        slotBonus: false,
        increaseRTP: 1,
        slotWildMpl: 1,
        slotFreeMpl: 1,
        slotFreeCount: 0,
        lines: 40
    },
    shop: {
        id: 'test_shop_b',
        name: 'Test Casino B',
        percent: 94,
        max_win: 2000000,
        currency: 'USD',
        is_blocked: false
    },
    bank: 7500,
    rtp: {
        spinChance: 10,
        bonusChance: 5000
    },
    linesId: [
        [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [3, 3, 3, 3, 3], [4, 4, 4, 4, 4],
        [1, 2, 3, 2, 1], [2, 3, 4, 3, 2], [3, 2, 1, 2, 3], [4, 3, 2, 3, 4],
        [1, 1, 1, 1, 2], [2, 2, 2, 2, 1], [3, 3, 3, 3, 4], [4, 4, 4, 4, 3],
        [1, 2, 2, 2, 2], [2, 2, 2, 2, 3], [3, 3, 3, 3, 2], [4, 3, 3, 3, 3],
        [2, 1, 1, 1, 1], [2, 3, 3, 3, 3], [3, 2, 2, 2, 2], [3, 4, 4, 4, 4],
        [1, 1, 1, 2, 3], [2, 2, 2, 3, 4], [3, 3, 3, 2, 1], [4, 4, 4, 3, 2],
        [1, 2, 3, 3, 3], [2, 3, 4, 4, 4], [3, 2, 1, 1, 1], [4, 3, 2, 2, 2],
        [1, 1, 2, 1, 1], [2, 2, 1, 2, 2], [3, 3, 4, 3, 3], [4, 4, 3, 4, 4],
        [1, 2, 2, 2, 1], [2, 2, 3, 2, 2], [3, 3, 2, 3, 3], [4, 3, 3, 3, 4],
        [2, 1, 1, 1, 2], [2, 3, 3, 3, 2], [3, 2, 2, 2, 3], [3, 4, 4, 4, 3]
    ]
};

// Test spin request
const testSpinRequest: SpinRequest = {
    action: 'calculateSpin',
    slotEvent: 'bet',
    lines: 40,
    betLine: 1,
    linesId: testGameData.linesId,
    gameData: testGameData
};


async function runTest() {
    console.log('🧪 Testing Royal40FruitsNG PHP Calculator...\n');
    
    // Path to the new DirectPHPHandler
    const phpScriptPath = __dirname + '/new/Royal40FruitsNG/DirectPHPHandler.php';
    
    const calculator = new PHPCalculator(phpScriptPath);

    console.log('Request:');
    console.log(JSON.stringify(testSpinRequest, null, 2));

    const result = await calculator.calculateSpin(testSpinRequest);

    console.log('\nResponse:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
        console.log('\n✅ Test PASSED');
        exit(0);
    } else {
        console.error('\n❌ Test FAILED');
        exit(1);
    }
}

runTest();