/* QUESTION */
// Given an infinite number of quarters (25 cents), dimes (10 cents), nickels (5 cents) and pennies (1 cent),
// write code to calculate the number of ways of representing n cents

/* SOLUTION */
// Brute force o (3 ^ n)

const possibleCoinCombinations = (n) => {
    if (n <= 0) {
        return 0;
    }

    return 1 + possibleCoinCombinations(n-25) + possibleCoinCombinations(n-10) + possibleCoinCombinations(n-5);
};





// 5 cents
// n = 1
// possibilities = 1
//  0 1 2 3 4
// [2,1,1,1,1]

// 10 cents
// n = 6
// possibilities = 2
//  0 1 2 3 4,5,6,7,8,9
// [1,1,1,1,1,1,1,1,1,1]
// [2,1,1,1,1,1,0,0,0,0]
// [1,0,0,0,0,0,0,0,0,0]

const coinCombos = (n) => {
    return countPossibleCombos(n, []) + 1;
}

// Memoized
const countPossibleCombos = (n, combinationsAtN) => {
    if (n <= 0) {
        return combinationsAtN[0];
    }

    let possibilities = 0;

    // nickel
    if (combinationsAtN[n+3]) {
        possibilities += combinationsAtN[n+3];
        // dime
        if (combinationsAtN[n+8]) {
            possibilities += combinationsAtN[n+8];
            // quarters
            if (combinationsAtN[n+23]) {
                possibilities += combinationsAtN[n+23];
            }
        }
    }

    combinationsAtN[n-1] = possibilities;

    // call again at n-1
    countPossibleCombos(n-1, combinationsAtN);
}

// 10 cents | expected result
// n = 10
// possibilities = 0
//  0 1 2 3 4 5 6 7 8 9
// [2,0,0,0,0,1,0,0,0,0]

// 1 dime
// 2 nickels
// 1 nickel, 5 pennies
// 10 pennies


// 25 cents | expected result
// n = 10
// possibilities = 0
//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
//[15, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0]

//  1 | 25 cents
//  2 | 1 quarter
//  3 | 2 dimes, 1 nickel
//  4 | 2 dimes, 5 pennies
//  5 | 1 dime, 3 nickels
//  6 | 1 dime, 2 nickels, 5 pennies
//  7 | 1 dime, 1 nickel, 10 pennies
//  8 | 1 dime, 15 pennies
//  9 | 5 nickels
// 10 | 4 nickels, 5 pennies
// 11 | 3 nickels, 10 pennies
// 12 | 2 nickels, 15 pennies
// 13 | 1 nickel, 20 pennies
// 14 | 25 pennies

// 62
// for howevermany times our largest coin can fit (1 and 2 in this case) call recursively on the remainder
// do this until we hit our smallest coin. Once we hit our smallest coin, return 1 if we can fit that coin into the total


// Scratch ALL that ^^
const countCoins = (cents) => {
    if (cents <= 0) {
        return 0;
    }

    return recursiveCountCoins(cents, [25, 10, 5, 1], 0, new Map());
}

const recursiveCountCoins = (cents, coinTypes, index, possibilitiesMap) => {
    if (cents === 0) {
        // no more ways to arrange coins
        return 1;
    }

    if (possibilitiesMap.has(cents)) {
        return possibilitiesMap.get(cents);
    }

    // smallest coin
    if (index = coinTypes.length-1) {
        // if there's only one coin left and there's any cents left, there is only one way to arrange the rest of them
        // make sure the smallest coin can actually fit into the cents left
        let remainder = cents % coinTypes[index];
        if (remainder > 0) {
            return 0;
        } else {
            return 1;
        }
    }

    let possibilities = 0;
    for (let i = 0; i <= cents; i+=coinTypes[index]) {
        // call again with next largest coin
        possibilities += recursiveCountCoins(cents-i, coinTypes, index+1, possibilitiesMap)
    }

    possibilitiesMap.add(cents, possibilities);

    return possibilities;
}

// 11 cents. Expected: 4
// possibilities = 0
// cents = 11, coinType = 25, index = 0
    // cents = 11, coinType = 10, index = 1
        // cents = 11, coinType = 5, index = 2
            // cents = 11, coinType = 1, index = 3
            // return 1
        // cents = 6, coinType = 5, index = 2
            // cents = 6, coinType = 1, index = 3
            // return 1
        // cents = 1, coinType = 5, index = 2
            // cents = 1, coinType = 1, index = 3
            // return 1
    // cents = 1, coinType = 10, index = 1
        // cents = 1, coinType = 5, index = 2
            // cents = 1 coinType = 1, index = 3
            // return 1

// 5 cents. Expected: 2
// cents = 5, coinType = 25, i = 0
    // cents = 5, coinType = 10, i = 0
        // cents = 5, coinType = 5, i = 0
            // cents = 5, coinType = 1, return 1
        // cents = 5, coinType = 5, i = 5
            // cents = 0, return 1
        // return 2
    // return 2
// return 2