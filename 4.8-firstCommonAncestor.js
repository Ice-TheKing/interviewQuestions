
/* QUESTION */
// Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. 
// NOTE: This is not necessarily a binary search tree

/* SOLUTION */
// We can easily find the first common ancestor of two nodes by searching each of node A's parents for each of node B's parents. If we find the nodes are the same, that is the common ancestor
// Time complexity: o(n log n) space complexity o(1)

const firstCommonAncestor = (node1, node2) => {
    let n1 = node1;
    let n2 = node2;

    while(n1) {
        while(n2) {
            if(n1 === n2) {
                return n1;
            }
            n2 = n2.parent;
        }
        // reset 2nd node
        n2 = node2;
        n1 = n1.parent;
    }
    return false;
};

// what if we have (node1, node2, head) and each node does not link to its parent?
const firstCommonAncestor = (node1, node2, head) => {
    if (!node1 || !node2 || !head) {
        return false;
    }
    if (node1 === node2) {
        return node1;
    }

    let n = head;
    let result = treeContainsNode(node1, node2, head);

    return result instanceof Node;
};

// returns an array that contains target and target2 if they exist in the subtree.
// that means we can use length to determine which subtree splits them
// returns Node if we found the common ancestor
const treeContainsNode = (target1, target2, n) => {
    // no children
    if (!n) {
        return [];
    }

    // we found one of our targets. Let the parent nodes know
    if (n === target1) {
        return [n];
    }
    if (n === target2) {
        return [n];
    }

    let leftTree = treeContainsNode(target1, target2, n.left); // time saver: check if leftTree gives us our solution Node. If it does, we can skip checking the right tree
    let rightTree = treeContainsNode(target1, target2, n.right);

    // if we get a node back, we've already found a solution. Pass it back up the stack
    if (leftTree instanceof Node) {
        return leftTree;
    }
    if (rightTree instanceof Node) {
        return rightTree;
    }


    // if left has one, and right has the other, we have a common ancestor! We found our node.
    if (leftTree.length === 1 && rightTree.length === 1) {
        return n;
    }

    else if (leftTree.length === 1) {
        return leftTree;
    }

    else if (rightTree.length === 1) {
        return rightTree;
    }

    // nothing substantial found in path
    return [];
};