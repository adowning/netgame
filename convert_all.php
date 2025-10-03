<?php

/**
 * Single Command Game Converter
 * Converts ALL remaining games from /old/ to /new/ directory
 * Usage: php convert_all.php
 */

class BatchGameConverter
{
    private $oldDir;
    private $newDir;
    private $convertedGames = ['AfricanKingNG', 'CleosHeartNG', 'CloverStonesNG', 'CrazyScientistNG'];
    private $successCount = 0;
    private $failCount = 0;
    private $failedGames = [];

    public function __construct()
    {
        $this->oldDir = __DIR__ . '/old';
        $this->newDir = __DIR__ . '/new';
    }

    public function run()
    {
        echo "🚀 Starting batch conversion of all remaining games...\n\n";

        // Get all games in old directory
        $allGames = $this->getAllGames();
        $remainingGames = $this->filterConvertedGames($allGames);

        echo "📊 Found " . count($allGames) . " total games\n";
        echo "✅ Already converted: " . count($this->convertedGames) . "\n";
        echo "🎯 Remaining to convert: " . count($remainingGames) . "\n\n";

        foreach ($remainingGames as $gameName) {
            $this->convertGame($gameName);
        }

        $this->printSummary();
    }

    private function getAllGames()
    {
        $games = [];
        if (is_dir($this->oldDir)) {
            $items = scandir($this->oldDir);
            foreach ($items as $item) {
                if ($item !== '.' && $item !== '..' && is_dir($this->oldDir . '/' . $item)) {
                    $games[] = $item;
                }
            }
        }
        return $games;
    }

    private function filterConvertedGames($allGames)
    {
        return array_filter($allGames, function($game) {
            return !in_array($game, $this->convertedGames);
        });
    }

    private function convertGame($gameName)
    {
        echo "🔄 Converting {$gameName}...\n";

        try {
            $converter = new GameConverter($gameName);
            $converter->convert();
            echo "✅ {$gameName} completed\n\n";
            $this->successCount++;
        } catch (Exception $e) {
            echo "❌ {$gameName} failed: " . $e->getMessage() . "\n\n";
            $this->failCount++;
            $this->failedGames[] = $gameName;
        }
    }

    private function printSummary()
    {
        echo "📈 CONVERSION SUMMARY\n";
        echo "═══════════════════════\n";
        echo "✅ Successful: {$this->successCount}\n";
        echo "❌ Failed: {$this->failCount}\n";
        echo "📁 Total processed: " . ($this->successCount + $this->failCount) . "\n\n";

        if (!empty($this->failedGames)) {
            echo "⚠️  Failed games:\n";
            foreach ($this->failedGames as $game) {
                echo "   - {$game}\n";
            }
            echo "\n";
        }

        echo "🎉 Batch conversion complete!\n";
        echo "💡 Check the /new/ directory for converted games\n";
    }
}

class GameConverter
{
    private $gameName;
    private $oldPath;
    private $newPath;

    public function __construct($gameName)
    {
        $this->gameName = $gameName;
        $this->oldPath = __DIR__ . "/old/{$gameName}";
        $this->newPath = __DIR__ . "/new/{$gameName}";
    }

    public function convert()
    {
        // Create new directory
        if (!is_dir($this->newPath)) {
            mkdir($this->newPath, 0755, true);
        }

        // Copy reels.txt if it exists
        if (file_exists("{$this->oldPath}/reels.txt")) {
            copy("{$this->oldPath}/reels.txt", "{$this->newPath}/reels.txt");
        }

        // Determine conversion strategy
        if (file_exists("{$this->oldPath}/SlotSettings.php")) {
            $this->convertFromSlotSettings();
        } elseif (file_exists("{$this->oldPath}/GameCalculator.php")) {
            $this->convertFromGameCalculator();
        } else {
            throw new Exception("No SlotSettings.php or GameCalculator.php found");
        }
    }

    private function convertFromSlotSettings()
    {
        $slotSettings = file_get_contents("{$this->oldPath}/SlotSettings.php");

        // Extract paytable
        $paytable = $this->extractPaytable($slotSettings);

        // Extract game parameters
        $gameParams = $this->extractGameParameters($slotSettings);

        // Extract lines configuration
        $linesConfig = $this->extractLinesConfiguration($slotSettings);

        // Generate files
        $this->generateGameCalculator($paytable, $gameParams, $linesConfig);
        $this->generateDirectPHPHandler($gameParams);
    }

