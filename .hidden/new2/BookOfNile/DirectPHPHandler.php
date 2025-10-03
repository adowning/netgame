<?php

require 'GameCalculator.php';

$input = json_decode(file_get_contents('php://input'), true);

$gameData = $input['gameData'];
$spinData = $input['spinData'];
$gameName = $input['gameName'];

$gameCalculator = new GameCalculator($gameData, $gameName);

$result = $gameCalculator->calculateSpin($spinData);

echo json_encode($result);
