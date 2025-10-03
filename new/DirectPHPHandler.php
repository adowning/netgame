<?php

/**
 * Generic Direct PHP Handler
 *
 * Universal handler for all slot games that use direct PHP execution.
 * Dynamically loads game-specific calculators and processes spin requests.
 */

class GenericDirectPHPHandler
{
    private $gameName;
    private $calculator;

    /**
     * Constructor
     *
     * @param string $gameName The name of the game (e.g., 'FortuneCashNG')
     */
    public function __construct($gameName)
    {
        $this->gameName = $gameName;
        $this->loadCalculator();
    }

    /**
     * Load the game-specific calculator
     */
    private function loadCalculator()
    {
        $calculatorClass = $this->gameName . '\\GameCalculator';
        $calculatorFile = __DIR__ . '/' . $this->gameName . '/GameCalculator.php';

        if (!file_exists($calculatorFile)) {
            throw new Exception("GameCalculator file not found: {$calculatorFile}");
        }

        require_once $calculatorFile;

        if (!class_exists($calculatorClass)) {
            throw new Exception("GameCalculator class not found: {$calculatorClass}");
        }

        // Calculator will be instantiated with gameData in handle() method
        $this->calculator = null;
    }

    /**
     * Handle the spin request
     *
     * @param array $input Input data from TypeScript
     * @return array Complete serverResponse structure
     */
    public function handle($input)
    {
        try {
            // Validate input structure
            $this->validateInput($input);

            // Extract game data and game name
            $gameData = $input['gameData'];
            $this->gameName = $input['gameName'] ?? $this->gameName;

            // Instantiate calculator with game data
            $calculatorClass = $this->gameName . '\\GameCalculator';
            $this->calculator = new $calculatorClass($gameData);

            // Execute spin calculation
            $result = $this->calculator->calculateSpin($input);

            // Validate result structure
            $this->validateResult($result);

            return $result;

        } catch (Exception $e) {
            return $this->createErrorResponse($e->getMessage());
        }
    }

    /**
     * Validate input data structure
     *
     * @param array $input
     * @throws Exception
     */
    private function validateInput($input)
    {
        if (!is_array($input)) {
            throw new Exception('Input must be an array');
        }

        if (!isset($input['gameData']) || !is_array($input['gameData'])) {
            throw new Exception('Missing or invalid gameData');
        }

        // Validate required input fields
        if (!isset($input['gameName']) || empty($input['gameName'])) {
            throw new Exception('Missing or invalid gameName');
        }

        // Validate required gameData fields
        $requiredFields = ['user', 'game', 'shop', 'bank', 'stat_in', 'stat_out'];
        foreach ($requiredFields as $field) {
            if (!isset($input['gameData'][$field])) {
                throw new Exception("Missing required gameData field: {$field}");
            }
        }

        // Validate user data
        if (!isset($input['gameData']['user']['id']) ||
            !isset($input['gameData']['user']['balance'])) {
            throw new Exception('Invalid user data structure');
        }

        // Validate game data
        if (!isset($input['gameData']['game']['id']) ||
            !isset($input['gameData']['game']['denomination'])) {
            throw new Exception('Invalid game data structure');
        }
    }

    /**
     * Validate result structure matches expected serverResponse format
     *
     * @param array $result
     * @throws Exception
     */
    private function validateResult($result)
    {
        if (!is_array($result)) {
            throw new Exception('Result must be an array');
        }

        // Required fields for serverResponse
        $requiredFields = [
            'BonusSymbol',
            'slotLines',
            'slotBet',
            'totalFreeGames',
            'currentFreeGames',
            'Balance',
            'afterBalance',
            'bonusWin',
            'freeStartWin',
            'totalWin',
            'winLines',
            'bonusInfo',
            'Jackpots',
            'reelsSymbols'
        ];

        foreach ($requiredFields as $field) {
            if (!array_key_exists($field, $result)) {
                throw new Exception("Missing required result field: {$field}");
            }
        }

        // Validate reelsSymbols structure
        if (!isset($result['reelsSymbols']['reel1']) ||
            !isset($result['reelsSymbols']['reel2']) ||
            !isset($result['reelsSymbols']['reel3']) ||
            !isset($result['reelsSymbols']['reel4']) ||
            !isset($result['reelsSymbols']['reel5']) ||
            !isset($result['reelsSymbols']['rp'])) {
            throw new Exception('Invalid reelsSymbols structure');
        }
    }

    /**
     * Create error response
     *
     * @param string $message
     * @return array
     */
    private function createErrorResponse($message)
    {
        return [
            'BonusSymbol' => -1,
            'slotLines' => 0,
            'slotBet' => 0,
            'totalFreeGames' => 0,
            'currentFreeGames' => 0,
            'Balance' => 0,
            'afterBalance' => 0,
            'bonusWin' => 0,
            'freeStartWin' => 0,
            'totalWin' => 0,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => [
                'reel1' => [],
                'reel2' => [],
                'reel3' => [],
                'reel4' => [],
                'reel5' => [],
                'rp' => []
            ],
            'error' => true,
            'errorMessage' => $message
        ];
    }
}

// CLI execution (direct execution from TypeScript)
if (php_sapi_name() === 'cli') {
    try {
        $input = json_decode(file_get_contents('php://stdin'), true);
        if (!$input) {
            echo json_encode(['error' => true, 'message' => 'Invalid JSON input']);
            exit(1);
        }

        // Game name is passed in the input data
        $handler = new GenericDirectPHPHandler(''); // Empty default, will be set from input
        $result = $handler->handle($input);
        echo json_encode($result);

    } catch (Exception $e) {
        echo json_encode([
            'error' => true,
            'message' => $e->getMessage()
        ]);
        exit(1);
    }
}

// HTTP execution (fallback for testing)
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            http_response_code(400);
            echo json_encode(['error' => true, 'message' => 'Invalid JSON input']);
            exit;
        }

        // Extract game name from query parameter or determine from context
        $gameName = $_GET['game'] ?? '';

        if (empty($gameName)) {
            http_response_code(400);
            echo json_encode(['error' => true, 'message' => 'Missing game parameter']);
            exit;
        }

        $handler = new GenericDirectPHPHandler($gameName);
        $result = $handler->handle($input);

        header('Content-Type: application/json');
        echo json_encode($result);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => true,
            'message' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => true, 'message' => 'Method not allowed']);
}