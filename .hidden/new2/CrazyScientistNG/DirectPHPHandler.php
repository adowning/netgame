<?php

// Read JSON input from stdin
$input = file_get_contents('php://stdin');
$data = json_decode($input, true);

if (!$data || !isset($data['gameData']) || !isset($data['spinData'])) {
    echo json_encode(['error' => 'Invalid input data']);
    exit(1);
}

$gameData = $data['gameData'];
$spinData = $data['spinData'];

try {
    // Initialize calculator
    $calculator = new GameCalculator($gameData);

    // Calculate spin
    $result = $calculator->calculateSpin($spinData);

    // Build server response
    $serverResponse = [
        'BonusSymbol' => -1,
        'slotLines' => 20,
        'slotBet' => $spinData['betLine'],
        'totalFreeGames' => $spinData['totalFreeGames'] ?? 0,
        'currentFreeGames' => $spinData['currentFreeGames'] ?? 0,
        'Balance' => $gameData['user']['balance'],
        'afterBalance' => $gameData['user']['balance'],
        'bonusWin' => $spinData['bonusWin'] ?? 0,
        'freeStartWin' => $spinData['freeStartWin'] ?? 0,
        'totalWin' => $result['totalWin'],
        'winLines' => $result['winLines'],
        'bonusInfo' => $result['bonusInfo'],
        'Jackpots' => $result['Jackpots'],
        'reelsSymbols' => $result['reelsSymbols']
    ];

    // Output JSON response
    echo json_encode([
        'serverResponse' => $serverResponse,
        'winString' => $result['winString'],
        'gameState' => $result['gameState'],
        'scattersCount' => $result['scattersCount'],
        'symb' => $result['symb']
    ]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit(1);
}

?>