/* QUESTION */
// Given two arrays of integers, compute the pair of values (one value in each array) with the smallest (non-negative) difference. Return the difference

/* SOLUTION */
// brute force, check every element from array 1 with every element in array 2. Return smallest difference. o(n*m) time complexity, o(1) space complexity

const bruteForceDifference = (arr1, arr2) => {
    let smallestDifference = null;

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (!smallestDifference || Math.abs(arr1[i]-arr2[j]) < smallestDifference) {
                smallestDifference = Math.abs(arr1[i]-arr2[j]);
            }
        }
    }

    return smallestDifference;
};

// Sort array2, then binary search for the smallest difference at each element in arr1
// time complexity will be o(m log m + n log m) because of sorting arr2: m log m. And because of searching arr2 for each element in arr1: n log m

const sortedDifference = (arr1, arr2) => {
    if (!arr1 || !arr2 || arr1.length === 0 || arr2.length === 0) {
        return null;
    }

    let arr2 = arr2.sort(); // o (m log m)

    let smallestDiff = null;

    for (let i = 0; i < arr1.length; i++) { // o (n)
        let diff = searchSmallestDiffInArray(arr1[i], arr2);
        if (!smallestDiff || diff < smallestDiff) {
            smallestDiff = diff;
        }
    }

    return smallestDiff;
};

const searchSmallestDiffInArray = (val, arr, smallestDiff) => {
    // if there's only one element left, it's the closest num. Return diff
    if (arr.length === 1) {
        return Math.abs(val - arr[0]) < smallestDiff ? Math.abs(val - arr[0]) : smallestDiff;
    }

    // get middle value
    let midPt = Math.floor(arr.length/2);

    if (val === arr[midPt]) {
        return val - arr[midPt]; // 0
    }
    
    // save midPt if it's the smallest we've seen
    if (!smallestDiff) {
        smallestDiff = Math.abs(val - smallestDiff);
    } else if (Math.abs(arr[midPt] - val) < smallestDiff) {
        smallestDiff = Math.abs(arr[midPt] - val);
    }
    
    if (val > arr[midPt]) {
        // search right half
        return searchSmallestDiffInArray(val, arr.splice(midPt+1, arr.length), smallestDiff);
    } else {
        // search left half
        return searchSmallestDiffInArray(val, arr.splice(0, midPt), smallestDiff);
    }
};