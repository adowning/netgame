<?php

$testDataJson = file_get_contents('test_mmalegends.json');

$escapedData = escapeshellarg($testDataJson);

$command = "echo $escapedData | php new/MMALegendsNG/Server.php";

$output = shell_exec($command);

echo "--- Server Response --- \n";

$jsonOutput = json_decode($output);
if (json_last_error() === JSON_ERROR_NONE) {
    echo json_encode($jsonOutput, JSON_PRETTY_PRINT);
} else {
    echo "Raw output (not valid JSON):\n";
    echo $output;
}
echo "\n\n";

if ($output === null) {
    echo "--- Errors ---\n";
    echo "shell_exec may have failed. Ensure the command is correct and permissions are set.\n";
}