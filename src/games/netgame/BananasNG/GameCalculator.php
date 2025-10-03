<?php



class GameCalculator
{
    // Static configuration
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;

    // Properties from gameData
    public $shopPercent;
    public $game_stat_in;
    public $game_stat_out;
    public $bank;
    public $slotBonus;
    public $isBonusStart = false;
    public $MaxWin;
    public $increaseRTP;
    public $slotWildMpl;
    public $slotFreeCount;
    public $slotFreeMpl;
    public $AllBet;
    public $CurrentDenom;

    public function __construct($gameData)
    {
        if (!$gameData || !isset($gameData->user) || !isset($gameData->game) || !isset($gameData->shop)) {
            throw new \InvalidArgumentException('Invalid game data provided');
        }
        // Initialize dynamic properties from gameData object
        $this->shopPercent = $gameData->shop->percent;
        $this->rtpConfig = $gameData->rtp ?? [
            'spinChance' => 10,
            'bonusChance' => 20,
        ];
        $this->game_stat_in = $gameData->game->stat_in ?? 0;
        $this->game_stat_out = $gameData->game->stat_out ?? 0;
        $this->bank = $gameData->bank;
        $this->slotBonus = $gameData->game->slotBonus ?? true;
        $this->MaxWin = $gameData->shop->max_win ?? 1000000;
        $this->increaseRTP = $gameData->game->increaseRTP ?? 1;
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 2;
        $this->slotFreeCount = $gameData->game->slotFreeCount ?? 45;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;

        // Initialize static configuration for BananasNG
        $this->Paytable['SYM_0'] = [0, 0, 2, 30, 120, 800];
        $this->Paytable['SYM_1'] = [0, 0, 2, 30, 120, 800];
        $this->Paytable['SYM_2'] = [0, 0, 0, 20, 100, 400];
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 70, 250];
        $this->Paytable['SYM_4'] = [0, 0, 0, 20, 70, 250];
        $this->Paytable['SYM_5'] = [0, 0, 0, 10, 50, 120];
        $this->Paytable['SYM_6'] = [0, 0, 0, 10, 50, 120];
        $this->Paytable['SYM_7'] = [0, 0, 0, 4, 30, 100];
        $this->Paytable['SYM_8'] = [0, 0, 0, 4, 30, 100];
        $this->Paytable['SYM_9'] = [0, 0, 0, 4, 30, 100];
        $this->Paytable['SYM_10'] = [0, 0, 2, 4, 30, 100];
        $this->Paytable['SYM_11'] = [0, 2, 4, 20, 500, 0]; // Scatter
        $this->Paytable['SYM_12'] = [0, 10, 250, 2500, 9000, 0]; // Wild

        // Load reel strips from file
        $this->reelsStrip = ['reelStrip1' => [], 'reelStrip2' => [], 'reelStrip3' => [], 'reelStrip4' => [], 'reelStrip5' => []];
        $this->reelsStripBonus = ['reelStrip1' => [], 'reelStrip2' => [], 'reelStrip3' => [], 'reelStrip4' => [], 'reelStrip5' => []];
        $reelsFile = __DIR__ . '/reels.txt';
        if (file_exists($reelsFile)) {
            $temp = file($reelsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($temp as $str) {
                $parts = explode('=', $str);
                if (count($parts) === 2) {
                    $reelName = trim($parts[0]);
                    $reelData = explode(',', trim($parts[1]));
                    $filteredData = array_values(array_filter($reelData, fn($v) => $v !== '' && trim($v) !== ''));
                    if (isset($this->reelsStrip[$reelName])) {
                        $this->reelsStrip[$reelName] = $filteredData;
                    }
                    if (isset($this->reelsStripBonus[$reelName])) {
                        $this->reelsStripBonus[$reelName] = $filteredData;
                    }
                }
            }
        }
    }

