/* QUESTION */
// You are building a diving board by placing a bunch of planks of wood end-to-end. There are two types of planks, one of length shorter and one of length longer.
// You must use exactly K planks of wood. Write a method to generate all possible lengths for the diving board.

/* SOLUTION */
// If we know we have to use K number of planks, we can start with the entire diving board being of one type, then one-by-one replace them with the other type.
// We don't have to generate permutations, because if K = 8, 7 long planks and 1 short plank will be the same length no matter where that 1 short plank is located.
// o(k) time, o(k) space

const divingBoard = (k, long, short) => {
    let lengths = [];
    let diff = long - short;

    for (let i = 0; i <= k; i++) {
        // if k = 8, these combinations will always add up to 8. i = 3? use (8-3) 5 long planks, and (3) short planks
        let longLength = long * (k-i); 
        let shortLength = short * i;
        lengths.push(longLength+shortLength);
    }

    return lengths;
};

// Just for fun and because I solved that so damn fast, let's do the recursive memoized solution (and for practice. Mainly for practice actually lol)
const divingBoardMemoized = (k, long, short) => {
    let recursiveLevelSets = [];
    // the recursive sets must be different at each level. For example, if longer is length 4 and shorter is length 2.
    // If we place 1 long plank, that is NOT the same as placing 2 short planks, but if we only have ONE set, it'll register as the same no matter how many planks we've placed so far
    // We could also do some weird string concat shenanigans like set.add(`${numPlaced},${length}`); ...
    // but that's kinda hacky, and for space complexity it doesn't actually save us any space for being hacky. We'll have the same number of elements in a set either way (even tho we'll technically have 1 set instead of k sets)
    for (let i = 0; i < k; i++) {
        recursiveLevelSets.push(new Set());
    }

    return divingBoardRecursive(k, long, short, 0, 0, recursiveLevelSets);
};

// takes a int for current length, and keeps track of how many planks we've placed (so we can stop placing planks. Pretty important step in the recursive process; stopping your recursion)
// returns an array of lengths for the given path
const divingBoardRecursive = (k, long, short, numPlaced, length, lengthSet) => {
    if (numPlaced === k) {
        return [length];
    }

    // if we already were at this length, we don't have to recurse, we've already checked the permutations of this path at this many levels deep
    if (lengthSet[numPlaced].has(length)) {
        return [];
    }
    lengthSet[numPlaced].add(length);

    // pick a plank, any plank (lmao I'm having way too much fun)
    let longLengths = divingBoardRecursive(k, long, short, numPlaced+1, length+long, lengthSet);
    let shortLengths = divingBoardRecursive(k, long, short, numPlaced+1, length+short, lengthSet);

    // concat and return lengths at each path
    return [...longLengths, ...shortLengths];
};