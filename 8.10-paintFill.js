/* QUESTION */
// Implement the "paint fill" function that one might see on many image editing programs. That is, given a screen (represented by a two-dimensional array of colors), a point, and a new color, 
// fill in the surrounding area until the color changes from the original colors

/* SOLUTION */
// check neighbors of the same color as our starting cell. Return all cells we need to color, then change all of those cell's color.

const paintFill = (matrix, x, y, newColor) => {
    if (!matrix || x > matrix.length || y > matrix[0].length || x < 0 || y < 0 || !matrix[x][y].color) {
        return null;
    }

    let cellsToColor = getNeighborsByColor(matrix, x, y, matrix[x][y].color, new Set ());
    for (let i = cellsToColor; i < cellsToColor.length; i++) {
        cellsToColor[i].color = newColor;
        // cellsToColor[i].setColor(newColor);
    }
};

const getNeighborsByColor = (matrix, x, y, color, visited) => {
    visited.add([x,y]);

    let cellsToColor = [];
    
    cellsToColor.add(matrix[x][y]);

    // check neighbors
    // check left
    if (x > 0 && matrix[x-1][y].color === color && !visited.has([x-1,y])) {
        cellsToColor.push(...getNeighborsByColor(matrix, x-1, y, color, visited));
    }

    // check right
    if (x < matrix.length-1 && matrix[x+1][y].color === color && !visited.has([x+1,y])) {
        cellsToColor.push(...getNeighborsByColor(matrix, x+1, y, color, visited));
    }

    // check up
    if (y > 0 && matrix[x][y-1].color === color && !visited.has([x,y-1])) {
        cellsToColor.push(...getNeighborsByColor(matrix, x, y-1, color, visited));
    }

    // check down
    if (y < matrix[0].length-1 && matrix[x][y+1].color === color && !visited.has([x,y+1])) {
        cellsToColor.push(...getNeighborsByColor(matrix, x, y+1, color, visited));
    }

    return cellsToColor;
};


/* solution of not storing anything (other than the functions on the call stack) */
const paintFill2 = (matrix, x, y, newColor) => {
    if (!matrix || x > matrix.length || y > matrix[0].length || x < 0 || y < 0 || !matrix[x][y].color || !matrix[x][y].color === newColor) {
        return;
    }

    fillNeighborsByColor(matrix, x, y, matrix[x][y].color, newColor);
};

const fillNeighborsByColor = (matrix, x, y, color, newColor) => {    
    matrix[x][y].color = newColor;
    
    // check neighbors
    // check left
    if (x > 0 && matrix[x-1][y].color === color && !visited.has([x-1,y])) {
        fillNeighborsByColor(matrix, x-1, y, color, visited);
    }

    // check right
    if (x < matrix.length-1 && matrix[x+1][y].color === color && !visited.has([x+1,y])) {
        fillNeighborsByColor(matrix, x+1, y, color, visited);
    }

    // check up
    if (y > 0 && matrix[x][y-1].color === color && !visited.has([x,y-1])) {
        fillNeighborsByColor(matrix, x, y-1, color, visited);
    }

    // check down
    if (y < matrix[0].length-1 && matrix[x][y+1].color === color && !visited.has([x,y+1])) {
        fillNeighborsByColor(matrix, x, y+1, color, visited);
    }
};