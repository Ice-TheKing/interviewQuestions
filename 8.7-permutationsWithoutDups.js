/* QUESTION */
// Write a method to compute all permutations of a string of unique characters

/* SOLUTION */
// pick each character each step, call again with each of the remaining characters appended next
// o(n!)

const permutations = (string) => {
    if (!string) {
        return '';
    }

    let chars = string.split('');

    let permutations = findPermutations([], chars);
    for (let i = 0; i < permutations; i++) {
        permutations[i] = permutations[i].join('');
    }
    return permutations;
};

const findPermutations = (prefix, chars) => {
    if (chars.length === 0) {
        return [prefix];
    }

    let permutations = [];

    for (let i = 0; i < chars.length; i++) {
        let charsCopy = [...chars]
        let subPermutations = findPermutations( [ ...prefix, chars[i] ] , charsCopy.splice(i, 1) );
        permutations.push(...subPermutations);
    }

    return permutations;
};

// [A]
// permutations = [[A]]
// prefix = [A], chars = []
// return [A]

// join step
// permutations = ['A']

// [c,a,r]
// return permutations = [ [c,a,r] ,[c,r,a], [a,c,r], [a,r,c], [r,c,a], [r,a,c] ]
// prefix = [c], chars = [a,r], return [[c,a,r] ,[c,r,a]]
    //  prefix = [c, a], chars = [r], return [[c,a,r]]
    //  prefix = [c, r], chars = [a], return [[c,r,a]]
        // prefix = [c, a, r], chars = [], return [[c,a,r]]
        // prefix = [c, r, a], chars = [], return [[c,r,a]]
// prefix = [a], chars = [c,r], return [[a,c,r], [a,r,c]]
    //  prefix = [a, c], chars = [r], return [[a,c,r]]
    //  prefix = [a, r], chars = [c], return [[a,r,c]]
        // prefix = [a, c, r], chars = [], return [[a,c,r]]
        // prefix = [a, r, c], chars = [], return [[a,r,c]]
// prefix = [r], chars = [c,a], return [[r,c,a], [r,a,c]]
    //  prefix = [r, c], chars = [a], return [[r,c,a]]
    //  prefix = [r, a], chars = [c], return [[r,a,c]]
        // prefix = [r, c, a], chars = [], return [[r,c,a]]
        // prefix = [r, a, c], chars = [], return [[r,a,c]]



// expected:
// car
// acr
// rac
// arc
// rca
// cra