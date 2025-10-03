<?php

namespace App\Games\NetEnt\WildWaterNET;

class DirectPHPHandler
{
    public static function main()
    {
        try {
            $input = file_get_contents('php://stdin');
            $data = json_decode($input, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid JSON input: ' . json_last_error_msg());
            }

            if (!isset($data['gameData'])) {
                throw new \Exception('Missing gameData in input');
            }

            $calculator = new GameCalculator((object)$data['gameData']);

            $result = $calculator->calculateSpin($data);

            echo json_encode($result);

        } catch (\Exception $e) {
            $errorResponse = [
                'error' => true,
                'message' => $e->getMessage(),
                'BonusSymbol' => -1,
                'slotLines' => 20,
                'slotBet' => 0.01,
                'totalFreeGames' => 0,
                'currentFreeGames' => 0,
                'Balance' => 1000.00,
                'afterBalance' => 1000.00,
                'bonusWin' => 0,
                'freeStartWin' => 0,
                'totalWin' => 0,
                'winLines' => [],
                'bonusInfo' => [],
                'Jackpots' => [],
                'reelsSymbols' => [
                    'reel1' => ['0','1','2'],
                    'reel2' => ['3','4','5'],
                    'reel3' => ['6','7','8'],
                    'reel4' => ['9','0','1'],
                    'reel5' => ['2','3','4'],
                    'rp' => [0,0,0,0,0]
                ]
            ];
            echo json_encode($errorResponse);
            exit(1);
        }
    }
}

if (basename(__FILE__) === basename($_SERVER['PHP_SELF'])) {
    DirectPHPHandler::main();
}
