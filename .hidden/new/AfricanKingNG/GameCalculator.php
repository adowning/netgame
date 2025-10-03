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
    public $MaxWin;
    public $increaseRTP;
    public $slotWildMpl;
    public $slotFreeMpl;
    public $CurrentDenom;
    public $AllBet;
    public $isBonusStart;
    function __construct($gameData)
    {
        // Initialize dynamic properties from gameData object
        $this->shopPercent = $gameData->shop->percent;
        $this->game_stat_in = $gameData->game->stat_in ?? 0;
        $this->game_stat_out = $gameData->game->stat_out ?? 0;
        $this->bank = $gameData->bank;
        $this->slotBonus = $gameData->game->slotBonus ?? true;
        $this->MaxWin = $gameData->shop->max_win ?? 1000000;
        $this->increaseRTP = $gameData->game->increaseRTP ?? 1;
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;

        // Initialize static configuration
        $this->Paytable['SYM_0'] = [0, 0, 15, 100, 1000, 3000];
        $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0]; // Wild has no direct payout
        $this->Paytable['SYM_2'] = [0, 0, 5, 50, 100, 1000];
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 50, 500];
        $this->Paytable['SYM_4'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_5'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_6'] = [0, 0, 0, 5, 25, 200];
        $this->Paytable['SYM_7'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_8'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_9'] = [0, 0, 40, 100, 400, 2500]; // Scatter

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
        $slotEvent = $postData['slotEvent'] ?? 'bet';
        $bonusMpl = $slotEvent === 'freespin' ? $this->slotFreeMpl : 1;

        $lines = $postData['lines'];
        $betLine = $postData['betLine'];
        $this->AllBet = $betLine * $lines;

        $winTypeTmp = $this->GetSpinSettings($slotEvent, $betLine, $lines);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        for ($i = 0; $i <= 2000; $i++) {
            $totalWin = 0;
            $lineWins = [];
            $wild = ['0', '1'];
            $scatter = '9';
            $reels = $this->GetReelStrips($winType, $slotEvent);

            if ($slotEvent == 'freespin') {
                $rreel = rand(1, 5);
                $reels['reel' . $rreel][0] = '1';
                $reels['reel' . $rreel][1] = '1';
                $reels['reel' . $rreel][2] = '1';
            }

            for ($k = 0; $k < $lines; $k++) {
                $line = $postData['linesId'][$k];
                $lineSymbols = [];
                for($r=0; $r<5; $r++) $lineSymbols[$r] = $reels['reel'.($r+1)][$line[$r] - 1];

                $baseSymbol = null;
                foreach($lineSymbols as $s) if(!in_array($s, $wild)) {$baseSymbol = $s; break;}
                if($baseSymbol === null) $baseSymbol = '1'; // All wilds on line

                if(isset($this->Paytable['SYM_' . $baseSymbol])) {
                    $winCount = 0;
                    foreach($lineSymbols as $s) {
                        if($s == $baseSymbol || in_array($s, $wild)) $winCount++;
                        else break;
                    }

                    if ($winCount > 0) {
                        $pay = $this->Paytable['SYM_' . $baseSymbol][$winCount] ?? 0;
                        if ($pay > 0) {
                            $winAmount = $pay * $betLine * $bonusMpl;
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
            if ($scattersCount >= 3 && $this->slotBonus) {
                 $scw = '{"type":"Bonus","bonusName":"PickBonus","params":{"fields":"25","freeSpins":"8"},"amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                 $lineWins[] = $scw;
            }
            $totalWin += $scattersWin;

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) continue;
            if ($scattersCount >= 2 && $winType != 'bonus') continue;
            
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
        $currentSpinWinChance = 10;
        $currentBonusWinChance = 20;

        if ($this->game_stat_in > 0) {
            $rtpRange = $this->game_stat_out / $this->game_stat_in * 100;
            if ($rtpRange > $currentPercent) {
                $currentSpinWinChance = 20;
                $currentBonusWinChance = 40;
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
        $reelSource = ($slotEvent == 'freespin') ? $this->reelsStripBonus : $this->reelsStrip;
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