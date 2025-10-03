<?php

namespace App\Games\AfricanKingNG;

// Autoload the GameCalculator class
require_once 'GameCalculator.php';

class Server
{
    /**
     * Handles the request from the TypeScript server.
     * This method is the single entry point for the PHP calculation engine.
     */
    public function handle()
    {
        try {
            // The TypeScript server will send all necessary data in the request body.
            $postData = json_decode(trim(file_get_contents('php://input')));

            if (!$postData || !isset($postData->gameData) || !isset($postData->action)) {
                $this->sendError('Invalid input data');
            }

            // The only action supported by this engine is 'calculateSpin'.
            if ($postData->action !== 'calculateSpin') {
                $this->sendError('Unknown action');
            }

            // The gameData object contains all the necessary state and configuration
            // provided by the TypeScript server.
            $gameData = $postData->gameData;

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

// Since this script is now a standalone entry point, we instantiate and run the server.
// The TypeScript server will call this PHP script directly.
$server = new Server();
$server->handle();