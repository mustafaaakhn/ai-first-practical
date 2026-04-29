// ========== PART 2 ==========
// ========== GAME LOGIC ==========

// current game and settings
let currentNode = null;
let depthLimit = 8;
let algorithm = "AlphaBeta";
let roundInProgress = false;
let totalGameNodes = 0;
let totalGameEvaluated = 0;
let totalMoveTime = 0;
let totalMoves = 0;

// computer wait time
function getComputerDelayMs() {
    return Math.floor(Math.random() * 701) + 700;
}

// START GAME 

// length first player algorithm depth
function startGame(length, firstPlayer, chosenAlgorithm, chosenDepth) {

    if (length < 15 || length > 25) {
        console.log("Invalid length. Must be between 15 and 25.");
        return;
    }

    algorithm = chosenAlgorithm;
    depthLimit = chosenDepth;

    let nums = makeNumArray(length);

    console.log("[Setup] Numbers: [" + nums + "] | Algorithm: " + algorithm + " | First: " + firstPlayer);

    currentNode = makeStartNode(nums, firstPlayer);

    // If computer starts do the first move after small random delay
    if (firstPlayer === COMPUTER) {
        setTimeout(function () {
            if (!currentNode.terminal && currentNode.whoseTurn === COMPUTER) {
                computerMove();

                if (typeof setLatestMove === "function" && currentNode.removedNum !== null) {
                    setLatestMove("ai", currentNode.removedNum);
                }
                if (typeof renderGame === "function") {
                    renderGame();
                }
            }
        }, getComputerDelayMs());
    }
}

// DISPLAY STATE 

// console game state
function showGameState() {

    console.log("Numbers: [" + currentNode.nums + "]");
    console.log("H: " + currentNode.humanPts + " | C: " + currentNode.compPts + " | Turn: " + currentNode.whoseTurn);
}

//  HUMAN MOVE 

// human turn and index check
function humanMove(index) {

    if (currentNode.whoseTurn !== HUMAN) {
        console.log("It's not the human turn.");
        return;
    }

    if (index < 0 || index >= currentNode.nums.length) {
        console.log("Invalid index.");
        return;
    }

    if (!roundInProgress) {
        console.log("=== ROUND START ===");
        showGameState();
        roundInProgress = true;
    }

    currentNode = applyMove(currentNode, index);

    console.log("Human removed:", currentNode.removedNum);

    checkGameEnd();

    if (currentNode.terminal) {
        console.log("=== ROUND END ===");
        roundInProgress = false;
    }

    if (!currentNode.terminal && currentNode.whoseTurn === COMPUTER) {
        setTimeout(function () {
            if (!currentNode.terminal && currentNode.whoseTurn === COMPUTER) {
                computerMove();

                if (typeof setLatestMove === "function" && currentNode.removedNum !== null) {
                    setLatestMove("ai", currentNode.removedNum);
                }
                if (typeof renderGame === "function") {
                    renderGame();
                }
            }
        }, getComputerDelayMs());
    }
}

//  COMPUTER MOVE 

// ai chooses best move
function computerMove() {

    if (currentNode.terminal) return;

    if (!roundInProgress) {
        console.log("=== ROUND START ===");
        showGameState();
        roundInProgress = true;
    }

    let bestMove = getBestComputerMove(currentNode, algorithm, depthLimit);

    currentNode = bestMove;

    console.log("Computer removed:", currentNode.removedNum);

    showGameState();

    checkGameEnd();
    console.log("=== ROUND END ===");
    roundInProgress = false;
}

//  GAME END 

// winner and total stats
function checkGameEnd() {
    if (!currentNode.terminal) return;

    let winner = getWinner(currentNode);
    let avgTime = totalMoves > 0 ? (totalMoveTime / totalMoves).toFixed(2) : 0;

    console.log("=== GAME TOTAL STATS ===");
    console.log("Total Nodes Generated: " + totalGameNodes);
    console.log("Total Nodes Evaluated: " + totalGameEvaluated);
    console.log("Average Move Time: " + avgTime + " ms");

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

    totalGameNodes = 0;
    totalGameEvaluated = 0;
    totalMoveTime = 0;
    totalMoves = 0;
}

// RESTART 

// start again same way
function restartGame(length, firstPlayer, chosenAlgorithm, chosenDepth) {

    console.log("Restarting game...");

    startGame(length, firstPlayer, chosenAlgorithm, chosenDepth);
}


// prompt old test start
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
