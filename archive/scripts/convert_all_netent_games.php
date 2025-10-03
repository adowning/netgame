<?php

/**
 * Automated PHP script to convert all remaining NetEnt games from src/old/ to src/games/netent/
 * Following AGENTS.md specifications for Phase 3: PHP Refactoring
 */

class NetEntGameConverter
{
    private $sourceDir = 'src/old';
    private $targetDir = 'src/games/netent';
    private $processedGames = 0;
    private $errors = [];

    public function run()
    {
        echo "Starting NetEnt game conversion...\n";
        echo "Source directory: {$this->sourceDir}\n";
        echo "Target directory: {$this->targetDir}\n\n";

        // Create target directory if it doesn't exist
        if (!is_dir($this->targetDir)) {
            mkdir($this->targetDir, 0755, true);
            echo "Created target directory: {$this->targetDir}\n";
        }

        // Scan for NET games
        $games = $this->scanNetGames();
        echo "Found " . count($games) . " NetEnt games to convert:\n";
        foreach ($games as $game) {
            echo "- $game\n";
        }
        echo "\n";

        // Process each game
        foreach ($games as $gameName) {
            try {
                $this->convertGame($gameName);
                $this->processedGames++;
                echo "✓ Converted: $gameName\n";
            } catch (Exception $e) {
                $this->errors[] = "$gameName: " . $e->getMessage();
                echo "✗ Failed: $gameName - " . $e->getMessage() . "\n";
            }
        }

        // Summary
        $this->printSummary();
    }

