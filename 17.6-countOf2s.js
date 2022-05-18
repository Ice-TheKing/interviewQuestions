/* QUESTION */
// Write a method to count the number of 2s that appear in all the numbers between 0 and n (inclusive)

/* SOLUTION */
// brute force: count them by hand

const countTwos = (n) => {
    let count = 0;

    for (let i = 0; i <= n; i++) {
        let words = i.toString();

        for (let j = 0; j < words.length; j++) {
            if (words[j] === 2) {
                count++;
            }
        }
    }

    return count;
};

const checkMultiTwos = (n) => {
    // loop through digits and add 10^n
    // if all digits are twos, add 10^n twos to count, where n = 
};

// 2
// 10
// 12
// 22
// 32
// 222
// 322
// 2222, n = 2230

// n = 2230 - 2000 = 230 2s | 2299 - 2200 = 100 2s | each hundred has 10 2s
// 1999 | 1299 - 1200 = 100 2s

// every thousand digit (pow 3) has 1000 2s
// + every hundred digit (pow 2) has 100 2s
// + every ten digit has 11 2s

// find how many digits there are
// bring the number down to the lowest whole number (9999, 99999 etc) count twos in that number
//

const countTwosOptimized = (n) => {
    let powerOfTen = 0;
    let count = 0;

    while (Math.pow(10, powerOfTen+1)-1 <= n) {
        powerOfTen++;
    }

    // trim n
    let result = trimToNearestPower(n, powerOfTen);
    n = result.n;
    powerOfTen = result.powerOfTen;
    count += result.twos;


    // for each power of ten, find how many twos are in it (recursively. Works sort of like factorial)
    for (let i = powerOfTen; i > 0; i--) {
        count += recursivelyCountTwos(n, i);

        // decriment from 999 to 99
        // decriment 49999 to 9999
        // aka chop latestDigit
        n = Number(n.toString().shift());
    }

    return count;
};

// returns how many twos were found
// { n, twos, power }
const trimToNearestPower = (n, powerOfTen) => {
    // trim 1349 to 999
    // trim 27300 to 19999
    if (powerOfTen === 0) {
        return { n: 0, twos: 0 };
    } if (powerOfTen === 1) {
        // count twos by hand. We can guaruntee this is on a num 99 or less, so this is constant time
        return countTwos(n);
    }

    // e.g. 27300
    // check if equal to (10^powerOfTen)-1. Return { n, 0 } if it is
    if (n === Math.pow(10, powerOfTen)-1) {
        return { n: n, twos: 0 };
    }
    // Decriment the last digit (2 to 1)
    let numStr = n.toString;
    let firstDigit = Number(numStr.shift());
    firstDigit--;

    // e.g. 1349 to 999 shifts down a power of ten
    if (firstDigit === 0) {
        powerOfTen--;
    }

    let newN = Number(`${firstDigit}${numStr}`);

    // e.g. find the difference between power of Ten(10000)-1: 9999 and 7300. Diff = 2699
    let diff = (Math.pow(10, powerOfTen)-1) - Number(numStr);

    // find the number of 2s in the diff (by trimming it again and running count on the trimmed num)
    let extra2s = trimToNearestPower(diff, powerOfTen-1);
    let count = recursivelyCountTwos(extra2s.n);
    count+= extra2s.twos;

    return { n: newN, twos: count, powerOfTen:powerOfTen };
};

const recursivelyCountTwos = (n, pow) => {
    if (pow = 1) {
        return 11;
    }
    if (pow = 0) {
        return 0;
    }

    let count = 0;

    let firstDigit = Number(n.toString().shift());

    // if our digit starts with 2 (or is greater... 3999 will include 2999-2000), add n many 2s where n = the power of 10 we are at. AKA, 2999 to 2000 will have 2000 2s just from the thousands place (plus whatever each hundreds place will have)
    if (firstDigit >= 2) {
        count += Math.pow(10, pow);
    }

    // recurse
    let result = recursivelyCountTwos(pow-1) * 10; // there are 10 iterations of the lower power for each power (10 100s in each 1000)

    count += result * firstDigit; // 3999 will have 3 runs of thousands (3999 - 2999, 2999-1999, 1999-999) before reaching n=999
    
    return count;
};