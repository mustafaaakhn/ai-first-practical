// ========== PART 4 ==========
// ========== AI ALGORITHMS & HEURISTIC ==========

// Variables to track stats for the final report
let nodesGeneratedCount = 0;
let nodesEvaluatedCount = 0;

// Simple heuristic: just subtract human points from computer points
function getHeuristicScore(node) {
    nodesEvaluatedCount++;
    return node.compPts - node.humanPts;
}

function runMinimax(node, depth, isComputerTurn) {
    nodesGeneratedCount++;

    // Stop if we reached the depth limit or the game is over
    if (depth === 0 || node.terminal) {
        return getHeuristicScore(node);
    }

    // Generate children if they don't exist yet
    if (node.children.length === 0) {
        expandNode(node);
    }

    if (isComputerTurn) {
        let maxScore = -Infinity;
        for (let i = 0; i < node.children.length; i++) {
            let currentChild = node.children[i];
            let score = runMinimax(currentChild, depth - 1, false);
            
            if (score > maxScore) {
                maxScore = score;
            }
        }
        return maxScore;
    } else {
        // Human turn (minimizing)
        let minScore = Infinity;
        for (let i = 0; i < node.children.length; i++) {
            let currentChild = node.children[i];
            let score = runMinimax(currentChild, depth - 1, true);
            
            if (score < minScore) {
                minScore = score;
            }
        }
        return minScore;
    }
}

function runAlphaBeta(node, depth, alpha, beta, isComputerTurn) {
    nodesGeneratedCount++;

    // Base case
    if (depth === 0 || node.terminal) {
        return getHeuristicScore(node);
    }

    if (node.children.length === 0) {
        expandNode(node);
    }

    if (isComputerTurn) {
        let maxScore = -Infinity;
        for (let i = 0; i < node.children.length; i++) {
            let currentChild = node.children[i];
            let score = runAlphaBeta(currentChild, depth - 1, alpha, beta, false);
            
            if (score > maxScore) {
                maxScore = score;
            }
            if (score > alpha) {
                alpha = score;
            }
            
            // Pruning happens here
            if (beta <= alpha) {
                break; 
            }
        }
        return maxScore;
    } else {
        // Human turn (minimizing player)
        let minScore = Infinity;
        for (let i = 0; i < node.children.length; i++) {
            let currentChild = node.children[i];
            let score = runAlphaBeta(currentChild, depth - 1, alpha, beta, true);
            
            if (score < minScore) {
                minScore = score;
            }
            if (score < beta) {
                beta = score;
            }
            
            // Pruning happens here
            if (beta <= alpha) {
                break;
            }
        }
        return minScore;
    }
}

function getBestComputerMove(currentNode, algorithmName, depthLimit) {
    // Reset counters for the new move
    nodesGeneratedCount = 0;
    nodesEvaluatedCount = 0;
    let startTime = performance.now();

    if (currentNode.children.length === 0) {
        expandNode(currentNode);
    }

    let bestNodeToPlay = null;
    let bestScoreFound = -Infinity;

    // Loop through the possible next moves (left or right)
    for (let i = 0; i < currentNode.children.length; i++) {
        let childNode = currentNode.children[i];
        let moveScore = 0;

        if (algorithmName === "Minimax") {
            moveScore = runMinimax(childNode, depthLimit - 1, false);
        } else if (algorithmName === "AlphaBeta") {
            moveScore = runAlphaBeta(childNode, depthLimit - 1, -Infinity, Infinity, false);
        }

        // Update best move if we found a higher score
        if (moveScore > bestScoreFound) {
            bestScoreFound = moveScore;
            bestNodeToPlay = childNode;
        }
    }

    let endTime = performance.now();
    let totalTimeMs = endTime - startTime;

    // Print stats to console so we can write them in the report
    console.log("--- " + algorithmName + " Turn Stats ---");
    console.log("Nodes Generated: " + nodesGeneratedCount);
    console.log("Nodes Evaluated: " + nodesEvaluatedCount);
    console.log("Time Taken: " + totalTimeMs.toFixed(2) + " ms");

    return bestNodeToPlay; 
}
