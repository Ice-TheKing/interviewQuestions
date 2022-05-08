/* QUESTION */
// You have a stack of n boxes, with widths w, heights h, and depths d. The boxes cannot be rotated and can only be stacked on top of one another if each box in the stack is strictly larger than the box above it in width, height and depth.
// Implement a method to compute the height of the tallest possible stack. The height of a stack is the sum of the heights of each box.

/* SOLUTION */
// (time: 45 mins)

// brute force:
// for each box, stack each box on top of it that fits and call again

const stackOfBoxes = (boxes) => {
    if (boxes.length === 0) {
        return null;
    }
    if (boxes.length === 1) {
        return boxes.h;
    }

    // get all possible box stacks
    let stacks = recursiveStackBoxes(boxes, []);

    // find the heights
    let heights = [];
    let tallestIndex = -1;

    for (let i = 0; i < stacks.length; i++) {
        // calculate height of this stack
        let height = 0;
        for (let j = 0; j < stacks[i].length; j++) {
            height+=stacks[i][j].h;
        }
        heights[i] = height;

        if (heights[i] > heights[tallestIndex]) {
            tallestIndex = i;
        }
    }

    return heights[tallestIndex];
};

const recursiveStackBoxes = (boxes, stack) => {
    if (boxes.length === 0) {
        return [stack];
        // if we want to be extra careful:
        // return stack || [];
    }

    let stacks = [];

    let topBox = stack[0]; // basically stack.peek();

    for (let i = 0; i < boxes.length; i++) {
        // does this box fit on top of the top box? If there's no top box, try every box first
        if (!topBox || (boxes[i].w < topBox.w && boxes[i].h < topBox.h && boxes[i].d < topBox.d)) {
            // this one does. Pull it off and keep recursing
            // let newBox = boxes[i];
            // let newBoxes = boxes.slice(1, boxes.length);
            // let newStack = [newBox, ...stack];

            // Don't copy the arrays, just make a choice and undo it after we explore!
            let box = boxes.splice(i, 1);
            stack.unshift(box);

            // explore and save the result
            let result = recursiveStackBoxes(boxes, stack);
            stacks.push(...result);

            // undo change
            boxes.splice (i, 0, box);
            stack.shift();
        }
    }

    return stacks;
};

// how can we improve this algorithm?
// where are we doing duplicate work?
// if we stack a box on another box that we've stacked before, the boxes you can stack on top of those are the same
// how would we keep track of that? With a hash map!

const stackOfBoxes = (boxes) => {
    if (boxes.length === 0) {
        return null;
    }
    if (boxes.length === 1) {
        return boxes.h;
    }

    // get all possible box stacks
    let stacks = recursiveStackBoxes(boxes, [], new Map());

    // find the heights
    let heights = [];
    let tallestIndex = -1;

    for (let i = 0; i < stacks.length; i++) {
        // calculate height of this stack
        let height = 0;
        for (let j = 0; j < stacks[i].length; j++) {
            height+=stacks[i][j].h;
        }
        heights[i] = height;

        if (heights[i] > heights[tallestIndex]) {
            tallestIndex = i;
        }
    }

    return heights[tallestIndex];
};

const recursiveStackBoxes = (boxes, stack, solvedBoxes) => {
    if (boxes.length === 0) {
        return [stack];
    }

    let stacks = [];

    let topBox = stack[0]; // basically stack.peek();

    for (let i = 0; i < boxes.length; i++) {
        // does this box fit on top of the top box? If there's no top box, try every box first
        if (!topBox || (boxes[i].w < topBox.w && boxes[i].h < topBox.h && boxes[i].d < topBox.d)) {
            // this box fits. Pull it off and keep recursing
            let newBox = boxes[i];

            // has this box been solved before?
            if (solvedBoxes.has(newBox)) {
                // pull off the result and add it to our existing stack
                let result = solvedBoxes.get(newBox);
                // add our new box to each result stack
                for (let j = 0; j < result.length; j++) {
                    result[j] = [newBox, ...result[j]];
                }
                stacks = [...result, ...stacks];

                // solved boxes @ newBox = full list of stacks
                solvedBoxes.add(newBox, stacks);
            } else {
                // figure out the possibilities for this box
                let newBoxes = boxes.slice(1, boxes.length);
                let newStack = [newBox, ...stack];

                // figure out the results
                let result = recursiveStackBoxes(newBoxes, newStack);

                stacks = [...result, ...stacks];

                // solved boxes @ newBox = full list of stacks
                solvedBoxes.add(newBox, result);
            }

            
        }
    }

    return stacks;
};


//    w, h, d
// 0| 8, 9, 8
// 1| 6, 6, 6
// 2| 3, 3, 3
// 3| 9, 9, 9

// expected: 18

// [0] topbox: 0 [1,2,3]
// [1] topbox: 1 [0,2,3]
    // [1, 0]
    // [1, 3]
// [2] topBox: 2 [0,1,3]
    // [2, 0]
    // [2, 1, 0]
    // [2, 1, 3]
// [3] topBox: 3 [0,1,2]
    // [3]


// solved Boxes: 
// 0: [ [0] ]
// 1: [ [1,0], [1,3] ]
// 2: [ [2,0], [2,1,0], [2,1,3] ]
// 3: 



// more improvements: we don't need to store every possible stack given each box, just the height of the tallest substack

// time is up