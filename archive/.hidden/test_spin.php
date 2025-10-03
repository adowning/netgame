<?php

/**
 * Test script for PHP Calculator integration
 * This script can be called directly or via the PHPCalculator class
 */

require_once __DIR__ . '/new/AfricanKingNG/DirectPHPHandler.php';

$testGameData = [
    'user' => [
        'id' => 'test_user_123',
        'balance' => 1000.00, // In game denomination (e.g., cents)
        'count_balance' => 500.00,
        'address' => 100.00,
        'shop_id' => 'test_shop',
        'username' => 'testuser',
        'email' => 'test@example.com',
        'status' => 'active'
    ],
    'game' => [
        'id' => 'AfricanKingNG',
        'name' => 'African King NG',
        'denomination' => 1,
        'bet' => ['0.01', '0.02', '0.05', '0.10', '0.20', '0.50', '1.00', '2.00'],
        'stat_in' => 10000,
        'stat_out' => 9500,
        'bank' => 5000,
        'shop_id' => 'test_shop',
        'view' => true,
        'slotBonus' => true,
        'increaseRTP' => 1,
        'slotWildMpl' => 1,
        'slotFreeMpl' => 1,
        'slotFreeCount' => 8
    ],
    'shop' => [
        'id' => 'test_shop',
        'name' => 'Test Casino',
        'percent' => 95,
        'max_win' => 10000,
        'currency' => 'USD',
        'is_blocked' => false
    ],
    'bank' => 5000,
    'jackpots' => [
        [
            'id' => 'jackpot_1',
            'balance' => 1000,
            'percent' => 1,
            'user_id' => null,
            'shop_id' => 'test_shop'
        ]
    ],
    'sessionData' => [
        'bonusWin' => 0,
        'freeGames' => 0,
        'currentFreeGame' => 0,
        'bonusSymbol' => -1,
        'totalWin' => 0,
        'freeBalance' => 0,
        'freeStartWin' => 0
    ],
    'staticData' => []
];

$testSpinRequest = [
    'action' => 'calculateSpin',
    'slotEvent' => 'bet',
    'lines' => 30,
    'betLine' => 0.01,
    'linesId' => [
        [2, 2, 2, 2, 2], [1, 1, 1, 1, 1], [3, 3, 3, 3, 3], // Standard lines
        [1, 2, 3, 2, 1], [3, 2, 1, 2, 3], [2, 1, 2, 3, 2],
        [2, 3, 2, 1, 2], [1, 1, 2, 3, 3], [3, 3, 2, 1, 1],
        [1, 2, 1, 2, 1], [3, 2, 3, 2, 3], [2, 1, 1, 1, 2],
        [1, 3, 3, 3, 1], [1, 2, 2, 2, 1], [3, 2, 2, 2, 3],
        [2, 2, 1, 2, 2], [2, 2, 3, 2, 2], [1, 3, 1, 3, 1],
        [3, 1, 3, 1, 3], [3, 1, 2, 1, 3], [2, 1, 2, 1, 2],
        [2, 3, 2, 3, 2], [1, 2, 1, 2, 1], [3, 2, 1, 2, 3],
        [3, 1, 1, 1, 3], [1, 3, 2, 3, 1], [2, 2, 2, 1, 2],
        [2, 2, 2, 3, 2], [1, 1, 3, 2, 2], [3, 3, 1, 2, 1],
        [1, 2, 3, 1, 2], [2, 3, 1, 3, 2]
    ],
    'gameData' => $testGameData
];

if ($argc > 1 && $argv[1] === '--cli') {
    $input = json_decode(file_get_contents('php://stdin'), true);
    if (!$input) {
        fwrite(STDERR, "Error: Invalid JSON input\n");
        exit(1);
    }

    $handler = new DirectPHPHandler();
    $result = $handler->handle($input);

    echo json_encode($result, JSON_PRETTY_PRINT);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
        exit;
    }

    $handler = new DirectPHPHandler();
    $result = $handler->handle($input);

    header('Content-Type: application/json');
    echo json_encode($result);
    exit;
}

echo "=== PHP Calculator Test ===\n\n";

$handler = new DirectPHPHandler();
$result = $handler->handle($testSpinRequest);

echo "Request:\n";
echo json_encode($testSpinRequest, JSON_PRETTY_PRINT) . "\n\n";

echo "Response:\n";
echo json_encode($result, JSON_PRETTY_PRINT) . "\n\n";

if ($result['status'] === 'success') {
    $data = $result['data'];
    echo "Spin Results:\n";
    echo "- Total Win: {$data['totalWin']}\n";
    echo "- Scatters Count: {$data['scattersCount']}\n";
    echo "- Win String: {$data['winString']}\n";
    echo "- Symbol String: {$data['symb']}\n";

    $reels = $data['reels'];
    echo "\nReel Results:\n";
    for ($i = 1; $i <= 5; $i++) {
        $reel = $reels["reel{$i}"];
        echo "Reel {$i}: [" . implode(', ', $reel) . "]\n";
    }
    echo "RP: [" . implode(', ', $reels['rp']) . "]\n";
} else {
    echo "Error: {$result['message']}\n";
}

echo "\n=== Test Complete ===\n";

?>