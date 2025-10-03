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
    public $slotFreeMpl = 1;
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
            0, 0, 0, 0, 0, 0
        ];
        $this->Paytable['SYM_1'] = [
            0, 0, 0, 0, 0, 0
        ];
        $this->Paytable['SYM_2'] = [
            0, 0, 0, 0, 0, 0
        ];
        $this->Paytable['SYM_3'] = [
            0, 0, 0, 8, 10, 12
        ];
        $this->Paytable['SYM_4'] = [
            0, 0, 0, 64, 160, 384
        ];
        $this->Paytable['SYM_5'] = [
            0, 0, 0, 216, 810, 2916
        ];
        $this->Paytable['SYM_6'] = [
            0, 0, 0, 8, 10, 12
        ];
        $this->Paytable['SYM_7'] = [
            0, 0, 0, 8, 10, 12
        ];
        $this->Paytable['SYM_8'] = [
            0, 0, 0, 10, 15, 20
        ];
        $this->Paytable['SYM_9'] = [
            0, 0, 0, 8, 10, 12
        ];
        $this->Paytable['SYM_10'] = [
            0, 0, 0, 4, 6, 8
        ];
        $this->Paytable['SYM_11'] = [
            0, 0, 0, 4, 6, 8
        ];

        $this->SymbolGame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

        $spinSettings = $this->GetSpinSettings($slotEvent, $betLine, $lines);
        $winType = $spinSettings[0];
        $spinWinLimit = $spinSettings[1];

        $totalWin = 0;
        $lineWins = [];
        $wild = ['0'];
        $scatter = '10';

        $reels = $this->GetReelStrips($winType, $slotEvent);
        $reelsTmp = $reels;

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
                    $tmpWin = $this->Paytable['SYM_' . $csym][1] * $betLine * $mpl * $this->slotFreeMpl;
                    if ($this->getCWin($k) < $tmpWin) {
                        $this->setCWin($k, $tmpWin);
                        $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"]]}';
                    }
                }
            }

            if ($this->getCWin($k) > 0 && $tmpStringWin != '') {
                $lineWins[] = $tmpStringWin;
                $totalWin += $this->getCWin($k);
            }
        }

        $scattersCount = 0;
        $scattersPos = [];
        for ($r = 1; $r <= 5; $r++) {
            for ($p = 0; $p <= 2; $p++) {
                if ($reels['reel' . $r][$p] == $scatter) {
                    $scattersCount++;
                    $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                }
            }
        }

        $scattersWin = $this->Paytable['SYM_' . $scatter][$scattersCount] * $betLine * $lines * $this->slotFreeMpl;
        $totalWin += $scattersWin;

        $gameState = 'Ready';
        if ($scattersCount >= 3 && $this->slotBonus) {
            $gameState = 'FreeSpins';
        }

        $winString = '';
        if ($totalWin > 0) {
            $winString = ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}';
        }

        $symb = '["' . $reelsTmp['reel1'][0] . '","' . $reelsTmp['reel2'][0] . '","' . $reelsTmp['reel3'][0] . '","' . $reelsTmp['reel4'][0] . '","' . $reelsTmp['reel5'][0] . '"],["' . $reelsTmp['reel1'][1] . '","' . $reelsTmp['reel2'][1] . '","' . $reelsTmp['reel3'][1] . '","' . $reelsTmp['reel4'][1] . '","' . $reelsTmp['reel5'][1] . '"],["' . $reelsTmp['reel1'][2] . '","' . $reelsTmp['reel2'][2] . '","' . $reelsTmp['reel3'][2] . '","' . $reelsTmp['reel4'][2] . '","' . $reelsTmp['reel5'][2] . '"]';

        return [
            'totalWin' => $totalWin,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => $reelsTmp,
            'winString' => $winString,
            'gameState' => $gameState,
            'scattersCount' => $scattersCount,
            'symb' => $symb
        ];
    }

    private $cWins = [];
    private function getCWin($k) { return isset($this->cWins[$k]) ? $this->cWins[$k] : 0; }
    private function setCWin($k, $value) { $this->cWins[$k] = $value; }

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