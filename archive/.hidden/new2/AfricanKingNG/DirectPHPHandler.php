
<?php

require_once 'GameCalculator.php';

class DirectPHPHandler
{
    public function handle($input)
    {
        try {
            $gameData = $input['gameData'];
            $postData = $input;

            if (!$gameData || !isset($postData['action'])) {
                return ['status' => 'error', 'message' => 'Invalid input data'];
            }

            if ($postData['action'] !== 'calculateSpin') {
                return ['status' => 'error', 'message' => 'Unknown action'];
            }

            $calculator = new GameCalculator((object)$gameData);

            $result = $calculator->calculateSpin($postData);

            return ['status' => 'success', 'data' => $result];

        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}

if (php_sapi_name() === 'cli') {
    $input = json_decode(file_get_contents('php://stdin'), true);
    if (!$input) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
        exit(1);
    }
    $handler = new DirectPHPHandler();
    $result = $handler->handle($input);
    echo json_encode($result);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
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