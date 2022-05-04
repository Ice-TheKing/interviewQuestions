/* QUESTION */
// You are given two sorted arrays, A and B, where A has a large enough buffer (irrelevant for JS) at the end to hold B.
// Write a method to merge B into A in sorted order

/* SOLUTION */
const sortedMerge = (a, b) => {
    let arrA = [...a];
    let arrB = [...b];
    let newArr = [];

    while (arrA.length > 0 && arrB.length > 0) {
        if (arrA[0] < arrB[0]) {
            newArr.push(arrA.shift());
        }
        else {
            newArr.push(arrB.shift());
        }
    }

    if (arrA.length > 0) {
        newArr.push(...arrA);
    }

    if (arrB.length > 0) {
        newArr.push(...arrB);
    }

    return newArr;
};

// arrA: [ ]
// arrB: [120]
// newArr: [ 0, 1, 3, 4, 8, 10, 120 ]

// 