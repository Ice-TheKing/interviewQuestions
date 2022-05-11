/* QUESTION */
// Design an algorithm to figure out if someone has won a game of tic-tac-toe

/* SOLUTION */
// check 3 win conditions: 3 across, 3 down or 3 diagonal

const checkTicTacWin = (matrix) => {
    // check rows
    for (let i = 0; i < matrix.length) {
        if (checkRowWin(matrix, i)) {
            return true;
        }
    }

    // check cols
    for (let i = 0; i < matrix[0].length) {
        if (checkColWin(matrix, i)) {
            return true;
        }
    }

    // check diagonal
    if (checkDiagonalWin(matrix)) {
        return true;
    }

    return false;
};

const checkRowWin = (matrix, row) => {
    // no shape in first col
    if (!matrix[row][0]) {
        return false;
    }

    let shape = matrix[row][0];

    for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] !== shape) {
            return false;
        }
    }
    return true;
};

const checkColWin = (matrix, col) => {
    // no shape in first row
    if (!matrix[0][col]) {
        return false;
    }

    let shape = matrix[0][col];
    for (let row = 0; row < matrix[0].length; row++) {
        if (matrix[row][col] !== shape) {
            return false;
        }
    }
    return true;
};

const checkDiagonalWin = (matrix) => {
    if (!matrix[0][0] || !matrix[0][matrix.length-1]) {
        return false;
    }

    // top left to bottom right
    let row = 0;
    let col = 0;
    let shape = matrix[row][col];

    while (row < matrix.length && col < matrix[0].length) {
        if (matrix[row][col] !== shape) {
            return false;
        }
        row++;
        col++;
    }


    // top right to bottom left
    row = 0;
    col = matrix.length-1;
    shape = matrix[row][col];

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] !== shape) {
            return false;
        }
        row++;
        col--;
    }
    return true;
};