/* QUESTION */
// You are given a binary tree in which each node contains an integer value (which might be positive or negative). Design an algorithm to count the number of paths that sum to a given value.
// The path does not need to start or end at the root or the leaf, but it must go downwards (traveling only from parent nodes to child nodes)


/* SOLUTION */

/* Wrong because of negative integers */
// chain the sum of nodes together (storing all of them in an array)
// if we hit the sum exactly, add 1 to the count
// if we exceed sum, pop the first value added off (while currentSum > target) and keep going with child nodes

/* New Solution */
// store an array of all sums
// when we hit a node, add it to all paths - ( o(n log n) space )
// while we add it to all paths, check if it == our target sum. If it does, remove it from the array. It's already proven it is valid
// when we hit a null node, terminate and return count


const pathsWithSum = (tree, targetSum) => {
    if (!tree) {
        return 0;
    }

    return countPathsWithSum(tree, targetSum, [], 0);
};

const countPathsWithSum = (n, target, paths, count) => {
    if (!n) {
        return count;
    }

    for(let i = 0; i < paths.length; i++) {
        paths[i] += n.value;

        if (paths[i] === target) {
            count++;
            // paths.splice(i, 1); // remove path if this kind of scenario wouldn't work:  targetSum = 3, path: 3, -3, 3
            // I'm assuming it's a valid path, though
        }
    }

    // check current node
    if (n.value === target) {
        count++;
    }

    // create new path starting with this node
    paths.push(n.value);
    
    // check right and left too
    let leftTotal = countPathsWithSum(n.left, target, [...paths], count);
    let rightTotal = countPathsWithSum(n.right, target, [...paths], count);

    count += leftTotal;
    count += rightTotal;

    return count;
};