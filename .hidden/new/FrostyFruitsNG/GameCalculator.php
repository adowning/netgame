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

                $this->Paytable['SYM_0'] = [
            0, 0, 0, 40, 400, 4000
        ];
        $this->Paytable['SYM_1'] = [
            0, 0, 0, 20, 40, 320
        ];
        $this->Paytable['SYM_2'] = [
            0, 0, 0, 10, 20, 160
        ];
        $this->Paytable['SYM_3'] = [
            0, 0, 0, 10, 20, 160
        ];
        $this->Paytable['SYM_4'] = [
            0, 0, 0, 10, 20, 160
        ];
        $this->Paytable['SYM_5'] = [
            0, 0, 0, 5, 10, 80
        ];
        $this->Paytable['SYM_6'] = [
            0, 0, 0, 5, 10, 80
        ];
        $this->Paytable['SYM_7'] = [
            0, 0, 0, 5, 10, 80
        ];
        $this->Paytable['SYM_8'] = [
            0, 0, 0, 5, 10, 80
        ];
        $this->Paytable['SYM_9'] = [
            0, 0, 0, 40, 400, 4000
        ];

        $this->SymbolGame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        $lines = 40;
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
                        if ($this->getCWin($k) < $tmpWin) {
                            $this->setCWin($k, $tmpWin);
                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"]]}';
                            $reelsOffset['reel1'][$p0] = -1;
                        }
                    }
                    // Add checks for 2, 3, 4, 5 symbol wins...
                }

                if ($this->getCWin($k) > 0 && $tmpStringWin != '') {
                    $lineWins[$stg][] = $tmpStringWin;
                    $totalWin += $this->getCWin($k);
                    $stageWins[$stg] += $this->getCWin($k);
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
        }

        $winString = '';
        if ($totalWin > 0) {
            $winString0 = isset($lineWins[1]) ? implode(',', $lineWins[1]) : '';
            $winString = ',"slotWin":{"lineWinAmounts":[' . $winString0 . '],"totalWin":"' . $totalWin . '"}';
        }

        $symb = '["1","1","1","1","1"],["' . $reelsTmp['reel1'][0] . '","' . $reelsTmp['reel2'][0] . '","' . $reelsTmp['reel3'][0] . '","' . $reelsTmp['reel4'][0] . '","' . $reelsTmp['reel5'][0] . '"],["' . $reelsTmp['reel1'][1] . '","' . $reelsTmp['reel2'][1] . '","' . $reelsTmp['reel3'][1] . '","' . $reelsTmp['reel4'][1] . '","' . $reelsTmp['reel5'][1] . '"],["' . $reelsTmp['reel1'][2] . '","' . $reelsTmp['reel2'][2] . '","' . $reelsTmp['reel3'][2] . '","' . $reelsTmp['reel4'][2] . '","' . $reelsTmp['reel5'][2] . '"],["' . $reelsTmp['reel1'][3] . '","' . $reelsTmp['reel2'][3] . '","' . $reelsTmp['reel3'][3] . '","' . $reelsTmp['reel4'][3] . '","' . $reelsTmp['reel5'][3] . '"]';

        return [
            'totalWin' => $totalWin,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => $reelsTmp,
            'winString' => $winString,
            'gameState' => $gameState,
            'isBonusStarted' => $isBonusStarted,
            'symb' => $symb
        ];
    }

    private $cWins = [];
    private function getCWin($k) { return isset($this->cWins[$k]) ? $this->cWins[$k] : 0; }
    private function setCWin($k, $value) { $this->cWins[$k] = $value; }

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
    private function getLinesId() {
        return [
            0 => [
                [2, 2, 2, 2, 2],
            ],
            1 => [
                [1, 1, 1, 1, 1],
            ],
            2 => [
                [3, 3, 3, 3, 3],
            ],
            3 => [
                [1, 2, 3, 2, 1],
            ],
            4 => [
                [3, 2, 1, 2, 3],
            ],
            5 => [
                [2, 3, 3, 3, 2],
            ],
            6 => [
                [2, 1, 1, 1, 2],
            ],
            7 => [
                [3, 3, 2, 1, 1],
            ],
            8 => [
                [1, 1, 2, 3, 3],
            ],
            9 => [
                [3, 2, 2, 2, 1],
            ],
            10 => [
                [1, 2, 2, 2, 3],
            ],
            11 => [
                [2, 3, 2, 1, 2],
            ],
            12 => [
                [2, 1, 2, 3, 2],
            ],
            13 => [
                [1, 2, 1, 2, 1],
            ],
            14 => [
                [3, 2, 3, 2, 3],
            ],
            15 => [
                [2, 2, 1, 2, 2],
            ],
            16 => [
                [2, 2, 3, 2, 2],
            ],
            17 => [
                [1, 3, 1, 3, 1],
            ],
            18 => [
                [3, 1, 3, 1, 3],
            ],
            19 => [
                [3, 1, 2, 1, 3],
            ],
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
                if ($winType == 'bonus') {
                    $prs[$index + 1] = $this->GetRandomScatterPos($this->$reelStrip);
                } else {
                    $prs[$index + 1] = mt_rand(0, count($this->$reelStrip) - 3);
                }
            }
        }

        $reel = ['rp' => []];
        foreach ($prs as $index => $value) {
            $key = $this->{'reelStrip' . $index};
            $reel['reel' . $index][0] = $key[$value - 1];
            $reel['reel' . $index][1] = $key[$value];
            $reel['reel' . $index][2] = $key[$value + 1];
            $reel['reel' . $index][3] = '';
            $reel['rp'][] = $value;
        }
        return $reel;
    }

    private function GetRandomScatterPos($rp)
    {
        $rpResult = [];
        for ($i = 0; $i < count($rp); $i++) {
            if ($rp[$i] == '10') {
                if (isset($rp[$i + 1]) && isset($rp[$i - 1])) {
                    array_push($rpResult, $i);
                }
                if (isset($rp[$i - 1]) && isset($rp[$i - 2])) {
                    array_push($rpResult, $i - 1);
                }
                if (isset($rp[$i + 1]) && isset($rp[$i + 2])) {
                    array_push($rpResult, $i + 1);
                }
            }
        }
        shuffle($rpResult);
        if (!isset($rpResult[0])) {
            $rpResult[0] = rand(2, count($rp) - 3);
        }
        return $rpResult[0];
    }
}

?>