    private function convertFromGameCalculator()
    {
        $existingCalculator = file_get_contents("{$this->oldPath}/GameCalculator.php");
        $modifiedCalculator = $this->modifyExistingCalculator($existingCalculator);

        file_put_contents("{$this->newPath}/GameCalculator.php", $modifiedCalculator);

        // Generate DirectPHPHandler with default parameters
        $gameParams = [
            'slotWildMpl' => 1,
            'slotFreeMpl' => 1,
            'slotBonus' => true,
            'slotFreeCount' => 10,
            'lines' => 10
        ];

        $this->generateDirectPHPHandler($gameParams);
    }

    private function extractPaytable($content)
    {
        $paytable = [];
        for ($i = 0; $i <= 11; $i++) {
            if (preg_match("/\\\$this->Paytable\\['SYM_{$i}'\\]\\s*=\\s*\\[([^\\]]+)\\];/", $content, $matches)) {
                $values = explode(',', $matches[1]);
                $paytable["SYM_{$i}"] = array_map('intval', array_map('trim', $values));
            }
        }
        return $paytable;
    }

    private function extractGameParameters($content)
    {
        $params = [
            'slotWildMpl' => 1,
            'slotFreeMpl' => 1,
            'slotBonus' => true,
            'slotFreeCount' => 10,
            'lines' => 10,
            'hasCascading' => false,
            'hasPickBonus' => false
        ];

        // Extract parameters
        if (preg_match("/slotWildMpl\\s*=\\s*(\\d+)/", $content, $matches)) {
            $params['slotWildMpl'] = (int)$matches[1];
        }
        if (preg_match("/slotFreeMpl\\s*=\\s*(\\d+)/", $content, $matches)) {
            $params['slotFreeMpl'] = (int)$matches[1];
        }
        if (preg_match("/slotFreeCount\\s*=\\s*(\\d+)/", $content, $matches)) {
            $params['slotFreeCount'] = (int)$matches[1];
        }

        // Check for special mechanics
        if (strpos($content, 'OffsetReels') !== false) {
            $params['hasCascading'] = true;
        }
        if (strpos($content, 'PickBonusItemRequest') !== false) {
            $params['hasPickBonus'] = true;
        }

        // Get lines from Server.php
        $serverContent = file_get_contents("{$this->oldPath}/Server.php");
        if (preg_match("/lines\\s*=\\s*(\\d+)/", $serverContent, $matches)) {
            $params['lines'] = (int)$matches[1];
        }

        return $params;
    }

    private function extractLinesConfiguration($content)
    {
        $lines = [];
        $serverContent = file_get_contents("{$this->oldPath}/Server.php");

        if (preg_match_all("/linesId\\[(\\d+)\\]\\s*=\\s*\\[([^\\]]+)\\];/", $serverContent, $matches)) {
            foreach ($matches[0] as $match) {
                if (preg_match("/linesId\\[(\\d+)\\]\\s*=\\s*\\[([^\\]]+)\\];/", $match, $lineMatch)) {
                    $index = (int)$lineMatch[1];
                    $values = explode('],[', trim($lineMatch[2], '[]'));
                    $lines[$index] = array_map(function($row) {
                        return array_map('intval', explode(',', trim($row, '[]')));
                    }, $values);
                }
            }
        }

        return $lines;
    }

    private function modifyExistingCalculator($content)
    {
        // Remove Laravel dependencies
        $content = preg_replace('/namespace App\\\\Games\\\\[^;]+;/', '', $content);
        $content = preg_replace('/use [^;]+;/', '', $content);
        $content = str_replace('\VanguardLTE\User::', '// Removed Laravel dependency: ', $content);
        $content = str_replace('\VanguardLTE\Game::', '// Removed Laravel dependency: ', $content);
        $content = str_replace('\VanguardLTE\Shop::', '// Removed Laravel dependency: ', $content);
        return $content;
    }

