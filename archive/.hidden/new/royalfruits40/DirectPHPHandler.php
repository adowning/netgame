<?php

namespace App\Games\Royal40FruitsNG;

require_once 'GameCalculator.php';

class DirectPHPHandler
{
    /**
     * Handles the request from the TypeScript server.
     * This method is the single entry point for the PHP calculation engine.
     */
    public function handle()
    {
        header('Content-Type: application/json');

        try {
            $inputStream = $this->isCli() ? 'php://stdin' : 'php://input';
            $postData = json_decode(trim(file_get_contents($inputStream)), true);

            if (!$postData || !isset($postData['gameData']) || !isset($postData['action'])) {
                $this->sendError('Invalid input data');
            }

            if ($postData['action'] !== 'calculateSpin') {
                $this->sendError('Unknown action: ' . ($postData['action'] ?? 'none'));
            }

            $gameData = (object)$postData['gameData'];

            $calculator = new GameCalculator($gameData);

            $result = $calculator->calculateSpin($postData);

            $this->sendResponse($result);

        } catch (\Throwable $e) {
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

$handler = new DirectPHPHandler();
$handler->handle();