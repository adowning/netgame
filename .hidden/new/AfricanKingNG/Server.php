<?php

namespace App\Games\AfricanKingNG;

// Autoload the GameCalculator class
require_once 'GameCalculator.php';

class DirectPHPServer {
    public function handle($gameData, $postData) {
        try {

            if (!$postData || !isset($postData->gameData) || !isset($postData->action)) {
                $this->sendError('Invalid input data');
            }

            // The only action supported by this engine is 'calculateSpin'.
            if ($postData->action !== 'calculateSpin') {
                $this->sendError('Unknown action');
            }
            

            // Instantiate the pure calculation engine.
            $calculator = new GameCalculator($gameData);
            
            // Perform the spin calculation.
            $result = $calculator->calculateSpin((array)$postData);

            // The result is sent back to the TypeScript server for processing.
            $this->sendResponse($result);

        } catch (\Exception $e) {
            // In case of any error, send a structured error response.
            $this->sendError($e->getMessage());
        }
    }

    /**
     * Sends a JSON-formatted success response.
     */
    private function sendResponse($data)
    {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'data' => $data]);
        exit();
    }

    /**
     * Sends a JSON-formatted error response.
     */
    private function sendError($message)
    {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => $message]);
        exit();
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