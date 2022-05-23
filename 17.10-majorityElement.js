/* QUESTION */
// A majority element is an element that makes up more than half of the items in an array. Given a positive integers array, find the majority element. If there is no majority element, return -1.
// Do this in o(n) time and o(1) space

/* SOLUTION */
/* brute force o(n*n) */
// get each element's count. If an element has a count of more than half the array's length, return it. Return -1 if no elements pass
const majorityElement = (array) => {
    for (let i = 0; i < array.length/2; i++) { // small optimization: we will have found the element already if we are over half way through the array
        let element = array[i];
        let elementCount = 0;
        for (let j = i; j < array.length; j++) {
            if (array[j] === element) {
                elementCount++;
            }
            if (elementCount > array.length/2) {
                return element;
            }
        }
    }
    return -1;
};

/* Improved solution */
// o(4n) is still o(n), LOL!

// search forward, then search the first element
// then search backward, then search the last element
// element: 1
// count:   5
// checks:  8
// 1 2 5 9 5 9 5 5 5 pass
// 1 1 1 1 5 5 5 5 5 pass
// 5 5 5 1 1 1 1 5 5 pass
// 1 5 1 5 1 5 1 5 1 pass
// 9 9 9 9 5 5 5 5 5 pass
// 5 5 5 9 9 9 9 5 5 pass
// 1 5 1 5 5 9 7 5 4 5 5 5 2 pass
// 5 5 9 9 9 9 9 5 5 fail (without backtracking)
// 5 5 9 9 9 3 9 9 9 5 5 fail (without backtracking)
// + when switching elements, backtrack until the next element would be a different number (to get a full count)
// 5 5 9 9 9 9 9 5 5 pass
// 5 5 9 9 9 3 9 9 9 5 5 pass

// TODO: Ran out of time or I would have broken the forward/backward checks into their own functions so I'm not duplicating code
const majorityElementImproved = (array) => {
    if (array.length === 0) {
        return -1;
    } else  if (array.length === 1) {
        return array[0];
    }

    // check forward
    let element = array[0];
    let count = 1;
    let checks = 1;
    for (let i = 1; i < array.length; i++) {
        if (element === array[i]) {
            count++;
            if (count > array.length / 2) {
                return element;
            }
        }
        checks++;
        // if in our current element we've checked over twice as many elements as we've found matches, start over with the current element
        if (checks > 1 && count*2 < checks) {
            // try a new element
            element = array[i];
            count = 1;
            checks = 1;
            // backtrack while the previous element is the same
            while (array[i-1] && array[i-1] === element) {
                i--;
            }
        }
    }
    element = array[array.length-1];
    count = 1;
    checks = 1;

    // check backward
    for (let i = array.length-1; i >= 0; i--) {
        if (element === array[i]) {
            count++;
            if (count > array.length / 2) {
                return element;
            }
        }
        checks++;
        // if in our current element we've checked over twice as many elements as we've found matches, start over with the current element
        if (checks > 1 && count*2 < checks) {
            // try a new element
            element = array[i];
            count = 1;
            checks = 1;
            // backtrack while the previous element is the same
            while (array[i+1] && array[i+1] === element) {
                i++;
            }
        }
    }

    // check first element
    element = array[0];
    count = 1;
    for (let i = 0; i < array.length; i++) {
        if (element === array[i]) {
            count++;
            if (count > array.length / 2) {
                return element;
            }
        }
    }

    // check last element
    element = array[array.length-1];
    count = 1;
    for (let i = array.length-1; i >= 0; i--) {
        if (element === array[i]) {
            count++;
            if (count > array.length / 2) {
                return element;
            }
        }
    }

    return -1;
};

// boy was my solution not as good as the one in the book