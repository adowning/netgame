<?php

namespace App\Games\NetEnt\ReelRush2NET;

class GameCalculator
{
    // Static configuration
    public $Paytable;
    public $reelsStrip;
    public $reelsStripBonus;

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
    public $slotFreeMpl;
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
        $this->slotWildMpl = $gameData->game->slotWildMpl ?? 1;
        $this->slotFreeMpl = $gameData->game->slotFreeMpl ?? 1;
        $this->CurrentDenom = $gameData->game->denomination;

        // Initialize Paytable
        $this->Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_3'] = [0, 0, 0, 10, 50, 200];
        $this->Paytable['SYM_4'] = [0, 0, 0, 8, 25, 100];
        $this->Paytable['SYM_5'] = [0, 0, 0, 7, 15, 30];
        $this->Paytable['SYM_6'] = [0, 0, 0, 7, 15, 30];
        $this->Paytable['SYM_7'] = [0, 0, 0, 5, 10, 20];
        $this->Paytable['SYM_8'] = [0, 0, 0, 5, 10, 20];
        $this->Paytable['SYM_9'] = [0, 0, 0, 1, 6, 12];
        $this->Paytable['SYM_10'] = [0, 0, 0, 1, 6, 12];
        $this->Paytable['SYM_11'] = [0, 0, 0, 1, 5, 10];
        $this->Paytable['SYM_12'] = [0, 0, 0, 1, 5, 10];
        $this->Paytable['SYM_13'] = [0, 0, 0, 1, 5, 10];


        // Initialize reel strips


        // Initialize game configuration
        $this->slotBonus = true;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotFreeCount = [
                0, 
                0, 
                0, 
                8, 
                8, 
                8
            ];


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

        $lines = $gameData->lines ?? 20;
        $betLine = $gameData->betLine ?? 1;
        $this->AllBet = $betLine * $lines;

