// ========== PART 3 ==========
// ========== DATA STRUCTURE & GAME TREE ==========
// ========== WRITTEN BY MUSTAFA ==========

const HUMAN = "human";
const COMPUTER = "computer";

function newNode(numArray, humanPts, compPts, whoseTurn, currentDepth, pickedIndex, removedNum) {
    let node = {};
    node.nums = numArray;
    node.humanPts = humanPts;
    node.compPts = compPts;
    node.whoseTurn = whoseTurn;
    node.depth = currentDepth;
    node.howWeGotHere = pickedIndex;
    node.removedNum = removedNum;
    node.children = [];
    node.evalValue = null;
    node.terminal = (numArray.length === 0);
    return node;
}

function makeStartNode(numArray, firstPlayer) {
    return newNode(numArray, 50, 50, firstPlayer, 0, null, null);
}

function makeNumArray(len) {
    if (len < 15 || len > 25) {
        console.log("length must be between 15 and 25");
        return null;
    }
    let result = [];
    let i = 0;
    while (i < len) {
        result.push(Math.floor(Math.random() * 3) + 1);
        i++;
    }
    return result;
}

function getValidMoves(node) {
    let moves = [];
    for (let i = 0; i < node.nums.length; i++) {
        moves.push(i);
    }
    return moves;
}

function updateScores(humanPts, compPts, removedNum, whoseTurn) {
    let hPts = humanPts;
    let cPts = compPts;

    if (whoseTurn === HUMAN) {
        if (removedNum === 1) {
            hPts = hPts - 1;
        }
        if (removedNum === 2) {
            hPts = hPts - 1;
            cPts = cPts - 1;
        }
        if (removedNum === 3) {
            cPts = cPts - 1;
        }
    }

    if (whoseTurn === COMPUTER) {
        if (removedNum === 1) {
            cPts -= 1;
        }
        if (removedNum === 2) {
            cPts -= 1;
            hPts -= 1;
        }
        if (removedNum === 3) {
            hPts -= 1;
        }
    }

    return { hPts: hPts, cPts: cPts };
}

// does not touch the original node, returns a new one
function applyMove(node, pickedIndex) {
    let newNums = [];
    for (let i = 0; i < node.nums.length; i++) {
        if (i !== pickedIndex) {
            newNums.push(node.nums[i]);
        }
    }

    let removedNum = node.nums[pickedIndex];
    let updated = updateScores(node.humanPts, node.compPts, removedNum, node.whoseTurn);

    let nextTurn;
    if (node.whoseTurn === HUMAN) {
        nextTurn = COMPUTER;
    } else {
        nextTurn = HUMAN;
    }

    return newNode(
        newNums,
        updated.hPts,
        updated.cPts,
        nextTurn,
        node.depth + 1,
        pickedIndex,
        removedNum
    );
}

function expandNode(node) {
    if (node.children.length > 0) {
        return;
    }
    let moves = getValidMoves(node);
    for (let i = 0; i < moves.length; i++) {
        node.children.push(applyMove(node, moves[i]));
    }
}

function getWinner(node) {
    if (!node.terminal) return null;
    if (node.humanPts > node.compPts) return HUMAN;
    if (node.compPts > node.humanPts) return COMPUTER;
    return "draw";
}

function printNode(node) {
    console.log("depth=" + node.depth + " turn=" + node.whoseTurn);
    console.log("nums: [" + node.nums + "]");
    console.log("human=" + node.humanPts + " comp=" + node.compPts);
    console.log("terminal=" + node.terminal + " children=" + node.children.length);
    if (node.howWeGotHere !== null) {
        console.log("last pick: index=" + node.howWeGotHere + " num=" + node.removedNum);
    }
    console.log("---");
}

function buildTree(node, depthLimit, nodeCount) {
    nodeCount.val = nodeCount.val + 1;
    if (node.terminal) return;
    if (node.depth >= depthLimit) return;

    expandNode(node);
    for (let i = 0; i < node.children.length; i++) {
        buildTree(node.children[i], depthLimit, nodeCount);
    }
}

function testBasic() {
    let arr = makeNumArray(15);
    console.log("arr: " + arr);

    let root = makeStartNode(arr, HUMAN);
    printNode(root);

    // try one move
    let next = applyMove(root, 0);
    console.log("removed index 0, was: " + root.nums[0]);
    console.log("human=" + next.humanPts + " comp=" + next.compPts + " turn=" + next.whoseTurn);

    // make sure root didnt change
    console.log("root still has " + root.nums.length + " nums, pts=" + root.humanPts);

    expandNode(root);
    console.log("children after expand: " + root.children.length);
    expandNode(root);
    console.log("children after 2nd expand: " + root.children.length);

    let c1 = { val: 0 };
    buildTree(root, 3, c1);
    console.log("depth 3 nodes: " + c1.val);

    let root2 = makeStartNode(makeNumArray(15), COMPUTER);
    let c2 = { val: 0 };
    buildTree(root2, 4, c2);
    console.log("depth 4 nodes: " + c2.val);

    let finished = newNode([], 47, 45, HUMAN, 10, null, null);
    console.log("winner: " + getWinner(finished));
    console.log("draw: " + getWinner(newNode([], 48, 48, HUMAN, 10, null, null)));
}

// ========== PART 3 FINISH ==========

// testBasic();
