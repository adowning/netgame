<?php

class GameReel
{
    public $reelsStrip = [
        'reelStrip1' => [],
        'reelStrip2' => [],
        'reelStrip3' => [],
        'reelStrip4' => [],
        'reelStrip5' => [],
        'reelStrip6' => []
    ];
    public $reelsStripBonus = [
        'reelStripBonus1' => [],
        'reelStripBonus2' => [],
        'reelStripBonus3' => [],
        'reelStripBonus4' => [],
        'reelStripBonus5' => [],
        'reelStripBonus6' => []
    ];

    public function __construct()
    {
        $reelsFile = __DIR__ . '/reels.txt';
        if (file_exists($reelsFile)) {
            $temp = file($reelsFile);
            foreach ($temp as $str) {
                $str = explode('=', $str);
                if (isset($this->reelsStrip[$str[0]])) {
                    $data = explode(',', $str[1]);
                    foreach ($data as $elem) {
                        $elem = trim($elem);
                        if ($elem != '') {
                            $this->reelsStrip[$str[0]][] = $elem;
                        }
                    }
                }
                if (isset($this->reelsStripBonus[$str[0]])) {
                    $data = explode(',', $str[1]);
                    foreach ($data as $elem) {
                        $elem = trim($elem);
                        if ($elem != '') {
                            $this->reelsStripBonus[$str[0]][] = $elem;
                        }
                    }
                }
            }
        }
    }
}

class GameCalculator
{
    private $gameData;
    private $gameName;
    private $paytable;
    private $reelStrips;

    public function __construct($gameData, $gameName)
    {
        $this->gameData = $gameData;
        $this->gameName = $gameName;
        $this->paytable = json_decode(file_get_contents(__DIR__ . '/paytable.json'), true);
        $this->reelStrips = new GameReel();
    }

    public function calculateSpin($spinData)
    {
        $lines = 10;
        $betLine = $spinData['coin'] * $spinData['bet'];
        $allbet = $betLine * $lines;

        $winType = 'none';
        $spinWinLimit = 0;

        // Simplified win determination logic
        if (rand(1, 100) <= $this->gameData['game']['rtp']) {
            $winType = 'win';
            $spinWinLimit = $this->gameData['bank'];
        }
        if (rand(1, 200) <= $this->gameData['game']['rtp'] && $this->gameData['game']['slotBonus']) {
            $winType = 'bonus';
            $spinWinLimit = $this->gameData['bank'];
        }


        for ($i = 0; $i <= 2000; $i++) {
            $totalWin = 0;
            $lineWins = [];
            $reels = $this->getReelStrips($winType, $spinData['slotEvent']);

            // Simplified win calculation
            $scattersCount = 0;
            $scattersPos = [];
            for ($r = 1; $r <= 5; $r++) {
                for ($p = 0; $p <= 2; $p++) {
                    if ($reels['reel' . $r][$p] == '9') { // Assuming '9' is the scatter symbol
                        $scattersCount++;
                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                    }
                }
            }

            if ($scattersCount >= 3) {
                $totalWin += $this->paytable['SYM_9'][$scattersCount] * $betLine * $lines;
            }

            if ($totalWin <= $spinWinLimit) {
                break;
            }
        }

        $bonusInfo = [];
        if ($scattersCount >= 3) {
            $bonusInfo = $this->triggerBonus($scattersCount);
        }
        
        if ($this->gameName === 'BookOfNileRevengeNG' && $spinData['slotEvent'] === 'freespin' && $totalWin < $allbet * 5) {
            $bonusInfo['totalFreeGames']++;
        }


        return [
            'totalWin' => $totalWin,
            'reels' => $reels,
            'lineWins' => $lineWins,
            'bonusInfo' => $bonusInfo,
        ];
    }

    private function getReelStrips($winType, $slotEvent)
    {
        $reels = ($slotEvent == 'freespin') ? $this->reelStrips->reelsStripBonus : $this->reelStrips->reelsStrip;

        $prs = [];
        for ($i = 1; $i <= 5; $i++) {
            $reelKey = 'reelStrip' . $i;
            $prs[$i] = mt_rand(0, count($reels[$reelKey]) - 3);
        }

        if ($winType == 'bonus') {
            $scattersCnt = rand(3, 5);
            $reelsId = [1, 2, 3, 4, 5];
            shuffle($reelsId);
            for ($i = 0; $i < $scattersCnt; $i++) {
                $reelKey = 'reelStrip' . $reelsId[$i];
                $prs[$reelsId[$i]] = $this->getRandomScatterPos($reels[$reelKey]);
            }
        }

        $reel = ['rp' => []];
        foreach ($prs as $index => $value) {
            $key = $reels['reelStrip' . $index];
            $key[-1] = $key[count($key) - 1];
            $reel['reel' . $index][0] = $key[$value - 1];
            $reel['reel' . $index][1] = $key[$value];
            $reel['reel' . $index][2] = $key[$value + 1];
            $reel['rp'][] = $value;
        }

        return $reel;
    }

    private function getRandomScatterPos($reel)
    {
        $scatterPositions = [];
        for ($i = 0; $i < count($reel); $i++) {
            if ($reel[$i] == '9') {
                $scatterPositions[] = $i;
            }
        }
        return $scatterPositions[array_rand($scatterPositions)];
    }

    private function triggerBonus($scattersCount)
    {
        $freeSpins = 10;
        $expandingSymbol = rand(1, 8);
        $pickCount = 0;

        if ($this->gameName === 'BookOfNileLostChapterNG' || $this->gameName === 'BookOfNileNG') {
            $pickCount = 1;
        }

        return [
            'freeSpins' => $freeSpins,
            'expandingSymbol' => $expandingSymbol,
            'pickCount' => $pickCount,
        ];
    }
    
    public function buyBonus($buyBonusData)
    {
        if ($this->gameName !== 'BookOfNileLostChapterNG') {
            return ['error' => 'Buy bonus not supported for this game'];
        }

        $allbet = $buyBonusData['allbet'];
        $bbbet = 0;
        $pickCount = 0;

        switch ($buyBonusData['id']) {
            case 'bgId1':
                $bbbet = $allbet * 110;
                $pickCount = 1;
                break;
            case 'bgId2':
                $bbbet = $allbet * 175;
                $pickCount = 2;
                break;
            case 'bgId3':
                $bbbet = $allbet * 245;
                $pickCount = 3;
                break;
            case 'bgId4':
                $bbbet = $allbet * 310;
                $pickCount = 4;
                break;
        }

        return [
            'pickCount' => $pickCount,
            'cost' => $bbbet,
        ];
    }
}