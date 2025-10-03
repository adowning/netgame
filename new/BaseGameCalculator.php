<?php

namespace Netgame\Calculator;

/**
 * Base Game Calculator
 *
 * Provides common functionality for all slot game calculators.
 * Contains shared logic for RTP calculations, reel generation, and win determination.
 */
abstract class BaseGameCalculator
{
    // Game configuration properties
    protected $gameData;
    protected $paytable = [];
    protected $reelStrips = [];
    protected $slotBonus = true;
    protected $slotWildMpl = 1;
    protected $slotFreeMpl = 1;
    protected $slotScatterType = 0;
    protected $slotBonusType = 1;

    // RTP control constants
    const RTP_CONTROL_COUNT = 200;
    const MAX_SPIN_WIN_LIMIT_LOW = 25;
    const MAX_SPIN_WIN_LIMIT_HIGH = 50;

    /**
     * Constructor
     *
     * @param array $gameData Game configuration data from TypeScript
     */
    public function __construct($gameData)
    {
        $this->gameData = $gameData;
        $this->initializePaytable();
        $this->initializeReelStrips();
    }

    /**
     * Initialize paytable - must be implemented by each game
     */
    abstract protected function initializePaytable();

    /**
     * Initialize reel strips - must be implemented by each game
     */
    abstract protected function initializeReelStrips();

    /**
     * Calculate spin result - must be implemented by each game
     */
    abstract public function calculateSpin($spinData);

    /**
     * Get spin settings (win determination logic)
     *
     * @param string $garantType Type of spin ('bet', 'bonus', etc.)
     * @param float $bet Bet amount per line
     * @param int $lines Number of lines
     * @return array ['win_type', win_limit]
     */
    protected function getSpinSettings($garantType, $bet, $lines)
    {
        $curField = $this->getCurField($lines);

        $pref = ($garantType != 'bet') ? '_bonus' : '';
        $allBet = $bet * $lines;

        // Get RTP configuration from game data
        $currentPercent = $this->gameData['shop']['percent'];
        $linesPercentConfigSpin = $this->getLinesPercentConfig('spin');
        $linesPercentConfigBonus = $this->getLinesPercentConfig('bonus');

        $currentSpinWinChance = 0;
        $currentBonusWinChance = 0;
        $percentLevel = '';

        // Find appropriate RTP percentage level
        foreach ($linesPercentConfigSpin['line' . $curField . $pref] as $k => $v) {
            $levels = explode('_', $k);
            if ($levels[0] <= $currentPercent && $currentPercent <= $levels[1]) {
                $percentLevel = $k;
                break;
            }
        }

        if ($percentLevel) {
            $currentSpinWinChance = $linesPercentConfigSpin['line' . $curField . $pref][$percentLevel];
            $currentBonusWinChance = $linesPercentConfigBonus['line' . $curField . $pref][$percentLevel];
        }

        // RTP control logic
        $rtpControlResult = $this->applyRtpControl($pref, $currentPercent, $currentSpinWinChance, $currentBonusWinChance);
        $currentSpinWinChance = $rtpControlResult['spinWinChance'];
        $currentBonusWinChance = $rtpControlResult['bonusWinChance'];

        // Determine win type
        return $this->determineWinType($garantType, $bet, $currentBonusWinChance, $currentSpinWinChance);
    }

    /**
     * Get current field based on number of lines
     */
    private function getCurField($lines)
    {
        switch ($lines) {
            case 10: return 10;
            case 9:
            case 8: return 9;
            case 7:
            case 6: return 7;
            case 5:
            case 4: return 5;
            case 3:
            case 2: return 3;
            case 1: return 1;
            default: return 10;
        }
    }

