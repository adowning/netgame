<?php

/**
 * Batch Game Conversion Script
 * Converts all remaining games in /old/ directory to TypeScript + Direct PHP Execution architecture
 */

require_once 'convert_game.php';

// Get list of all games in /old/ directory
$oldDir = __DIR__ . '/old';
$games = array_filter(scandir($oldDir), function($item) use ($oldDir) {
    return is_dir($oldDir . '/' . $item) && !in_array($item, ['.', '..']);
});

// Games already converted
$convertedGames = ['AfricanKingNG', 'CleosHeartNG', 'CloverStonesNG', 'CrazyScientistNG'];

// Filter out already converted games
$gamesToConvert = array_filter($games, function($game) use ($convertedGames) {
    return !in_array($game, $convertedGames);
});

echo "Found " . count($games) . " total games in /old/ directory\n";
echo "Already converted: " . count($convertedGames) . " games\n";
echo "Remaining to convert: " . count($gamesToConvert) . " games\n\n";

$successCount = 0;
$failCount = 0;
$failedGames = [];

foreach ($gamesToConvert as $gameName) {
    echo "Converting {$gameName}...\n";

    try {
        $converter = new GameConverter($gameName);
        $converter->convert();
        echo "✅ {$gameName} conversion completed!\n\n";
        $successCount++;
    } catch (Exception $e) {
        echo "❌ {$gameName} conversion failed: " . $e->getMessage() . "\n\n";
        $failCount++;
        $failedGames[] = $gameName;
    }
}

echo "=== CONVERSION SUMMARY ===\n";
echo "Total games processed: " . count($gamesToConvert) . "\n";
echo "Successful conversions: {$successCount}\n";
echo "Failed conversions: {$failCount}\n";

if (!empty($failedGames)) {
    echo "\nFailed games:\n";
    foreach ($failedGames as $game) {
        echo "- {$game}\n";
    }
}

echo "\nConversion process complete!\n";

?>