/* QUESTION */
// You have a large text file containing words. Given any two words, find the shortest distance (in terms of number of words) between them in the file. 
// If there operation will be repeated many times for the same file (but different pairs of words), how can you optimize your solution?

/* SOLUTION */
// 

// we are happy, the happy days are here, because all of us are
// definitely very happy, we are all

// find all word indices
const wordDistance = (text, word1, word2) => {
    let word1Indices = [];
    let word2Indices = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === word1) {
            word1Indices.push(i);
        }
        if (text[i] === word2) {
            word2Indices.push(i);
        }
    }

    // we have a list of all indices of word in ascending order, find shortest distance
    return findSmallestDiff(word1Indices, word2Indices);
};


// smallestDiff = 20
// 4, 10, 221, 300
// 280, 400
// pointer at each index
// move whichever pointer would make the diff smaller. If that diff is smaller than smallestDiff, make smallestDiff = diff


const findSmallestDiff = (indices1, indices2) => {
    let smallestDiff;

    let pointer1 = 0;
    let pointer2 = 0;

    for (let i = 0; i < indices1.length + indices2.length; i++) {
        // is the current diff smallest?
        if (!smallestDiff || Math.abs(indices1[pointer1] - indices2[pointer2]) < smallestDiff) {
            smallestDiff = Math.abs(indices1[pointer1] - indices2[pointer2]);
        }

        // which pointer do we increment to get the smallest diff?
        // check if either pointer is at bounds
        if (pointer1 === indices1.length-1) {
            pointer2++;
        } else if (pointer2 === indices2.length-1) {
            pointer1++;
        }
        // incriment whichever gives us the smallest diff
        else if (Math.abs(indices1[pointer1+1] - indices2[pointer2]) < Math.abs(indices1) - indices2[pointer2+1]) {
            pointer1++;
        } else {
            pointer2++;
        }
    }

    return smallestDiff;
};

// optimized for repeated operations:

let wordIndexMap;

const wordDistanceRepeated = (text, word1, word2) => {
    if (!wordMap) {
        wordIndexMap = createWordMap(text);
    }

    return findSmallestDiff(wordIndexMap.get(word1), wordIndexMap.get(word2));
}

const createWordMap = (text) => {
    let map = new Map();

    for (let i = 0; i < text.length; i++) {
        // insert word if it doesn't exist
        if (!map.get(text[i])) {
            map.set(text[i], []);
        }
        // add word index
        map.get(text[i]).push(i);
    }
};