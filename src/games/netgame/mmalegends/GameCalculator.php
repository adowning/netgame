<?php

namespace App\Games\MMALegendsNG;

class GameCalculator
{
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;
    public $SymbolGame;

    private $shopPercent;
    private $rtpConfig;
    private $game_stat_in;
    private $game_stat_out;
    private $bank;
    private $slotBonus;
    private $MaxWin;
    private $slotWildMpl;
    private $slotFreeMpl;
    private $CurrentDenom;
    private $AllBet;

    public function __construct($gameData)
    {
        if (!$gameData || !isset($gameData->user) || !isset($gameData->game) || !isset($gameData->shop)) {
            throw new \InvalidArgumentException('Invalid game data provided. Required properties: user, game, shop.');
        }

        // Initialize dynamic properties from gameData object
        $this->shopPercent = $gameData->shop->percent;
        $this->rtpConfig = $gameData->game->rtp ?? ['spinChance' => 10, 'bonusChance' => 20];
        $this->game_stat_in = $gameData->game->stat_in ?? 0;
        $this->game_stat_out = $gameData->game->stat_out ?? 0;
        $this->bank = $gameData->bank;
        $this->slotBonus = $gameData->game->slotBonus ?? true;
        $this->MaxWin = $gameData->shop->max_win ?? 1000000;
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;
        $this->SymbolGame = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']; // All non-special symbols

        // Load static configuration from files
        $this->Paytable = json_decode(file_get_contents(__DIR__ . '/paytable.json'), true);
        
        $this->reelsStrip = [];
        $this->reelsStripBonus = [];
        for ($i = 1; $i <= 6; $i++) {
            $this->reelsStrip['reelStrip' . $i] = [];
            $this->reelsStripBonus['reelStripBonus' . $i] = [];
        }

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
                    if (strpos($reelName, 'Bonus') !== false && isset($this->reelsStripBonus[$reelName])) {
                        $this->reelsStripBonus[$reelName] = $filteredData;
                    }
                }
            }
        }
    }

    public function calculateSpin($postData)
    {
        $slotEvent = $postData['slotEvent'] ?? 'bet';
        $bonusMpl = $slotEvent === 'freespin' ? $this->slotFreeMpl : 1;

        $lines = $postData['lines'];
        $betLine = $postData['betLine'];
        $this->AllBet = $betLine * $lines;

        $winTypeTmp = $this->GetSpinSettings($slotEvent);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        for ($i = 0; $i <= 2000; $i++) {
            $totalWin = 0;
            $lineWins = [];
            $cWins = array_fill(0, $lines, 0); // Highest win per line
            
            // Per game's SlotSettings, SYM_12 is the scatter. There appears to be no wild.
            $scatter = '12'; 
            $wild = 'NONE'; // No wild symbol identified in original SlotSettings

            $reels = $this->GetReelStrips($winType, $slotEvent);

            for ($k = 0; $k < $lines; $k++) {
                if (!isset($postData['linesId'][$k])) continue;
                $line = $postData['linesId'][$k];
                $tmpStringWin = '';

                foreach ($this->SymbolGame as $csym) {
                    if ($csym == $scatter || !isset($this->Paytable['SYM_' . $csym])) continue;
                    
                    $lineSymbols = [];
                    for ($r = 0; $r < 6; $r++) { // 6 reels
                        if (isset($reels['reel' . ($r + 1)][$line[$r] - 1])) {
                           $lineSymbols[$r] = $reels['reel' . ($r + 1)][$line[$r] - 1];
                        }
                    }

                    $winCount = 0;
                    $wonSymbolsPositions = [];
                    for ($r = 0; $r < 6; $r++) {
                        if ($lineSymbols[$r] == $csym || $lineSymbols[$r] == $wild) {
                            $winCount++;
                            $wonSymbolsPositions[] = '["' . $r . '","' . ($line[$r] - 1) . '"]';
                        } else {
                            break;
                        }
                    }

                    if ($winCount > 0 && isset($this->Paytable['SYM_' . $csym][$winCount])) {
                        $pay = $this->Paytable['SYM_' . $csym][$winCount];
                        if ($pay > 0) {
                            $winAmount = $pay * $betLine * $bonusMpl;
                            if ($winAmount > $cWins[$k]) {
                                $cWins[$k] = $winAmount;
                                $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $winAmount . '","wonSymbols":[' . implode(',', $wonSymbolsPositions) . ']}';
                            }
                        }
                    }
                }
                if ($cWins[$k] > 0) {
                    $lineWins[] = $tmpStringWin;
                    $totalWin += $cWins[$k];
                }
            }

            $scattersWin = 0;
            $scattersPos = [];
            $scattersCount = 0;
            for ($r = 1; $r <= 6; $r++) {
                for ($p = 0; $p <= 3; $p++) { // 4 rows
                    if (isset($reels['reel' . $r][$p]) && $reels['reel' . $r][$p] == $scatter) {
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }

            if (isset($this->Paytable['SYM_' . $scatter]) && isset($this->Paytable['SYM_' . $scatter][$scattersCount])) {
                $scattersWin = $this->Paytable['SYM_' . $scatter][$scattersCount] * $this->AllBet;
            }
            
            $totalWin += $scattersWin;

            if ($scattersCount >= 3 && $this->slotBonus) {
                 if ($scattersWin > 0) {
                    $scw = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins":"10"},"amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                    $lineWins[] = $scw;
                 }
            } else if ($scattersWin > 0) {
                // Regular scatter win, not triggering bonus
                $scw = '{"type":"ScatterWin","amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                $lineWins[] = $scw;
            }

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) continue;
            if ($scattersCount >= 3 && $winType != 'bonus') continue;

            if ($totalWin <= $spinWinLimit) break;
            if ($i > 1500) break;
        }

        return [
            'totalWin' => $totalWin,
            'reels' => $reels,
            'lineWins' => $lineWins,
            'scattersCount' => $scattersCount,
        ];
    }

    private function GetSpinSettings($garantType)
    {
        $currentPercent = $this->shopPercent;
        $currentSpinWinChance = $this->rtpConfig['spinChance'] ?? 10;
        $currentBonusWinChance = $this->rtpConfig['bonusChance'] ?? 20;

        if ($this->game_stat_in > 0) {
            $rtpRange = ($this->game_stat_out / $this->game_stat_in) * 100;
            if ($rtpRange > $currentPercent) {
                $currentSpinWinChance *= 2;
                $currentBonusWinChance *= 2;
            }
        }

        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);
        $return = ['none', 0];

        if ($bonusWin == 1 && $this->slotBonus) {
            $winLimit = $this->bank;
            $return = ['bonus', $winLimit];
        } else if ($spinWin == 1) {
            $winLimit = $this->bank;
            $return = ['win', $winLimit];
        }

        return $return;
    }

    private function GetReelStrips($winType, $slotEvent)
    {
        $reelSource = ($slotEvent == 'freespin' && !empty($this->reelsStripBonus['reelStripBonus1'])) ? $this->reelsStripBonus : $this->reelsStrip;
        $reels = ['rp' => []];
        $reelCount = 6;
        $rows = 4;

        for ($i = 1; $i <= $reelCount; $i++) {
            $reelKey = ($slotEvent == 'freespin' && !empty($this->reelsStripBonus['reelStripBonus1'])) ? 'reelStripBonus' . $i : 'reelStrip' . $i;
            if (!empty($reelSource[$reelKey])) {
                $strip = $reelSource[$reelKey];
                $reelLength = count($strip);
                if ($reelLength < $rows) {
                    $reels['reel' . $i] = array_fill(0, $rows, '0');
                    $reels['rp'][] = 0;
                    continue;
                };
                $pos = mt_rand(0, $reelLength - $rows);
                $reels['reel' . $i] = array_slice($strip, $pos, $rows);
                $reels['rp'][] = $pos;
            } else {
                $reels['reel' . $i] = array_fill(0, $rows, '0');
                $reels['rp'][] = 0;
            }
        }
        return $reels;
    }
}