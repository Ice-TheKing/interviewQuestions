/* QUESTION */
// A binary search tree was created by traversing through an array from left to right and inserting each element.
// Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.

/* EXAMPLE */
//    2
//  1   3
// Output: {2, 1, 3}, {2, 3, 1}


//      4
//   2     7
// 1   3 
// Output:
// 231 sequence: {4, 2, 3, 1, 7} {4, 2, 3, 7, 1}, {4, 2, 7, 3, 1}, {4, 7, 2, 3, 1}
// 213 sequence: {4, 2, 1, 3, 7} {4, 2, 1, 7, 3}, {4, 2, 7, 1, 3}, {4, 7, 2, 1, 3}

/* SOLUTION */

// array to hold recursive solutions (pre order)
// 1. recurse until no children (return empty)
// 2. append to each possibility with the current node (and it's children)
// 3. return solutions back up the stack

const BSTSequence = (head) => {
    if (!head) {
        return null;
    }

    // recurse left & right
    let leftResult = BSTSequence(head.left);
    let rightResult = BSTSequence(head.right);

    // assemble all possibile solutions given current solutions
    let permutations = getCombinations(leftResult, rightResult);

    // insert head at the beginning of all the sequences
    for (let i = 0; i < permutations.length; i++) {
        permutations[i].unshift(head.value);
    }

    return permutations;
};

const getCombinations = (left, right) => {
    // assemble all possible combinations of left & right
    // restrictions. Right must stay in order with other elements of the right list. Same with left and the left list. Any order is valid other than that
    
};


// so with example {2, 1, 3} and {7, 9}
// let's say the 7 is after the 1: {2, 1, 7, 3}
// prefix = {2, 1, 7}
// remainingSequence = {3}
// elements to add = {9}

// step 1: create a new prefix by placing first element in elementsToAdd in every spot in the remaining sequence
// step 2: if there are more elements to add, call recursiveBuildCombos again with those prefixes
// step 3: add those results to the current prefix
// step 4: return those results back up the stack

const recursiveBuildCombinations = (prefix, remainingSeq, elementsToAdd) => {
    let remainingSequence = [...remainingSeq];

    let element = elementsToAdd.slice(0, 1);
    let newPrefixes = [];

    if (remainingSeq.length < 1) {
        // append elements to the end and return it
        return [...prefix, ...elementsToAdd];
    }

    // step 1: create a new prefix by placing first element in elementsToAdd in every spot in the remaining sequence
    for (let i = 0; i <= remainingSequence.length; i++) {
        // add it to remainingSequence @position i
        remainingSequence.splice(i, 0, element);

        // slice after i for the new remaining slice
        let newRemainingSlice = remainingSequence.slice(i+1, remainingSequence.length);

        // prefix + (0 - i) slice from remaining sequence = newPrefix
        let newPrefix = [...prefix, ...remainingSequence.slice(0, i+1)];

        // step 2: if there are more elements to add, call recursiveBuildCombos again with those prefixes
        if (elementsToAdd.length > 1) {
            let results = recursiveBuildCombinations(newPrefix, newRemainingSlice, elementsToAdd.slice(1, elementsToAdd.length))
            // step 3: add those results to the current prefix
            for (let j = 0; j < results.length; j++) {
                // newPrefixes.push([...newPrefix, ...results[j]]);
                // I think we just push results right? prefixes already included in return result
                newPrefixes.push(results[j]);
            }
        } else {
            // last element to add
            newPrefixes.push(newPrefix);
        }
    }
    // step 4: return those results back up the stack
    return newPrefixes;
}