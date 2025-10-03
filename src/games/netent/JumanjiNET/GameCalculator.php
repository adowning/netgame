<?php

namespace App\Games\NetEnt\JumanjiNET;

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
        $this->Paytable['SYM_3'] = [0, 0, 0, 6, 20, 140];
        $this->Paytable['SYM_4'] = [0, 0, 0, 5, 15, 50];
        $this->Paytable['SYM_5'] = [0, 0, 0, 4, 10, 30];
        $this->Paytable['SYM_6'] = [0, 0, 0, 3, 8, 25];
        $this->Paytable['SYM_7'] = [0, 0, 0, 2, 4, 10];
        $this->Paytable['SYM_8'] = [0, 0, 0, 2, 4, 9];
        $this->Paytable['SYM_9'] = [0, 0, 0, 2, 3, 8];
        $this->Paytable['SYM_10'] = [0, 0, 0, 2, 3, 7];


        // Initialize reel strips


        // Initialize game configuration
        $this->slotBonus = true;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotFreeCount = [
                0, 
                0, 
                0, 
                0, 
                0, 
                0
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
                                    $BonusStep = $slotSettings->GetGameData($slotSettings->slotId . 'BonusStep');
                                    $dicePoint0 = rand(1, 6);
                                    $dicePoint1 = rand(1, 6);
                                    $dicePoint = $dicePoint0 + $dicePoint1;
                                    $BonusStep += $dicePoint;
                                    if( $BonusStep > 31 ) 
                                    {
                                        $BonusStep = $BonusStep - 32;
                                    }
                                    $curBoardPos = $boardValues[$BonusStep - 1];
                                    if( $curBoardPos == '?' ) 
                                    {
                                    }
                                    else if( $BonusRolls == 1 && $curBoardPos != 'x1' && $curBoardPos != 'x2' && $curBoardPos != 'x3' && $curBoardPos != 'x5' ) 
                                    {
                                    }
                                    else
                                    {
                                        $totalWin = 0;
                                        $freeGames = 0;
                                        $freeGamesType = '';
                                        $bonusWinType = '';
                                        $bonusWinValue = 1;
                                        $fsInitStr = '&freespins.betlevel=1&freespins.win.coins=0&freespins.initial=6&freespins.denomination=' . $slotSettings->CurrentDenomination . '&freespins.win.cents=0&freespins.totalwin.coins=0&freespins.total=6&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C3&freespins.wavecount=1&freespins.multiplier=1&freespins.left=6&freespins.totalwin.cents=0';
                                        $featureInitStr = '&current.rs.i0=freespin&next.rs=freespin&bonus.win.type=feature&gamestate.current=freespin&gamestate.stack=basic%2Cfreespin&clientaction=bonusaction&nextaction=bonusaction&nextactiontype=roll';
                                        $advancedStr = '';
                                        $resultFsStr = '';
                                        switch( $curBoardPos ) 
                                        {
                                            case 'x1':
                                                $bonusWinType = 'coin';
                                                $totalWin = $allbet * 1;
                                                $bonusWinValue = 1;
                                                break;
                                            case 'x2':
                                                $bonusWinType = 'coin';
                                                $totalWin = $allbet * 2;
                                                $bonusWinValue = 2;
                                                break;
                                            case 'x3':
                                                $bonusWinType = 'coin';
                                                $totalWin = $allbet * 1;
                                                $bonusWinValue = 3;
                                                break;
                                            case 'x5':
                                                $bonusWinType = 'coin';
                                                $totalWin = $allbet * 5;
                                                $bonusWinValue = 5;
                                                break;
                                            case 'EXTRA':
                                                $BonusRollsTmp = rand(1, 3);
                                                $resultFsStr = '&bonus.win.value=' . $BonusRollsTmp;
                                                $bonusWinType = 'reroll';
                                                $BonusRolls += $BonusRollsTmp;
                                                $bonusWinValue = $BonusRollsTmp;
                                                break;
                                            case 'CROC':
                                                $boardValues[10] = 'EXTRA';
                                                $boardValues[11] = 'EXTRA';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                                $resultFsStr = $fsInitStr . $featureInitStr . '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                $bonusWinType = 'feature';
                                                $bonusWinValue = 'wildfeatures';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusType', 'wildreels');
                                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 6);
                                                break;
                                            case 'STICKY':
                                                $boardValues[26] = 'EXTRA';
                                                $boardValues[27] = 'EXTRA';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                                $resultFsStr = $fsInitStr . $featureInitStr . '&bonus.win.value=randomwilds&feature.randomwilds.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                $bonusWinType = 'feature';
                                                $bonusWinValue = 'wildfeatures';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusType', 'wildfeatures');
                                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 6);
                                                break;
                                            case 'MONKEY':
                                                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                                $resultFsStr = $fsInitStr . $featureInitStr . '&bonus.win.value=shuffle&feature.shuffle.active=true&nextclientrs=shuffle&nextaction=freespin';
                                                $bonusWinType = 'feature';
                                                $bonusWinValue = 'shuffle';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusType', 'shuffle');
                                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 6);
                                                break;
                                            case 'RHINO':
                                                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                                $resultFsStr = $fsInitStr . $featureInitStr . '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                $bonusWinType = 'feature';
                                                $bonusWinValue = 'wildfeatures';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusType', 'wildfeatures');
                                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 6);
                                                break;
                                            case '?':
                                                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                                $resultFsStr = $fsInitStr . $featureInitStr . '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                $bonusWinType = 'feature';
                                                $bonusWinValue = 'wildreels';
                                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusType', 'wildreels');
                                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 6);
                                                break;
                                        }
                                        if( $totalWin <= $bank ) 
                                        {
                                            break;
                                        }
                                    }
                                }
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalWin') + $totalWin);
                                $BonusRolls--;
                                $resultWinAll = $slotSettings->GetGameData($slotSettings->slotId . 'TotalWin');
                                $resultWinAllCents = $slotSettings->GetGameData($slotSettings->slotId . 'TotalWin') * $slotSettings->CurrentDenomination * 100;
                                $totalWinCents = $totalWin * $slotSettings->CurrentDenomination * 100;
                                $totalWinCoins = $totalWin;
                                if( $totalWin > 0 ) 
                                {
                                    $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                                    // Removed Laravel dependency
                                }
                                if( $BonusRolls <= 0 ) 
                                {
                                    $resultFsStr .= '&nextaction=endbonus&bonusgameover=true';
                                }
                                $result_tmp[] = '&cbs=' . $curBoardPos . '&gameServerVersion=2.0.1&g4mode=false&playercurrency=%26%23x20AC%3B&feature.randomwilds.active=false&historybutton=false&sub.sym12.r4=sym4&bonus.win.value=' . $bonusWinValue . '&sub.sym12.r3=sym4&sub.sym12.r2=sym4&gamestate.history=basic%2Cbonus&sub.sym12.r1=sym4&sub.sym12.r0=sym3&bonus.win.type=' . $bonusWinType . '&game.win.cents=' . $resultWinAllCents . '&nextclientrs=basic&totalwin.coins=' . $resultWinAll . '&credit=' . $balanceInCents . '&gamestate.current=bonus&jackpotcurrency=%26%23x20AC%3B&multiplier=1&bonus.rollsleft=' . $BonusRolls . '&feature.sticky.active=false&isJackpotWin=false&gamestate.stack=basic%2Cbonus&bonuswin.cents=' . $totalWinCents . '&totalbonuswin.cents=' . $resultWinAllCents . '&feature.shuffle.active=false&gamesoundurl=&feature.wildreels.active=false&bonus.dice.i0.result=' . $dicePoint0 . '&game.win.coins=' . $resultWinAll . '&playercurrencyiso=' . $slotSettings->slotCurrency . '&playforfun=false&jackpotcurrencyiso=' . $slotSettings->slotCurrency . '&clientaction=bonusaction&sub.sym13.r0=sym4&sub.sym13.r1=sym4&sub.sym13.r2=sym4&sub.sym13.r3=sym4&sub.sym13.r4=sym4&bonus.token=' . $BonusToken . '&totalwin.cents=' . $resultWinAllCents . '&gameover=false&totalbonuswin.coins=' . $resultWinAll . '&bonus.board.position=' . $BonusStep . '&sub.sym11.r4=sym4&sub.sym11.r3=sym4&sub.sym11.r2=sym4&sub.sym11.r1=sym4&sub.sym11.r0=sym4&bonusgame.coinvalue=' . $slotSettings->CurrentDenomination . '&gamestate.bonusid=alan-bonus&nextaction=bonusaction&wavecount=1&nextactiontype=roll&bonus.dice.i1.result=' . $dicePoint1 . '&game.win.amount=' . ($totalWinCents * $slotSettings->CurrentDenomination) . '&bonuswin.coins=' . $totalWinCoins . '' . $resultFsStr;
                                $slotSettings->SetGameData($slotSettings->slotId . 'boardValues', $boardValues);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusToken', $BonusToken);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusStep', $BonusStep);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusRolls', $BonusRolls);
                                $response_log = '{"responseEvent":"gambleResult","serverResponse":{"totalWin":0}}';
                                

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
