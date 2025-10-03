<?php

/**
 * Script to extract original spin results from old games using game-data.json
 * This establishes the baseline "correct" results for mathematical accuracy testing
 */

class OriginalResultsExtractor
{
    private $gameData;
    private $results = [];

    public function __construct()
    {
        $this->loadGameData();
    }

    private function loadGameData()
    {
        $oldGames = array_filter(scandir(__DIR__ . '/old'), function($item) {
            return $item !== '.' && $item !== '..' && is_dir(__DIR__ . '/old/' . $item);
        });

        $newGames = array_filter(scandir(__DIR__ . '/new'), function($item) {
            return $item !== '.' && $item !== '..' && is_dir(__DIR__ . '/new/' . $item);
        });

        $commonGames = array_intersect($oldGames, $newGames);

        $this->gameData = [];
        foreach ($commonGames as $gameName) {
            $this->gameData[] = [
                'id' => rand(100, 999),
                'name' => $gameName,
                'title' => str_replace('NG', '', $gameName),
                'denomination' => 1.00,
                'bet' => ['0.01', '0.02', '0.05', '0.10', '0.20'],
                'stat_in' => 0,
                'stat_out' => 0,
                'bank' => 1000,
                'shop_id' => 0,
                'view' => 1
            ];
        }

        echo "Found " . count($this->gameData) . " games available for testing (exist in both old/ and new/ folders)\n";
    }

    public function extractResultsForGame($gameName, $numSpins = 10)
    {
        echo "\n=== Extracting results for game: $gameName ===\n";

        $gameInfo = null;
        foreach ($this->gameData as $game) {
            if (isset($game['name']) && $game['name'] === $gameName) {
                $gameInfo = $game;
                break;
            }
        }

        if (!$gameInfo) {
            echo "Game $gameName not found in available games\n";
            return false;
        }

        $oldGamePath = __DIR__ . "/old/{$gameName}";
        if (!is_dir($oldGamePath)) {
            echo "Old game directory not found: $oldGamePath\n";
            return false;
        }

        if (!file_exists("$oldGamePath/Server.php")) {
            echo "Server.php not found for game: $gameName\n";
            return false;
        }

        $gameResults = [
            'gameName' => $gameName,
            'gameInfo' => $gameInfo,
            'spins' => []
        ];

        for ($i = 0; $i < $numSpins; $i++) {
            echo "Running spin " . ($i + 1) . "/$numSpins...\n";

            $spinResult = $this->executeOriginalSpin($gameName, $gameInfo, $i);
            if ($spinResult) {
                $gameResults['spins'][] = $spinResult;
            } else {
                echo "Failed to execute spin " . ($i + 1) . "\n";
            }
        }

        $this->results[$gameName] = $gameResults;
        echo "Completed extraction for $gameName: " . count($gameResults['spins']) . " successful spins\n";

        return true;
    }

    private function executeOriginalSpin($gameName, $gameInfo, $spinIndex)
    {
        $userId = 'test_user_' . $spinIndex;
        $user = [
            'id' => $userId,
            'username' => 'testuser_' . $spinIndex,
            'email' => 'test_' . $spinIndex . '@example.com',
            'balance' => 1000.00 + ($spinIndex * 100), // Vary balance slightly
            'count_balance' => 500.00,
            'address' => $spinIndex % 10
        ];

        $game = [
            'id' => $gameInfo['id'],
            'name' => $gameInfo['name'],
            'denomination' => floatval($gameInfo['denomination'] ?? 1.00),
            'bet' => is_array($gameInfo['bet']) ? $gameInfo['bet'] : explode(', ', $gameInfo['bet'] ?? '0.01, 0.02, 0.05'),
            'stat_in' => floatval($gameInfo['stat_in'] ?? 0),
            'stat_out' => floatval($gameInfo['stat_out'] ?? 0),
            'bank' => floatval($gameInfo['bank'] ?? 1000),
            'shop_id' => $gameInfo['shop_id'] ?? 0,
            'view' => $gameInfo['view'] ?? 1
        ];

        $shop = [
            'id' => $gameInfo['shop_id'] ?? 0,
            'name' => 'Test Shop',
            'percent' => $gameInfo['lines_percent_config_spin'] ? 94 : 90, // Default RTP
            'max_win' => 100000,
            'currency' => 'USD'
        ];

        $coinValue = 0.01; // 1 cent
        $betLevel = 1; // Bet level 1
        $lines = 20; // Assume 20 lines for most games

        $postData = [
            'cmd' => 'SpinRequest',
            'data' => [
                'coin' => $coinValue,
                'bet' => $betLevel,
                'lines' => $lines
            ]
        ];

        $result = $this->runOriginalGameServer($gameName, $userId, $user, $game, $shop, $postData);

        if ($result && isset($result['serverResponse'])) {
            return [
                'spinIndex' => $spinIndex,
                'input' => [
                    'user' => $user,
                    'game' => $game,
                    'shop' => $shop,
                    'postData' => $postData
                ],
                'output' => $result
            ];
        }

        return null;
    }

