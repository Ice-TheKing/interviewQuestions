/* QUESTION */
// Write a method to compute all permutations of a string whose characters are not necessarily unique. The list of permutations should not have duplicates.

/* SOLUTION */
// Sort string, then calculate permutations. Store the "last permuted character" and if the current permuted character is the same, don't start another permutation from it

const permutations = (string) => {
    if (!string) {
        return '';
    }

    let chars = string.split('');
    chars =  chars.sort();


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

    let lastPermutedChar = '';
    for (let i = 0; i < chars.length; i++) { // o (n)
        // if the character is the same as the last one, skip it in the permutation. We already have that
        if (chars[i] === lastPermutedChar) {
            continue;
        }
        lastPermutedChar = chars[i];

        let charsCopy = [...chars]
        let subPermutations = findPermutations( [ ...prefix, chars[i] ] , charsCopy.splice(i, 1) ); // o (n-1)
        permutations.push(...subPermutations);
    }

    return permutations;
};

// haaaa
// haaaa, ahaaa, aahaa, aaaha, aaaah

// aaah
// a
    // aa
        // aaa
            // aaah
                // aaaha
            // aaaa
                // aaaah
        // aah
            // aaha
                // aahaa
    
    // ah
        // aha
            // ahaa
                // ahaaa

   //
// ha
    //  haa
        // haaa
            // haaaa


// aaa
    // [a], [a,a], return [ [a,a,a] ]
        // [a,a], [a], return [ [a,a,a] ]
            // [a,a,a] [], return [ [a,a,a] ]
                // return [ [a,a,a] ]