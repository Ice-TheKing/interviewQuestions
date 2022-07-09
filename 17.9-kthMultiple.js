/* QUESTION */
// Design an algorithm to find the kth number such that the only prime factors are 3, 5, and 7. Note that 3, 5 and 7 do not have to be factors, but it should not have any other prime factors. 
// For example, the first several multiples would be (in order) 1,3,5,7,9,15,21

/* SOLUTION */
// Data structures: 2 lists. primes that are invalid, and our primes that are marked as valid

// 1: check first to make sure the current number has at least one of our primes as a factor (we're skipping 1, because it won't have them as a factor). 
// If it doesn't, and it's not already in our list of invalidNums, it can't be valid because it will be prime

// 2: check against all invalidNums (we can stop when invalidNums are over half the size of our num). If our num divided by any of the invalidNums == 0, our number is not valid. 
// We don't need to add it to the list of invalid nums because anything that has num as a factor will also have the number num failed at as a factor too


// testing
// k = 11
// 1,3,5,7,9,15,21,25,27,35,45
// invalidNums = 2,11,13,17,19,23,29,31,37,41,43
// whitelistedNums = [3,5,7]
// return 45

// o (n * i) where n = solution num and i = the number of invalid prime numbers between 0 and our answer
// 45 * 11

const kthMultiple = (k) => {
    if (k < 1) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }

    let invalidNums = [2];
    let whitelistedNums = [3,5,7];

    let validNums = 1; // 1 is valid
    let i = 3;

    while (validNums < k) {
        if (isValidNum(i, invalidNums, whitelistedNums)) {
            validNums++;
        }
        i++;
    }

    return i;
};

const isValidNum = (num, invalidNums, whitelistedNums) => {
    // first, the number has to be comprised of at least one of our allowed primes, or it is prime (or has a prime factor that is not one of our allowed primes)
    let hasAllowedPrime = false;
    for (let i = 0; i < whitelistedNums.length; i++) {
        if (i % whitelistedNums[i] === 0) {
            // valid
            hasAllowedPrime = true;
        }
    }
    if (!hasAllowedPrime) {
        // push if it's not already covered by the invalidNums
        for (let i = 0; i < invalidNums.length; i++) {
            if (num % invalidNums[i] === 0) {
                return false;
            }
        }
        // not covered by invalidNums. Add it
        invalidNums.push(num);
        return false;
    }

    // check num against all primes smaller than it
    let i = 0;
    while (num > invalidNums[i]*2) {
        if (i % invalidNum === 0) {
            // this number is not allowed
            // no need to push number to invalid nums, though.
            // any number that has this as a factor will already return false because it has this as a factor
            return false;
        }
        i++;
    }    

    return true;
};