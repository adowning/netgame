<?php

require_once 'GameCalculator.php';

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

    if ($result['totalWin'] > 0) {
        $response['data']['slotWin'] = [
            'totalWin' => number_format($result['totalWin'], 2),
            'lineWinAmounts' => $result['winLines'] ?? [],
            'canGamble' => 'false'
        ];
    }

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit(1);
}

?>