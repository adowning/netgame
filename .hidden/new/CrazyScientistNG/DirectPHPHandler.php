<?php

require_once 'GameCalculator.php';

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

    // Build client-facing response format
    $response = [
        'action' => 'SpinResponse',
        'result' => 'true',
        'sesId' => $gameData['user']['id'] ?? 'test_session',
        'data' => [
            'spinResult' => [
                'type' => 'SpinResult',
                'rows' => $result['reelsSymbols']['rows'] ?? []
            ],
            'state' => 'Ready'
        ]
    ];

    // Add slotWin only if there's a win
    if ($result['totalWin'] > 0) {
        $response['data']['slotWin'] = [
            'totalWin' => number_format($result['totalWin'], 2),
            'lineWinAmounts' => $result['winLines'] ?? [],
            'canGamble' => 'false'
        ];
    }

    // Output JSON response
    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit(1);
}

?>