        // Extracted spin logic (may require manual adaptation)
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
                                    0
                                ];
                                $wild = '1';
                                $scatter = '0';
                                $linesId0 = [];
                                $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                                $reelsTmp = $reels;
                                $Stars = $slotSettings->GetGameData($slotSettings->slotId . 'Stars');
                                $featureStr = '';
                                $featuresArr = [
                                    'BreakOpen', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'SymbolUpgrade', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'ManyBonusStars', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'SymbolMultiplier', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'None', 
                                    'RandomWilds', 
                                    'SecondChance'
                                ];
                                shuffle($featuresArr);
                                $featuresActived = [
                                    $featuresArr[0], 
                                    $featuresArr[1], 
                                    $featuresArr[2]
                                ];
                                $featuresCnt = 0;
                                if( $winType == 'bonus' ) 
                                {
                                    $featuresActived = [
                                        'BreakOpen', 
                                        'None', 
                                        'None'
                                    ];
                                }
                                if( in_array('SymbolUpgrade', $featuresActived) ) 
                                {
                                    $featureStr = $slotSettings->SymbolUpgrade($reels, $featuresCnt);
                                    $featuresCnt++;
                                }
                                $advancedMultiplier = 1;
                                $advancedSymMultiplier = -1;
                                if( in_array('SymbolMultiplier', $featuresActived) ) 
                                {
                                    $tmpl = [
                                        5, 
                                        10, 
                                        15, 
                                        20
                                    ];
                                    shuffle($tmpl);
                                    $advancedMultiplier = $tmpl[0];
                                    $advancedSymMultiplier = rand(3, 13);
                                    $featureStr = '&features.i' . $featuresCnt . '.data.sym=SYM' . $advancedSymMultiplier . '&features.i' . $featuresCnt . '.data.multiplier=' . $advancedMultiplier . '&features.i' . $featuresCnt . '.type=SymbolMultiplier';
                                    $featuresCnt++;
                                }
                                if( in_array('ManyBonusStars', $featuresActived) ) 
                                {
                                    $tmpl = [
                                        3, 
                                        15
                                    ];
                                    shuffle($tmpl);
                                    $curName = 'ManyBonusStars';
                                    if( $tmpl[0] == 3 ) 
                                    {
                                        $curName = 'FewBonusStars';
                                    }
                                    $CurrentStars = $tmpl[0];
                                    $Stars += $CurrentStars;
                                    $featureStr = '&features.i' . $featuresCnt . '.type=' . $curName . '&features.i' . $featuresCnt . '.data.stars=' . $CurrentStars;
                                    $featuresCnt++;
                                }
                                if( in_array('RandomWilds', $featuresActived) ) 
                                {
                                    $featureStr = $slotSettings->RandomWilds($reels, $featuresCnt);
                                    $featuresCnt++;
                                }
                                $SecondChance = false;
                                if( in_array('SecondChance', $featuresActived) && $winType == 'none' && $postData['slotEvent'] != 'freespin' ) 
                                {
                                    $SecondChance = true;
                                    $featureStr = '&features.i' . $featuresCnt . '.type=SecondChance&features.i' . $featuresCnt . '.data.active=true';
                                    $featuresCnt++;
                                }
                                $BreakOpen = false;
                                $BreakOpenCnt = 2;
                                if( in_array('BreakOpen', $featuresActived) && $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') == 0 ) 
                                {
                                    $BreakOpen = true;
                                    if( $winType == 'bonus' ) 
                                    {
                                        $BreakOpenCnt = 12;
                                    }
                                    $openPositionsArr = [
                                        0, 
                                        2, 
                                        4, 
                                        6, 
                                        8, 
                                        10, 
                                        12, 
                                        10, 
                                        10, 
                                        10
                                    ];
                                    $op1 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId') + 1];
                                    $featureStr = '&features.i' . $featuresCnt . '.type=BreakOpen&features.i' . $featuresCnt . '.data.count=' . $BreakOpenCnt;
                                    $featuresCnt++;
                                }
                                $winLineCount = 0;
                                $tmpStringWin = '';
                                $wildsMplArr = [];
                                for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                                {
                                    $csym = $slotSettings->SymbolGame[$j];
                                    if( $csym == $scatter ) 
                                    {
                                    }
                                    else
                                    {
                                        $waysCountArr = [
                                            0, 
                                            0, 
                                            0, 
                                            0, 
                                            0, 
                                            0
                                        ];
                                        $waysCount = 1;
                                        $wayPos = [];
                                        $RespinId = $slotSettings->GetGameData($slotSettings->slotId . 'RespinId');
                                        if( $BreakOpen ) 
                                        {
                                            $RespinId = $RespinId + 1;
                                        }
                                        if( $RespinId > 5 ) 
                                        {
                                            $RespinId = 5;
                                        }
                                        $waysLimit = [];
                                        $waysLimit[0] = [
                                            [2], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [2]
                                        ];
                                        $waysLimit[1] = [
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [2]
                                        ];
                                        $waysLimit[2] = [
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ]
                                        ];
                                        $waysLimit[3] = [
                                            [
                                                1, 
                                                2, 
                                                3
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ]
                                        ];
                                        $waysLimit[4] = [
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                1, 
                                                2, 
                                                3
                                            ]
                                        ];
                                        $waysLimit[5] = [
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ], 
                                            [
                                                0, 
                                                1, 
                                                2, 
                                                3, 
                                                4
                                            ]
                                        ];
                                        $symPosConvert = [
                                            0, 
                                            1, 
                                            2, 
                                            3, 
                                            4
                                        ];
                                        $wildsMpl = 0;
                                        $aMpl = 1;
                                        $wscnt = 0;
                                        if( $advancedSymMultiplier == $csym ) 
                                        {
                                            $aMpl = $advancedMultiplier;
                                        }
                                        for( $rws = 1; $rws <= 5; $rws++ ) 
                                        {
                                            $curWays = $waysLimit[$RespinId][$rws - 1];
                                            foreach( $curWays as $cwsIndex => $cws ) 
                                            {
                                                if( $reels['reel' . $rws][$cws] == $csym || $reels['reel' . $rws][$cws] == $wild ) 
                                                {
                                                    $waysCountArr[$rws]++;
                                                    $wayPos[] = '&ws.i' . $winLineCount . '.pos.i' . $wscnt . '=' . ($rws - 1) . '%2C' . $cwsIndex;
                                                    $wscnt++;
                                                }
                                            }
                                            if( $waysCountArr[$rws] <= 0 ) 
                                            {
                                                break;
                                            }
                                            $waysCount = $waysCountArr[$rws] * $waysCount;
                                        }
                                        $wReelSet = 'basic';
                                        $superMultiplier = $slotSettings->GetGameData($slotSettings->slotId . 'SuperMpl');
                                        if( $postData['slotEvent'] == 'freespin' && $postData['freeMode'] == 'superfreespin' ) 
                                        {
                                            $wReelSet = 'superFreespin';
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][3] * $betline * $waysCount * $bonusMpl * $aMpl * $superMultiplier;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=' . $wReelSet . '&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=0&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][4] * $betline * $waysCount * $bonusMpl * $aMpl * $superMultiplier;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=' . $wReelSet . '&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=0&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 && $waysCountArr[5] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][5] * $betline * $waysCount * $bonusMpl * $aMpl * $superMultiplier;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=' . $wReelSet . '&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=0&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $cWins[$j] > 0 && $tmpStringWin != '' ) 
                                        {
                                            array_push($lineWins, $tmpStringWin);
                                            $totalWin += $cWins[$j];
                                            $winLineCount++;
                                        }
                                    }
                                }
                                $scattersWin = 0;
                                $scattersStr = '';
                                $scattersCount = 0;
                                $scPos = [];
                                for( $r = 1; $r <= 5; $r++ ) 
                                {
                                    for( $p = 0; $p <= 2; $p++ ) 
                                    {
                                        if( $reels['reel' . $r][$p] == $scatter ) 
                                        {
                                            $scattersCount++;
                                            $scPos[] = '&ws.i0.pos.i' . ($r - 1) . '=' . ($r - 1) . '%2C' . $p . '';
                                        }
                                    }
                                }
                                if( $scattersCount >= 3 ) 
                                {
                                    $scattersStr = '&ws.i0.types.i0.freespins=' . $slotSettings->slotFreeCount[$scattersCount] . '&ws.i0.reelset=basic&ws.i0.betline=null&ws.i0.types.i0.wintype=freespins&ws.i0.direction=none' . implode('', $scPos);
                                }
                                $totalWin += $scattersWin;
                                $spinWin = $totalWin;
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
                                    if( $slotSettings->MaxWin < ($slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWin') + ($totalWin * $slotSettings->CurrentDenom)) ) 
                                    {
                                        $winType = 'none';
                                    }
                                    $minWin = $slotSettings->GetRandomPay();
                                    if( $i > 700 ) 
                                    {
                                        $minWin = 0;
                                    }
                                    if( $slotSettings->increaseRTP && $winType == 'win' && $totalWin < ($minWin * $allbet) ) 
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
                                // Removed Laravel dependency
                            }
                            $reportWin = $totalWin;
                            $reels = $reelsTmp;
                            $curReels = ' &rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '%2CSYM' . $reels['reel1'][3] . '%2CSYM' . $reels['reel1'][4] . '';
                            $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '%2CSYM' . $reels['reel2'][3] . '%2CSYM' . $reels['reel2'][4] . '');
                            $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '%2CSYM' . $reels['reel3'][3] . '%2CSYM' . $reels['reel3'][4] . '');
                            $curReels .= ('&rs.i0.r.i3.syms=SYM' . $reels['reel4'][0] . '%2CSYM' . $reels['reel4'][1] . '%2CSYM' . $reels['reel4'][2] . '%2CSYM' . $reels['reel4'][3] . '%2CSYM' . $reels['reel4'][4] . '');
                            $curReels .= ('&rs.i0.r.i4.syms=SYM' . $reels['reel5'][0] . '%2CSYM' . $reels['reel5'][1] . '%2CSYM' . $reels['reel5'][2] . '%2CSYM' . $reels['reel5'][3] . '%2CSYM' . $reels['reel5'][4] . '');
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
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $op1 = 12;
                                $op0 = 0;
                            }
                            else if( $SecondChance ) 
                            {
                                $state = 'gamble';
                                $gameover = 'false';
                                $nextaction = 'respin';
                                $gameover = 'true';
                                if( $BreakOpen ) 
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') + 1);
                                }
                                $openPositionsArr = [
                                    0, 
                                    2, 
                                    4, 
                                    6, 
                                    8, 
                                    10, 
                                    12, 
                                    10, 
                                    10, 
                                    10
                                ];
                                $op1 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId')];
                                $op0 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId')];
                            }
                            else if( $totalWin > 0 ) 
                            {
                                $state = 'gamble';
                                $gameover = 'false';
                                $nextaction = 'respin';
                                $gameover = 'true';
                                if( $BreakOpen ) 
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') + 1);
                                }
                                $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') + 1);
                                $openPositionsArr = [
                                    0, 
                                    2, 
                                    4, 
                                    6, 
                                    8, 
                                    10, 
                                    12, 
                                    10, 
                                    10, 
                                    10
                                ];
                                $op1 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId')];
                                $op0 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId')];
                            }
                            else
                            {
                                if( $BreakOpen ) 
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') + 1);
                                }
                                $openPositionsArr = [
                                    0, 
                                    2, 
                                    4, 
                                    6, 
                                    8, 
                                    10, 
                                    12, 
                                    10, 
                                    10, 
                                    10
                                ];
                                $op1 = $openPositionsArr[$slotSettings->GetGameData($slotSettings->slotId . 'RespinId')];
                                $op0 = 0;
                                $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', 0);
                                $state = 'idle';
                                $gameover = 'true';
                                $nextaction = 'spin';
                            }
                            $gameover = 'true';
                            if( $BreakOpenCnt == 12 ) 
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'RespinId', 5);
                            }
                            if( $slotSettings->GetGameData($slotSettings->slotId . 'RespinId') >= 5 && $postData['slotEvent'] != 'freespin' ) 
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 8);
                                $op0 = 0;
                                $op1 = 0;
                                $fs = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&freespins.left=' . $fs . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cstart_freespins&freespins.totalwin.coins=0&freespins.total=' . $fs . '&freespins.win.cents=0&gamestate.current=start_freespins&freespins.initial=' . $fs . '&freespins.win.coins=0&legalactions=startfreespins%2Cgamble&freespins.betlevel=' . $slotSettings->GetGameData($slotSettings->slotId . 'Bet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&nextaction=startfreespins&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ) 
                                {
                                    $nextaction = 'spin';
                                    $stack = 'basic';
                                    $gamestate = 'basic';
                                    $nextrs = 'basic';
                                }
                                else
                                {
                                    $gamestate = 'freespin';
                                    $nextaction = 'freespin';
                                    $stack = 'basic%2Cfreespin';
                                    $nextrs = 'freespin';
                                    if( $postData['freeMode'] == 'superfreespin' ) 
                                    {
                                        $gamestate = 'super_freespin';
                                        $nextaction = 'superfreespin';
                                        $stack = 'basic%2Cfreespin';
                                        $nextrs = 'superFreespin';
                                    }
                                }
                                $fs = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                $fsl = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&nextaction=' . $nextaction . '&freespins.left=' . $fsl . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' . $stack . '&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=' . ($totalWin / $slotSettings->CurrentDenomination * 100) . '&gamestate.current=' . $gamestate . '&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData($slotSettings->slotId . 'Bet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '&next.rs=' . $nextrs;
                                $curReels .= $freeState;
                            }
                            $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"' . $freeState . '","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                            if( $postData['slotEvent'] == 'respin' ) 
                            {
                                $postData['slotEvent'] = 'BG2';
                            }
                            

        // Return serverResponse structure
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

    // Additional methods may be needed based on extracted logic
}