    private function scanNetGames()
    {
        $games = [];
        if (!is_dir($this->sourceDir)) {
            throw new Exception("Source directory does not exist: {$this->sourceDir}");
        }

        $items = scandir($this->sourceDir);
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') continue;
            $path = $this->sourceDir . '/' . $item;
            if (is_dir($path) && substr($item, -3) === 'NET') {
                $games[] = $item;
            }
        }
        return $games;
    }

    private function convertGame($gameName)
    {
        $sourcePath = $this->sourceDir . '/' . $gameName;
        $targetPath = $this->targetDir . '/' . $gameName;

        // Create game directory
        if (!is_dir($targetPath)) {
            mkdir($targetPath, 0755, true);
        }

        // Copy reels.txt
        $this->copyReelsFile($sourcePath, $targetPath);

        // Create GameCalculator.php
        $this->createGameCalculator($gameName, $sourcePath, $targetPath);

        // Create DirectPHPHandler.php
        $this->createDirectPHPHandler($gameName, $targetPath);
    }

    private function copyReelsFile($sourcePath, $targetPath)
    {
        $sourceReels = $sourcePath . '/reels.txt';
        $targetReels = $targetPath . '/reels.txt';

        if (file_exists($sourceReels)) {
            copy($sourceReels, $targetReels);
        } else {
            throw new Exception("reels.txt not found in $sourcePath");
        }
    }

    private function createGameCalculator($gameName, $sourcePath, $targetPath)
    {
        $slotSettingsPath = $sourcePath . '/SlotSettings.php';
        $serverPath = $sourcePath . '/Server.php';

        if (!file_exists($slotSettingsPath)) {
            throw new Exception("SlotSettings.php not found");
        }
        if (!file_exists($serverPath)) {
            throw new Exception("Server.php not found");
        }

        // Extract configuration from SlotSettings.php
        $paytable = $this->extractPaytable($slotSettingsPath);
        $reelStrips = $this->extractReelStrips($slotSettingsPath);
        $gameConfig = $this->extractGameConfig($slotSettingsPath);

        // Extract spin logic from Server.php
        $spinLogic = $this->extractSpinLogic($serverPath);

        // Generate GameCalculator.php
        $calculatorCode = $this->generateGameCalculatorCode($gameName, $paytable, $reelStrips, $gameConfig, $spinLogic);

        file_put_contents($targetPath . '/GameCalculator.php', $calculatorCode);
    }

    private function extractPaytable($filePath)
    {
        $content = file_get_contents($filePath);
        $paytable = [];

        // Extract Paytable assignments
        preg_match_all('/\$this->Paytable\\[\'SYM_(\\d+)\'\\]\\s*=\\s*\\[([^\\]]+)\\];/', $content, $matches);

        foreach ($matches[1] as $index => $symIndex) {
            $values = explode(',', trim($matches[2][$index]));
            $paytable['SYM_' . $symIndex] = array_map('intval', array_map('trim', $values));
        }

        return $paytable;
    }

    private function extractReelStrips($filePath)
    {
        $content = file_get_contents($filePath);
        $reelStrips = [];

        // Extract reelStrip assignments
        preg_match_all('/\$this->reelStrip(\\d+)\\s*=\\s*([^;]+);/', $content, $matches);

        foreach ($matches[1] as $index => $reelNum) {
            $reelData = trim($matches[2][$index]);
            // Parse the array - this is simplified, may need adjustment for complex arrays
            $reelStrips['reelStrip' . $reelNum] = $this->parseReelArray($reelData);
        }

        return $reelStrips;
    }

    private function parseReelArray($arrayString)
    {
        // Simple parsing - may need to be more sophisticated
        $arrayString = trim($arrayString);
        if (preg_match('/^\\[(.+)\\]$/', $arrayString, $match)) {
            $values = explode(',', $match[1]);
            return array_map(function($v) { return trim($v, "'\""); }, $values);
        }
        return [];
    }

    private function extractGameConfig($filePath)
    {
        $content = file_get_contents($filePath);
        $config = [];

        // Extract various config values
        $patterns = [
            'slotBonus' => '/\$this->slotBonus\\s*=\\s*([^;]+);/',
            'slotWildMpl' => '/\$this->slotWildMpl\\s*=\\s*([^;]+);/',
            'slotFreeMpl' => '/\$this->slotFreeMpl\\s*=\\s*([^;]+);/',
            'slotFreeCount' => '/\$this->slotFreeCount\\s*=\\s*([^;]+);/',
        ];

        foreach ($patterns as $key => $pattern) {
            if (preg_match($pattern, $content, $match)) {
                $config[$key] = trim($match[1]);
            }
        }

        return $config;
    }

    private function extractSpinLogic($filePath)
    {
        $content = file_get_contents($filePath);

        // Find the spin calculation loop (simplified extraction)
        $start = strpos($content, 'for( $i = 0; $i <= 2000; $i++ )');
        if ($start === false) {
            return "// Spin logic extraction failed - manual adaptation required\n";
        }

        $end = strpos($content, '$slotSettings->SaveLogReport', $start);
        if ($end === false) {
            $end = strlen($content);
        }

        $spinLogic = substr($content, $start, $end - $start);

        // Remove Laravel dependencies
        $spinLogic = $this->removeLaravelDependencies($spinLogic);

        return $spinLogic;
    }

    private function removeLaravelDependencies($code)
    {
        // Remove Laravel model calls and database operations
        $patterns = [
            '/\\\\VanguardLTE\\\\[^\\s]+::[^\\n]+/m',
            '/\$slotSettings->SetBalance\\([^)]+\\);/',
            '/\$slotSettings->SetBank\\([^)]+\\);/',
            '/\$slotSettings->UpdateJackpots\\([^)]+\\);/',
            '/\$slotSettings->SaveLogReport\\([^)]+\\);/',
            '/\$slotSettings->SaveGameData\\(\\);/',
            '/\$slotSettings->SaveGameDataStatic\\(\\);/',
        ];

        foreach ($patterns as $pattern) {
            $code = preg_replace($pattern, '// Removed Laravel dependency', $code);
        }

        return $code;
    }

    private function generateGameCalculatorCode($gameName, $paytable, $reelStrips, $gameConfig, $spinLogic)
    {
        $paytableCode = $this->generatePaytableCode($paytable);
        $reelStripsCode = $this->generateReelStripsCode($reelStrips);
        $configCode = $this->generateConfigCode($gameConfig);

        return "<?php

namespace App\\Games\\NetEnt\\{$gameName};

class GameCalculator
{
    // Static configuration
    public \$Paytable;
    public \$reelsStrip;
    public \$reelsStripBonus;

    // Properties from gameData
    public \$shopPercent;
    public \$rtpConfig;
    public \$game_stat_in;
    public \$game_stat_out;
    public \$bank;
    public \$slotBonus;
    public \$MaxWin;
    public \$increaseRTP;
    public \$slotWildMpl;
    public \$slotFreeMpl;
    public \$CurrentDenom;

    public function __construct(\$gameData)
    {
        if (!\$gameData || !isset(\$gameData->user) || !isset(\$gameData->game) || !isset(\$gameData->shop)) {
            throw new \\InvalidArgumentException('Invalid game data provided');
        }

        // Initialize dynamic properties from gameData object
        \$this->shopPercent = \$gameData->shop->percent;
        \$this->rtpConfig = \$gameData->rtp ?? [
            'spinChance' => 10,
            'bonusChance' => 20,
        ];
        \$this->game_stat_in = \$gameData->game->stat_in ?? 0;
        \$this->game_stat_out = \$gameData->game->stat_out ?? 0;
        \$this->bank = \$gameData->bank;
        \$this->slotBonus = \$gameData->game->slotBonus ?? true;
        \$this->MaxWin = \$gameData->shop->max_win ?? 1000000;
        \$this->increaseRTP = \$gameData->game->increaseRTP ?? 1;
        \$this->slotWildMpl = \$gameData->game->slotWildMpl ?? 1;
        \$this->slotFreeMpl = \$gameData->game->slotFreeMpl ?? 1;
        \$this->CurrentDenom = \$gameData->game->denomination;

{$paytableCode}

{$reelStripsCode}

{$configCode}

        // Load reel strips from file
        \$this->reelsStrip = ['reelStrip1' => [], 'reelStrip2' => [], 'reelStrip3' => [], 'reelStrip4' => [], 'reelStrip5' => []];
        \$this->reelsStripBonus = ['reelStrip1' => [], 'reelStrip2' => [], 'reelStrip3' => [], 'reelStrip4' => [], 'reelStrip5' => []];
        \$reelsFile = __DIR__ . '/reels.txt';
        if (file_exists(\$reelsFile)) {
            \$temp = file(\$reelsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach (\$temp as \$str) {
                \$parts = explode('=', \$str);
                if (count(\$parts) === 2) {
                    \$reelName = trim(\$parts[0]);
                    \$reelData = explode(',', trim(\$parts[1]));
                    \$filteredData = array_values(array_filter(\$reelData, fn(\$v) => \$v !== '' && trim(\$v) !== ''));
                    if (isset(\$this->reelsStrip[\$reelName])) {
                        \$this->reelsStrip[\$reelName] = \$filteredData;
                    }
                    if (isset(\$this->reelsStripBonus[\$reelName])) {
                        \$this->reelsStripBonus[\$reelName] = \$filteredData;
                    }
                }
            }
        }
    }

    public function calculateSpin(\$postData)
    {
        \$gameData = (object)\$postData['gameData'];
        \$slotEvent = \$postData['slotEvent'] ?? 'bet';
        \$bonusMpl = \$slotEvent === 'freespin' ? \$this->slotFreeMpl : 1;

        \$lines = \$gameData->lines ?? 20;
        \$betLine = \$gameData->betLine ?? 1;
        \$this->AllBet = \$betLine * \$lines;

        // Extracted spin logic (may require manual adaptation)
{$spinLogic}

        // Return serverResponse structure
        return [
            'BonusSymbol' => -1,
            'slotLines' => \$lines,
            'slotBet' => \$betLine,
            'totalFreeGames' => 0,
            'currentFreeGames' => 0,
            'Balance' => \$gameData->user->balance ?? 1000,
            'afterBalance' => (\$gameData->user->balance ?? 1000) - (\$this->AllBet * \$this->CurrentDenom),
            'bonusWin' => 0,
            'freeStartWin' => 0,
            'totalWin' => \$totalWin ?? 0,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => [
                'reel1' => isset(\$reels['reel1']) ? \$reels['reel1'] : ['0','1','2'],
                'reel2' => isset(\$reels['reel2']) ? \$reels['reel2'] : ['3','4','5'],
                'reel3' => isset(\$reels['reel3']) ? \$reels['reel3'] : ['6','7','8'],
                'reel4' => isset(\$reels['reel4']) ? \$reels['reel4'] : ['9','0','1'],
                'reel5' => isset(\$reels['reel5']) ? \$reels['reel5'] : ['2','3','4'],
                'rp' => isset(\$reels['rp']) ? \$reels['rp'] : [0,0,0,0,0]
            ]
        ];
    }

    // Additional methods may be needed based on extracted logic
}
";
    }

    private function generatePaytableCode($paytable)
    {
        $code = "        // Initialize Paytable\n";
        foreach ($paytable as $sym => $values) {
            $code .= "        \$this->Paytable['{$sym}'] = [" . implode(', ', $values) . "];\n";
        }
        return $code;
    }

    private function generateReelStripsCode($reelStrips)
    {
        $code = "        // Initialize reel strips\n";
        foreach ($reelStrips as $reelName => $values) {
            $code .= "        \$this->{$reelName} = ['" . implode("','", $values) . "'];\n";
        }
        return $code;
    }

    private function generateConfigCode($config)
    {
        $code = "        // Initialize game configuration\n";
        foreach ($config as $key => $value) {
            $code .= "        \$this->{$key} = {$value};\n";
        }
        return $code;
    }

    private function createDirectPHPHandler($gameName, $targetPath)
    {
        $handlerCode = "<?php

namespace App\\Games\\NetEnt\\{$gameName};

class DirectPHPHandler
{
    public static function main()
    {
        try {
            // Read JSON input from stdin
            \$input = file_get_contents('php://stdin');
            \$data = json_decode(\$input, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \\Exception('Invalid JSON input: ' . json_last_error_msg());
            }

            if (!isset(\$data['gameData'])) {
                throw new \\Exception('Missing gameData in input');
            }

            // Instantiate calculator
            \$calculator = new GameCalculator((object)\$data['gameData']);

            // Execute spin calculation
            \$result = \$calculator->calculateSpin(\$data);

            // Output JSON result
            echo json_encode(\$result);

        } catch (\\Exception \$e) {
            // Error handling
            \$errorResponse = [
                'error' => true,
                'message' => \$e->getMessage(),
                'BonusSymbol' => -1,
                'slotLines' => 20,
                'slotBet' => 0.01,
                'totalFreeGames' => 0,
                'currentFreeGames' => 0,
                'Balance' => 1000.00,
                'afterBalance' => 1000.00,
                'bonusWin' => 0,
                'freeStartWin' => 0,
                'totalWin' => 0,
                'winLines' => [],
                'bonusInfo' => [],
                'Jackpots' => [],
                'reelsSymbols' => [
                    'reel1' => ['0','1','2'],
                    'reel2' => ['3','4','5'],
                    'reel3' => ['6','7','8'],
                    'reel4' => ['9','0','1'],
                    'reel5' => ['2','3','4'],
                    'rp' => [0,0,0,0,0]
                ]
            ];
            echo json_encode(\$errorResponse);
            exit(1);
        }
    }
}

// Execute if called directly
if (basename(__FILE__) === basename(\$_SERVER['PHP_SELF'])) {
    DirectPHPHandler::main();
}
";

        file_put_contents($targetPath . '/DirectPHPHandler.php', $handlerCode);
    }

    private function printSummary()
    {
        echo "\n=== CONVERSION SUMMARY ===\n";
        echo "Successfully converted: {$this->processedGames} games\n";

        if (!empty($this->errors)) {
            echo "Errors encountered:\n";
            foreach ($this->errors as $error) {
                echo "- $error\n";
            }
        }

        echo "\nNote: The generated GameCalculator.php files may require manual adaptation of the spin logic\n";
        echo "to ensure mathematical accuracy. Please review and test each converted game.\n";
    }
}

// Run the converter
try {
    $converter = new NetEntGameConverter();
    $converter->run();
} catch (Exception $e) {
    echo "Fatal error: " . $e->getMessage() . "\n";
    exit(1);
}