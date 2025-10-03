<?php

namespace App\Games\Royal40FruitsNG;

class GameCalculator
{
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;

    private $shopPercent;
    private $game_stat_in;
    private $game_stat_out;
    private $bank;
    private $slotBonus;
    private $isBonusStart = false;
    private $MaxWin;
    private $increaseRTP;
    private $slotWildMpl;
    private $slotFreeCount;
    private $slotFreeMpl;
    private $CurrentDenom;
    private $rtpConfig;

    public function __construct($gameData)
    {
        if (!$gameData || !isset($gameData->user) || !isset($gameData->game) || !isset($gameData->shop)) {
            throw new \InvalidArgumentException('Invalid game data provided');
        }

        $this->shopPercent = $gameData->shop->percent;
        $this->rtpConfig = $gameData->rtp ?? ['spinChance' => 10, 'bonusChance' => 20];
        $this->game_stat_in = $gameData->game->stat_in ?? 0;
        $this->game_stat_out = $gameData->game->stat_out ?? 0;
        $this->bank = $gameData->bank;
        $this->slotBonus = $gameData->game->slotBonus ?? false; // Royal40FruitsNG doesn't have a bonus game
        $this->MaxWin = $gameData->shop->max_win ?? 1000000;
        $this->increaseRTP = $gameData->game->increaseRTP ?? 1;
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeCount = $gameData->game->slotFreeCount ?? 0; // No free spins in this game
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;

        $this->Paytable['SYM_0'] = [0, 0, 0, 40, 400, 1000];
        $this->Paytable['SYM_1'] = [0, 0, 0, 20, 80, 400];
        $this->Paytable['SYM_2'] = [0, 0, 0, 20, 40, 200];
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 40, 200];
        $this->Paytable['SYM_4'] = [0, 0, 0, 10, 20, 100];
        $this->Paytable['SYM_5'] = [0, 0, 0, 10, 20, 100];
        $this->Paytable['SYM_6'] = [0, 0, 0, 10, 20, 100];
        $this->Paytable['SYM_7'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 20, 45, 75, 100, 125, 175, 240, 450, 900, 2000, 3000];

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

        $lines = $gameData->game->lines; // Using fixed lines from game data
        $betLine = $gameData->betLine;
        $allBet = $betLine * $lines;

        $winTypeTmp = $this->GetSpinSettings($slotEvent);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        for ($i = 0; $i <= 2000; $i++) {
            $totalWin = 0;
            $lineWins = [];
            $cWins = array_fill(0, $lines, 0);
            $wild = '0';
            $scatter = '7';
            $reels = $this->GetReelStrips($winType, $slotEvent);

            for ($k = 0; $k < $lines; $k++) {
                if (!isset($gameData->linesId[$k]) || !is_array($gameData->linesId[$k])) continue;
                $line = $gameData->linesId[$k];

                $tmpStringWin = '';
                $SymbolGame = ['0', '1', '2', '3', '4', '5', '6']; // Symbols that form lines

                foreach ($SymbolGame as $csym) {
                    $s = [];
                    for ($r = 0; $r < 5; $r++) {
                        $reelIndex = 'reel' . ($r + 1);
                        $linePos = $line[$r] - 1;
                        if (isset($reels[$reelIndex][$linePos])) {
                            $s[$r] = $reels[$reelIndex][$linePos];
                        } else {
                            $s[$r] = null; // Mark as invalid symbol
                        }
                    }
                    if (in_array(null, $s, true)) continue; // Skip if any symbol is invalid

                    $winCount = 0;
                    $wildCount = 0;
                    foreach($s as $symbol) {
                        if($symbol == $csym || $symbol == $wild) {
                             $winCount++;
                             if($symbol == $wild) $wildCount++;
                        } else {
                            break;
                        }
                    }
                    
                    if ($winCount > 0) {
                        $pay = $this->Paytable['SYM_' . $csym][$winCount] ?? 0;
                        if ($pay > 0) {
                            $winMpl = ($wildCount > 0 && $wildCount < 5 && $csym != $wild) ? $this->slotWildMpl : 1;
                            $winAmount = $pay * $betLine * $winMpl * $bonusMpl;

                            if($cWins[$k] < $winAmount){
                                $cWins[$k] = $winAmount;
                                $wonSymbols = [];
                                for($r=0; $r<$winCount; $r++) $wonSymbols[] = '["'.$r.'","'.($line[$r]-1).'"]';
                                $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $winAmount . '","wonSymbols":['.implode(',', $wonSymbols).']}';
                            }
                        }
                    }
                }

                if ($cWins[$k] > 0 && $tmpStringWin != '') {
                    $lineWins[] = $tmpStringWin;
                    $totalWin += $cWins[$k];
                }
            }

            $scattersWin = 0;
            $scattersPos = [];
            $scattersCount = 0;
            for ($r = 1; $r <= 5; $r++) {
                for ($p = 0; $p <= 3; $p++) {
                    if (isset($reels['reel' . $r][$p]) && $reels['reel' . $r][$p] == $scatter) {
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }
            
            $scatterPay = $this->Paytable['SYM_' . $scatter][$scattersCount] ?? 0;
            if ($scatterPay > 0) {
                $scattersWin = $scatterPay * $allBet;
                $scw = '{"type":"ScatterWinAmount","amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                $lineWins[] = $scw;
                $totalWin += $scattersWin;
            }

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) continue;
            if ($totalWin <= $spinWinLimit) break;
            if ($i > 1500 && $winType == 'none') break; // Give up if no win and many tries
            if ($i > 1900) break; // Force break after many tries
        }

        $winString = $totalWin > 0 ? ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}' : '';
        
        $reelsForJs = [];
        for($r=1; $r<=5; $r++) {
            $reelsForJs[] = '["' . implode('","', $reels['reel' . $r]) . '"]';
        }
        $symb = implode(',', $reelsForJs);

        return [
            'totalWin' => $totalWin,
            'reels' => $reels,
            'winString' => $winString,
            'symb' => $symb,
        ];
    }

    public function GetSpinSettings($slotEvent)
    {
        $currentPercent = $this->shopPercent;
        $currentSpinWinChance = $this->rtpConfig['spinChance'];
        $currentBonusWinChance = $this->rtpConfig['bonusChance'];

        if ($this->game_stat_in > 0) {
            $rtpRange = ($this->game_stat_out / $this->game_stat_in) * 100;
            if ($rtpRange > $currentPercent) {
                $currentSpinWinChance *= 2;
                $currentBonusWinChance *= 2;
            }
        } else {
        }

        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);
        $return = ['none', 0];

        if ($spinWin == 1) {
            $winLimit = $this->bank;
            $return = ['win', $winLimit];
        }

        return $return;
    }

    public function GetReelStrips($winType, $slotEvent)
    {
        $reelSource = $this->reelsStrip;
        $reels = ['rp' => []];

        for ($i = 1; $i <= 5; $i++) {
            $stripName = 'reelStrip' . $i;
            if (!empty($reelSource[$stripName])) {
                $strip = $reelSource[$stripName];
                $reelLength = count($strip);
                if ($reelLength < 4) continue; // Ensure strip is long enough for 4 rows
                $pos = mt_rand(0, $reelLength - 4);
                $reels['reel' . $i] = [$strip[$pos], $strip[$pos + 1], $strip[$pos + 2], $strip[$pos+3]];
                $reels['rp'][] = $pos;
            } else {
                $reels['reel' . $i] = ['0', '0', '0', '0']; // Fallback for empty strip
                $reels['rp'][] = 0;
            }
        }
        return $reels;
    }
}