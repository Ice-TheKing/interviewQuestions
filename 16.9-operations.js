/* QUESTION */
// write methods to implement the multiply, subtract, and divide operations for integers.
// The result of all of these are integers. You can use the add operator, but not the minus, times or divide

/* SOLUTION */
// 

// o(min(n,m)) where n is the smallest number you're multiplying
const multiply = (n, by) => {
    let num = 0;

    // small optmization, loop through the smaller number and add the larger number
    if (by < n) {
        for (let i = 0; i < by; i++) {
            num+=n;
        }
    } else {
        for (let i = 0; i < n; i++) {
            num+=by;
        }
    }

    if (by < 0) {
        num = negate(num);
    }
    return num;
};

const subtract = (n, by) => {
    return n + negate(by);
};

const negate = (n) => {
    if (n < 0) {
        // remove negative sign
        n = Number(n.toString.shift());
    } else if (n > 0) {
        // add negative sign
        num = Number(`-${num}`);
    }

    return n;
};

// 24 / 4 = 6
// 6 * 4 = 24

// brute force divide
// worst case: o(n * min(m,n) ) where n = the result of the divide, m = what you're dividing by (min(m,n) is how many steps there are in multiply)
const bruteForceDivide = (n, by) => {
    // edge cases
    if (by > n) {
        return 0;
    }
    if (by === 0) {
        return Infinity; // or we'd infinite loop
    }

    // figure out signs
    let negative = true;
    if ((n < 0  && by < 0) || (n > 0 && by > 0)) {
        negative = false;
    }

    // unsign the divisor and dividend
    if (n < 0) {
        n = negate(n);
    }
    if (by < 0) {
        by = negate(by);
    }

    // solve division
    for (let i = 0; i <= n; i++) {
        mult = multiply(by, i);
        if (mult > n) {
            return negative ? negate(i-1) : i-1;
        } else if (mult === n) {
            return negative ? negate(i) : i;
        }
    }
    // we shouldn't reach this point?
};

// 19 / 1 = 19
