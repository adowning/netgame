<?php

namespace App\Games\Royal40FruitsNG;

// Autoload the GameCalculator class
require_once 'GameCalculator.php';

class DirectPHPHandler
{
    /**
     * Handles the request from the TypeScript server.
     * This method is the single entry point for the PHP calculation engine.
     */
    public function handle()
    {
        // Set headers for JSON response
        header('Content-Type: application/json');

        try {
            // Read input from the appropriate stream based on the execution context
            $inputStream = $this->isCli() ? 'php://stdin' : 'php://input';
            $postData = json_decode(trim(file_get_contents($inputStream)), true);

            if (!$postData || !isset($postData['gameData']) || !isset($postData['action'])) {
                $this->sendError('Invalid input data');
            }

            // The only action supported by this engine is 'calculateSpin'.
            if ($postData['action'] !== 'calculateSpin') {
                $this->sendError('Unknown action: ' . ($postData['action'] ?? 'none'));
            }

            // The gameData object contains all the necessary state and configuration
            // provided by the TypeScript server.
            $gameData = (object)$postData['gameData'];

            // Instantiate the pure calculation engine.
            $calculator = new GameCalculator($gameData);

            // Perform the spin calculation.
            $result = $calculator->calculateSpin($postData);

            // The result is sent back to the TypeScript server for processing.
            $this->sendResponse($result);

        } catch (\Throwable $e) {
            // In case of any error, send a structured error response.
            $this->sendError('Calculation error: ' . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine());
        }
    }

    /**
     * Sends a JSON-formatted success response.
     */
    private function sendResponse($data)
    {
        echo json_encode(['status' => 'success', 'data' => $data]);
        exit();
    }

    /**
     * Sends a JSON-formatted error response.
     */
    private function sendError($message)
    {
        // For CLI, we might not be able to set HTTP response codes.
        if (!$this->isCli()) {
            http_response_code(400);
        }
        echo json_encode(['status' => 'error', 'message' => $message]);
        exit();
    }

    /**
     * Checks if the script is running from the command line.
     * @return bool
     */
    private function isCli()
    {
        return php_sapi_name() === 'cli' || defined('STDIN');
    }
}

// Unified execution block for both CLI and HTTP POST
// This allows the TypeScript server to call this script directly using spawn() or via an HTTP request.
$handler = new DirectPHPHandler();
$handler->handle();