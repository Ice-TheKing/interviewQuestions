/* QUESTION */
// Given an array filled with letters and numbers, find the longest subarray with an equal number of letters and numbers

/* SOLUTION */
// brute force: store every subsequence in a new spot in an array. At each index, incriment letter or number in all of them. For each subarray (indexed where it started) that has an equal number, if it's length is > longestLength, replace longestLength
// o(n^2) time. Makes a new subsequence at every letter or number. Checks each letter (n) and for each letter, checks every subsequence (n)
// o(n) space. Stores 1 object for each element in the array
const lettersAndNumbers = (array) => {
    let subsequences = [];
    let longestSubsequence;

    for (let i = 0; i < array.length; i++) {
        let isNum = isNumber(array[i]);
        // increment every subsequence
        for (let j = 0; j < subsequences.length; j++) {
            if (isNum) {
                subsequences[j].numbers++;
            } else {
                subsequences[j].letters++;
            }

            if (subsequences[j].letters === subsequences[j].numbers) {
                if (!longestSubsequence || (i - subsequences[j].startIndex) > (longestSubsequence.stopIndex - longestSubsequence.startIndex)) {
                    longestSubsequence = subsequences[j];
                    longestSubsequence.stopIndex = i;
                }
            }
        }
        

        // start new subsequence
        let newSubsequence = { letters: 0, numbers: 0, startIndex: i, stopIndex };
        if (isNum) {
            newSubsequence.numbers++;
        } else {
            newSubsequence.letters++;
        }
        subsequences.push(newSubsequence);
    }

    if (longestSubsequence) {
        return array.slice(longestSubsequence.startIndex, longestSubsequence.stopIndex+1);
    }

    return [];
};

const isNumber = (num) => {
    return !isNaN(Number(num));
};


// can we optimize
// where are we doing a lot of work?
// checking each active subsequence for each element in the array is time consuming

// negative diff = more letters
// positive diff = more nunbers
// ['a', 1, 'a', 'a', 'a', '1', '1', '1', 'a']
// expected: ['a', 1, 'a', 'a', 'a', '1', 'a', 'a'] (indexes: 1 - 6)


//         0,  1,  2,   3,   4,   5,   6,   7,   8
//       ['a', 1, 'a', 'a', 'a', '1', '1', 'a', 'a']
// diff:  -1,  0, -1,  -2,  -3,  -2,  -1,  -2,  -3

// { startIndex = 0, endIndex = 1 }
// length = 1

// 6 - 0 = 6 (length=6)

// i = 8
// diff = -3
// diff map:
// diff | index
// -1:    0
//  0:    1
// -2:    3
// -3:    4

// max: (found at i=6)
// 1 - 6


// o(n) time
// o(d) space (d = number of diffs in problem. For example [1,a,1,a,1,a,1,a,1,a,1,a,1,a,1,a,...] will only store 2 diffs, but [a,a,a,a,a,a,...] will store n number of diffs)

const improvedLettersAndNumbers = (array) => {
    let diffsMap = new Map(); // (diff, index)
    let longestSubsequence = {};

    let runningDiff = 0;

    for (let i = 0; i < array.length; i++) {
        let isNum = isNumber(array[i]);

        if (isNum) {
            runningDiff++;
        } else {
            runningDiff--;
        }

        if (!diffsMap.has(runningDiff)) {
            diffsMap.set(runningDiff, i);
        }

        // do we have a new longest subSequence?
        if (!longestSubsequence.startIndex || i - diffsMap.get(runningDiff) > longestSubsequence.endIndex - longestSubsequence.startIndex) {
            longestSubsequence.startIndex = diffsMap.get(runningDiff)+1; // exclude startIndex
            longestSubsequence.endIndex = i;
        }
    }

    if (!runningDiff.startIndex) {
        return [];
    } else {
        return array.slice(longestSubsequence.startIndex, longestSubsequence.endIndex+1); // inclusive of endIndex
    }
};