    /**
     * Apply RTP control logic
     */
    private function applyRtpControl($pref, $currentPercent, &$currentSpinWinChance, &$currentBonusWinChance)
    {
        $rtpRange = $this->calculateRtpRange();

        if ($this->getGameDataStatic('RtpControlCount') == 0) {
            if ($currentPercent + rand(1, 2) < $rtpRange && $this->getGameDataStatic('SpinWinLimit') <= 0) {
                $this->setGameDataStatic('SpinWinLimit', rand(self::MAX_SPIN_WIN_LIMIT_LOW, self::MAX_SPIN_WIN_LIMIT_HIGH));
            }

            if ($pref == '' && $this->getGameDataStatic('SpinWinLimit') > 0) {
                $currentBonusWinChance = 5000;
                $currentSpinWinChance = 20;

                if ($rtpRange < ($currentPercent - 1)) {
                    $this->setGameDataStatic('SpinWinLimit', 0);
                    $this->setGameDataStatic('RtpControlCount', $this->getGameDataStatic('RtpControlCount') - 1);
                }
            }
        } elseif ($this->getGameDataStatic('RtpControlCount') < 0) {
            if ($currentPercent + rand(1, 2) < $rtpRange && $this->getGameDataStatic('SpinWinLimit') <= 0) {
                $this->setGameDataStatic('SpinWinLimit', rand(self::MAX_SPIN_WIN_LIMIT_LOW, self::MAX_SPIN_WIN_LIMIT_HIGH));
            }

            $this->setGameDataStatic('RtpControlCount', $this->getGameDataStatic('RtpControlCount') - 1);

            if ($pref == '' && $this->getGameDataStatic('SpinWinLimit') > 0) {
                $currentBonusWinChance = 5000;
                $currentSpinWinChance = 20;

                if ($rtpRange < ($currentPercent - 1)) {
                    $this->setGameDataStatic('SpinWinLimit', 0);
                }
            }

            if ($this->getGameDataStatic('RtpControlCount') < (-1 * self::RTP_CONTROL_COUNT) &&
                $currentPercent - 1 <= $rtpRange && $rtpRange <= ($currentPercent + 2)) {
                $this->setGameDataStatic('RtpControlCount', self::RTP_CONTROL_COUNT);
            }
        } else {
            $this->setGameDataStatic('RtpControlCount', $this->getGameDataStatic('RtpControlCount') - 1);
        }

        return [
            'spinWinChance' => $currentSpinWinChance,
            'bonusWinChance' => $currentBonusWinChance
        ];
    }

    /**
     * Calculate current RTP range
     */
    private function calculateRtpRange()
    {
        if ($this->gameData['stat_in'] > 0) {
            return $this->gameData['stat_out'] / $this->gameData['stat_in'] * 100;
        }
        return 0;
    }

    /**
     * Determine win type based on random chances
     */
    private function determineWinType($garantType, $bet, $currentBonusWinChance, $currentSpinWinChance)
    {
        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);

        $return = ['none', 0];

        // Check for bonus win
        if ($bonusWin == 1 && $this->slotBonus) {
            $garantType = 'bonus';
            $winLimit = $this->getBank($garantType);
            $return = ['bonus', $winLimit];

            // Validate bonus win is possible
            if ($this->gameData['stat_in'] < ($this->checkBonusWin() * $bet + $this->gameData['stat_out']) ||
                $winLimit < ($this->checkBonusWin() * $bet)) {
                $return = ['none', 0];
            }
        }
        // Check for regular win
        elseif ($spinWin == 1) {
            $winLimit = $this->getBank($garantType);
            $return = ['win', $winLimit];
        }

        // Low balance push logic
        if ($garantType == 'bet' && $this->gameData['user']['balance'] <= (2 / $this->gameData['game']['denomination'])) {
            $randomPush = rand(1, 10);
            if ($randomPush == 1) {
                $winLimit = $this->getBank('');
                $return = ['win', $winLimit];
            }
        }

