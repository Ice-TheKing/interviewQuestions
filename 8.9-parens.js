/* QUESTION */
// Implement an algorithm to print all valid (e.g., properly opened and closed) combinations of n pairs of parentheses

/* EXAMPLE */
// input: 3
// Output: ((())), (()()), (())(), ()(()), ()()()

/* SOLUTION */
// if we are at n*2 length, return our string of parenths
// given all the parenthesis we currently have placed, call recursively with parenths at every valid position (and remove duplicates)
// comine all child call's return values, return the set of parenths
// once we have all our parenths (from where we call our recursive function)
// iterate over it, put each element into an array
// return that string

// ()
// ()()
// (())
// ()()

// (())
// .(.(.).).
// ()(())
// (()())
// ((()))
// (()())
// (())()

// .(.).(.(.).).
// .(.(.).(.).).
// .(.(.(.).).).
// .(.(.).).(.).


// test cases:

// n = 3
// ()
// ()()
    // ()()()
    // (())()
    // ()(())
// (())
    // (()())
    // ((()))

// n = 2
// ()
// ()()
// (())

// n = 1
// return ()

// n = 0
// returns empty string


const parenths = (n) => {
    if (n === 0) {
        return '';
    }
    let parenths = '()';

    if (n === 1) {
        return parenths; // '()'
    }

    return recursivelyPlaceParenths(parenths, new Set(), n);
};

// input 1 string
// return set of strings
const recursivelyPlaceParenths = (parenth, checkedPermutations, n) => {
    if (parenth.length >= n*2) {
        return [parenths];
    }

    let parenths = [];

    // place a new parenth at every valid location
    for(let i = 0; i < parenth.length; i++) {
        // place parenth at position
        let newParenth = `${parenth.slice(0, i)}()${parenth.slice(i, parenth.length)}`;

        // if we've permuted this already, skip it
        if (checkedPermutations.has(newParenth)) {
            continue;
        }

        checkedPermutations.add(newParenth);

        // recursively call on newParenth permutation
        let childParenths = recursivelyPlaceParenths(newParenth, n);

        parenths.push(...childParenths);
    }

    return parenths;
}