<?php

namespace App\Games\BananasNG;

class GameCalculator
{
    // Static configuration
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;
    public $wildSymbol = '12';
    public $scatterSymbol = '11';

    // Properties from gameData
    public $shopPercent;
    public $rtpConfig;
    public $game_stat_in;
    public $game_stat_out;
    public $bank;
    public $slotBonus;
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
        $this->rtpConfig = $gameData->rtp ?? ['spinChance' => 10, 'bonusChance' => 20];
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
                    if (isset($this->reelsStrip[$reelName])) {
                        $this->reelsStrip[$reelName] = array_values(array_filter($reelData, fn($v) => trim($v) !== ''));
                    }
                    if (isset($this->reelsStripBonus[$reelName])) {
                         $this->reelsStripBonus[$reelName] = array_values(array_filter($reelData, fn($v) => trim($v) !== ''));
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
            $reels = $this->GetReelStrips($winType, $slotEvent);

            for ($k = 0; $k < $lines; $k++) {
                $line = $gameData->linesId[$k];
                $lineSymbols = [];
                for ($r = 0; $r < 5; $r++) $lineSymbols[] = $reels['reel' . ($r + 1)][$line[$r] - 1];

                $SymbolGame = ['0','1','2','3','4','5','6','7','8','9','10','12'];
                foreach ($SymbolGame as $csym) {
                    if ($csym == $this->scatterSymbol) continue;

                    $winCount = 0;
                    $wildCount = 0;
                    foreach ($lineSymbols as $s) {
                        if ($s == $csym || $s == $this->wildSymbol) {
                            $winCount++;
                            if ($s == $this->wildSymbol) $wildCount++;
                        } else break;
                    }

                    if ($winCount > 0) {
                        $pay = $this->Paytable['SYM_' . $csym][$winCount] ?? 0;
                        if ($pay > 0) {
                            $winMpl = ($wildCount > 0 && $wildCount < $winCount) ? $this->slotWildMpl : 1;
                            $winAmount = $pay * $betLine * $winMpl * $bonusMpl;

                            $wonSymbols = [];
                            for ($r = 0; $r < $winCount; $r++) $wonSymbols[] = '["' . $r . '","' . ($line[$r] - 1) . '"]';
                            $lineWins[] = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $winAmount . '","wonSymbols":[' . implode(',', $wonSymbols) . ']}';
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
                    if (isset($reels['reel' . $r][$p]) && $reels['reel' . $r][$p] == $this->scatterSymbol) {
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }
            if(isset($this->Paytable['SYM_' . $this->scatterSymbol][$scattersCount])) {
                $scattersWin = $this->Paytable['SYM_' . $this->scatterSymbol][$scattersCount] * $this->AllBet;
            }

            if ($scattersCount >= 3) {
                 $lineWins[] = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins":"' . $this->slotFreeCount . '"},"amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
            }
            $totalWin += $scattersWin;

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) continue;
            if ($totalWin <= $spinWinLimit) break;
            if ($i > 1500) break;
        }

        $winString = $totalWin > 0 ? ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}' : '';
        $symb = '["' . implode('","', $reels['reel1']) . '"],["' . implode('","', $reels['reel2']) . '"],["' . implode('","', $reels['reel3']) . '"],["' . implode('","', $reels['reel4']) . '"],["' . implode('","', $reels['reel5']) . '"]';

        return ['totalWin' => $totalWin, 'reels' => $reels, 'winString' => $winString, 'symb' => $symb, 'scattersCount' => $scattersCount];
    }

    public function GetSpinSettings($garantType, $bet, $lines)
    {
        $this->AllBet = $bet * $lines;
        $currentPercent = $this->shopPercent;
        $currentSpinWinChance = $this->rtpConfig['spinChance'];
        $currentBonusWinChance = $this->rtpConfig['bonusChance'];

        if ($this->game_stat_in > 0) {
            $rtpRange = $this->game_stat_out / $this->game_stat_in * 100;
            if ($rtpRange > $currentPercent) {
                $currentSpinWinChance *= 2;
                $currentBonusWinChance *= 2;
            }
        }

        $return = ['none', 0];
        if (rand(1, $currentBonusWinChance) == 1 && $this->slotBonus) {
            $return = ['bonus', $this->bank];
        } else if (rand(1, $currentSpinWinChance) == 1) {
            $return = ['win', $this->bank];
        }
        return $return;
    }

    public function GetReelStrips($winType, $slotEvent)
    {
        $reelSource = ($slotEvent == 'freespin' && !empty($this->reelsStripBonus['reelStrip1'])) ? $this->reelsStripBonus : $this->reelsStrip;
        $reels = ['rp' => []];

        for ($i = 1; $i <= 5; $i++) {
            if (!empty($reelSource['reelStrip' . $i])) {
                $strip = $reelSource['reelStrip' . $i];
                $reelLength = count($strip);
                $pos = mt_rand(0, $reelLength - 1);
                $reels['reel' . $i] = [$strip[$pos], $strip[($pos + 1) % $reelLength], $strip[($pos + 2) % $reelLength]];
                $reels['rp'][] = $pos;
            } else {
                 $reels['reel' . $i] = ['0', '0', '0'];
                 $reels['rp'][] = 0;
            }
        }
        return $reels;
    }
}