/* QUESTION */
// Write an algorithm which computes the number of trailing zeros in n factorial

/* SOLUTION */
const trailingZeros = (n) => {
    if (n < 0) {
        return null;
    }

    n = factorial(n, 0, 0);

    return trailingZeros(n);
};

const factorial = (n) => {
    if (n === 1 || n === 0) {
        return 1;
    }

    return n * factorial(n-1);
};

// check the remainder of n / 10, n / 100, n / 1000 and that will tell us the number of trailingZeros
const findTrailingZeros = (n, count) => {
    if (n % Math.pow(10, count+1) !== 0) {
        return count;
    }
    return findTrailingZeros(n, count+1);
};