    public function calculateSpin($postData)
    {
        $gameData = (object)$postData['gameData'];
        $slotEvent = $postData['slotEvent'] ?? 'bet';
        $bonusMpl = $slotEvent === 'freespin' ? $this->slotFreeMpl : 1;

        $lines = $gameData->lines;
        $betLine = $gameData->betLine;
        $this->AllBet = $betLine * $lines;

        $winTypeTmp = $this->GetSpinSettings($slotEvent, $betLine, $lines);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        for ($i = 0; $i <= 2000; $i++) {
            $totalWin = 0;
            $lineWins = [];
            $wild = '12';
            $scatter = '11';
            $reels = $this->GetReelStrips($winType, $slotEvent);

            for ($k = 0; $k < $lines; $k++) {
                $line = $gameData->linesId[$k];
                $lineSymbols = [];
                for($r=0; $r<5; $r++) $lineSymbols[$r] = $reels['reel'.($r+1)][$line[$r] - 1];

                $SymbolGame = ['0','1','2','3','4','5','6','7','8','9','10','12'];
                foreach ($SymbolGame as $csym) {
                    if ($csym == $scatter) continue;

                    $winCount = 0;
                    $wildCount = 0;
                    foreach($lineSymbols as $s) {
                        if($s == $csym || $s == $wild) {
                            $winCount++;
                            if($s == $wild) $wildCount++;
                        }
                        else break;
                    }

                    if ($winCount > 0) {
                        $pay = $this->Paytable['SYM_' . $csym][$winCount] ?? 0;
                        if ($pay > 0) {
                            $winMpl = ($wildCount > 0 && $wildCount < $winCount) ? $this->slotWildMpl : 1;
                            $winAmount = $pay * $betLine * $winMpl * $bonusMpl;

                            $wonSymbols = [];
                            for($r=0; $r<$winCount; $r++) $wonSymbols[] = '["'.$r.'","'.($line[$r]-1).'"]';
                            $lineWins[] = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $winAmount . '","wonSymbols":['.implode(',', $wonSymbols).']}';
                            $totalWin += $winAmount;
                        }
                    }
                }
            }

            $scattersWin = 0;
            $scattersPos = [];
            $scattersCount = 0;
            for ($r = 1; $r <= 5; $r++) {
                for ($p = 0; $p <= 2; $p++) {
                    if (isset($reels['reel' . $r][$p]) && $reels['reel' . $r][$p] == $scatter) {
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }
            $scattersWin = ($this->Paytable['SYM_' . $scatter][$scattersCount] ?? 0) * $this->AllBet;
            if ($scattersCount >= 3) {
                 $scw = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins":"' . $this->slotFreeCount . '"},"amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                 $lineWins[] = $scw;
            }
            $totalWin += $scattersWin;

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) continue;
            if ($totalWin <= $spinWinLimit) break;
            if ($i > 1500) break;
        }

        $winString = $totalWin > 0 ? ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}' : '';
        $symb = '["' . implode('","', $reels['reel1']) . '"],["' . implode('","', $reels['reel2']) . '"],["' . implode('","', $reels['reel3']) . '"],["' . implode('","', $reels['reel4']) . '"],["' . implode('","', $reels['reel5']) . '"]';

        return [
            'totalWin' => $totalWin,
            'reels' => $reels,
            'winString' => $winString,
            'symb' => $symb,
            'scattersCount' => $scattersCount
        ];
    }

    public function GetSpinSettings($garantType, $bet, $lines)
    {
        $this->AllBet = $bet * $lines;
        $currentPercent = $this->shopPercent;

        // Use the externalized RTP configuration
        $currentSpinWinChance = $this->rtpConfig['spinChance'];
        $currentBonusWinChance = $this->rtpConfig['bonusChance'];

        if ($this->game_stat_in > 0) {
            $rtpRange = $this->game_stat_out / $this->game_stat_in * 100;
            if ($rtpRange > $currentPercent) {
                // If RTP is high, double the denominator to lower the win chance
                $currentSpinWinChance *= 2;
                $currentBonusWinChance *= 2;
            }
        }

        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);
        $return = ['none', 0];

        if ($bonusWin == 1 && $this->slotBonus) {
            $this->isBonusStart = true;
            $winLimit = $this->bank;
            $return = ['bonus', $winLimit];
        } else if ($spinWin == 1) {
            $winLimit = $this->bank;
            $return = ['win', $winLimit];
        }

        return $return;
    }

    public function GetReelStrips($winType, $slotEvent)
    {
        $reelSource = ($slotEvent == 'freespin' && !empty($this->reelsStripBonus['reelStrip1'])) ? $this->reelsStripBonus : $this->reelsStrip;
        $reels = ['rp' => []];
        $prs = [];

        for ($i = 1; $i <= 5; $i++) {
            if (!empty($reelSource['reelStrip' . $i])) {
                $strip = $reelSource['reelStrip' . $i];
                $reelLength = count($strip);
                if ($reelLength < 3) continue;
                $pos = mt_rand(0, $reelLength - 3);
                $reels['reel' . $i] = [$strip[$pos], $strip[$pos+1], $strip[$pos+2]];
                $reels['rp'][] = $pos;
            } else {
                 $reels['reel' . $i] = ['0','0','0']; // Fallback for empty strip
                 $reels['rp'][] = 0;
            }
        }
        return $reels;
    }
}