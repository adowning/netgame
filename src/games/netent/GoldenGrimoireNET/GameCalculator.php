<?php

namespace App\Games\NetEnt\GoldenGrimoireNET;

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
        $this->Paytable['SYM_3'] = [0, 0, 0, 10, 30, 100];
        $this->Paytable['SYM_4'] = [0, 0, 0, 8, 25, 75];
        $this->Paytable['SYM_5'] = [0, 0, 0, 5, 20, 40];
        $this->Paytable['SYM_6'] = [0, 0, 0, 5, 15, 30];
        $this->Paytable['SYM_7'] = [0, 0, 0, 4, 10, 20];
        $this->Paytable['SYM_8'] = [0, 0, 0, 4, 10, 20];
        $this->Paytable['SYM_9'] = [0, 0, 0, 3, 8, 15];
        $this->Paytable['SYM_10'] = [0, 0, 0, 3, 8, 15];


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
                                $wild = ['1'];
                                $scatter = '0';
                                $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                                $reelsTmp = $reels;
                                $overlaySym = '';
                                $overlayCnt = 0;
                                $overlayRandomSymArr = [
                                    1, 
                                    6, 
                                    7, 
                                    8, 
                                    9, 
                                    10
                                ];
                                shuffle($overlayRandomSymArr);
                                $overlayRandomSym = $overlayRandomSymArr[0];
                                for( $r = 1; $r <= 5; $r++ ) 
                                {
                                    for( $p = 0; $p <= 3; $p++ ) 
                                    {
                                        if( $reels['reel' . $r][$p] == 13 ) 
                                        {
                                            $overlaySym .= ('&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $overlayCnt . '.pos=59&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $overlayCnt . '.row=' . $p . '&rs.i0.r.i' . ($r - 1) . '.overlay.i' . $overlayCnt . '.with=SYM' . $overlayRandomSym . '');
                                            $reels['reel' . $r][$p] = $overlayRandomSym;
                                            if( $reels['reel1'][$p] == $overlayRandomSym ) 
                                            {
                                                for( $rr = $r; $rr >= 1; $rr-- ) 
                                                {
                                                    $reels['reel' . $rr][$p] = $overlayRandomSym;
                                                }
                                            }
                                            $overlayCnt++;
                                        }
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
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
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
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.pos.i3=3%2C' . ($linesId[$k][3] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
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
                                                    $tmpStringWin = '&ws.i' . $winLineCount . '.reelset=basic&ws.i' . $winLineCount . '.types.i0.coins=' . $tmpWin . '&ws.i' . $winLineCount . '.pos.i0=0%2C' . ($linesId[$k][0] - 1) . '&ws.i' . $winLineCount . '.pos.i1=1%2C' . ($linesId[$k][1] - 1) . '&ws.i' . $winLineCount . '.pos.i2=2%2C' . ($linesId[$k][2] - 1) . '&ws.i' . $winLineCount . '.pos.i3=3%2C' . ($linesId[$k][3] - 1) . '&ws.i' . $winLineCount . '.pos.i4=4%2C' . ($linesId[$k][4] - 1) . '&ws.i' . $winLineCount . '.types.i0.wintype=coins&ws.i' . $winLineCount . '.betline=' . $k . '&ws.i' . $winLineCount . '.sym=SYM' . $csym . '&ws.i' . $winLineCount . '.direction=left_to_right&ws.i' . $winLineCount . '.types.i0.cents=' . ($tmpWin * $slotSettings->CurrentDenomination * 100) . '';
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
                                $scattersWin = 0;
                                $scattersStr = '';
                                $scattersCount = 0;
                                $scPos = [];
                                for( $r = 1; $r <= 5; $r++ ) 
                                {
                                    for( $p = 0; $p <= 3; $p++ ) 
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
                            if( $totalWin > 0 ) 
                            {
                                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                                // Removed Laravel dependency
                            }
                            $reels = $reelsTmp;
                            $reportWin = $totalWin;
                            $curReels = '&rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '' . '%2CSYM' . $reels['reel1'][3] . '';
                            $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '' . '%2CSYM' . $reels['reel2'][3] . '');
                            $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '' . '%2CSYM' . $reels['reel3'][3] . '');
                            $curReels .= ('&rs.i0.r.i3.syms=SYM' . $reels['reel4'][0] . '%2CSYM' . $reels['reel4'][1] . '%2CSYM' . $reels['reel4'][2] . '' . '%2CSYM' . $reels['reel4'][3] . '');
                            $curReels .= ('&rs.i0.r.i4.syms=SYM' . $reels['reel5'][0] . '%2CSYM' . $reels['reel5'][1] . '%2CSYM' . $reels['reel5'][2] . '' . '%2CSYM' . $reels['reel5'][3] . '');
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $slotSettings->SetGameData('GoldenGrimoireNETBonusWin', $slotSettings->GetGameData('GoldenGrimoireNETBonusWin') + $totalWin);
                                $slotSettings->SetGameData('GoldenGrimoireNETTotalWin', $slotSettings->GetGameData('GoldenGrimoireNETTotalWin') + $totalWin);
                            }
                            else
                            {
                                $slotSettings->SetGameData('GoldenGrimoireNETTotalWin', $totalWin);
                            }
                            $fs = 0;
                            if( $scattersCount >= 3 ) 
                            {
                                $slotSettings->SetGameData('GoldenGrimoireNETFreeStartWin', $totalWin);
                                $slotSettings->SetGameData('GoldenGrimoireNETBonusWin', $totalWin);
                                $slotSettings->SetGameData('GoldenGrimoireNETFreeGames', $slotSettings->slotFreeCount[$scattersCount]);
                                $fs = $slotSettings->GetGameData('GoldenGrimoireNETFreeGames');
                            }
                            /*$newTime = time() - $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit0');
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit0', time());
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWinLimit', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWinLimit') - $newTime);
                            $slotSettings->SetGameDataStatic($slotSettings->slotId . 'timeWin', $slotSettings->GetGameDataStatic($slotSettings->slotId . 'timeWin') + ($totalWin * $slotSettings->CurrentDenom));*/
                            $winString = implode('', $lineWins);
                            $jsSpin = '' . json_encode($reels) . '';
                            $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                            $winstring = '';
                            $slotSettings->SetGameData('GoldenGrimoireNETGambleStep', 5);
                            $hist = $slotSettings->GetGameData('GoldenGrimoireNETCards');
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
                                $totalWin = $slotSettings->GetGameData('GoldenGrimoireNETBonusWin');
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') && $slotSettings->GetGameData('GoldenGrimoireNETBonusWin') > 0 ) 
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
                                $fs = $slotSettings->GetGameData('GoldenGrimoireNETFreeGames');
                                $fsl = $slotSettings->GetGameData('GoldenGrimoireNETFreeGames') - $slotSettings->GetGameData('GoldenGrimoireNETCurrentFreeGame');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=' . $nextaction . '&freespins.left=' . $fsl . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' . $stack . '&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=' . ($totalWin / $slotSettings->CurrentDenomination * 100) . '&gamestate.current=' . $gamestate . '&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData('GoldenGrimoireNETBet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"' . $freeState . '","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData('GoldenGrimoireNETFreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData('GoldenGrimoireNETCurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData('GoldenGrimoireNETBonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                            

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
