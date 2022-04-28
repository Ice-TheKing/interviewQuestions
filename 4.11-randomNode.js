/* QUESTION */
// You are implementing a binary search tree class from scratch which, in addition to insert, find, and delete, 


/* SOLUTION */
const getRandomNode = (t) => {
    let n = t;

    // get full traversal
    let traversal = getTreeTraversal(n);

    let random = Random(traversal.length);

    return traversal[random];
};

const getTreeTraversal = (n) => {
    if (!n) {
        return [];
    }

    let leftSubtree = getTreeTraversal(n.left);
    let rightSubtree = getTreeTraversal(n.right);

    // self, left, right
    return [n, ...leftSubtree, ...rightSubtree];
};


// custom class version with a set. Delete would be o(1) since it can access & delete itself in a single operation with the set
const getRandomNode = (t) => {
    let random = Random(t.size);

    // get iterator 
    let i = 0;
    for(let node of t.set) {
        if (i === random) {
            return node;
        }
        i++;
    }

    return null;
};

// custom class with an array. Delete would be o(n) since it has to search the array to delete itself
const getRandomNode = (t) => {
    let random = Random(t.size);

    return t.getNode(random);
}