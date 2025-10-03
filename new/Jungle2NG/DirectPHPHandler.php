<?php

class DirectPHPHandler {

    public function handle($input) {
        require_once 'GameCalculator.php';

        $gameData = $input['gameData'];
        $calculator = new GameCalculator($gameData);

        $serverResponse = $calculator->calculateSpin($input);

        return $serverResponse;
    }
}

// Main execution for CLI or HTTP
if (php_sapi_name() === 'cli') {
    // CLI execution: read from stdin
    $input = json_decode(file_get_contents('php://stdin'), true);
    if (!$input) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
        exit(1);
    }
    $handler = new DirectPHPHandler();
    $result = $handler->handle($input);
    echo json_encode($result);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // HTTP POST execution: read from php://input
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
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}