<?php

// Load the test data from the JSON file
$testDataJson = file_get_contents('test_mmalegends.json');

// Escape the JSON for shell usage to ensure it's passed as a single string
$escapedData = escapeshellarg($testDataJson);

// Construct the command to echo the data and pipe it to the server script's stdin
$command = "echo $escapedData | php new/MMALegendsNG/Server.php";

// Execute the command using shell_exec
$output = shell_exec($command);

// Print the results
echo "--- Server Response --- \n";

// Try to pretty-print the JSON if it's valid, otherwise print the raw output
$jsonOutput = json_decode($output);
if (json_last_error() === JSON_ERROR_NONE) {
    echo json_encode($jsonOutput, JSON_PRETTY_PRINT);
} else {
    echo "Raw output (not valid JSON):\n";
    echo $output;
}
echo "\n\n";

// Check if shell_exec returned null, which can indicate an error
if ($output === null) {
    echo "--- Errors ---\n";
    echo "shell_exec may have failed. Ensure the command is correct and permissions are set.\n";
}