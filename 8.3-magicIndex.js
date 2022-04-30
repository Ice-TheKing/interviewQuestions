/* QUESTION */
// A magic index in an array A[0...n-1] is defined to be an index such that A[i] = i.
// Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.
// FOLLOW UP: What is the values are not distinct?

/* SOLUTION */

// brute force: search array until we find a "magic" index where A[i] = i
// o(n)
const magicIndex = (A) => {
    for (let i = 0; i < A.length; i++) {
        if (A[i] === i) {
            return A[i];
        }
    }

    return false;
};

// [2, 3, 4, 5, 6, 7, 8, 9, 15]
// [->0<-, 3, 4, 5, 6, 7, 8, 9, 15]
// [-4, -2, -1, 0, ->4<-, 6, 9]
// 

// o(log n)
const findMagicIndex = (A, indexShift) => {
    if (A.length === 0) {
        return false;
    }

    // if middle number is < than it's index, search right half.
    // else if middle number is > than it's index, return false. No possible solution
    let middleIndex = Math.floor(A/2);
    if (A[middleIndex] === middleIndex+indexShift) {
        return middleIndex;
    }
    // number is smaller than index + indexShift
    if (A[middleIndex] < middleIndex+indexShift) {
        // we are at the end of the array
        if (middleIndex+1 >= A.length) {
            return false;
        }
        let rightHalf = A.slice(middleIndex+1, A.length);
        // index shift is the difference in lengths
        let newIndexShift = indexShift + A.length-rightHalf.length;
        return findMagicIndex(rightHalf, newIndexShift);
    }
    // number is larger than index + indexShift, search left half
    if (A[middleIndex] > middleIndex+indexShift) {
        let leftHalf = A.slice(0, middleIndex)
        // if we're searching the left half, indexes don't shift
        return findMagicIndex(leftHalf, indexShift);
    }
};

//i=0, 1, 2, 3, 4, 5, 6, 7, 8
// [] false
// [0] | indexShift = 0 | A[0] (0) === 0+0 (0)  true
// [4] | indexShift = 4 | A[0] (4) === 0+4 (4)  true
// [6] | indexShift = 6 | A[0] (6) === 0+6 (6)  true