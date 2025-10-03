<?php

namespace App\Games\BananasNG;

require_once 'GameCalculator.php';

class Server
{
    public function handle($postData)
    {
        try {
            if (!$postData || !isset($postData['gameData']) || !isset($postData['action'])) {
                return $this->sendError('Invalid input data');
            }

            if ($postData['action'] !== 'calculateSpin') {
                return $this->sendError('Unknown action');
            }

            $gameData = (object)$postData['gameData'];

            $calculator = new GameCalculator($gameData);
            $result = $calculator->calculateSpin($postData);

            return $this->sendResponse($result);

        } catch (\Throwable $e) {
            return $this->sendError('Calculation error: ' . $e->getMessage());
        }
    }

    private function sendResponse($data)
    {
        return ['status' => 'success', 'data' => $data];
    }

    private function sendError($message)
    {
        return ['status' => 'error', 'message' => $message];
    }
}

// Execution logic for both CLI and HTTP requests
if (php_sapi_name() === 'cli') {
    $input = json_decode(file_get_contents('php://stdin'), true);
    $server = new Server();
    $result = $server->handle($input);
    echo json_encode($result);
} elseif (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $server = new Server();
    $result = $server->handle($input);
    header('Content-Type: application/json');
    if($result['status'] === 'error') {
        http_response_code(400);
    }
    echo json_encode($result);
} else {
    if (isset($_SERVER['REQUEST_METHOD'])) {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
}