/* QUESTION */
// Write an algorithm to print all ways of arranging eight queens on an 8x8 chess board so that none of them share the same row, column, or diagonal.
// In this case, "diagonal" means all diagonals, not just the two that bisect the board.

/* SOLUTION */
// Place a queen in each spot, then for each of those spots, place the second queen in each valid spot after that, then place the third queen in each valid spot after that, then the fourth and so on.
// Improve the algorithm by storing rows/cols that have already been placed in. These rows/cols will be quickly skipped over with subsequent queen placements (each row/col check is o(1) time)
const eightQueens = (board) => {
    recursivePlaceQueens(board, [], new Set(), new Set(), 1);
};

// board is [row][col]/[y][x], placed is a set of [y,x] arrays, queenNum is how many queens have been placed already, startingPlace is the [y,x] index to start iterating from. [y-1,x] will be where the last placed queen was placed
const recursivePlaceQueens = (board, placed, cols, rows, queenNum) => {
    if (queenNum === 9) {
        // print board
        printBoard(placed);
        return;
    }

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board.length; x++) {
            // place new queen in every valid space
            if (checkValidSpace(board, cols, rows, x, y)) {
                cols.add(x);
                rows.add(y);
                let newPlaced = [...placed, [y,x]];
                recursivePlaceQueens(board, newPlaced, cols, rows, queenNum+1);
            }
        }
    }
}

// placed queens is the [y,x]/[row,col] location of each placed queen
const checkValidSpace = (board, placed, x, y) => {

    if (rows.has(y)) {
        return false;
    }

    if (cols.has(x)) {
        return false;
    }

    // check current space and diagonals with placed array
    for(let i = 0; i < placed.length; i++) {
        // check diagonal 1
        if (!checkDiagonals(placed[i][1], placed[i][0], x, y)) {
            return false;
        }
    }
    
    return true;
};

const checkDiagonals = (newX, newY, existingX, existingY) => {
    // check top right
    let x = newX;
    let y = newY;
    while (x < 8 && y >= 0) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x++;
        y--;
    }

    // check top left
    x = newX;
    y = newY;
    while (x >= 0 && y >= 0) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x--;
        y--;
    }

    // check bottom right
    x = newX;
    y = newY;
    while (x < 8 && y < 8) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x++;
        y++;
    }

    // check bottom left
    x = newX;
    y = newY;
    while (x >= 0 && y < 8) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x--;
        y++;
    }

    return true;
};

const printBoard = (placed) => {
    for (let i = 0; i < placed.length; i++) {
        console.dir(`row:${placed[i][0]}, col:${placed[i][1]}`);
    }
};




/* IMPROVED SOLUTION */

const eightQueens = (board) => {
    recursivePlaceQueens(board, [], 0, new Set());
};

// board is [row][col]/[y][x], placed is a set of [y,x] arrays, queenNum is how many queens have been placed already, startingPlace is the [y,x] index to start iterating from. [y-1,x] will be where the last placed queen was placed
const recursivePlaceQueens = (board, placed, col, rows) => {
    if (col > board.length) {
        // print board
        printBoard(placed);
        return;
    }

    for (let row = 0; row < board.length; row++) {
        // place new queen in every valid space
        if (checkValidSpace(placed, rows, col, row)) {
            let newRows = new Set(rows);
            newRows.add(row);
            newDiagonals.add(/*TODO*/);
            let newPlaced = [...placed, [row,col]];
            recursivePlaceQueens(board, newPlaced, col+1, newRows, newDiagonals);
        }
    }
}

// placed queens is the [y,x]/[row,col] location of each placed queen
const checkValidSpace = (placed, rows, col, row) => {

    if (rows.has(row)) {
        return false;
    }

    // check current space and diagonals with placed array
    // 4,3, 0,1
    // 6,5, 4,7
    // if the diff of row,col is equal to any other diagonal OR they add to the same amount, they are diagonal
    // check current space and diagonals with placed array
    for(let i = 0; i < placed.length; i++) {
        // check diagonal 1
        if (!checkDiagonals(placed[i][1], placed[i][0], col, row)) {
            return false;
        }
    }

    return true;
};

// returns new diagonal
const checkDiagonals = (newX, newY, existingX, existingY) => {
    // check top right
    let x = newX;
    let y = newY;
    while (x < 8 && y >= 0) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x++;
        y--;
    }

    // check top left
    x = newX;
    y = newY;
    while (x >= 0 && y >= 0) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x--;
        y--;
    }

    // check bottom right
    x = newX;
    y = newY;
    while (x < 8 && y < 8) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x++;
        y++;
    }

    // check bottom left
    x = newX;
    y = newY;
    while (x >= 0 && y < 8) {
        if (existingX === x && existingY === y) {
            return false;
        }
        x--;
        y++;
    }

    return true;
};

const printBoard = (placed) => {
    for (let i = 0; i < placed.length; i++) {
        console.dir(`row:${placed[i][0]}, col:${placed[i][1]}`);
    }
};