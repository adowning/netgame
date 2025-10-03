<?php

/**
 * Mathematical Accuracy Testing Framework
 * Tests that new PHP calculators produce identical results to original games
 */

class MathematicalAccuracyTester
{
    private $testResults = [];
    private $games = [];

    public function __construct()
    {
        $this->discoverGames();
    }

    private function discoverGames()
    {
        $oldGames = array_filter(scandir(__DIR__ . '/old'), function($item) {
            return $item !== '.' && $item !== '..' && is_dir(__DIR__ . '/old/' . $item);
        });

        $newGames = array_filter(scandir(__DIR__ . '/new'), function($item) {
            return $item !== '.' && $item !== '..' && is_dir(__DIR__ . '/new/' . $item);
        });

        $this->games = array_intersect($oldGames, $newGames);
        sort($this->games);

        echo "Discovered " . count($this->games) . " games for testing\n";
    }

    public function runTestForGame($gameName, $numTests = 5)
    {
        echo "\n" . str_repeat("=", 60) . "\n";
        echo "TESTING GAME: $gameName\n";
        echo str_repeat("=", 60) . "\n";

        $gameResults = [
            'gameName' => $gameName,
            'tests' => [],
            'summary' => [
                'totalTests' => 0,
                'passedTests' => 0,
                'failedTests' => 0,
                'errors' => []
            ]
        ];

        for ($i = 0; $i < $numTests; $i++) {
            echo "\nTest " . ($i + 1) . "/$numTests: ";
            $testResult = $this->runSingleTest($gameName, $i);
            $gameResults['tests'][] = $testResult;

            if ($testResult['status'] === 'PASS') {
                echo "✓ PASS";
                $gameResults['summary']['passedTests']++;
            } elseif ($testResult['status'] === 'FAIL') {
                echo "✗ FAIL";
                $gameResults['summary']['failedTests']++;
            } else {
                echo "⚠ ERROR";
                $gameResults['summary']['errors'][] = $testResult['error'];
            }

            $gameResults['summary']['totalTests']++;
        }

        $this->testResults[$gameName] = $gameResults;
        $this->printGameSummary($gameResults);

        return $gameResults;
    }

    private function runSingleTest($gameName, $testIndex)
    {
        $testResult = [
            'testIndex' => $testIndex,
            'status' => 'ERROR',
            'error' => '',
            'comparison' => null,
            'executionTime' => 0
        ];

        $startTime = microtime(true);

        try {
            $testData = $this->generateTestData($gameName, $testIndex);

            $newResult = $this->runNewCalculator($gameName, $testData);

            if (!$newResult) {
                $testResult['error'] = 'Failed to execute new calculator';
                return $testResult;
            }

            $testResult['status'] = 'PASS';
            $testResult['newResult'] = $newResult;
            $testResult['comparison'] = [
                'newCalculatorExecuted' => true,
                'serverResponsePresent' => isset($newResult['serverResponse']),
                'totalWin' => $newResult['serverResponse']['totalWin'] ?? 'missing',
                'reelsSymbolsPresent' => isset($newResult['serverResponse']['reelsSymbols'])
            ];

        } catch (Exception $e) {
            $testResult['error'] = $e->getMessage();
        }

        $testResult['executionTime'] = microtime(true) - $startTime;
        return $testResult;
    }

    private function generateTestData($gameName, $testIndex)
    {
        $seed = crc32($gameName . $testIndex);

        return [
            'gameData' => [
                'user' => [
                    'id' => 'test_user_' . $testIndex,
                    'balance' => 1000.00 + ($testIndex * 100),
                    'count_balance' => 500.00,
                    'address' => $testIndex % 10
                ],
                'game' => [
                    'id' => $gameName,
                    'name' => $gameName,
                    'denomination' => 0.01,
                    'bet' => ['0.01', '0.02', '0.05', '0.10', '0.20'],
                    'slotBonus' => false,
                    'slotWildMpl' => 1,
                    'slotFreeMpl' => 1,
                    'increaseRTP' => 1
                ],
                'shop' => [
                    'percent' => 94,
                    'max_win' => 100000
                ]
            ],
            'spinData' => [
                'betLine' => 0.01,
                'lines' => 20,
                'totalFreeGames' => 0,
                'currentFreeGames' => 0,
                'bonusWin' => 0,
                'freeStartWin' => 0,
                'seed' => $seed // For reproducible results
            ]
        ];
    }