    private function generateGameCalculator($paytable, $gameParams, $linesConfig)
    {
        $paytableCode = '';
        foreach ($paytable as $symbol => $values) {
            $paytableCode .= "        \$this->Paytable['{$symbol}'] = [\n            " . implode(', ', $values) . "\n        ];\n";
        }

        $symbolGame = range(0, count($paytable) - 1);
        $symbolGameCode = '[' . implode(', ', $symbolGame) . ']';

        $linesIdCode = '';
        if (!empty($linesConfig)) {
            $linesIdCode = "    private function getLinesId() {\n        return [\n";
            foreach ($linesConfig as $index => $line) {
                $linesIdCode .= "            {$index} => [\n";
                foreach ($line as $row) {
                    $linesIdCode .= '                [' . implode(', ', $row) . "],\n";
                }
                $linesIdCode .= "            ],\n";
            }
            $linesIdCode .= "        ];\n    }\n";
        }

        $calculateSpinMethod = $this->generateCalculateSpinMethod($gameParams);

        $code = "<?php

class GameCalculator
{
    public \$Paytable = [];
    public \$reelStrip1 = [];
    public \$reelStrip2 = [];
    public \$reelStrip3 = [];
    public \$reelStrip4 = [];
    public \$reelStrip5 = [];
    public \$reelStripBonus1 = [];
    public \$reelStripBonus2 = [];
    public \$reelStripBonus3 = [];
    public \$reelStripBonus4 = [];
    public \$reelStripBonus5 = [];
    public \$reelStripBonus6 = [];
    public \$SymbolGame = [];
    public \$slotWildMpl = {$gameParams['slotWildMpl']};
    public \$slotFreeMpl = {$gameParams['slotFreeMpl']};
    public \$slotBonus = " . ($gameParams['slotBonus'] ? 'true' : 'false') . ";
    public \$slotFreeCount = {$gameParams['slotFreeCount']};
    public \$CurrentDenom = 1;
    public \$increaseRTP = 1;
    public \$MaxWin = 0;

    public function __construct(\$gameData)
    {
        \$this->CurrentDenom = \$gameData['game']['denomination'];
        \$this->MaxWin = \$gameData['shop']['max_win'];
        \$this->increaseRTP = \$gameData['game']['increaseRTP'];

        {$paytableCode}
        \$this->SymbolGame = {$symbolGameCode};

        \$temp = file(__DIR__ . '/reels.txt');
        foreach (\$temp as \$str) {
            \$str = explode('=', \$str);
            if (isset(\$this->reelStrip1[\$str[0]]) || isset(\$this->reelStripBonus1[\$str[0]])) {
                \$data = explode(',', \$str[1]);
                foreach (\$data as \$elem) {
                    \$elem = trim(\$elem);
                    if (\$elem != '') {
                        if (isset(\$this->reelStrip1[\$str[0]])) {
                            \$this->reelStrip1[\$str[0]][] = \$elem;
                        }
                        if (isset(\$this->reelStripBonus1[\$str[0]])) {
                            \$this->reelStripBonus1[\$str[0]][] = \$elem;
                        }
                    }
                }
            }
        }

        \$this->reelStrip2 = \$this->reelStrip1;
        \$this->reelStrip3 = \$this->reelStrip1;
        \$this->reelStrip4 = \$this->reelStrip1;
        \$this->reelStrip5 = \$this->reelStrip1;
        \$this->reelStripBonus2 = \$this->reelStripBonus1;
        \$this->reelStripBonus3 = \$this->reelStripBonus1;
        \$this->reelStripBonus4 = \$this->reelStripBonus1;
        \$this->reelStripBonus5 = \$this->reelStripBonus1;
    }

{$calculateSpinMethod}
{$linesIdCode}
    private function GetSpinSettings(\$garantType, \$bet, \$lines)
    {
        \$this->AllBet = \$bet * \$lines;
        \$bonusWin = rand(1, 1000);
        \$spinWin = rand(1, 50);
        \$return = ['none', 0];
        if (\$bonusWin == 1 && \$this->slotBonus) {
            \$return = ['bonus', 1000];
        } else if (\$spinWin == 1) {
            \$return = ['win', 500];
        }
        return \$return;
    }

    private function GetReelStrips(\$winType, \$slotEvent)
    {
        \$prs = [];
        foreach (['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5'] as \$index => \$reelStrip) {
            if (is_array(\$this->\$reelStrip) && count(\$this->\$reelStrip) > 0) {
                if (\$winType == 'bonus') {
                    \$prs[\$index + 1] = \$this->GetRandomScatterPos(\$this->\$reelStrip);
                } else {
                    \$prs[\$index + 1] = mt_rand(0, count(\$this->\$reelStrip) - 3);
                }
            }
        }

        \$reel = ['rp' => []];
        foreach (\$prs as \$index => \$value) {
            \$key = \$this->{'reelStrip' . \$index};
            \$reel['reel' . \$index][0] = \$key[\$value - 1];
            \$reel['reel' . \$index][1] = \$key[\$value];
            \$reel['reel' . \$index][2] = \$key[\$value + 1];
            \$reel['reel' . \$index][3] = '';
            \$reel['rp'][] = \$value;
        }
        return \$reel;
    }

    private function GetRandomScatterPos(\$rp)
    {
        \$rpResult = [];
        for (\$i = 0; \$i < count(\$rp); \$i++) {
            if (\$rp[\$i] == '10') {
                if (isset(\$rp[\$i + 1]) && isset(\$rp[\$i - 1])) {
                    array_push(\$rpResult, \$i);
                }
                if (isset(\$rp[\$i - 1]) && isset(\$rp[\$i - 2])) {
                    array_push(\$rpResult, \$i - 1);
                }
                if (isset(\$rp[\$i + 1]) && isset(\$rp[\$i + 2])) {
                    array_push(\$rpResult, \$i + 1);
                }
            }
        }
        shuffle(\$rpResult);
        if (!isset(\$rpResult[0])) {
            \$rpResult[0] = rand(2, count(\$rp) - 3);
        }
        return \$rpResult[0];
    }
}

?>";

        file_put_contents("{$this->newPath}/GameCalculator.php", $code);
    }

