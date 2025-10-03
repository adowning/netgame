<?php

class GameCalculator
{
    public $Paytable = [];
    public $reelStrip1 = [];
    public $reelStrip2 = [];
    public $reelStrip3 = [];
    public $reelStrip4 = [];
    public $reelStrip5 = [];
    public $reelStripBonus1 = [];
    public $reelStripBonus2 = [];
    public $reelStripBonus3 = [];
    public $reelStripBonus4 = [];
    public $reelStripBonus5 = [];
    public $reelStripBonus6 = [];
    public $SymbolGame = [];
    public $slotWildMpl = 1;
    public $slotFreeMpl = 2;
    public $slotBonus = true;
    public $slotFreeCount = 15;
    public $CurrentDenom = 1;
    public $increaseRTP = 1;
    public $MaxWin = 0;

    public function __construct($gameData)
    {
        $this->CurrentDenom = $gameData['game']['denomination'];
        $this->MaxWin = $gameData['shop']['max_win'];
        $this->increaseRTP = $gameData['game']['increaseRTP'];

        $this->Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_1'] = [0, 0, 0, 16, 32, 80];
        $this->Paytable['SYM_2'] = [0, 0, 0, 16, 24, 48];
        $this->Paytable['SYM_3'] = [0, 0, 0, 16, 24, 48];
        $this->Paytable['SYM_4'] = [0, 0, 0, 8, 16, 32];
        $this->Paytable['SYM_5'] = [0, 0, 0, 8, 16, 32];
        $this->Paytable['SYM_6'] = [0, 0, 0, 4, 8, 16];
        $this->Paytable['SYM_7'] = [0, 0, 0, 4, 8, 16];
        $this->Paytable['SYM_8'] = [0, 0, 0, 4, 8, 16];
        $this->Paytable['SYM_9'] = [0, 0, 0, 4, 8, 16];
        $this->Paytable['SYM_10'] = [0, 0, 0, 4, 8, 16];

        $this->SymbolGame = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9];

        $temp = file(__DIR__ . '/reels.txt');
        foreach ($temp as $str) {
            $str = explode('=', $str);
            if (isset($this->reelStrip1[$str[0]]) || isset($this->reelStripBonus1[$str[0]])) {
                $data = explode(',', $str[1]);
                foreach ($data as $elem) {
                    $elem = trim($elem);
                    if ($elem != '') {
                        if (isset($this->reelStrip1[$str[0]])) {
                            $this->reelStrip1[$str[0]][] = $elem;
                        }
                        if (isset($this->reelStripBonus1[$str[0]])) {
                            $this->reelStripBonus1[$str[0]][] = $elem;
                        }
                    }
                }
            }
        }