        return $return;
    }

    /**
     * Get reel strips for spin
     *
     * @param string $winType Type of win ('bonus', 'win', 'none')
     * @param string $slotEvent Slot event type
     * @return array Reel configuration
     */
    protected function getReelStrips($winType, $slotEvent)
    {
        $prs = [];

        if ($winType != 'bonus') {
            // Random positions for non-bonus wins
            foreach ($this->reelStrips as $index => $reelStrip) {
                if (is_array($reelStrip) && count($reelStrip) > 0) {
                    $prs[$index + 1] = mt_rand(0, count($reelStrip) - 3);
                }
            }
        } else {
            // Scatter positioning for bonus wins
            $reelsId = [];
            foreach ($this->reelStrips as $index => $reelStrip) {
                if (is_array($reelStrip) && count($reelStrip) > 0) {
                    $prs[$index + 1] = $this->getRandomScatterPos($reelStrip);
                    $reelsId[] = $index + 1;
                }
            }

            // Ensure minimum scatter count for bonus
            $scattersCnt = rand(3, count($reelsId));
            shuffle($reelsId);

            for ($i = 0; $i < count($reelsId); $i++) {
                if ($i < $scattersCnt) {
                    $prs[$reelsId[$i]] = $this->getRandomScatterPos($this->reelStrips[$reelsId[$i] - 1]);
                } else {
                    $prs[$reelsId[$i]] = rand(0, count($this->reelStrips[$reelsId[$i] - 1]) - 3);
                }
            }
        }

        // Build final reel structure
        $reel = ['rp' => []];
        foreach ($prs as $index => $value) {
            $key = $this->reelStrips[$index - 1];
            $key[-1] = $key[count($key) - 1];

            $reel['reel' . $index] = [
                $key[$value - 1],
                $key[$value],
                $key[$value + 1],
                ''
            ];
            $reel['rp'][] = $value;
        }

        return $reel;
    }

    /**
     * Get random scatter position
     */
    private function getRandomScatterPos($rp)
    {
        $rpResult = [];
        for ($i = 0; $i < count($rp); $i++) {
            if ($rp[$i] == '11') { // Assuming '11' is scatter symbol
                if (isset($rp[$i + 1]) && isset($rp[$i - 1])) {
                    $rpResult[] = $i;
                }
                if (isset($rp[$i - 1]) && isset($rp[$i - 2])) {
                    $rpResult[] = $i - 1;
                }
                if (isset($rp[$i + 1]) && isset($rp[$i + 2])) {
                    $rpResult[] = $i + 1;
                }
            }
        }

        shuffle($rpResult);
        if (!isset($rpResult[0])) {
            $rpResult[0] = rand(2, count($rp) - 3);
        }

        return $rpResult[0];
    }

    /**
     * Get bank amount for given state
     */
    private function getBank($slotState = '')
    {
        if ($this->isBonusStart() || $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'respin') {
            $slotState = 'bonus';
        } else {
            $slotState = '';
        }

        return $this->gameData['bank'] / $this->gameData['game']['denomination'];
    }

    /**
     * Check bonus win threshold
     */
    private function checkBonusWin()
    {
        $allRateCnt = 0;
        $allRate = 0;

        foreach ($this->paytable as $vl) {
            foreach ($vl as $vl2) {
                if ($vl2 > 0) {
                    $allRateCnt++;
                    $allRate += $vl2;
                    break;
                }
            }
        }

        return $allRate / $allRateCnt;
    }

    /**
     * Get lines percent configuration
     */
    private function getLinesPercentConfig($type)
    {
        // This should be loaded from game configuration
        // For now, return default values
        return [
            'line1' => ['0_100' => 1000],
            'line3' => ['0_100' => 500],
            'line5' => ['0_100' => 200],
            'line7' => ['0_100' => 100],
            'line9' => ['0_100' => 50],
            'line10' => ['0_100' => 20],
            'line1_bonus' => ['0_100' => 10000],
            'line3_bonus' => ['0_100' => 5000],
            'line5_bonus' => ['0_100' => 2000],
            'line7_bonus' => ['0_100' => 1000],
            'line9_bonus' => ['0_100' => 500],
            'line10_bonus' => ['0_100' => 200]
        ];
    }

    /**
     * Check if bonus is starting
     */
    private function isBonusStart()
    {
        return false; // Override in game-specific calculators
    }

    /**
     * Get game data static (simplified for PHP calculator)
     */
    private function getGameDataStatic($key)
    {
        // In PHP calculator, we don't have persistent storage
        // Return default values
        static $data = [];
        if (!isset($data[$key])) {
            $data[$key] = 0;
        }
        return $data[$key];
    }

    /**
     * Set game data static (simplified for PHP calculator)
     */
    private function setGameDataStatic($key, $value)
    {
        static $data = [];
        $data[$key] = $value;
    }

    /**
     * Format float value
     */
    protected function formatFloat($num)
    {
        $str0 = explode('.', $num);
        if (isset($str0[1])) {
            if (strlen($str0[1]) > 4) {
                return round($num * 100) / 100;
            } elseif (strlen($str0[1]) > 2) {
                return floor($num * 100) / 100;
            } else {
                return $num;
            }
        } else {
            return $num;
        }
    }
}