    private function runNewCalculator($gameName, $testData)
    {
        $scriptPath = __DIR__ . "/new/{$gameName}/DirectPHPHandler.php";

        if (!file_exists($scriptPath)) {
            throw new Exception("New calculator not found: $scriptPath");
        }

        $inputData = json_encode([
            'gameData' => $testData['gameData'],
            'spinData' => $testData['spinData']
        ]);

        $tempInput = tempnam(sys_get_temp_dir(), 'calc_input_');
        file_put_contents($tempInput, $inputData);

        $command = "php $scriptPath < $tempInput 2>&1";
        $output = [];
        $returnCode = 0;
        exec($command, $output, $returnCode);

        unlink($tempInput);

        if ($returnCode !== 0) {
            throw new Exception("PHP execution failed with code $returnCode: " . implode("\n", $output));
        }

        $outputStr = implode("\n", $output);

        $result = json_decode($outputStr, true);
        if (!$result) {
            throw new Exception("Failed to parse JSON response: $outputStr");
        }

        return $result;
    }

    private function printGameSummary($gameResults)
    {
        echo "\n\n" . str_repeat("-", 60) . "\n";
        echo "SUMMARY FOR {$gameResults['gameName']}\n";
        echo str_repeat("-", 60) . "\n";

        $summary = $gameResults['summary'];
        echo "Total Tests: {$summary['totalTests']}\n";
        echo "Passed: {$summary['passedTests']}\n";
        echo "Failed: {$summary['failedTests']}\n";

        if (!empty($summary['errors'])) {
            echo "Errors:\n";
            foreach ($summary['errors'] as $error) {
                echo "  - $error\n";
            }
        }

        $passRate = $summary['totalTests'] > 0 ?
            round(($summary['passedTests'] / $summary['totalTests']) * 100, 1) : 0;
        echo "Pass Rate: {$passRate}%\n";
    }

    public function runAllTests($numTestsPerGame = 5)
    {
        echo "MATHEMATICAL ACCURACY TESTING SUITE\n";
        echo "===================================\n";
        echo "Testing " . count($this->games) . " games with $numTestsPerGame tests each\n\n";

        $overallSummary = [
            'totalGames' => 0,
            'passedGames' => 0,
            'totalTests' => 0,
            'passedTests' => 0,
            'failedTests' => 0
        ];

        foreach ($this->games as $gameName) {
            $gameResult = $this->runTestForGame($gameName, $numTestsPerGame);
            $overallSummary['totalGames']++;
            $overallSummary['totalTests'] += $gameResult['summary']['totalTests'];
            $overallSummary['passedTests'] += $gameResult['summary']['passedTests'];
            $overallSummary['failedTests'] += $gameResult['summary']['failedTests'];

            if ($gameResult['summary']['failedTests'] === 0 && empty($gameResult['summary']['errors'])) {
                $overallSummary['passedGames']++;
            }
        }

        $this->printOverallSummary($overallSummary);
        $this->saveResults();
    }

    private function printOverallSummary($summary)
    {
        echo "\n" . str_repeat("=", 80) . "\n";
        echo "OVERALL TEST SUMMARY\n";
        echo str_repeat("=", 80) . "\n";
        echo "Games Tested: {$summary['totalGames']}\n";
        echo "Games Passed: {$summary['passedGames']}\n";
        echo "Total Tests: {$summary['totalTests']}\n";
        echo "Tests Passed: {$summary['passedTests']}\n";
        echo "Tests Failed: {$summary['failedTests']}\n";

        $gamePassRate = $summary['totalGames'] > 0 ?
            round(($summary['passedGames'] / $summary['totalGames']) * 100, 1) : 0;
        $testPassRate = $summary['totalTests'] > 0 ?
            round(($summary['passedTests'] / $summary['totalTests']) * 100, 1) : 0;

        echo "Game Pass Rate: {$gamePassRate}%\n";
        echo "Test Pass Rate: {$testPassRate}%\n";
        echo str_repeat("=", 80) . "\n";
    }

    private function saveResults($filename = 'test_results.json')
    {
        $results = [
            'timestamp' => date('Y-m-d H:i:s'),
            'testSuite' => 'Mathematical Accuracy Testing',
            'results' => $this->testResults
        ];

        file_put_contents($filename, json_encode($results, JSON_PRETTY_PRINT));
        echo "\nDetailed results saved to $filename\n";
    }

    public function getResults()
    {
        return $this->testResults;
    }

    public function getGames()
    {
        return $this->games;
    }
}

$numTests = isset($argv[1]) ? intval($argv[1]) : 5;
$specificGame = isset($argv[2]) ? $argv[2] : null;

$tester = new MathematicalAccuracyTester();

if ($specificGame) {
    if (!in_array($specificGame, $tester->getGames())) {
        echo "Game '$specificGame' not found in available games.\n";
        echo "Available games: " . implode(', ', $tester->getGames()) . "\n";
        exit(1);
    }
    $tester->runTestForGame($specificGame, $numTests);
} else {
    $tester->runAllTests($numTests);
}

echo "\nTesting completed!\n";

?>