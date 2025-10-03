<?php

namespace App\Games\NetEnt\TheWolfsBaneNET;

class GameCalculator
{
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;

    public $shopPercent;
    public $rtpConfig;
    public $game_stat_in;
    public $game_stat_out;
    public $bank;
    public $slotBonus;
    public $MaxWin;
    public $increaseRTP;
    public $slotWildMpl;
    public $slotFreeMpl;
    public $CurrentDenom;

    public function __construct($gameData)
    {
        if (!$gameData || !isset($gameData->user) || !isset($gameData->game) || !isset($gameData->shop)) {
            throw new \InvalidArgumentException('Invalid game data provided');
        }

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
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;

        $this->Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_1'] = [0, 0, 0, 25, 80, 500];
        $this->Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_3'] = [0, 0, 0, 25, 80, 500];
        $this->Paytable['SYM_4'] = [0, 0, 0, 20, 70, 300];
        $this->Paytable['SYM_5'] = [0, 0, 0, 15, 60, 200];
        $this->Paytable['SYM_6'] = [0, 0, 0, 15, 60, 200];
        $this->Paytable['SYM_7'] = [0, 0, 0, 10, 50, 100];
        $this->Paytable['SYM_8'] = [0, 0, 0, 10, 50, 100];
        $this->Paytable['SYM_9'] = [0, 0, 0, 5, 30, 80];
        $this->Paytable['SYM_10'] = [0, 0, 0, 5, 30, 80];
        $this->slotBonus = true;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotFreeCount = [
                0, 
                0, 
                0, 
                10, 
                20, 
                30
            ];
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

        $lines = $gameData->lines ?? 20;
        $betLine = $gameData->betLine ?? 1;
        $this->AllBet = $betLine * $lines;

for( $i = 0; $i <= 2000; $i++ ) 
                            {
                                $totalWin = 0;
                                $lineWins = [];
                                $cWins = [
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0, 
                                    0
                                ];
                                $wild = [
                                    '1', 
                                    '11', 
                                    '12', 
                                    '13'
                                ];
                                $scatter = '0';
                                $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent'], $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType'));
                                $reelsTmp = $reels;
                                $featureStr = '';
                                $randomwildsactive = false;
                                if( $postData['slotEvent'] == 'freespin' ) 
                                {
                                    $randomwildsactive = true;
                                }
                                $slotSettings->slotFreeMpl = 1;
                                if( $randomwildsactive ) 
                                {
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') == 'freespin_spreading' ) 
                                    {
                                        $wsym = 'SYM13';
                                        $wsym0 = '13';
                                        $spreadingWildsArr = [];
                                        $rReel = rand(2, 4);
                                        $rRow = rand(0, 2);
                                        $reels['reel' . $rReel][$rRow] = '13';
                                        $reelsTmp['reel' . $rReel][$rRow] = '13';
                                        for( $r = 2; $r <= 4; $r++ ) 
                                        {
                                            if( $reels['reel' . $r][0] == '13' || $reels['reel' . $r][1] == '13' || $reels['reel' . $r][2] == '13' ) 
                                            {
                                                if( $reels['reel' . $r][0] == '13' ) 
                                                {
                                                    $startSpeadngSym = [
                                                        $r, 
                                                        0
                                                    ];
                                                    $spreadingWildsArr = [
                                                        [
                                                            $r, 
                                                            1
                                                        ], 
                                                        [
                                                            $r + 1, 
                                                            0
                                                        ], 
                                                        [
                                                            $r - 1, 
                                                            0
                                                        ]
                                                    ];
                                                }
                                                if( $reels['reel' . $r][1] == '13' ) 
                                                {
                                                    $startSpeadngSym = [
                                                        $r, 
                                                        1
                                                    ];
                                                    $spreadingWildsArr = [
                                                        [
                                                            $r, 
                                                            0
                                                        ], 
                                                        [
                                                            $r, 
                                                            2
                                                        ], 
                                                        [
                                                            $r + 1, 
                                                            1
                                                        ], 
                                                        [
                                                            $r - 1, 
                                                            1
                                                        ]
                                                    ];
                                                }
                                                if( $reels['reel' . $r][2] == '13' ) 
                                                {
                                                    $startSpeadngSym = [
                                                        $r, 
                                                        2
                                                    ];
                                                    $spreadingWildsArr = [
                                                        [
                                                            $r, 
                                                            1
                                                        ], 
                                                        [
                                                            $r + 1, 
                                                            2
                                                        ], 
                                                        [
                                                            $r - 1, 
                                                            2
                                                        ]
                                                    ];
                                                }
                                                break;
                                            }
                                        }
                                        $symArr = [];
                                        $spreadCnt = rand(2, 3);
                                        shuffle($spreadingWildsArr);
                                        for( $ii = 0; $ii < $spreadCnt; $ii++ ) 
                                        {
                                            if( isset($spreadingWildsArr[$ii]) ) 
                                            {
                                                $symArr[$ii] = $spreadingWildsArr[$ii];
                                            }
                                        }
                                    }
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') == 'freespin_regular' ) 
                                    {
                                        $wsym = 'SYM1';
                                        $wsym0 = '1';
                                        $spreadingWildsArr = [
                                            [
                                                1, 
                                                0
                                            ], 
                                            [
                                                1, 
                                                1
                                            ], 
                                            [
                                                1, 
                                                2
                                            ], 
                                            [
                                                2, 
                                                0
                                            ], 
                                            [
                                                2, 
                                                1
                                            ], 
                                            [
                                                2, 
                                                2
                                            ], 
                                            [
                                                3, 
                                                0
                                            ], 
                                            [
                                                3, 
                                                1
                                            ], 
                                            [
                                                3, 
                                                2
                                            ], 
                                            [
                                                4, 
                                                0
                                            ], 
                                            [
                                                4, 
                                                1
                                            ], 
                                            [
                                                4, 
                                                2
                                            ], 
                                            [
                                                5, 
                                                0
                                            ], 
                                            [
                                                5, 
                                                1
                                            ], 
                                            [
                                                5, 
                                                2
                                            ]
                                        ];
                                        $symArr = [];
                                        $spreadCnt = rand(1, 5);
                                        shuffle($spreadingWildsArr);
                                        for( $jj = 0; $jj < $spreadCnt; $jj++ ) 
                                        {
                                            $symArr[$jj] = $spreadingWildsArr[$jj];
                                        }
                                    }
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') == 'freespin_expanding' ) 
                                    {
                                        $wsym = 'SYM11';
                                        $wsym0 = '11';
                                        $spreadingWildsArr = [
                                            [
                                                1, 
                                                1
                                            ], 
                                            [
                                                2, 
                                                1
                                            ], 
                                            [
                                                3, 
                                                1
                                            ], 
                                            [
                                                4, 
                                                1
                                            ], 
                                            [
                                                5, 
                                                1
                                            ]
                                        ];
                                        $symArr = [];
                                        $spreadCnt = rand(1, 2);
                                        shuffle($spreadingWildsArr);
                                        for( $r = 0; $r < $spreadCnt; $r++ ) 
                                        {
                                            $sew = $spreadingWildsArr[$r];
                                            $symArr[] = [
                                                $sew[0], 
                                                1
                                            ];
                                            $symArr[] = [
                                                $sew[0], 
                                                0
                                            ];
                                            $symArr[] = [
                                                $sew[0], 
                                                2
                                            ];
                                        }
                                    }
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') == 'freespin_multiplier' ) 
                                    {
                                        $spreadingWildsArr = [
                                            [
                                                1, 
                                                0
                                            ], 
                                            [
                                                1, 
                                                1
                                            ], 
                                            [
                                                1, 
                                                2
                                            ], 
                                            [
                                                2, 
                                                0
                                            ], 
                                            [
                                                2, 
                                                1
                                            ], 
                                            [
                                                2, 
                                                2
                                            ], 
                                            [
                                                3, 
                                                0
                                            ], 
                                            [
                                                3, 
                                                1
                                            ], 
                                            [
                                                3, 
                                                2
                                            ], 
                                            [
                                                4, 
                                                0
                                            ], 
                                            [
                                                4, 
                                                1
                                            ], 
                                            [
                                                4, 
                                                2
                                            ], 
                                            [
                                                5, 
                                                0
                                            ], 
                                            [
                                                5, 
                                                1
                                            ], 
                                            [
                                                5, 
                                                2
                                            ]
                                        ];
                                        $symArr = [];
                                        $spreadCnt = rand(1, 5);
                                        shuffle($spreadingWildsArr);
                                        for( $r = 0; $r < $spreadCnt; $r++ ) 
                                        {
                                            $symArr[$r] = $spreadingWildsArr[$r];
                                        }
                                        $wsym = 'SYM12';
                                        $wsym0 = '12';
                                        $slotSettings->slotFreeMpl = 2;
                                    }
                                    $ps = [
                                        0, 
                                        0, 
                                        0, 
                                        0, 
                                        0, 
                                        0
                                    ];
                                    $ps_ = 0;
                                    $ps_0 = 0;
                                    foreach( $symArr as $sw ) 
                                    {
                                        $reels['reel' . $sw[0]][$sw[1]] = $wsym0;
                                        $featureStr .= ('&rs.i0.r.i' . ($sw[0] - 1) . '.overlay.i' . $ps[$sw[0]] . '.row=' . $sw[1] . '&rs.i0.r.i' . ($sw[0] - 1) . '.overlay.i' . $ps[$sw[0]] . '.with=' . $wsym . '&rs.i0.r.i' . ($sw[0] - 1) . '.overlay.i' . $ps[$sw[0]] . '.pos=1');
                                        if( $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') == 'freespin_spreading' ) 
                                        {
                                            $featureStr .= ('&spread.from.i' . $ps_0 . '=' . ($startSpeadngSym[0] - 1) . '%2C' . $startSpeadngSym[1]);
                                            $featureStr .= ('&spread.to.i' . $ps_0 . '=' . ($sw[0] - 1) . '%2C' . $sw[1]);
                                        }
                                        $ps_0++;
                                        $ps[$sw[0]]++;
                                        $ps[0]++;
                                    }
                                }
                                $winLineCount = 0;
                                for( $k = 0; $k < $lines; $k++ ) 
                                {
                                    $tmpStringWin = '';
                                    for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                                    {
                                        $csym = (string)$slotSettings->SymbolGame[$j];
                                        if( $csym == $scatter || !isset($slotSettings->Paytable['SYM_' . $csym]) ) 
                                        {
                                        }
                                        else
                                        {
                                            $s = [];
                                            $s[0] = $reels['reel1'][$linesId[$k][0] - 1];
                                            $s[1] = $reels['reel2'][$linesId[$k][1] - 1];
                                            $s[2] = $reels['reel3'][$linesId[$k][2] - 1];
                                            $s[3] = $reels['reel4'][$linesId[$k][3] - 1];
                                            $s[4] = $reels['reel5'][$linesId[$k][4] - 1];
                                            if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                                            {
                                                $mpl = 1;
                                                if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) ) 
                                                {
                                                    $mpl = 1;
                                                }
                                                else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) ) 
                                                {
                                                    $mpl = $slotSettings->slotWildMpl;
                                                }
                                                $tmpWin = $slotSettings->Paytable['SYM_' . $csym][3] * $betline * $mpl * $bonusMpl;
                                                if( $cWins[$k] < $tmpWin ) 
                                                {
                                                    $cWins[$k] = $tmpWin;
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.types.i0.multipliers=1&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
                                                    $mainSymAnim = $csym;
                                                }
                                            }
                                            if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) ) 
                                            {
                                                $mpl = 1;
                                                if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild) ) 
                                                {
                                                    $mpl = 1;
                                                }
                                                else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) ) 
                                                {
                                                    $mpl = $slotSettings->slotWildMpl;
                                                }
                                                $tmpWin = $slotSettings->Paytable['SYM_' . $csym][4] * $betline * $mpl * $bonusMpl;
                                                if( $cWins[$k] < $tmpWin ) 
                                                {
                                                    $cWins[$k] = $tmpWin;
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.pos.i3=3%2C' . ($linesId[$k][3] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.multipliers=1&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
                                                    $mainSymAnim = $csym;
                                                }
                                            }
                                            if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild)) ) 
                                            {
                                                $mpl = 1;
                                                if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild) && in_array($s[4], $wild) ) 
                                                {
                                                    $mpl = 1;
                                                }
                                                else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) || in_array($s[4], $wild) ) 
                                                {
                                                    $mpl = $slotSettings->slotWildMpl;
                                                }
                                                $tmpWin = $slotSettings->Paytable['SYM_' . $csym][5] * $betline * $mpl * $bonusMpl;
                                                if( $cWins[$k] < $tmpWin ) 
                                                {
                                                    $cWins[$k] = $tmpWin;
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.pos.i3=3%2C' . ($linesId[$k][3] - 1) . '&ws.i' . $winLineCount . '.pos.i4=4%2C' . ($linesId[$k][4] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.types.i0.multipliers=1&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
                                                    $mainSymAnim = $csym;
                                                }
                                            }
                                        }
                                    }
                                    if( $cWins[$k] > 0 && $tmpStringWin != '' ) 
                                    {
                                        array_push($lineWins, $tmpStringWin);
                                        $totalWin += $cWins[$k];
                                        $winLineCount++;
                                    }
                                }
                                $attStr = '';
                                $nearwin = [];
                                $scattersWin = 0;
                                $pickWin = 0;
                                $scattersStr = '';
                                $scattersCount = 0;
                                $scattersCount2 = 0;
                                $scPos = [];
                                $scPos2 = [];
                                for( $r = 1; $r <= 5; $r++ ) 
                                {
                                    for( $p = 0; $p <= 2; $p++ ) 
                                    {
                                        if( $reels['reel' . $r][$p] == $scatter ) 
                                        {
                                            $scattersCount++;
                                            $scPos[] = '&ws.i0.pos.i' . ($r - 1) . '=' . ($r - 1) . '%2C' . $p . '';
                                        }
                                        if( $reels['reel' . $r][$p] == 2 ) 
                                        {
                                            $scattersCount2++;
                                            $scPos2[] = '&ws.i0.pos.i' . ($r - 1) . '=' . ($r - 1) . '%2C' . $p . '';
                                        }
                                    }
                                }
                                if( $scattersCount >= 3 ) 
                                {
                                    $scattersStr = '&ws.i0.types.i0.freespins=' . $slotSettings->slotFreeCount[$scattersCount] . '&ws.i0.reelset=basic&ws.i0.betline=null&ws.i0.types.i0.wintype=freespins&ws.i0.direction=none' . implode('', $scPos);
                                }
                                if( $scattersCount2 >= 3 ) 
                                {
                                    $pickWinMpl = rand(5, 50);
                                    $pickWin = $pickWinMpl * $allbet;
                                    $slotSettings->SetGameData($slotSettings->slotId . 'pickWinMpl', $pickWinMpl);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'pickWin', $pickWin);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'pickReels', $reels);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'pickBet', $allbet);
                                    for( $r = 1; $r <= 5; $r++ ) 
                                    {
                                        for( $p = 0; $p <= 2; $p++ ) 
                                        {
                                            if( $reels['reel' . $r][$p] == '2' && $r > 3 ) 
                                            {
                                                $attStr .= ('&rs.i0.r.i' . ($r - 1) . '.attention.i0=' . $p . '');
                                                $nearwin[] = $r - 1;
                                                break;
                                            }
                                        }
                                    }
                                    $scattersStr = '&rs.i0.nearwin=' . implode('%2C', $nearwin) . '&gamestate.current=bonus&ws.i0.sym=SYM2&ws.i0.direction=none&gamestate.stack=basic%2Cbonus&ws.i0.types.i0.wintype=bonusgame&ws.i0.types.i0.bonusid=wildwildwestbonusgame' . implode('', $scPos) . $attStr;
                                }
                                $totalWin += ($scattersWin + $pickWin);
                                if( $i > 1000 ) 
                                {
                                    $winType = 'none';
                                }
                                if( $i > 1500 ) 
                                {
                                    $response = '{"responseEvent":"error","responseType":"' . $postData['slotEvent'] . '","serverResponse":"Bad Reel Strip"}';
                                    exit( $response );
                                }
                                    if( $slotSettings->MaxWin < ($totalWin * $slotSettings->CurrentDenom) ) 
                                    {
                                    }
                                else
                                {
                                    $minWin = $slotSettings->GetRandomPay();
                                    if( $i > 700 ) 
                                    {
                                        $minWin = 0;
                                    }
                                    if( $slotSettings->increaseRTP && $winType == 'win' && $totalWin < ($minWin * $allbet) ) 
                                    {
                                    }
                                    else if( $scattersCount2 >= 3 && $winType != 'bonus' ) 
                                    {
                                    }
                                    else if( $scattersCount >= 3 && $winType != 'bonus' ) 
                                    {
                                    }
                                    else if( $totalWin <= $spinWinLimit && $winType == 'bonus' ) 
                                    {
                                        $cBank = $slotSettings->GetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''));
                                        if( $cBank < $spinWinLimit ) 
                                        {
                                            $spinWinLimit = $cBank;
                                        }
                                        else
                                        {
                                            break;
                                        }
                                    }
                                    else if( $totalWin > 0 && $totalWin <= $spinWinLimit && $winType == 'win' ) 
                                    {
                                        $cBank = $slotSettings->GetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''));
                                        if( $cBank < $spinWinLimit ) 
                                        {
                                            $spinWinLimit = $cBank;
                                        }
                                        else
                                        {
                                            break;
                                        }
                                    }
                                    else if( $totalWin == 0 && $winType == 'none' ) 
                                    {
                                        break;
                                    }
                                }
                            }
                            $freeState = '';
                            if( $totalWin > 0 ) 
                            {
                                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                            }
                            $reportWin = $totalWin;
                            $reels = $reelsTmp;
                            $curReels = '&rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '';
                            $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '');
                            $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '');
                            $curReels .= ('&rs.i0.r.i3.syms=SYM' . $reels['reel4'][0] . '%2CSYM' . $reels['reel4'][1] . '%2CSYM' . $reels['reel4'][2] . '');
                            $curReels .= ('&rs.i0.r.i4.syms=SYM' . $reels['reel5'][0] . '%2CSYM' . $reels['reel5'][1] . '%2CSYM' . $reels['reel5'][2] . '');
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') + $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalWin') + $totalWin);
                            }
                            else
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $totalWin);
                            }
                            $fs = 0;
                            if( $scattersCount >= 3 ) 
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount[$scattersCount]);
                                $rsSets = [
                                    'freespin_expanding', 
                                    'freespin_multiplier', 
                                    'freespin_regular', 
                                    'freespin_spreading'
                                ];
                                $slotSettings->SetGameData($slotSettings->slotId . 'ReelsType', $rsSets[rand(0, 3)]);
                                $fs = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=freespin&freespins.left=' . $fs . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cfreespin&freespins.totalwin.coins=0&freespins.total=' . $fs . '&freespins.win.cents=0&gamestate.current=freespin&freespins.initial=' . $fs . '&freespins.win.coins=0&freespins.betlevel=' . $slotSettings->GetGameData($slotSettings->slotId . 'Bet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&rs.i0.nearwin=' . implode('%2C', $nearwin) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '' . $attStr;
                                $curReels .= $freeState;
                            }
                            $attStr = '';
                            $nearwin = [];
                            $nearwinCnt = 0;
                            if( $scattersCount >= 2 ) 
                            {
                                for( $r = 1; $r <= 5; $r++ ) 
                                {
                                    for( $p = 0; $p <= 2; $p++ ) 
                                    {
                                        if( $nearwinCnt >= 2 && $p == 0 ) 
                                        {
                                            $nearwin[] = $r - 1;
                                        }
                                        if( $reels['reel' . $r][$p] == '0' ) 
                                        {
                                            $attStr .= ('&rs.i0.r.i' . ($r - 1) . '.attention.i0=' . $p . '');
                                            $nearwinCnt++;
                                        }
                                    }
                                }
                                $attStr .= ('&rs.i0.nearwin=' . implode('%2C', $nearwin));
                            }
                            /*$newTime = time() - $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit0');
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit0', time());
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit') - $newTime);
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWin', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWin') + ($totalWin * $slotSettings->CurrentDenom));*/
                            $winString = implode('', $lineWins);
                            $jsSpin = '' . json_encode($reels) . '';
                            $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                            $winstring = '';
                            $slotSettings->SetGameData($slotSettings->slotId . 'GambleStep', 5);
                            $hist = $slotSettings->GetGameData($slotSettings->slotId . 'Cards');
                            $isJack = 'false';
                            if( $totalWin > 0 ) 
                            {
                                $state = 'gamble';
                                $gameover = 'false';
                                $nextaction = 'spin';
                                $gameover = 'true';
                            }
                            else
                            {
                                $state = 'idle';
                                $gameover = 'true';
                                $nextaction = 'spin';
                            }
                            $gameover = 'true';
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') && $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') > 0 ) 
                                {
                                    $nextaction = 'spin';
                                    $stack = 'basic';
                                    $gamestate = 'basic';
                                }
                                else
                                {
                                    $gamestate = 'freespin';
                                    $nextaction = 'freespin';
                                    $stack = 'basic%2Cfreespin';
                                }
                                $fs = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                $fsl = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=' . $nextaction . '&freespins.left=' . $fsl . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' . $stack . '&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=' . ($totalWin / $slotSettings->CurrentDenomination * 100) . '&gamestate.current=' . $gamestate . '&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData($slotSettings->slotId . 'Bet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"GameDenom":' . $slotSettings->GetGameData($slotSettings->slotId . 'GameDenom') . ',"ReelsType":"' . $slotSettings->GetGameData($slotSettings->slotId . 'ReelsType') . '","freeState":"' . $freeState . '","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
        return [
            'BonusSymbol' => -1,
            'slotLines' => $lines,
            'slotBet' => $betLine,
            'totalFreeGames' => 0,
            'currentFreeGames' => 0,
            'Balance' => $gameData->user->balance ?? 1000,
            'afterBalance' => ($gameData->user->balance ?? 1000) - ($this->AllBet * $this->CurrentDenom),
            'bonusWin' => 0,
            'freeStartWin' => 0,
            'totalWin' => $totalWin ?? 0,
            'winLines' => [],
            'bonusInfo' => [],
            'Jackpots' => [],
            'reelsSymbols' => [
                'reel1' => isset($reels['reel1']) ? $reels['reel1'] : ['0','1','2'],
                'reel2' => isset($reels['reel2']) ? $reels['reel2'] : ['3','4','5'],
                'reel3' => isset($reels['reel3']) ? $reels['reel3'] : ['6','7','8'],
                'reel4' => isset($reels['reel4']) ? $reels['reel4'] : ['9','0','1'],
                'reel5' => isset($reels['reel5']) ? $reels['reel5'] : ['2','3','4'],
                'rp' => isset($reels['rp']) ? $reels['rp'] : [0,0,0,0,0]
            ]
        ];
    }

}
