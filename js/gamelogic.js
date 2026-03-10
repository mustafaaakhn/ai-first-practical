// ========== PART 2 ==========
// ========== GAME LOGIC ==========

let currentNode = null;
let depthLimit = 4;
let algorithm = "AlphaBeta";

// START GAME 
function startGame(length, firstPlayer, chosenAlgorithm, chosenDepth) {

    if (length < 15 || length > 25) {
        console.log("Invalid length. Must be between 15 and 25.");
        return;
    }

    algorithm = chosenAlgorithm;
    depthLimit = chosenDepth;

    let nums = makeNumArray(length);

    console.log("Generated string:", nums);
    console.log("Algorithm:", algorithm);
    console.log("Search depth:", depthLimit);
    console.log("First player:", firstPlayer);

    currentNode = makeStartNode(nums, firstPlayer);

    showGameState();

    // If computer starts, immediately perform the first move
    if (firstPlayer === COMPUTER) {
        computerMove();
    }
}

// DISPLAY STATE 
function showGameState() {

    console.log("Numbers:", currentNode.nums);
    console.log("Human points:", currentNode.humanPts);
    console.log("Computer points:", currentNode.compPts);
    console.log("Turn:", currentNode.whoseTurn);
}

//  HUMAN MOVE 
function humanMove(index) {

    if (currentNode.whoseTurn !== HUMAN) {
        console.log("It's not the human turn.");
        return;
    }

    if (index < 0 || index >= currentNode.nums.length) {
        console.log("Invalid index.");
        return;
    }

    currentNode = applyMove(currentNode, index);

    console.log("Human removed:", currentNode.removedNum);

    showGameState();
    checkGameEnd();

    if (!currentNode.terminal && currentNode.whoseTurn === COMPUTER) {
        computerMove();
    }
}

//  COMPUTER MOVE 
function computerMove() {

    if (currentNode.terminal) return;

    console.log("Computer thinking...");

    let bestMove = getBestComputerMove(currentNode, algorithm, depthLimit);

    currentNode = bestMove;

    console.log("Computer removed:", currentNode.removedNum);

    showGameState();

    checkGameEnd();
}

//  GAME END 
function checkGameEnd() {

    if (!currentNode.terminal) return;

    let winner = getWinner(currentNode);

    console.log("Game Over!");

    if (winner === HUMAN) {
        console.log("Human wins!");
    }
    else if (winner === COMPUTER) {
        console.log("Computer wins!");
    }
    else {
        console.log("Draw!");
    }
}

// RESTART 
function restartGame(length, firstPlayer, chosenAlgorithm, chosenDepth) {

    console.log("Restarting game...");

    startGame(length, firstPlayer, chosenAlgorithm, chosenDepth);
}


function startGameFromPrompt() {

    let length = parseInt(prompt("Choose string length (15–25):"));
    let first = prompt("Who starts? (human/computer)").toLowerCase();
    let algo = prompt("Algorithm? (Minimax / AlphaBeta)");
    let depth = parseInt(prompt("Search depth:"));

    let firstPlayer = (first === "computer") ? COMPUTER : HUMAN;

    startGame(length, firstPlayer, algo, depth);
}


//REFERENCES
// 1- https://developer.mozilla.org/en-US/docs/Web/JavaScript
// 2- https://developer.mozilla.org/en-US/docs/Web/API/console/log
// 3- https://www.w3schools.com/js/

// ========== PART 2 FINISH ==========
