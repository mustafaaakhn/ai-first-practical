// ========== PART 2 ==========
// ========== GAME LOGIC ==========

let currentNode = null;
let depthLimit = 4;
let algorithm = "AlphaBeta";

// Start the game
function startGame() {
    let length = parseInt(prompt("Choose string length (15–25):"));
    if (isNaN(length) || length < 15 || length > 25) {
        console.log("Invalid length. Must be between 15 and 25.");
        return;
    }

    let nums = makeNumArray(length);

    console.log("Generated string:");
    console.log(nums);

    currentNode = makeStartNode(nums, HUMAN);

    showGameState();
}

// Display game state
function showGameState() {

    console.log("Numbers:", currentNode.nums);
    console.log("Human points:", currentNode.humanPts);
    console.log("Computer points:", currentNode.compPts);
    console.log("Turn:", currentNode.whoseTurn);
}

// Human turn
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

    if (!currentNode.terminal) {
        computerMove();
    }
}

// Computer turn
function computerMove() {
    console.log("Computer thinking...");
    let bestMove = getBestComputerMove(currentNode, algorithm, depthLimit);
    currentNode = bestMove;
    console.log("Computer removed:", currentNode.removedNum);
    showGameState();
    checkGameEnd();
}

// Check win/draw
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

// Restart game
function restartGame() {
    console.log("Restarting game...");
    startGame();
}

//REFERENCES
// 1- https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
// 2- https://developer.mozilla.org/en-US/docs/Web/JavaScript
// 3- https://www.w3schools.com/js/

// ========== PART 2 FINISH ==========
