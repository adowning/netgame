<?php

$input = file_get_contents('php://stdin');
$data = json_decode($input, true);

if (!$data || !isset($data['gameData']) || !isset($data['spinData'])) {
    echo json_encode(['error' => 'Invalid input data']);
    exit(1);
}

$gameData = $data['gameData'];
$spinData = $data['spinData'];

try {
    $calculator = new GameCalculator($gameData);
    $result = $calculator->calculateSpin($spinData);

    $serverResponse = [
        'BonusSymbol' => -1,
        'slotLines' => 10,
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

    echo json_encode([
        'serverResponse' => $serverResponse,
        'winString' => $result['winString'],
        'gameState' => $result['gameState'],
        'scattersCount' => $result['scattersCount'] ?? 0,
        'symb' => $result['symb']
    ]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit(1);
}

?>