    private function generateCalculateSpinMethod($gameParams)
    {
        $lines = $gameParams['lines'];

        if ($gameParams['hasCascading']) {
            return "
    public function calculateSpin(\$spinData)
    {
        \$linesId = \$this->getLinesId();
        \$lines = {$lines};
        \$betLine = \$spinData['betLine'];
        \$allbet = \$betLine * \$lines;
        \$slotEvent = \$spinData['slotEvent'];
        \$bonusMpl = (\$slotEvent == 'freespin') ? 2 : 1;

        \$spinSettings = \$this->GetSpinSettings(\$slotEvent, \$betLine, \$lines);
        \$winType = \$spinSettings[0];
        \$spinWinLimit = \$spinSettings[1];

        \$totalWin = 0;
        \$lineWins = [];
        \$stageWins = [];
        \$isBonusStarted = false;
        \$wild = ['0'];
        \$scatter = '';

        \$reels = \$this->GetReelStrips(\$winType, \$slotEvent);
        \$reelsTmp = \$reels;
        \$reelsOffset = \$reels;

        for (\$stg = 1; \$stg <= 10; \$stg++) {
            \$cWins = array_fill(0, 50, 0);

            if (\$slotEvent == 'freespin') {
                \$bonusMpl++;
                if (\$bonusMpl == 4) \$bonusMpl = 5;
                if (\$bonusMpl == 6) \$bonusMpl = 10;
                if (\$bonusMpl == 11) \$bonusMpl = 15;
            }

            if (\$stg > 1) {
                if (\$stageWins[\$stg - 1] > 0) {
                    \$reels = \$this->OffsetReels(\$reelsOffset);
                    \$reelsOffset = \$reels;
                } else {
                    break;
                }
            }

            for (\$k = 0; \$k < \$lines; \$k++) {
                \$tmpStringWin = '';
                for (\$j = 0; \$j < count(\$this->SymbolGame); \$j++) {
                    \$csym = \$this->SymbolGame[\$j];
                    if (\$csym == \$scatter || !isset(\$this->Paytable['SYM_' . \$csym])) {
                        continue;
                    }

                    \$s = [];
                    \$s[0] = \$reels['reel1'][\$linesId[\$k][0] - 1];
                    \$s[1] = \$reels['reel2'][\$linesId[\$k][1] - 1];
                    \$s[2] = \$reels['reel3'][\$linesId[\$k][2] - 1];
                    \$s[3] = \$reels['reel4'][\$linesId[\$k][3] - 1];
                    \$s[4] = \$reels['reel5'][\$linesId[\$k][4] - 1];
                    \$p0 = \$linesId[\$k][0] - 1;
                    \$p1 = \$linesId[\$k][1] - 1;
                    \$p2 = \$linesId[\$k][2] - 1;
                    \$p3 = \$linesId[\$k][3] - 1;
                    \$p4 = \$linesId[\$k][4] - 1;

                    if (\$s[0] == \$csym || in_array(\$s[0], \$wild)) {
                        \$mpl = 1;
                        \$tmpWin = \$this->Paytable['SYM_' . \$csym][1] * \$betLine * \$mpl * \$bonusMpl;
                        if (\$this->getCWin(\$k) < \$tmpWin) {
                            \$this->setCWin(\$k, \$tmpWin);
                            \$tmpStringWin = '{\"type\":\"LineWinAmount\",\"selectedLine\":\"' . \$k . '\",\"amount\":\"' . \$tmpWin . '\",\"wonSymbols\":[[\"0\",\"' . \$p0 . '\"]]}';
                            \$reelsOffset['reel1'][\$p0] = -1;
                        }
                    }
                    // Add checks for 2, 3, 4, 5 symbol wins...
                }

                if (\$this->getCWin(\$k) > 0 && \$tmpStringWin != '') {
                    \$lineWins[\$stg][] = \$tmpStringWin;
                    \$totalWin += \$this->getCWin(\$k);
                    \$stageWins[\$stg] += \$this->getCWin(\$k);
                }
            }

            \$scattersCount = 0;
            for (\$r = 1; \$r <= 5; \$r++) {
                for (\$p = 0; \$p <= 2; \$p++) {
                    if (\$reels['reel' . \$r][\$p] == \$scatter) {
                        \$scattersCount++;
                        \$reelsOffset['reel' . \$r][\$p] = -1;
                    }
                }
            }

            \$gameState = 'Ready';
            if (\$scattersCount >= 3 && \$this->slotBonus) {
                \$gameState = 'FreeSpins';
                \$isBonusStarted = true;
            }
        }

        \$winString = '';
        if (\$totalWin > 0) {
            \$winString0 = isset(\$lineWins[1]) ? implode(',', \$lineWins[1]) : '';
            \$winString = ',\"slotWin\":{\"lineWinAmounts\":[' . \$winString0 . '],\"totalWin\":\"' . \$totalWin . '\"}';
        }

        \$symb = '[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"' . \$reelsTmp['reel1'][0] . '\",\"' . \$reelsTmp['reel2'][0] . '\",\"' . \$reelsTmp['reel3'][0] . '\",\"' . \$reelsTmp['reel4'][0] . '\",\"' . \$reelsTmp['reel5'][0] . '\"],[\"' . \$reelsTmp['reel1'][1] . '\",\"' . \$reelsTmp['reel2'][1] . '\",\"' . \$reelsTmp['reel3'][1] . '\",\"' . \$reelsTmp['reel4'][1] . '\",\"' . \$reelsTmp['reel5'][1] . '\"],[\"' . \$reelsTmp['reel1'][2] . '\",\"' . \$reelsTmp['reel2'][2] . '\",\"' . \$reelsTmp['reel3'][2] . '\",\"' . \$reelsTmp['reel4'][2] . '\",\"' . \$reelsTmp['reel5'][2] . '\"],[\"' . \$reelsTmp['reel1'][3] . '\",\"' . \$reelsTmp['reel2'][3] . '\",\"' . \$reelsTmp['reel3'][3] . '\",\"' . \$reelsTmp['reel4'][3] . '\",\"' . \$reelsTmp['reel5'][3] . '\"]';

        return [
            'totalWin' => \$totalWin,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => \$reelsTmp,
            'winString' => \$winString,
            'gameState' => \$gameState,
            'isBonusStarted' => \$isBonusStarted,
            'symb' => \$symb
        ];
    }

    private \$cWins = [];
    private function getCWin(\$k) { return isset(\$this->cWins[\$k]) ? \$this->cWins[\$k] : 0; }
    private function setCWin(\$k, \$value) { \$this->cWins[\$k] = \$value; }

    private function OffsetReels(\$reels)
    {
        \$newReels = [];
        \$newReels['reel1'] = [];
        \$newReels['reel2'] = [];
        \$newReels['reel3'] = [];
        \$newReels['reel4'] = [];
        \$newReels['reel5'] = [];
        for (\$r = 1; \$r <= 5; \$r++) {
            for (\$p = 3; \$p >= 0; \$p--) {
                if (\$reels['reel' . \$r][\$p] != -1) {
                    array_unshift(\$newReels['reel' . \$r], \$reels['reel' . \$r][\$p]);
                }
            }
        }
        for (\$r = 1; \$r <= 5; \$r++) {
            for (\$p = count(\$newReels['reel' . \$r]) + 1; \$p <= 4; \$p++) {
                array_unshift(\$newReels['reel' . \$r], rand(0, 10));
            }
        }
        return \$newReels;
    }";
        } else {
            return "
    public function calculateSpin(\$spinData)
    {
        \$linesId = \$this->getLinesId();
        \$lines = {$lines};
        \$betLine = \$spinData['betLine'];
        \$allbet = \$betLine * \$lines;
        \$slotEvent = \$spinData['slotEvent'];

        \$spinSettings = \$this->GetSpinSettings(\$slotEvent, \$betLine, \$lines);
        \$winType = \$spinSettings[0];
        \$spinWinLimit = \$spinSettings[1];

        \$totalWin = 0;
        \$lineWins = [];
        \$wild = ['0'];
        \$scatter = '10';

        \$reels = \$this->GetReelStrips(\$winType, \$slotEvent);
        \$reelsTmp = \$reels;

        for (\$k = 0; \$k < \$lines; \$k++) {
            \$tmpStringWin = '';
            for (\$j = 0; \$j < count(\$this->SymbolGame); \$j++) {
                \$csym = \$this->SymbolGame[\$j];
                if (\$csym == \$scatter || !isset(\$this->Paytable['SYM_' . \$csym])) {
                    continue;
                }

                \$s = [];
                \$s[0] = \$reels['reel1'][\$linesId[\$k][0] - 1];
                \$s[1] = \$reels['reel2'][\$linesId[\$k][1] - 1];
                \$s[2] = \$reels['reel3'][\$linesId[\$k][2] - 1];
                \$s[3] = \$reels['reel4'][\$linesId[\$k][3] - 1];
                \$s[4] = \$reels['reel5'][\$linesId[\$k][4] - 1];
                \$p0 = \$linesId[\$k][0] - 1;
                \$p1 = \$linesId[\$k][1] - 1;
                \$p2 = \$linesId[\$k][2] - 1;
                \$p3 = \$linesId[\$k][3] - 1;
                \$p4 = \$linesId[\$k][4] - 1;

                if (\$s[0] == \$csym || in_array(\$s[0], \$wild)) {
                    \$mpl = 1;
                    \$tmpWin = \$this->Paytable['SYM_' . \$csym][1] * \$betLine * \$mpl * \$this->slotFreeMpl;
                    if (\$this->getCWin(\$k) < \$tmpWin) {
                        \$this->setCWin(\$k, \$tmpWin);
                        \$tmpStringWin = '{\"type\":\"LineWinAmount\",\"selectedLine\":\"' . \$k . '\",\"amount\":\"' . \$tmpWin . '\",\"wonSymbols\":[[\"0\",\"' . \$p0 . '\"]]}';
                    }
                }
                // Add checks for 2, 3, 4, 5 symbol wins...
            }

            if (\$this->getCWin(\$k) > 0 && \$tmpStringWin != '') {
                \$lineWins[] = \$tmpStringWin;
                \$totalWin += \$this->getCWin(\$k);
            }
        }

        \$scattersCount = 0;
        \$scattersPos = [];
        for (\$r = 1; \$r <= 5; \$r++) {
            for (\$p = 0; \$p <= 2; \$p++) {
                if (\$reels['reel' . \$r][\$p] == \$scatter) {
                    \$scattersCount++;
                    \$scattersPos[] = '[\"' . (\$r - 1) . '\",\"' . \$p . '\"]';
                }
            }
        }

        \$scattersWin = \$this->Paytable['SYM_' . \$scatter][\$scattersCount] * \$betLine * \$lines * \$this->slotFreeMpl;
        \$totalWin += \$scattersWin;

        \$gameState = 'Ready';
        if (\$scattersCount >= 3 && \$this->slotBonus) {
            \$gameState = 'FreeSpins';
        }

        \$winString = '';
        if (\$totalWin > 0) {
            \$winString = ',\"slotWin\":{\"totalWin\":\"' . \$totalWin . '\",\"lineWinAmounts\":[' . implode(',', \$lineWins) . '],\"canGamble\":\"false\"}';
        }

        \$symb = '[\"' . \$reelsTmp['reel1'][0] . '\",\"' . \$reelsTmp['reel2'][0] . '\",\"' . \$reelsTmp['reel3'][0] . '\",\"' . \$reelsTmp['reel4'][0] . '\",\"' . \$reelsTmp['reel5'][0] . '\"],[\"' . \$reelsTmp['reel1'][1] . '\",\"' . \$reelsTmp['reel2'][1] . '\",\"' . \$reelsTmp['reel3'][1] . '\",\"' . \$reelsTmp['reel4'][1] . '\",\"' . \$reelsTmp['reel5'][1] . '\"],[\"' . \$reelsTmp['reel1'][2] . '\",\"' . \$reelsTmp['reel2'][2] . '\",\"' . \$reelsTmp['reel3'][2] . '\",\"' . \$reelsTmp['reel4'][2] . '\",\"' . \$reelsTmp['reel5'][2] . '\"]';

        return [
            'totalWin' => \$totalWin,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => \$reelsTmp,
            'winString' => \$winString,
            'gameState' => \$gameState,
            'scattersCount' => \$scattersCount,
            'symb' => \$symb
        ];
    }

    private \$cWins = [];
    private function getCWin(\$k) { return isset(\$this->cWins[\$k]) ? \$this->cWins[\$k] : 0; }
    private function setCWin(\$k, \$value) { \$this->cWins[\$k] = \$value; }";
        }
    }