    private function runOriginalGameServer($gameName, $userId, $user, $game, $shop, $postData)
    {
        $tempScript = $this->createTempServerScript($gameName, $userId, $user, $game, $shop, $postData);

        $output = [];
        $returnCode = 0;
        exec("php $tempScript 2>&1", $output, $returnCode);

        unlink($tempScript);

        if ($returnCode !== 0) {
            echo "PHP execution failed with code $returnCode: " . implode("\n", $output) . "\n";
            return null;
        }

        $outputStr = implode("\n", $output);

        if (preg_match('/:::(.+)$/', $outputStr, $matches)) {
            $jsonStr = $matches[1];
            $result = json_decode($jsonStr, true);
            if ($result) {
                return $result;
            }
        }

        if (preg_match('/(\{.*\})/s', $outputStr, $matches)) {
            $result = json_decode($matches[1], true);
            if ($result) {
                return $result;
            }
        }

        echo "Failed to parse JSON response from output: $outputStr\n";
        return null;
    }

    private function createTempServerScript($gameName, $userId, $user, $game, $shop, $postData)
    {
        $tempFile = tempnam(sys_get_temp_dir(), 'game_server_');

        $mockCode = '<?php

class Auth {
    public static function id() {
        return "' . $userId . '";
    }
}

class Log {
    public static function info($msg) {}
    public static function error($msg) {}
}

function storage_path($path) {
    return "/tmp/" . $path;
}

function config($key) {
    return null;
}

class User {
    public $id;
    public $username;
    public $email;
    public $balance;
    public $count_balance;
    public $address;

    public function __construct($data) {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }

    public function save() {}
}

class Game {
    public $id;
    public $name;
    public $denomination;
    public $bet;
    public $stat_in;
    public $stat_out;
    public $bank;
    public $shop_id;
    public $view;

    public function __construct($data) {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }

    public function save() {}
}

class Shop {
    public $id;
    public $name;
    public $percent;
    public $max_win;
    public $currency;

    public function __construct($data) {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }
}

namespace App\Games\\' . $gameName . ';

require_once "' . __DIR__ . '/old/' . $gameName . '/Server.php";

$userObj = new \User(' . var_export($user, true) . ');
$gameObj = new \Game(' . var_export($game, true) . ');
$shopObj = new \Shop(' . var_export($shop, true) . ');

$postDataJson = ' . var_export(json_encode($postData), true) . ';

$_SERVER["REQUEST_METHOD"] = "POST";
$_SERVER["CONTENT_TYPE"] = "application/json";

$tempInput = tmpfile();
fwrite($tempInput, $postDataJson);
rewind($tempInput);

$oldStdin = fopen("php://stdin", "r");
$meta = stream_get_meta_data($tempInput);
fclose($oldStdin);

$GLOBALS["STDIN"] = $tempInput;

$server = new Server();
$server->handle("POST", "' . $userId . '", $userObj, $gameObj, $shopObj, ' . var_export($postData, true) . ');

fclose($tempInput);

?>';

        file_put_contents($tempFile, $mockCode);
        return $tempFile;
    }

    public function saveResults($outputFile = 'original_results.json')
    {
        $json = json_encode($this->results, JSON_PRETTY_PRINT);
        file_put_contents($outputFile, $json);
        echo "\nResults saved to $outputFile\n";
    }

    public function getResults()
    {
        return $this->results;
    }
}

if ($argc < 2) {
    echo "Usage: php extract_original_results.php <game_name> [num_spins]\n";
    echo "Example: php extract_original_results.php CrazyScientistNG 50\n";
    exit(1);
}

$gameName = $argv[1];
$numSpins = isset($argv[2]) ? intval($argv[2]) : 10;

try {
    $extractor = new OriginalResultsExtractor();
    $success = $extractor->extractResultsForGame($gameName, $numSpins);

    if ($success) {
        $extractor->saveResults();
        echo "\nExtraction completed successfully!\n";
    } else {
        echo "\nExtraction failed!\n";
        exit(1);
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}

?>