        $this->reelStrip2 = $this->reelStrip1;
        $this->reelStrip3 = $this->reelStrip1;
        $this->reelStrip4 = $this->reelStrip1;
        $this->reelStrip5 = $this->reelStrip1;
        $this->reelStripBonus2 = $this->reelStripBonus1;
        $this->reelStripBonus3 = $this->reelStripBonus1;
        $this->reelStripBonus4 = $this->reelStripBonus1;
        $this->reelStripBonus5 = $this->reelStripBonus1;
    }

    public function calculateSpin($spinData)
    {
        $linesId = $this->getLinesId();
        $lines = 20;
        $betLine = $spinData['betLine'];
        $allbet = $betLine * $lines;
        $slotEvent = $spinData['slotEvent'];
        $bonusMpl = ($slotEvent == 'freespin') ? 2 : 1;

        $spinSettings = $this->GetSpinSettings($slotEvent, $betLine, $lines);
        $winType = $spinSettings[0];
        $spinWinLimit = $spinSettings[1];

        $totalWin = 0;
        $lineWins = [];
        $stageWins = [];
        $isBonusStarted = false;
        $wild = ['0'];
        $scatter = '';
        $resultStages = '';

        $reels = $this->GetReelStrips($winType, $slotEvent);
        $reelsTmp = $reels;
        $reelsOffset = $reels;

        for ($stg = 1; $stg <= 10; $stg++) {
            $cWins = array_fill(0, 50, 0);

            if ($slotEvent == 'freespin') {
                $bonusMpl++;
                if ($bonusMpl == 4) $bonusMpl = 5;
                if ($bonusMpl == 6) $bonusMpl = 10;
                if ($bonusMpl == 11) $bonusMpl = 15;
            }

            if ($stg > 1) {
                if ($stageWins[$stg - 1] > 0) {
                    $reels = $this->OffsetReels($reelsOffset);
                    $reelsOffset = $reels;
                } else {
                    break;
                }
            }

            for ($k = 0; $k < $lines; $k++) {
                $tmpStringWin = '';
                for ($j = 0; $j < count($this->SymbolGame); $j++) {
                    $csym = $this->SymbolGame[$j];
                    if ($csym == $scatter || !isset($this->Paytable['SYM_' . $csym])) {
                        continue;
                    }

                    $s = [];
                    $s[0] = $reels['reel1'][$linesId[$k][0] - 1];
                    $s[1] = $reels['reel2'][$linesId[$k][1] - 1];
                    $s[2] = $reels['reel3'][$linesId[$k][2] - 1];
                    $s[3] = $reels['reel4'][$linesId[$k][3] - 1];
                    $s[4] = $reels['reel5'][$linesId[$k][4] - 1];
                    $p0 = $linesId[$k][0] - 1;
                    $p1 = $linesId[$k][1] - 1;
                    $p2 = $linesId[$k][2] - 1;
                    $p3 = $linesId[$k][3] - 1;
                    $p4 = $linesId[$k][4] - 1;

                    if ($s[0] == $csym || in_array($s[0], $wild)) {
                        $mpl = 1;
                        $tmpWin = $this->Paytable['SYM_' . $csym][1] * $betLine * $mpl * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                        }
                    }

                    if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild))) {
                        $mpl = 1;
                        if (in_array($s[0], $wild) && in_array($s[1], $wild)) {
                            $mpl = 0;
                        } else if (in_array($s[0], $wild) || in_array($s[1], $wild)) {
                            $mpl = $this->slotWildMpl;
                        }
                        $tmpWin = $this->Paytable['SYM_' . $csym][2] * $betLine * $mpl * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                            $reelsOffset['reel2'][$p1] = -1;
                        }
                    }

                    if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild))) {
                        $mpl = 1;
                        if (in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild)) {
                            $mpl = 0;
                        } else if (in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild)) {
                            $mpl = $this->slotWildMpl;
                        }
                        $tmpWin = $this->Paytable['SYM_' . $csym][3] * $betLine * $mpl * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                            $reelsOffset['reel2'][$p1] = -1;
                            $reelsOffset['reel3'][$p2] = -1;
                        }
                    }

                    if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild))) {
                        $mpl = 1;
                        if (in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild)) {
                            $mpl = 0;
                        } else if (in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild)) {
                            $mpl = $this->slotWildMpl;
                        }
                        $tmpWin = $this->Paytable['SYM_' . $csym][4] * $betLine * $mpl * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"],["3","' . $p3 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                            $reelsOffset['reel2'][$p1] = -1;
                            $reelsOffset['reel3'][$p2] = -1;
                            $reelsOffset['reel4'][$p3] = -1;
                        }
                    }

                    if (($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild))) {
                        $mpl = 1;
                        if (in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild) && in_array($s[4], $wild)) {
                            $mpl = 0;
                        } else if (in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) || in_array($s[4], $wild)) {
                            $mpl = $this->slotWildMpl;
                        }
                        $tmpWin = $this->Paytable['SYM_' . $csym][5] * $betLine * $mpl * $bonusMpl;
                        if ($cWins[$k] < $tmpWin) {
                            $cWins[$k] = $tmpWin;
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"],["3","' . $p3 . '"],["4","' . $p4 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                            $reelsOffset['reel2'][$p1] = -1;
                            $reelsOffset['reel3'][$p2] = -1;
                            $reelsOffset['reel4'][$p3] = -1;
                            $reelsOffset['reel5'][$p4] = -1;
                        }
                    }
                }

                if ($cWins[$k] > 0 && $tmpStringWin != '') {
                    $lineWins[$stg][] = $tmpStringWin;
                    $totalWin += $cWins[$k];
                    $stageWins[$stg] += $cWins[$k];
                }
            }

            $scattersCount = 0;
            for ($r = 1; $r <= 5; $r++) {
                for ($p = 0; $p <= 2; $p++) {
                    if ($reels['reel' . $r][$p] == $scatter) {
                        $scattersCount++;
                        $reelsOffset['reel' . $r][$p] = -1;
                    }
                }
            }

            $gameState = 'Ready';
            if ($scattersCount >= 3 && $this->slotBonus) {
                $gameState = 'FreeSpins';
                $isBonusStarted = true;
            }

            if ($stg > 1) {
                $symb = '["1","1","1","1","1"],["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"],["' . $reels['reel1'][3] . '","' . $reels['reel2'][3] . '","' . $reels['reel3'][3] . '","' . $reels['reel4'][3] . '","' . $reels['reel5'][3] . '"]';
                $resultStages .= '"spinResultStage' . $stg . '":{"type":"SpinResult","rows":[' . $symb . ']},';
            }
        }

        $winString = '';
        if ($totalWin > 0) {
            $winString0 = isset($lineWins[1]) ? implode(',', $lineWins[1]) : '';
            $winString = ',"slotWin":{"lineWinAmounts":[' . $winString0 . '],"totalWin":"' . $totalWin . '"';
            if ($slotEvent == 'freespin') {
                $bonusMpl = 2;
            }
            for ($sw = 2; $sw <= 10; $sw++) {
                if (isset($lineWins[$sw]) && count($lineWins[$sw]) > 0) {
                    $winString .= ',"lineWinAmountsStage' . $sw . '":[' . implode(',', $lineWins[$sw]) . ',{"type":"Bonus","bonusName":"Multiplier","wonSymbols":"","params":{"value":"' . $bonusMpl . '"}}]';
                    if ($slotEvent == 'freespin') {
                        $bonusMpl++;
                        if ($bonusMpl == 4) $bonusMpl = 5;
                        if ($bonusMpl == 6) $bonusMpl = 10;
                        if ($bonusMpl == 11) $bonusMpl = 15;
                    }
                } else {
                    $winString .= ',"lineWinAmountsStage' . $sw . '":[{"type":"Bonus","bonusName":"Multiplier","wonSymbols":"","params":{"value":"' . $bonusMpl . '"}}]';
                    break;
                }
            }
            $winString .= ',"canGamble":"false"}';
        }

        $symb = '["1","1","1","1","1"],["' . $reelsTmp['reel1'][0] . '","' . $reelsTmp['reel2'][0] . '","' . $reelsTmp['reel3'][0] . '","' . $reelsTmp['reel4'][0] . '","' . $reelsTmp['reel5'][0] . '"],["' . $reelsTmp['reel1'][1] . '","' . $reelsTmp['reel2'][1] . '","' . $reelsTmp['reel3'][1] . '","' . $reelsTmp['reel4'][1] . '","' . $reelsTmp['reel5'][1] . '"],["' . $reelsTmp['reel1'][2] . '","' . $reelsTmp['reel2'][2] . '","' . $reelsTmp['reel3'][2] . '","' . $reelsTmp['reel4'][2] . '","' . $reelsTmp['reel5'][2] . '"],["' . $reelsTmp['reel1'][3] . '","' . $reelsTmp['reel2'][3] . '","' . $reelsTmp['reel3'][3] . '","' . $reelsTmp['reel4'][3] . '","' . $reelsTmp['reel5'][3] . '"]';

        return [
            'totalWin' => $totalWin,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => $reelsTmp,
            'winString' => $winString,
            'resultStages' => $resultStages,
            'gameState' => $gameState,
            'isBonusStarted' => $isBonusStarted,
            'symb' => $symb
        ];
    }

    private function getLinesId()
    {
        return [
            [2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3],
            [1, 1, 1, 1, 1],
            [4, 4, 4, 4, 4],
            [2, 3, 4, 3, 2],
            [3, 2, 1, 2, 3],
            [1, 1, 2, 3, 4],
            [4, 4, 3, 2, 1],
            [2, 1, 1, 1, 2],
            [3, 4, 4, 4, 3],
            [1, 2, 3, 4, 4],
            [4, 3, 2, 1, 1],
            [2, 1, 2, 3, 2],
            [3, 4, 3, 2, 3],
            [1, 2, 1, 2, 1],
            [4, 3, 4, 3, 4],
            [2, 3, 2, 1, 2],
            [3, 2, 3, 4, 3],
            [1, 2, 2, 2, 1],
            [4, 3, 3, 3, 4]
        ];
    }

    private function GetSpinSettings($garantType, $bet, $lines)
    {
        $this->AllBet = $bet * $lines;
        $bonusWin = rand(1, 1000);
        $spinWin = rand(1, 50);

        $return = ['none', 0];
        if ($bonusWin == 1 && $this->slotBonus) {
            $return = ['bonus', 1000];
        } else if ($spinWin == 1) {
            $return = ['win', 500];
        }
        return $return;
    }

    private function GetReelStrips($winType, $slotEvent)
    {
        $prs = [];
        foreach (['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5'] as $index => $reelStrip) {
            if (is_array($this->$reelStrip) && count($this->$reelStrip) > 0) {
                $prs[$index + 1] = mt_rand(1, count($this->$reelStrip) - 4);
            }
        }

        $reel = ['rp' => []];
        foreach ($prs as $index => $value) {
            $key = $this->{'reelStrip' . $index};
            $reel['reel' . $index][0] = $key[$value - 1];
            $reel['reel' . $index][1] = $key[$value];
            $reel['reel' . $index][2] = $key[$value + 1];
            $reel['reel' . $index][3] = $key[$value + 2];
            $reel['rp'][] = $value;
        }
        return $reel;
    }

    private function OffsetReels($reels)
    {
        $newReels = [];
        $newReels['reel1'] = [];
        $newReels['reel2'] = [];
        $newReels['reel3'] = [];
        $newReels['reel4'] = [];
        $newReels['reel5'] = [];
        for ($r = 1; $r <= 5; $r++) {
            for ($p = 3; $p >= 0; $p--) {
                if ($reels['reel' . $r][$p] != -1) {
                    array_unshift($newReels['reel' . $r], $reels['reel' . $r][$p]);
                }
            }
        }
        for ($r = 1; $r <= 5; $r++) {
            for ($p = count($newReels['reel' . $r]) + 1; $p <= 4; $p++) {
                array_unshift($newReels['reel' . $r], rand(0, 10));
            }
        }
        return $newReels;
    }
}

?>