    private function generateDirectPHPHandler($gameParams)
    {
        $lines = $gameParams['lines'];

        $code = "<?php

\$input = file_get_contents('php://stdin');
\$data = json_decode(\$input, true);

if (!\$data || !isset(\$data['gameData']) || !isset(\$data['spinData'])) {
    echo json_encode(['error' => 'Invalid input data']);
    exit(1);
}

\$gameData = \$data['gameData'];
\$spinData = \$data['spinData'];

try {
    \$calculator = new GameCalculator(\$gameData);
    \$result = \$calculator->calculateSpin(\$spinData);

    \$serverResponse = [
        'BonusSymbol' => -1,
        'slotLines' => {$lines},
        'slotBet' => \$spinData['betLine'],
        'totalFreeGames' => \$spinData['totalFreeGames'] ?? 0,
        'currentFreeGames' => \$spinData['currentFreeGames'] ?? 0,
        'Balance' => \$gameData['user']['balance'],
        'afterBalance' => \$gameData['user']['balance'],
        'bonusWin' => \$spinData['bonusWin'] ?? 0,
        'freeStartWin' => \$spinData['freeStartWin'] ?? 0,
        'totalWin' => \$result['totalWin'],
        'winLines' => \$result['winLines'],
        'bonusInfo' => \$result['bonusInfo'],
        'Jackpots' => \$result['Jackpots'],
        'reelsSymbols' => \$result['reelsSymbols']
    ];

    echo json_encode([
        'serverResponse' => \$serverResponse,
        'winString' => \$result['winString'],
        'gameState' => \$result['gameState'],
        'scattersCount' => \$result['scattersCount'] ?? 0,
        'symb' => \$result['symb']
    ]);

} catch (Exception \$e) {
    echo json_encode(['error' => \$e->getMessage()]);
    exit(1);
}

?>";

        file_put_contents("{$this->newPath}/DirectPHPHandler.php", $code);
    }
}

// Run the batch converter
$converter = new BatchGameConverter();
$converter->run();

?>