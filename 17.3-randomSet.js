/* QUESTION */
// Write a method to randomly generate a set of m integers from an array of size n. Each element must have an equal probability of being chosen

/* SOLUTION */
// copy the array and remove a random element until the length of the new set equals m

// o(m*n) time (because of splice), o(n) space
const randomSet = (arr, m) => {
    if (m > arr.length) {
        return null;
    }

    // copy arr
    let newSet = [...arr];

    let diff = arr.length - m;

    for (let i = 0; i < diff; i++) {
        // delete a random number from newSet
        let random = Math.floor(Math.random() * newSet.length);
        newSet.splice(random, 1);
    }

    return newSet;
};

// better solution
const betterRandomSet = (arr, m) => {
    if (arr.length < m) {
        return null;
    }

    let newArr = [];

    // copy first m elements
    for (let i = 0; i < m; i++) {
        newArr.push(arr[i]);
    }

    // for the rest of the elements in the arr, see if we should swap elements
    for (let i = m; i < arr.length; i++) {
        let rand = Math.floor(Math.random() * (i+1));

        if (rand < m) {
            newArr[rand] = arr[i];
        }
    }

    return newArr;
};