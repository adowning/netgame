<?php

namespace App\Games\AfricanKingNG;

class GameCalculator
{
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;

    // Properties from gameData
    public $Balance;
    public $CurrentDenom;
    public $shopPercent;
    public $game_stat_in;
    public $game_stat_out;
    public $bank;
    public $slotBonus;
    public $isBonusStart = false;
    public $MaxWin;
    public $increaseRTP;
    public $SymbolGame;
    public $slotWildMpl;
    public $slotFreeMpl;
    public $AllBet;

    public function __construct($gameData)
    {
        // Initialize from gameData object
        $this->Balance = $gameData->user->balance;
        $this->CurrentDenom = $gameData->game->denomination;
        $this->shopPercent = $gameData->shop->percent;
        $this->game_stat_in = $gameData->game->stat_in ?? 0;
        $this->game_stat_out = $gameData->game->stat_out ?? 0;
        $this->bank = $gameData->bank;
        $this->slotBonus = $gameData->game->slotBonus ?? true;
        $this->MaxWin = $gameData->shop->max_win ?? 1000000;
        $this->increaseRTP = $gameData->game->increaseRTP ?? 1;
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->SymbolGame = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9];

        // Migrate Paytable from SlotSettings.php
        $this->Paytable['SYM_0'] = [0, 0, 15, 100, 1000, 3000];
        $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_2'] = [0, 0, 5, 50, 100, 1000];
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 50, 500];
        $this->Paytable['SYM_4'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_5'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_6'] = [0, 0, 0, 5, 25, 200];
        $this->Paytable['SYM_7'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_8'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_9'] = [0, 0, 40, 100, 400, 2500];

        // Migrate Reel Loading from GameReel.php
        $this->reelsStrip = [
            'reelStrip1' => [], 'reelStrip2' => [], 'reelStrip3' => [],
            'reelStrip4' => [], 'reelStrip5' => [], 'reelStrip6' => []
        ];
        $this->reelsStripBonus = [
            'reelStripBonus1' => [], 'reelStripBonus2' => [], 'reelStripBonus3' => [],
            'reelStripBonus4' => [], 'reelStripBonus5' => [], 'reelStripBonus6' => []
        ];

        $reelsFile = __DIR__ . '/reels.txt';
        if (file_exists($reelsFile)) {
            $temp = file($reelsFile);
            foreach ($temp as $str) {
                $str = explode('=', $str);
                if (isset($this->reelsStrip[$str[0]])) {
                    $data = explode(',', $str[1]);
                    foreach ($data as $elem) {
                        $elem = trim($elem);
                        if ($elem != '') {
                            $this->reelsStrip[$str[0]][] = $elem;
                        }
                    }
                }
                if (isset($this->reelsStripBonus[$str[0]])) {
                    $data = explode(',', $str[1]);
                    foreach ($data as $elem) {
                        $elem = trim($elem);
                        if ($elem != '') {
                            $this->reelsStripBonus[$str[0]][] = $elem;
                        }
                    }
                }
            }
        }
    }

    public function calculateSpin($postData)
    {
        $postData['slotEvent'] = $postData['slotEvent'] ?? 'bet';
        $bonusMpl = $postData['slotEvent'] === 'freespin' ? $this->slotFreeMpl : 1;

        $linesId = [
            [2, 2, 2, 2, 2], [1, 1, 1, 1, 1], [3, 3, 3, 3, 3], [1, 2, 3, 2, 1], [3, 2, 1, 2, 3],
            [2, 1, 2, 3, 2], [2, 3, 2, 1, 2], [1, 1, 2, 3, 3], [3, 3, 2, 1, 1], [1, 2, 1, 2, 1],
            [3, 2, 3, 2, 3], [2, 1, 1, 1, 2], [1, 3, 3, 3, 1], [1, 2, 2, 2, 1], [3, 2, 2, 2, 3],
            [2, 2, 1, 2, 2], [2, 2, 3, 2, 2], [1, 3, 1, 3, 1], [3, 1, 3, 1, 3], [3, 1, 2, 1, 3]
        ];

        $lines = 30; // This should probably come from gameData too
        $betLine = $postData['data']['coin'] * $postData['data']['bet'];
        $this->AllBet = $betLine * $lines;

        $winTypeTmp = $this->GetSpinSettings($postData['slotEvent'], $betLine, $lines);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        for( $i = 0; $i <= 2000; $i++ ) {
            $totalWin = 0;
            $lineWins = [];
            $cWins = array_fill(0, 50, 0);
            $wild = ['0', '1'];
            $scatter = '9';
            $reels = $this->GetReelStrips($winType, $postData['slotEvent']);

            if ($postData['slotEvent'] == 'freespin') {
                $rreel = rand(1, 5);
                $reels['reel' . $rreel][0] = 1;
                $reels['reel' . $rreel][1] = 1;
                $reels['reel' . $rreel][2] = 1;
            }

            for ($k = 0; $k < 10; $k++) {
                $tmpStringWin = '';
                foreach ($this->SymbolGame as $csym) {
                    if ($csym == $scatter || !isset($this->Paytable['SYM_' . $csym])) continue;

                    $s = [];
                    for($r=0; $r<5; $r++) $s[$r] = $reels['reel'.($r+1)][$linesId[$k][$r] - 1];

                    $p = [];
                    for($r=0; $r<5; $r++) $p[$r] = $linesId[$k][$r] - 1;

                    $winMultiplier = 1;
                    if (in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) || in_array($s[4], $wild)) {
                        $winMultiplier = $this->slotWildMpl;
                    }

                    $pay = -1;
                    $wonSymbols = [];
                    if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild))) {
                        $pay = $this->Paytable['SYM_' . $csym][5];
                        for($r=0; $r<5; $r++) $wonSymbols[] = '["'.$r.'","'.$p[$r].'"]';
                    } else if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild))) {
                        $pay = $this->Paytable['SYM_' . $csym][4];
                         for($r=0; $r<4; $r++) $wonSymbols[] = '["'.$r.'","'.$p[$r].'"]';
                    } else if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild))) {
                        $pay = $this->Paytable['SYM_' . $csym][3];
                         for($r=0; $r<3; $r++) $wonSymbols[] = '["'.$r.'","'.$p[$r].'"]';
                    } else if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild))) {
                        $pay = $this->Paytable['SYM_' . $csym][2];
                         for($r=0; $r<2; $r++) $wonSymbols[] = '["'.$r.'","'.$p[$r].'"]';
                    } else if ($s[0] == $csym || in_array($s[0], $wild)) {
                        $pay = $this->Paytable['SYM_' . $csym][1];
                        $wonSymbols[] = '["0","'.$p[0].'"]';
                    }

                    if ($pay > 0) {
                        $tmpWin = $pay * $betLine * $winMultiplier * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":['.implode(',', $wonSymbols).']}';
                        }
                    }
                }
                if ($cWins[$k] > 0 && $tmpStringWin != '') {
                    array_push($lineWins, $tmpStringWin);
                    $totalWin += $cWins[$k];
                }
            }

            $scattersWin = 0;
            $scattersPos = [];
            $scattersCount = 0;
            for ($r = 1; $r <= 5; $r++) {
                for ($p = 0; $p <= 2; $p++) {
                    if ($reels['reel' . $r][$p] == $scatter) {
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }
            $scattersWin = ($this->Paytable['SYM_' . $scatter][$scattersCount] ?? 0) * $this->AllBet;
            if ($scattersCount >= 3 && $this->slotBonus) {
                 $scw = '{"type":"Bonus","bonusName":"PickBonus","params":{"fields":"25","freeSpins":"8"},"amount":"' . $scattersWin . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                 array_push($lineWins, $scw);
            }
            $totalWin += $scattersWin;

            if ($this->MaxWin < ($totalWin * $this->CurrentDenom)) {
                continue;
            }

            $minWin = $this->GetRandomPay();
            if ($i > 700) $minWin = 0;

            if ($this->increaseRTP && $winType == 'win' && $totalWin < ($minWin * $this->AllBet)) {
                 continue;
            }

            if ($scattersCount >= 2 && $winType != 'bonus') {
                continue;
            } else if ($totalWin <= $spinWinLimit && $winType == 'bonus') {
                if ($this->bank < $spinWinLimit) $spinWinLimit = $this->bank;
                else break;
            } else if ($totalWin > 0 && $totalWin <= $spinWinLimit && $winType == 'win') {
                if ($this->bank < $spinWinLimit) $spinWinLimit = $this->bank;
                else break;
            } else if ($totalWin == 0 && $winType == 'none') {
                break;
            }
             if ($i > 1500) { // Emergency break
                 break;
            }
        }

        $winString = ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}';
        $symb = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]';

        return [
            'totalWin' => $totalWin,
            'reels' => $reels,
            'winString' => $winString,
            'symb' => $symb,
            'scattersCount' => $scattersCount
        ];
    }

    public function GetSpinSettings($garantType = 'bet', $bet, $lines)
    {
        $this->AllBet = $bet * $lines;
        $currentPercent = $this->shopPercent;

        // This part is complex and depends on game-specific line configs.
        // For now, we use a simplified random chance.
        // In a real scenario, this config would be part of gameData.
        $currentSpinWinChance = 10; // 1 in 10
        $currentBonusWinChance = 20; // 1 in 20

        if ($this->game_stat_in > 0) {
            $rtpRange = $this->game_stat_out / $this->game_stat_in * 100;
        } else {
            $rtpRange = 0;
        }

        // Simplified RTP control
        if ($rtpRange > $currentPercent) {
            $currentSpinWinChance = 20; // Lower chance to win if RTP is high
            $currentBonusWinChance = 40;
        }

        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);
        $return = ['none', 0];

        if ($bonusWin == 1 && $this->slotBonus) {
            $this->isBonusStart = true;
            $winLimit = $this->bank;
            $return = ['bonus', $winLimit];

            if ($this->bank < ($this->CheckBonusWin() * $bet)) {
                $return = ['none', 0];
            }
        } else if ($spinWin == 1) {
            $winLimit = $this->bank;
            $return = ['win', $winLimit];
        }

        return $return;
    }

    public function CheckBonusWin()
    {
        $allRateCnt = 0;
        $allRate = 0;
        foreach ($this->Paytable as $vl) {
            foreach ($vl as $vl2) {
                if ($vl2 > 0) {
                    $allRateCnt++;
                    $allRate += $vl2;
                    break;
                }
            }
        }
        return $allRate / $allRateCnt;
    }

    public function GetRandomPay()
    {
        $allRate = [];
        foreach ($this->Paytable as $vl) {
            foreach ($vl as $vl2) {
                if ($vl2 > 0) $allRate[] = $vl2;
            }
        }
        shuffle($allRate);
        if ($this->game_stat_in < ($this->game_stat_out + ($allRate[0] * $this->AllBet))) {
            $allRate[0] = 0;
        }
        return $allRate[0];
    }

    public function GetRandomScatterPos($rp)
    {
        $rpResult = [];
        for ($i = 0; $i < count($rp); $i++) {
            if ($rp[$i] == '9') { // Assuming '9' is scatter
                if (isset($rp[$i + 1]) && isset($rp[$i - 1])) array_push($rpResult, $i);
                if (isset($rp[$i - 1]) && isset($rp[$i - 2])) array_push($rpResult, $i - 1);
                if (isset($rp[$i + 1]) && isset($rp[$i + 2])) array_push($rpResult, $i + 1);
            }
        }
        shuffle($rpResult);
        if (!isset($rpResult[0])) $rpResult[0] = rand(2, count($rp) - 3);
        return $rpResult[0];
    }

    public function GetReelStrips($winType, $slotEvent)
    {
        $reelSource = ($slotEvent == 'freespin') ? $this->reelsStripBonus : $this->reelsStrip;
        $reels = ['rp' => []];
        $prs = [];

        if ($winType != 'bonus') {
            foreach ($reelSource as $reelKey => $reelStrip) {
                 if (!empty($reelStrip)) {
                    $reelNum = (int)filter_var($reelKey, FILTER_SANITIZE_NUMBER_INT);
                    if ($reelNum > 0) $prs[$reelNum] = mt_rand(0, count($reelStrip) - 3);
                 }
            }
        } else {
            $reelsId = [];
            foreach ($reelSource as $reelKey => $reelStrip) {
                 if (!empty($reelStrip)) {
                    $reelNum = (int)filter_var($reelKey, FILTER_SANITIZE_NUMBER_INT);
                    if($reelNum > 0) {
                        $prs[$reelNum] = $this->GetRandomScatterPos($reelStrip);
                        $reelsId[] = $reelNum;
                    }
                 }
            }
            $scattersCnt = rand(3, count($reelsId));
            shuffle($reelsId);
            for ($i = 0; $i < count($reelsId); $i++) {
                if ($i < $scattersCnt) {
                    $prs[$reelsId[$i]] = $this->GetRandomScatterPos($reelSource['reelStrip' . $reelsId[$i]]);
                } else {
                    $prs[$reelsId[$i]] = rand(0, count($reelSource['reelStrip' . $reelsId[$i]]) - 3);
                }
            }
        }

        foreach ($prs as $index => $value) {
            $key = $reelSource['reelStrip' . $index];
            $key[-1] = $key[count($key) - 1]; // Circular reel
            $reels['reel' . $index][0] = $key[$value - 1] ?? $key[0];
            $reels['reel' . $index][1] = $key[$value] ?? $key[1];
            $reels['reel' . $index][2] = $key[$value + 1] ?? $key[2];
            $reels['rp'][] = $value;
        }
        return $reels;
    }
}