<?php

/**
 * Test script for PHP Calculator integration for Royal40FruitsNG
 */

// Include the DirectPHPHandler for the game being tested
require_once __DIR__ . '/new/Royal40FruitsNG/DirectPHPHandler.php';

// Test data matching the TypeScript GameData interface, tailored for Royal40FruitsNG
$testGameData = [
    'user' => [
        'id' => 'test_user_456',
        'balance' => 2000.00,
        'count_balance' => 1000.00,
        'address' => 0,
        'shop_id' => 'test_shop_b',
        'username' => 'testuser_b',
        'email' => 'test_b@example.com',
        'status' => 'active'
    ],
    'game' => [
        'id' => 'Royal40FruitsNG',
        'name' => 'Royal 40 Fruits NG',
        'denomination' => 0.01,
        'bet' => ['1', '2', '3', '4', '5', '10', '15', '20', '30', '40', '50', '100', '200'],
        'stat_in' => 15000,
        'stat_out' => 14000,
        'bank' => 7500,
        'shop_id' => 'test_shop_b',
        'view' => true,
        'slotBonus' => false, // No bonus game in Royal40FruitsNG
        'increaseRTP' => 1,
        'slotWildMpl' => 1, // No wild multiplier in this game
        'slotFreeMpl' => 1,
        'slotFreeCount' => 0, // No free spins in this game
        'lines' => 40 // Royal40FruitsNG has 40 paylines
    ],
    'shop' => [
        'id' => 'test_shop_b',
        'name' => 'Test Casino B',
        'percent' => 94,
        'max_win' => 2000000,
        'currency' => 'USD',
        'is_blocked' => false
    ],
    'bank' => 7500,
    'rtp' => [
        'spinChance' => 10,
        'bonusChance' => 5000 // High value as there's no bonus
    ],
    'linesId' => [
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
];

// Test spin request
$testSpinRequest = [
    'action' => 'calculateSpin',
    'slotEvent' => 'bet',
    'betLine' => 1,
    'gameData' => $testGameData
];

// Create the handler instance
$handler = new \App\Games\Royal40FruitsNG\DirectPHPHandler();

// Prepare the input for the handler by wrapping it
$inputForHandler = json_encode($testSpinRequest);

// Temporarily replace php://input for the test
$tempStream = fopen('php://temp', 'r+');
fwrite($tempStream, $inputForHandler);
rewind($tempStream);
$oldStdin = fopen('php://stdin', 'r');
stream_socket_shutdown($oldStdin, STREAM_SHUT_RDWR); // Close existing stdin
$GLOBALS['STDIN'] = $tempStream;


echo "=== PHP Calculator Test for Royal40FruitsNG ===\n\n";
echo "Request:\n";
echo json_encode($testSpinRequest, JSON_PRETTY_PRINT) . "\n\n";

echo "Response:\n";
// Execute the handler, which will read from our temporary stream
$handler->handle();

// Restore original stdin
$GLOBALS['STDIN'] = $oldStdin;
fclose($tempStream);

echo "\n\n=== Test Complete ===\n";
