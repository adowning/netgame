<?php

namespace App\Games\MMALegendsNG;

require_once 'GameCalculator.php';

set_error_handler(function($severity, $message, $file, $line) {
    throw new \ErrorException($message, 0, $severity, $file, $line);
});

try {
if (php_sapi_name() === 'cli') {
    $rawPayload = file_get_contents('php://stdin');
} else {
    $rawPayload = file_get_contents('php://input');
}

    if (!$rawPayload) {
        throw new \InvalidArgumentException("No input data provided.");
    }

    $postData = json_decode($rawPayload, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new \InvalidArgumentException("Invalid JSON provided: " . json_last_error_msg());
    }

    if (!isset($postData['gameData']) || !isset($postData['spinData'])) {
        throw new \InvalidArgumentException("Missing 'gameData' or 'spinData' in the payload.");
    }
    
    $gameData = json_decode(json_encode($postData['gameData']));

    $calculator = new GameCalculator($gameData);

    $spinResult = $calculator->calculateSpin($postData['spinData']);
    
    $balance = $gameData->user->balance;
    $totalWin = $spinResult['totalWin'];
    $afterBalance = $balance - ($postData['spinData']['betLine'] * $postData['spinData']['lines']) + $totalWin;

    $serverResponse = [
        'BonusSymbol' => -1, // Not applicable in this simplified calculator
        'slotLines' => $postData['spinData']['lines'],
        'slotBet' => $postData['spinData']['betLine'],
        'totalFreeGames' => $postData['freeGames']['total'] ?? 0,
        'currentFreeGames' => $postData['freeGames']['current'] ?? 0,
        'Balance' => $balance,
        'afterBalance' => $afterBalance,
        'bonusWin' => 0, // Simplified, handled by TS server
        'freeStartWin' => 0,
        'totalWin' => $totalWin,
        'winLines' => $spinResult['lineWins'],
        'bonusInfo' => [],
        'Jackpots' => [], // Handled by TS server
        'reelsSymbols' => $spinResult['reels']
    ];

    header('Content-Type: application/json');
    echo json_encode(['responseEvent' => 'spin', 'serverResponse' => $serverResponse]);

} catch (\Throwable $e) {
    header('Content-Type: application/json', true, 400); // Bad Request
    echo json_encode([
        'responseEvent' => 'error',
        'responseType' => get_class($e),
        'serverResponse' => [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ]
    ]);
}