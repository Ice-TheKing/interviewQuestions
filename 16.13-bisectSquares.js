/* QUESTION */
// Given two squares on a two-dimensional plane, find a line that would cut these two squares in half. Assume that the top and the bottom sides of the square run parallel to the x-axis.

/* SOLUTION */
// find the middle of each square and find a line that connects them  (that's our slope)

const bisectSquares = (sq1, sq2) => {
    let midPt1 = findMidPt(sq1);
    let midPt2 = findMidPt(sq2);
    let slope = findSlope(midPt1, midPt2);

    if (slope === Infinity) { // will handle the case where the squares are the same, too
        let topPt = sq1.y < sq2.y ? [sq1.x + (sq1.width/2), sq1.y] : [sq2.x + (sq2.width/2), sq2.y]; // [x, y]
        let bottomPt = sq1.y < sq2.y ? [, sq2.y+sq2.height] : []; // [x, y]
    }

    let b = findB(midPt1, slope);

    // if we are returning y = mx + b form
    //return `y = ${slope}x + ${b}`;
    
    // I'm too tired to figure out a solution if we were to bisect at the rectangle's bounds right now
    // find the left square
    let leftSquare = sq1;
    let rightSquare = sq2;
    if (leftSquare.x > rightSquare.x) {
        leftSquare = sq2;
        rightSquare = sq1;
    }

    // we will need to determine which side of the square (top/bottom or left/right) the line will cross
    // based on the height/width ratio and the slope
    let pt1 = findBoundingPoint(leftSquare, slope, true, b);
    let pt2 = findBoundingPoint(rightSquare, slope, false, b);

    // if we are returning the line segment (defined by two points)
    return [pt1, pt2];
};

const findMidPt = (square) => {
    // x + half of width
    // y + half of height

    let midPt = [square.x + (square.width/2), square.y + (square.height/2)]; // x,y

    return midPt;
};

const findSlope = (pt1, pt2) => {
    // y diff / x diff
    let xDiff = pt2[0] - pt1[0];

    if (xDiff === 0) {
        return Infinity;
    }

    let yDiff = pt2[1] - pt1[1];
    return yDiff/xDiff;
};

const findB = (pt, slope) => {
    let x = pt[0];
    let y = pt[1];
    let m = slope;
    // y = mx + b
    // so b = y-mx
    return (y - (m*x));
};

const findBoundingPoint = (square, slope, left, b) => {
    // determine if we will cross the top or left first
    let intersectTop = true;

    // if the ratio of height/width is > slope, we will hit the sides
    if (square.height/square.width > slope) {
        intersectTop = false;
    }

    let point = [];

    if (intersectTop) {
        // intersect top/bottom
        // y = slope * x + b
        // solved for x = (y-b)/slope

        // if slope > 0 and it's the left square OR slope is negative and it's the right square, it hits bottom edge. Otherwise it hits top edge
        let y = (slope > 0 && left || slope < 0 && !left) ? square.y + square.height : square.y;
        let x = y-b/slope;

        if (slope > 0 && left || slope < 0 && !left) {
            // intersects bottom
            y = square.height;
        } else {
            // slope < 0 && left || slope > 0 && !left
            // intersect top
            y = 0;
        }

        point = [x,y];
    } else {
        // intersects the side
        // y = slope * x axis + b

        // left square will hit left bound, right square will hit right bound
        let x = left ? square.x : square.x+square.width;
        let y = slope * x + b;
        
        point = [x,y];
    }

    return point;
};

