<?php

namespace App\Games\NetEnt\GrandSpinnSuperpotNET;

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
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 0, 0];
        $this->Paytable['SYM_4'] = [0, 0, 0, 10, 0, 0];
        $this->Paytable['SYM_5'] = [0, 0, 0, 5, 0, 0];
        $this->Paytable['SYM_6'] = [0, 0, 0, 3, 0, 0];
        $this->Paytable['SYM_7'] = [0, 0, 0, 2, 0, 0];
        $this->Paytable['SYM_8'] = [0, 0, 0, 1, 0, 0];
        $this->Paytable['SYM_100'] = [0, 0, 0, 40, 0, 0];
        $this->Paytable['SYM_101'] = [0, 0, 0, 200, 0, 0];
        $this->Paytable['SYM_102'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_50'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_99'] = [0, 0, 0, 0, 0, 0];


        // Initialize reel strips


        // Initialize game configuration
        $this->slotBonus = false;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotFreeCount = [
                0, 
                0, 
                0, 
                15, 
                30, 
                60
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
                                if( $postData['slotEvent'] == 'nudge' ) 
                                {
                                    $reels = $slotSettings->OffsetReelStrips($slotSettings->GetGameData('GrandSpinnSuperpotNETReels'), rand(1, 1));
                                }
                                else
                                {
                                    $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                                }
                                if( isset($jackState) && $jackState['isJackPay'] ) 
                                {
                                    $reels['reel1'][1] = '102';
                                    $reels['reel2'][1] = '102';
                                    $reels['reel3'][1] = '102';
                                }
                                else if( $reels['reel1'][1] == '102' && $reels['reel2'][1] == '102' && $reels['reel3'][1] == '102' ) 
                                {
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
                                    else
                                    {
                                        if( $postData['slotEvent'] == 'nudge' ) 
                                        {
                                            break;
                                        }
                                        if( $scattersCount >= 3 && $winType != 'bonus' ) 
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
                            }
                            $freeState = '';
                            if( $totalWin > 0 ) 
                            {
                                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                                // Removed Laravel dependency
                            }
                            $reportWin = $totalWin;
                            $curReels = '&rs.i0.r.i0.syms=SYM' . $reels['reel1'][0] . '%2CSYM' . $reels['reel1'][1] . '%2CSYM' . $reels['reel1'][2] . '';
                            $curReels .= ('&rs.i0.r.i1.syms=SYM' . $reels['reel2'][0] . '%2CSYM' . $reels['reel2'][1] . '%2CSYM' . $reels['reel2'][2] . '');
                            $curReels .= ('&rs.i0.r.i2.syms=SYM' . $reels['reel3'][0] . '%2CSYM' . $reels['reel3'][1] . '%2CSYM' . $reels['reel3'][2] . '');
                            $curReels .= ('&rs.i0.r.i0.overlay.i0.with=SYM' . $reels['reel1'][0] . '&rs.i0.r.i0.overlay.i1.with=SYM' . $reels['reel1'][1] . '&rs.i0.r.i0.overlay.i2.with=SYM' . $reels['reel1'][2]);
                            $curReels .= ('&rs.i0.r.i1.overlay.i0.with=SYM' . $reels['reel2'][0] . '&rs.i0.r.i1.overlay.i1.with=SYM' . $reels['reel2'][1] . '&rs.i0.r.i1.overlay.i2.with=SYM' . $reels['reel2'][2] . '');
                            $curReels .= ('&rs.i0.r.i2.overlay.i0.with=SYM' . $reels['reel3'][0] . '&rs.i0.r.i2.overlay.i1.with=SYM' . $reels['reel3'][1] . '&rs.i0.r.i2.overlay.i2.with=SYM' . $reels['reel3'][2] . '');
                            $curReels .= ('&rs.i0.r.i0.overlay.i0.pos=' . $reels['rps'][0][0]);
                            $curReels .= ('&rs.i0.r.i0.overlay.i1.pos=' . $reels['rps'][0][1]);
                            $curReels .= ('&rs.i0.r.i0.overlay.i2.pos=' . $reels['rps'][0][2]);
                            $curReels .= ('&rs.i0.r.i1.overlay.i0.pos=' . $reels['rps'][1][0]);
                            $curReels .= ('&rs.i0.r.i1.overlay.i1.pos=' . $reels['rps'][1][1]);
                            $curReels .= ('&rs.i0.r.i1.overlay.i2.pos=' . $reels['rps'][1][2]);
                            $curReels .= ('&rs.i0.r.i2.overlay.i0.pos=' . $reels['rps'][2][0]);
                            $curReels .= ('&rs.i0.r.i2.overlay.i1.pos=' . $reels['rps'][2][1]);
                            $curReels .= ('&rs.i0.r.i2.overlay.i2.pos=' . $reels['rps'][2][2]);
                            if( $postData['slotEvent'] == 'nudge' ) 
                            {
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETBonusWin', $slotSettings->GetGameData('GrandSpinnSuperpotNETBonusWin') + $totalWin);
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETTotalWin', $slotSettings->GetGameData('GrandSpinnSuperpotNETTotalWin') + $totalWin);
                            }
                            else
                            {
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETTotalWin', $totalWin);
                            }
                            $fs = 0;
                            if( $scattersCount >= 3 ) 
                            {
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETFreeStartWin', $totalWin);
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETBonusWin', $totalWin);
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETFreeGames', $slotSettings->slotFreeCount[$scattersCount]);
                                $fs = $slotSettings->GetGameData('GrandSpinnSuperpotNETFreeGames');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=freespin&freespins.left=' . $fs . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cfreespin&freespins.totalwin.coins=0&freespins.total=' . $fs . '&freespins.win.cents=0&gamestate.current=freespin&freespins.initial=' . $fs . '&freespins.win.coins=0&freespins.betlevel=' . $slotSettings->GetGameData('GrandSpinnSuperpotNETBet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
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
                            $slotSettings->SetGameData('GrandSpinnSuperpotNETGambleStep', 5);
                            $hist = $slotSettings->GetGameData('GrandSpinnSuperpotNETCards');
                            $isJack = 'false';
                            $clientaction = 'spin';
                            if( $totalWin > 0 ) 
                            {
                                $state = 'gamble';
                                $gameover = 'false';
                                $nextaction = 'nudge';
                                $gameover = 'true';
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETNudge', 2);
                            }
                            else
                            {
                                $state = 'idle';
                                $gameover = 'true';
                                $nextaction = 'spin';
                            }
                            if( $postData['slotEvent'] == 'nudge' ) 
                            {
                                $slotSettings->SetGameData('GrandSpinnSuperpotNETNudge', $slotSettings->GetGameData('GrandSpinnSuperpotNETNudge') + 1);
                                $nudgeCnt = $slotSettings->GetGameData('GrandSpinnSuperpotNETNudge') + 1;
                                $clientaction = 'spin';
                                $gameover = 'true';
                                if( $slotSettings->GetGameData('GrandSpinnSuperpotNETNudge') >= 5 ) 
                                {
                                    $nextaction = 'spin';
                                    $gameover = 'true';
                                }
                                for( $nc = 3; $nc < $nudgeCnt; $nc++ ) 
                                {
                                }
                                $result_tmp[0] = 'rs.i0.r.i0.overlay.i0.pos=30&rs.i0.r.i2.overlay.i2.pos=11&gameServerVersion=1.10.0&g4mode=false&playercurrency=%26%23x20AC%3B&historybutton=false&rs.i0.r.i2.overlay.i1.pos=10&next.rs=basic&gamestate.history=basic&rs.i0.r.i0.overlay.i1.with=SYM8&rs.i0.r.i0.overlay.i1.row=1&rs.i0.r.i1.syms=SYM29%2CSYM10%2CSYM10&game.win.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&rs.i0.r.i2.overlay.i0.pos=9&rs.i0.id=ultraShort5&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&gamestate.current=basic&rs.i0.r.i0.overlay.i2.row=2&jackpot.tt_mega.' . $slotSettings->slotCurrency . '.amount-30s=500000&rs.i0.r.i0.overlay.i0.with=SYM8&rs.i0.r.i2.overlay.i0.row=0&jackpotcurrency=%26%23x20AC%3B&rs.i0.r.i0.overlay.i2.pos=32&rs.i0.r.i1.overlay.i1.with=SYM4&multiplier=1&rs.i0.r.i2.overlay.i2.with=SYM7&last.rs=ultraShort5&rs.i0.r.i0.syms=SYM14%2CSYM14%2CSYM28&rs.i0.r.i0.overlay.i1.pos=31&rs.i0.r.i1.overlay.i0.row=0&rs.i0.r.i1.overlay.i2.pos=39&rs.i0.r.i2.overlay.i0.with=SYM7&rs.i0.r.i2.overlay.i1.row=1&isJackpotWin=false&gamestate.stack=basic&rs.i0.r.i0.pos=30&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i0.r.i0.overlay.i0.row=0&rs.i0.r.i1.overlay.i1.row=1&rs.i0.r.i2.overlay.i2.row=2&rs.i0.r.i1.pos=37&rs.i0.r.i1.overlay.i1.pos=38&game.win.coins=' . $totalWin . '&playercurrencyiso=' . $slotSettings->slotCurrency . '&rs.i0.r.i1.hold=false&rs.i0.r.i1.overlay.i0.pos=37&rs.i0.r.i1.overlay.i2.row=2&playforfun=false&jackpotcurrencyiso=' . $slotSettings->slotCurrency . '&clientaction=' . $clientaction . '&jackpot.tt_mega.' . $slotSettings->slotCurrency . '.lastpayedout=0&rs.i0.r.i1.overlay.i2.with=SYM4&rs.i0.r.i2.hold=false&rs.i0.r.i2.pos=9&jackpot.tt_mega.' . $slotSettings->slotCurrency . '.amount=500000&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&gameover=' . $gameover . '&rs.i0.r.i0.hold=false&nextaction=' . $nextaction . '&wavecount=1&rs.i0.r.i1.overlay.i0.with=SYM102&rs.i0.r.i0.overlay.i2.with=SYM101&rs.i0.r.i2.syms=SYM12%2CSYM12%2CSYM12&rs.i0.r.i2.overlay.i1.with=SYM7&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '' . $curReels . $winString . '';
                            }
                            if( $postData['slotEvent'] == 'freespin' ) 
                            {
                                $totalWin = $slotSettings->GetGameData('GrandSpinnSuperpotNETBonusWin');
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') && $slotSettings->GetGameData('GrandSpinnSuperpotNETBonusWin') > 0 ) 
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
                                $fs = $slotSettings->GetGameData('GrandSpinnSuperpotNETFreeGames');
                                $fsl = $slotSettings->GetGameData('GrandSpinnSuperpotNETFreeGames') - $slotSettings->GetGameData('GrandSpinnSuperpotNETCurrentFreeGame');
                                $freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=' . $nextaction . '&freespins.left=' . $fsl . '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' . $stack . '&freespins.totalwin.coins=' . $totalWin . '&freespins.total=' . $fs . '&freespins.win.cents=' . ($totalWin / $slotSettings->CurrentDenomination * 100) . '&gamestate.current=' . $gamestate . '&freespins.initial=' . $fs . '&freespins.win.coins=' . $totalWin . '&freespins.betlevel=' . $slotSettings->GetGameData('GrandSpinnSuperpotNETBet') . '&totalwin.coins=' . $totalWin . '&credit=' . $balanceInCents . '&totalwin.cents=' . ($totalWin * $slotSettings->CurrentDenomination * 100) . '&game.win.amount=' . ($totalWin / $slotSettings->CurrentDenomination) . '';
                                $curReels .= $freeState;
                            }
                            $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"' . $freeState . '","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData('GrandSpinnSuperpotNETFreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData('GrandSpinnSuperpotNETCurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData('GrandSpinnSuperpotNETBonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                            

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
