/* QUESTION */
// T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an algorithm to determine if T2 is a subtree of T1.
// A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2. That is, if you cut off the tree at node n, the two trees would be indentical.


/* SOLUTION */
// search through T2 and look for T1's head

const checkSubtreeByReference = (t1, t2) => {
    let n1 = t1;

    return checkSubtreeHelper(n1, t2);
};

const checkSubtreeHelper = (t1, t2) => {
    if (!t1 || !t2) {
        return false;
    }

    if (t1 === t2) {
        return true;
    }

    // check left, check right
    let leftSubTree = checkSubtreeHelper(t1.left, t2);
    let rightSubTree = checkSubtreeHelper(t1.right, t2);

    return leftSubTree || rightSubTree;
};

// What if the subtrees are identical by value but not reference?

const checkSubtreeByValue = (t1, t2) => {
    let n1 = t1;
    let n2 = t2;

    // print in-order traversal and check if t2 is a substring of t1
    let t1Traversal = printTraversal(n1);
    let t2Traversal = printTraversal(n2);

    return t1Traversal.includes(t2Traversal);
}

const printTraversal = (n) => {
    if (!n) {
        return 'X'; // null character
    }

    let leftSubtree = printTraversal(n.left);
    let rightSubtree = printTraversal(n.right);

    return `${n.value}${leftSubtree}${rightSubtree}`;
}