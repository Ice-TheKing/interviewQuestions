/* QUESTION */
// Given a boolean expression consisting of the symbols 0 (false), 1 (true), & (AND), | (OR), and ^ (XOR), and a desired boolean result value: result
// Implement a function to count the number of ways of parenthesizing the expression such that it evaluates to result.
// The expression should be fully parenthesized (e.g., (0)^(1)) but not extraneously (e.g., (((0))^(1))).

/* EXAMPLE */
// countEval("1^0|0|1", false) -> 2
// countEval("0&0&0&1^1", true) -> 10

/* SOLUTION */
// countEval("0&0&0&1^1", true) -> 10

// count possible places to place parenthesis (count 0s and 1s)
// permute parenthesis in each possible place
// for each parenthesis at size = 1 -> size = expression.length
    // for each parenthesis from i - i+size (if valid parenthesis)
        // if parenthesis evaluates === result, add 1 to counter
        // recurse again with parenthesis added
        // remove those parenths before next for loop
// return counter


// e.g. (I didn't write out the entire iteration)

// 0&0&0&1^1
// parenthSize = 1
    // (0)&0&0&1^1
        // parenthSize = 1
            // (0)&(0)&0&1^1
            // (0)&0&(0)&1^1
            // (0)&0&0&(1)^1
            // (0)&0&0&1^(1)
        // parenthSize = 2
            // ((0)&0)&0&1^1
            // (0)&(0&0)&1^1
            // (0)&0&(0&1)^1
            // (0)&0&0&(1^1)
        // parenthSize = 3
            // ((0)&0&0)&1^1
            // (0)&(0&0&1)^1
            // (0)&0&(0&1^1)
        // parenthSize = 4
            // ((0)&0&0&1)^1
            // (0)&(0&0&1^1)
        // parenthSize = 5
            // ((0)&0&0&1^1)
    // 0&(0)&0&1^1
    // 0&0&(0)&1^1
    // 0&0&0&(1)^1
    // 0&0&0&1^(1)
// parenthSize = 2
    // (0&0)&0&1^1
    // 0&(0&0)&1^1
    // 0&0(&0&1)^1
    // 0&0&0&(1^1)
// parenthSize = 3
    // (0&0&0)&1^1
    // 0&(0&0&1)^1
    // 0&0&(0&1^1)
// parenthSize = 4
    // (0&0&0&1)^1
    // 0&(0&0&1^1)
// parenthSize = 5
    // (0&0&0&1^1)