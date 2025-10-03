<?php

namespace App\Games\NetEnt\VikingsNET;

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

        $this->Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_3'] = [0, 0, 0, 30, 40, 50, 60, 70];
        $this->Paytable['SYM_4'] = [0, 0, 0, 6, 10, 20, 24, 28];
        $this->Paytable['SYM_5'] = [0, 0, 0, 6, 10, 20, 24, 28];
        $this->Paytable['SYM_6'] = [0, 0, 0, 6, 10, 20, 24, 28];
        $this->Paytable['SYM_7'] = [0, 0, 0, 6, 10, 20, 24, 28];
        $this->Paytable['SYM_8'] = [0, 0, 0, 2, 4, 10, 16, 20];
        $this->Paytable['SYM_9'] = [0, 0, 0, 2, 4, 10, 16, 20];
        $this->Paytable['SYM_10'] = [0, 0, 0, 2, 4, 10, 16, 20];
        $this->Paytable['SYM_11'] = [0, 0, 0, 2, 4, 10, 16, 20];
        $this->Paytable['SYM_12'] = [0, 0, 0, 2, 4, 10, 16, 20];
        $this->slotBonus = true;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotFreeCount = [
                0, 
                0, 
                0, 
                7, 
                7, 
                7
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
                                    0
                                ];
                                $wild = '1';
                                $scatter = '0';
                                $linesId0 = [];
                                if( $postData['slotEvent'] == 'freespin' ) 
                                {
                                    $reels = $slotSettings->GetBonusReelStrips();
                                }
                                else
                                {
                                    $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                                }
                                $reelsTmp = $reels;
                                $stackedOverlay = '';
                                $ovCnt = 0;
                                $hotspot = false;
                                $hotspotSym = -1;
                                $hotspotReel = -1;
                                $vikSym = [
                                    4, 
                                    5, 
                                    6, 
                                    7
                                ];
                                $reelLimit = 5;
                                $rowlLimit = 3;
                                for( $r = 1; $r <= $reelLimit; $r++ ) 
                                {
                                    foreach( $vikSym as $vs ) 
                                    {
                                        if( $postData['slotEvent'] == 'freespin' ) 
                                        {
                                            if( $reels['reel' . $r][0] == $vs && $reels['reel' . $r][1] == $vs && $reels['reel' . $r][2] == $vs ) 
                                            {
                                                $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=2&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                                $ovCnt++;
                                            }
                                            if( $reels['reel' . $r][1] == $vs && $reels['reel' . $r][2] == $vs && $reels['reel' . $r][3] == $vs ) 
                                            {
                                                if( $r == 3 || $r == 4 || $r == 5 ) 
                                                {
                                                    $hotspot = true;
                                                    $hotspotSym = $vs;
                                                    $hotspotReel = $r;
                                                }
                                                $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=3&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                                $ovCnt++;
                                            }
                                            if( $reels['reel' . $r][2] == $vs && $reels['reel' . $r][3] == $vs && $reels['reel' . $r][4] == $vs ) 
                                            {
                                                $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=4&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                                $ovCnt++;
                                            }
                                            if( $reels['reel' . $r][0] == $vs && $reels['reel' . $r][1] == $vs && !in_array($reels['reel' . $r][2], $vikSym) ) 
                                            {
                                                $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=1&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                                $ovCnt++;
                                            }
                                            if( $reels['reel' . $r][4] == $vs && $reels['reel' . $r][3] == $vs && !in_array($reels['reel' . $r][5], $vikSym) ) 
                                            {
                                                $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=5&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                                $ovCnt++;
                                            }
                                        }
                                        else if( $reels['reel' . $r][0] == $vs && $reels['reel' . $r][1] == $vs && $reels['reel' . $r][2] == $vs ) 
                                        {
                                            $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=2&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                            $ovCnt++;
                                            if( $r == 3 ) 
                                            {
                                                $hotspotReel = 3;
                                                $hotspot = true;
                                                $hotspotSym = $vs;
                                            }
                                        }
                                        else if( $reels['reel' . $r][0] == $vs && $reels['reel' . $r][1] == $vs ) 
                                        {
                                            $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=1&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                            $ovCnt++;
                                        }
                                        else if( $reels['reel' . $r][1] == $vs && $reels['reel' . $r][2] == $vs ) 
                                        {
                                            $stackedOverlay .= ('&stackbottom.i' . $ovCnt . '.reelindex=' . ($r - 1) . '&stackbottom.i' . $ovCnt . '.rowindex=3&stackbottom.i' . $ovCnt . '.symbol=SYM' . $vs);
                                            $ovCnt++;
                                        }
                                    }
                                }
                                $featureStr = '';
                                if( $hotspot ) 
                                {
                                    $featureStr = '&feature.hotspot=true';
                                    if( $postData['slotEvent'] == 'freespin' ) 
                                    {
                                        $reelLimit = 7;
                                        $rowlLimit = 4;
                                    }
                                    else
                                    {
                                        $reelLimit = 5;
                                        $rowlLimit = 2;
                                    }
                                    for( $r = 1; $r <= $reelLimit; $r++ ) 
                                    {
                                        if( $r == $hotspotReel ) 
                                        {
                                        }
                                        else
                                        {
                                            $pvc = 0;
                                            for( $p = 0; $p <= $rowlLimit; $p++ ) 
                                            {
                                                if( ($reels['reel' . $r][$p] == 7 || $reels['reel' . $r][$p] == 6 || $reels['reel' . $r][$p] == 5 || $reels['reel' . $r][$p] == 4) && $hotspotSym != $reels['reel' . $r][$p] ) 
                                                {
                                                    $reels['reel' . $r][$p] = $hotspotSym;
                                                    $featureStr .= ('&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $pvc . '.row=' . $p . '&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $pvc . '.with=SYM' . $hotspotSym . '&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $pvc . '.pos=1&s=' . $reels['reel' . $r][$p] . '&hotspotSym=' . $hotspotSym);
                                                    $pvc++;
                                                }
                                            }
                                        }
                                    }
                                }
                                $shieldFeature = false;
                                $featureStr0 = '';
                                if( rand(1, 15) == 1 ) 
                                {
                                }
                                if( $hotspot ) 
                                {
                                    $shieldFeature = false;
                                }
                                if( $shieldFeature ) 
                                {
                                    $sWidth = rand(2, 4);
                                    $sHeight = rand(2, 3);
                                    $rSym = rand(4, 7);
                                    $featureStr0 = 'rs.i0.r.i0.overlay.i0.pos=64&ws.i6.types.i0.wintype=coins&gameServerVersion=1.3.0&g4mode=false&historybutton=false&gamestate.history=basic&ws.i4.betline=0&ws.i2.types.i0.cents=12&rs.i0.r.i1.syms=SYM3%2CSYM8%2CSYM6&ws.i1.aftershieldwall=false&feature.shieldwall.rowindex=0&ws.i4.aftershieldwall=false&win.cap.reached=false&totalwin.coins=48&gamestate.current=basic&ws.i7.aftershieldwall=false&rs.i0.r.i2.overlay.i0.row=0&feature.shieldwall.reelindex=1&ws.i6.reelset=basic&stackbottom.i0.rowindex=4&rs.i0.r.i1.overlay.i0.row=0&feature.shieldwall.height=2&isJackpotWin=false&rs.i0.r.i0.pos=64&ws.i2.reelset=basic&stackbottom.i0.symbol=SYM6&rs.i0.r.i1.pos=6&ws.i4.direction=left_to_right&rs.i0.r.i1.overlay.i1.pos=7&ws.i6.types.i0.cents=12&game.win.coins=48&ws.i3.betline=0&rs.i0.r.i1.hold=false&ws.i1.reelset=basic&ws.i1.types.i0.wintype=coins&clientaction=spin&rs.i0.r.i2.hold=false&feature.shieldwall.activated=true&ws.i7.betline=0&ws.i2.betline=0&ws.i0.pos.i2=1%2C0&playercurrency=%26%23x20AC%3B&ws.i7.sym=SYM5&ws.i2.pos.i1=1%2C1&ws.i6.direction=left_to_right&current.rs.i0=basic&ws.i1.pos.i0=0%2C0&ws.i2.pos.i0=0%2C0&ws.i0.reelset=basic&ws.i1.pos.i1=1%2C0&ws.i3.pos.i1=1%2C1&ws.i5.types.i0.wintype=coins&ws.i1.pos.i2=2%2C1&ws.i4.pos.i0=0%2C1&ws.i7.types.i0.wintype=coins&ws.i5.sym=SYM5&rs.i0.r.i2.overlay.i0.pos=111&rs.i0.id=basic&feature.hotspot=false&credit=500016&ws.i0.types.i0.coins=6&stackbottom.i0.reelindex=1&multiplier=1&ws.i3.types.i0.wintype=coins&ws.i4.types.i0.cents=12&ws.i7.direction=left_to_right&ws.i2.aftershieldwall=false&ws.i0.sym=SYM5&rs.i0.r.i0.overlay.i1.pos=65&rs.i0.r.i2.overlay.i1.row=1&ws.i5.aftershieldwall=false&ws.i6.pos.i2=2%2C0&ws.i6.types.i0.coins=6&ws.i0.direction=left_to_right&ws.i6.pos.i0=1%2C1&gamestate.stack=basic&ws.i6.pos.i1=0%2C1&ws.i6.betline=0&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&ws.i0.types.i0.wintype=coins&ws.i4.reelset=basic&rs.i0.r.i0.overlay.i0.row=0&rs.i0.r.i1.overlay.i1.row=1&ws.i3.types.i0.cents=12&ws.i7.types.i0.coins=6&ws.i3.aftershieldwall=false&ws.i0.aftershieldwall=false&playercurrencyiso=' . $slotSettings->slotCurrency . '&rs.i0.r.i1.overlay.i0.pos=6&ws.i5.betline=0&feature.shieldwall.width=3&feature.shieldwall.symbol=SYM' . $rSym . '&ws.i6.aftershieldwall=false&ws.i7.types.i0.cents=12&ws.i5.direction=left_to_right&rs.i0.r.i3.hold=false';
                                    for( $r = 2; $r <= 4; $r++ ) 
                                    {
                                        $ps = 0;
                                        for( $p = 0; $p <= 1; $p++ ) 
                                        {
                                            $reels['reel' . $r][$p] = $rSym;
                                            $featureStr0 .= ('&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $ps . '.row=' . $p . '&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $ps . '.with=SYM' . $rSym . '&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $ps . '.pos=1&s=' . $reels['reel' . $r][$p] . '&hotspotSym=' . $hotspotSym);
                                            $ps++;
                                        }
                                    }
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
                                            0, 
                                            0, 
                                            0, 
                                            0, 
                                            0
                                        ];
                                        $waysCount = 1;
                                        $wayPos = [];
                                        $waysLimit = [];
                                        if( $postData['slotEvent'] == 'freespin' ) 
                                        {
                                            $waysLimit[20] = [
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
                                            $rwsLim = 7;
                                        }
                                        else
                                        {
                                            $waysLimit[20] = [
                                                [
                                                    0, 
                                                    1, 
                                                    2
                                                ], 
                                                [
                                                    0, 
                                                    1, 
                                                    2
                                                ], 
                                                [
                                                    0, 
                                                    1, 
                                                    2
                                                ], 
                                                [
                                                    0, 
                                                    1, 
                                                    2
                                                ], 
                                                [
                                                    0, 
                                                    1, 
                                                    2
                                                ]
                                            ];
                                            $rwsLim = 5;
                                        }
                                        $symPosConvert = [
                                            0, 
                                            1, 
                                            2, 
                                            3, 
                                            4, 
                                            5, 
                                            6
                                        ];
                                        $wildsMpl = 0;
                                        $wscnt = 0;
                                        for( $rws = 1; $rws <= $rwsLim; $rws++ ) 
                                        {
                                            $curWays = $waysLimit[20][$rws - 1];
                                            foreach( $curWays as $cws ) 
                                            {
                                                if( $reels['reel' . $rws][$cws] == $csym || $reels['reel' . $rws][$cws] == $wild ) 
                                                {
                                                    $waysCountArr[$rws]++;
                                                    $wayPos[] = '&ws.i' . $winLineCount . '.pos.i' . $wscnt . '=' . ($rws - 1) . '%2C' . $symPosConvert[$cws];
                                                    $wscnt++;
                                                }
                                            }
                                            if( $hotspotSym == $csym && $hotspot ) 
                                            {
                                                $waysCount = $waysCountArr[$rws] * $waysCount;
                                            }
                                            else
                                            {
                                                if( $waysCountArr[$rws] <= 0 ) 
                                                {
                                                    break;
                                                }
                                                $waysCount = $waysCountArr[$rws] * $waysCount;
                                            }
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][3] * $betline * $waysCount * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][4] * $betline * $waysCount * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 && $waysCountArr[5] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][5] * $betline * $waysCount * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 && $waysCountArr[5] > 0 && $waysCountArr[6] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][6] * $betline * $waysCount * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $waysCountArr[1] > 0 && $waysCountArr[2] > 0 && $waysCountArr[3] > 0 && $waysCountArr[4] > 0 && $waysCountArr[5] > 0 && $waysCountArr[6] > 0 && $waysCountArr[7] > 0 ) 
                                        {
                                            $cWins[$j] = $slotSettings->Paytable['SYM_' . $csym][7] * $betline * $waysCount * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
                                        }
                                        if( $hotspotSym == $csym && $hotspot ) 
                                        {
                                            $vikScatCnt = 0;
                                            for( $viks = 0; $viks < 7; $viks++ ) 
                                            {
                                                $vikScatCnt += $waysCountArr[$viks];
                                            }
                                            $cWins[$j] = $slotSettings->Paytable['SCATTER_PAYS'][$vikScatCnt] * $betline * $bonusMpl;
                                            $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $cWins[$j] . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=243&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($cWins[$j] * $slotSettings->CurrentDenomination * 100) . '' . implode('', $wayPos);
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
                            $reels = $reelsTmp;
                            if( $totalWin > 0 ) 
                            {
                                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                            }
                            $reportWin = $totalWin;
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $curReels = '&rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '%2CSYM' . $reels['reel1'][3] . '%2CSYM' . $reels['reel1'][4] . '';
                                $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '%2CSYM' . $reels['reel2'][3] . '%2CSYM' . $reels['reel2'][4] . '');
                                $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '%2CSYM' . $reels['reel3'][3] . '%2CSYM' . $reels['reel3'][4] . '');
                                $curReels .= ('&rs.i0.r.i3.syms=SYM' . $reels['reel4'][0] . '%2CSYM' . $reels['reel4'][1] . '%2CSYM' . $reels['reel4'][2] . '%2CSYM' . $reels['reel4'][3] . '%2CSYM' . $reels['reel4'][4] . '');
                                $curReels .= ('&rs.i0.r.i4.syms=SYM' . $reels['reel5'][0] . '%2CSYM' . $reels['reel5'][1] . '%2CSYM' . $reels['reel5'][2] . '%2CSYM' . $reels['reel5'][3] . '%2CSYM' . $reels['reel5'][4] . '');
                                $curReels .= ('&rs.i0.r.i5.syms=SYM' . $reels['reel6'][0] . '%2CSYM' . $reels['reel6'][1] . '%2CSYM' . $reels['reel6'][2] . '%2CSYM' . $reels['reel6'][3] . '%2CSYM' . $reels['reel6'][4] . '');
                                $curReels .= ('&rs.i0.r.i6.syms=SYM' . $reels['reel7'][0] . '%2CSYM' . $reels['reel7'][1] . '%2CSYM' . $reels['reel7'][2] . '%2CSYM' . $reels['reel7'][3] . '%2CSYM' . $reels['reel7'][4] . '');
                            }
                            else
                            {
                                $curReels = '&rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '';
                                $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '');
                                $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '');
                                $curReels .= ('&rs.i0.r.i3.syms=SYM' . $reels['reel4'][0] . '%2CSYM' . $reels['reel4'][1] . '%2CSYM' . $reels['reel4'][2] . '');
                                $curReels .= ('&rs.i0.r.i4.syms=SYM' . $reels['reel5'][0] . '%2CSYM' . $reels['reel5'][1] . '%2CSYM' . $reels['reel5'][2] . '');
                            }
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $slotSettings->SetGameData('VikingsNETBonusWin', $slotSettings->GetGameData('VikingsNETBonusWin') + $totalWin);
                                $slotSettings->SetGameData('VikingsNETTotalWin', $slotSettings->GetGameData('VikingsNETTotalWin') + $totalWin);
                            }
                            else
                            {
                                $slotSettings->SetGameData('VikingsNETTotalWin', $totalWin);
                            }
                            $fs = 0;
                            if( $scattersCount >= 3 ) 
                            {
                                $slotSettings->SetGameData('VikingsNETFreeStartWin', $totalWin);
                                $slotSettings->SetGameData('VikingsNETBonusWin', $totalWin);
                                $slotSettings->SetGameData('VikingsNETFreeGames', $slotSettings->slotFreeCount[$scattersCount]);
                                $fs = $slotSettings->GetGameData('VikingsNETFreeGames');
                                $freeState = '&rs.i0.nearwin=4&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=freespin&freespins.left=' . $fs . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cfreespin&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=0&gamestate.current=freespin&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData('VikingsNETBet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            /*$newTime = time() - $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit0');
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit0', time());
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit') - $newTime);
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWin', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWin') + ($totalWin * $slotSettings->CurrentDenom));*/
                            $winString = implode('', $lineWins);
                            $jsSpin = '' . json_encode($reels) . '';
                            $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                            $winstring = '';
                            $slotSettings->SetGameData('VikingsNETGambleStep', 5);
                            $hist = $slotSettings->GetGameData('VikingsNETCards');
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
                                $totalWin = $slotSettings->GetGameData('VikingsNETBonusWin');
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
                                }
                                $fs = $slotSettings->GetGameData('VikingsNETFreeGames');
                                $fsl = $slotSettings->GetGameData('VikingsNETFreeGames') - $slotSettings->GetGameData('VikingsNETCurrentFreeGame');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&next.rs=' . $nextrs . '&freespins.totalwin.cents=0&nextaction=' . $nextaction . '&freespins.left=' . $fsl . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' . $stack . '&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=' . ($totalWin / $slotSettings->CurrentDenomination * 100) . '&gamestate.current=' . $gamestate . '&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData('VikingsNETBet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"' . $freeState . '","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData('VikingsNETFreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData('VikingsNETCurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData('VikingsNETBonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
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
