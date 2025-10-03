<?php

namespace Netgame\Calculator\FortuneCashNG;

use Netgame\Calculator\BaseGameCalculator;

/**
 * FortuneCashNG Game Calculator
 *
 * Handles spin calculations for FortuneCashNG slot game.
 * Extends BaseGameCalculator with game-specific paytable and reel strips.
 */
class GameCalculator extends BaseGameCalculator
{
    /**
     * Initialize paytable specific to FortuneCashNG
     */
    protected function initializePaytable()
    {
        $this->paytable = [
            'SYM_0' => [0, 0, 2, 25, 125, 250],
            'SYM_1' => [0, 0, 0, 25, 100, 150],
            'SYM_2' => [0, 0, 0, 20, 50, 125],
            'SYM_3' => [0, 0, 0, 20, 50, 100],
            'SYM_4' => [0, 0, 0, 10, 40, 50],
            'SYM_5' => [0, 0, 0, 10, 40, 50],
            'SYM_6' => [0, 0, 0, 5, 20, 40],
            'SYM_7' => [0, 0, 0, 5, 20, 40],
            'SYM_8' => [0, 0, 0, 2, 10, 30],
            'SYM_9' => [0, 0, 0, 2, 10, 30],
            'SYM_10' => [0, 0, 0, 0, 0, 0], // Scatter
            'SYM_11' => [0, 0, 0, 0, 0, 0], // Wild
            'SYM_12' => [0, 0, 0, 0, 0, 0]  // Bonus
        ];
    }

    /**
     * Initialize reel strips specific to FortuneCashNG
     */
    protected function initializeReelStrips()
    {
        // Parse reel strips from embedded data (normally would read from file)
        $reelData = [
            'reelStrip1' => '2,4,1,3,1,2,5,0,4,2,7,6,3,8,3,7,2,5,0,4,2,7,6,11,0,2,9,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7,3,8,7,5,3,1,0,5,8,3,6,1,2,9,5,0,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,11,5,1,0,6,4,1,0,2,5,1,4,2,7,6,3,11,8,7,8,2,0,3',
            'reelStrip2' => '2,4,1,7,1,2,5,3,4,2,7,6,3,8,7,2,5,0,4,2,7,6,3,8,7,5,3,1,0,5,8,3,6,1,2,5,0,2,10,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7,0,4,2,7,6,3,8,7,8,2,12,8,4,2,6,8,4,2,1,0,9,6,4,1,0,2,5,1,10,10,10,4,2,7,6,3,8,7,8,2,0,3',
            'reelStrip3' => '2,4,1,7,1,2,0,2,8,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7,5,0,4,2,7,6,3,8,7,2,9,5,0,4,2,7,6,3,8,7,5,12,3,1,0,5,8,3,6,1,2,5,0,4,2,7,6,3,8,9,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,2,5,11,4,2,7,6,3,8,7,8,2,0,3',
            'reelStrip4' => '2,4,1,6,1,2,5,3,4,2,7,6,3,8,7,2,5,0,4,2,7,6,3,8,7,5,3,1,0,5,8,3,6,1,0,2,5,4,2,7,6,3,8,12,7,8,2,8,4,2,6,8,4,2,1,0,6,4,9,1,3,2,5,1,4,10,10,10,2,7,6,3,8,7,8,2,0,3,0,2,10,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7',
            'reelStrip5' => '2,4,1,6,1,2,5,0,4,2,7,6,3,8,7,0,2,3,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7,2,5,0,4,2,7,6,3,8,7,5,11,3,1,0,5,8,3,9,6,1,0,2,3,5,4,2,7,6,3,8,7,8,2,8,4,2,6,8,4,2,1,0,6,4,1,3,2,5,3,4,2,7,6,3,8,7,8,2,0,3'
        ];

        $this->reelStrips = [];
        foreach ($reelData as $reelName => $reelString) {
            $this->reelStrips[] = explode(',', $reelString);
        }

        // Set game-specific properties
        $this->slotBonus = true;
        $this->slotWildMpl = 1;
        $this->slotFreeMpl = 1;
        $this->slotScatterType = 0;
        $this->slotBonusType = 1;
    }

    /**
     * Calculate spin result for FortuneCashNG
     *
     * @param array $spinData Spin parameters from TypeScript
     * @return array Complete serverResponse structure
     */
    public function calculateSpin($spinData)
    {
        // Extract spin parameters
        $lines = $spinData['lines'] ?? 15;
        $betLine = $spinData['betLine'] ?? 0.01;
        $slotEvent = $spinData['slotEvent'] ?? 'bet';

        // Get spin settings (win determination)
        $spinSettings = $this->getSpinSettings($slotEvent, $betLine, $lines);
        list($winType, $winLimit) = $spinSettings;

        // Generate reel strips
        $reelResult = $this->getReelStrips($winType, $slotEvent);

        // Calculate total win (simplified - would need full payline calculation)
        $totalWin = 0;
        if ($winType === 'win') {
            // Simplified win calculation - in real implementation would check paylines
            $totalWin = $betLine * rand(1, 10); // Placeholder
        }

        // Build serverResponse structure
        $serverResponse = [
            'BonusSymbol' => -1, // No bonus symbol for this spin
            'slotLines' => $lines,
            'slotBet' => $betLine,
            'totalFreeGames' => 0, // No free games in this simplified version
            'currentFreeGames' => 0,
            'Balance' => $this->gameData['user']['balance'],
            'afterBalance' => $this->gameData['user']['balance'] - ($lines * $betLine) + $totalWin,
            'bonusWin' => 0,
            'freeStartWin' => 0,
            'totalWin' => $totalWin,
            'winLines' => [], // Would contain winning line details
            'bonusInfo' => [], // Bonus information if applicable
            'Jackpots' => [], // Jackpot data if applicable
            'reelsSymbols' => [
                'reel1' => $reelResult['reel1'],
                'reel2' => $reelResult['reel2'],
                'reel3' => $reelResult['reel3'],
                'reel4' => $reelResult['reel4'],
                'reel5' => $reelResult['reel5'],
                'rp' => $reelResult['rp']
            ]
        ];

        return $serverResponse;
    }
}