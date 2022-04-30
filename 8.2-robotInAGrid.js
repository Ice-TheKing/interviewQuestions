/* QUESTION */
// Imagine a robot sitting on the upper left corner of a grid with r rows and c columns. 
// The robot can only move in two directions, right and down, but certain cells are "off limits" such that the robot cannot step on them. 
// Design an algorithm to find a path down for the robot from the top left to the bottom right


/* THINKING */
// rows r = y
// columns c = x
// open cell = 0
// closed cell = 1

/*
0 1 0 0 0
0 0 0 1 0
0 1 1 0 0
0 1 0 0 0
0 0 0 0 0
*/

/*
pathStack = [ [ [0,0], [0,1], [1,1] ],                                        ]
checked = ( [0, 1], [0,2], [0,3] )

-- loop --
pathToCheck = [ [0,0], [0,1], [0,2], [0,3], [0,4], [1,4], [2,4], [3,4], [4,4] ]
lastCell = [4,4]
*/ 

/* SOLUTION */
// pop from stack of spaces to check
// check right and check down
// if path is open AND hasn't been checked already, check it (add the current path to the stack)
// if we are at the bottom right, return the path
// if stack is empty, return false: no path

// n = number of cells (r*c)
// set of checked coordinates stored as an array [row, col] o(n) space
// keep an array of each path [[row, col], [row, col], etc] o(n) space, because we will not be checking duplicates

const robotInAGrid = (matrix) => {
    if(matrix[0][0] === 1) {
        return null;
    }

    let startPath = [];
    startPath.push( [0,0] ); /* x, y */
    let pathStack = [startPath];

    let checked = new Set();

    while (pathStack.length > 0) {
        // pop from stack
        let pathToCheck = pathStack.pop();
        let lastCell = pathToCheck[length-1];

        // are we at the end?
        if (lastCell[0] === matrix.length-1 && lastCell[1] === matrix[0].length-1) {
            return pathToCheck;
        }

        // check if it's been checked before, check bounds, and check right
        if (!checked.has(lastCell) && !lastCell[0]+1 >= matrix.length && matrix[lastCell[0]+1][lastCell[1]] === 0) {
            checked.add(lastCell);

            // add new cell to new array
            let newPath = [...pathToCheck];
            newPath.push( [lastCell[0]+1, lastCell[1]] );

            // put back on the stack
            pathStack.push(newPath);
        }

        // check if it's been checked before, check bounds, and check down
        if (!checked.has(lastCell) && !lastCell[1]+1 >= matrix[0].length && matrix[pathToCheck[0]][pathToCheck[1]+1] === 0) {
            checked.add(lastCell);

            // add new cell
            let newPath = [...pathToCheck];
            newPath.push( [lastCell[0], lastCell[1]+1] );

            // put back on the stack
            pathStack.push(newPath);
        }
    }

    return null;
};