/* QUESTION */
// Imagine a histogram (bar graph). Design an algorithm to compute the volume of the water it could hold if someone poured water across the top. 
// You can assume that each histogram bar has width 1.


/* SOLUTION */
// Water has two ways of spilling - either it can spill to the left or to the right
// I think one optimial solution would be to loop through the histogram twice - once from the beginning and once from the end backwards.
// Once we hit a histogram bar we start counting up the area until we hit a histogram bar the same height or taller. Then we total from that bar's height, etc.
// If we hit the end and still haven't hit a bar equal to or taller than the bar we started counting from, drop all area we've found
// Do the same in reverse (drop any area calculated from equal "peaks." They will have been counted already and we don't want to count them twice)

// variables:
// bool counting
// int height
// int solidifiedTotal (the amount of area we've solidified as counting as area in our final solution)
// int runningTotal (the amount of area we are currently iterating through. May be dropped)

// 1. track forward (or backward) until we find a histogram bar. counting = true, set height = current elevation, start counting running total
// 2. at each step, if the elevation is less than int height, calculate the area at the step and add it to runningTotal
// 3. else if we hit a bar greater than or equal to height, stop counting and solidify the running total into solidifiedTotal (if bar === height, drop it if we are iterating backwards)
// 4. set height = current height and keep counting forward. DONT COUNT THE CURRENT STEP. There is no area here
// 5. If we are at the end of the graph, return runningTotal without including solidifiedTotal
// 6. Run the program backwards

// time complexity is o(n) n=histogram.length
// space complexity is o(n) (function calls on the stack)


// assuming the input is an array of heights
const volumeOfHistogram = (histogram) => {
    return recursiveCountForward(histogram) + recursiveCountBackward(histogram);
};

const recursiveCountForward = (histogram, index = 0, counting = false, height = 0, solidifiedTotal = 0, runningTotal = 0) => {
    if (index === histogram.length) {
        return solidifiedTotal;
    }

    if (!counting) {
        // should we be counting?
        if (histogram[index] > height) {
            // count starting at next step
            return recursiveCountForward(histogramm, index+1, true, histogram[index], solidifiedTotal);
        }
        // we are still not counting
        return recursiveCountForward(histogramm, index+1, false, histogram[index], solidifiedTotal);
    }
    // should we stop counting?
    if (height <= histogram[index]) {
        // solidify total
        solidifiedTotal += runningTotal;

        // keep counting
        return recursiveCountForward(histogram, index+1, true, histogram[index], solidifiedTotal);
    }
    // we are still counting, calculate the area and add it to running total
    runningTotal += height - histogram[index];
    return recursiveCountForward(histogram, index+1, true, height, solidifiedTotal, runningTotal);
};

const recursiveCountBackward = (histogram, index = histogram.length-1, counting = false, height = 0, solidifiedTotal = 0, runningTotal = 0) => {
    if (index < 0) {
        return solidifiedTotal;
    }

    if (!counting) {
        // should we be counting?
        if (histogram[index > height]) {
            // count starting at the next step
            return recursiveCountBackward(histogram, index-1, true, histogram[index], solidifiedTotal);
        }
        // we are still not counting
        return recursiveCountBackward(histogram, index-1, false, histogram[index], solidifiedTotal);
    }
    // should we stop counting?
    if (height <= histogram[index]) {
        // if it's the same, drop the running total. It will have already been counted when we counted forward
        if (height === histogram[index]) {
            runningTotal = 0;
        }

        // solidify total
        solidifiedTotal += runningTotal;

        // keep counting
        return recursiveCountBackward(histogram, index-1, true, histogram[index], solidifiedTotal);
    }
    // we are still counting, calculate the area and add it to running total
    runningTotal += height - histogram[index];
    return recursiveCountBackward(histogram, index-1, true, height, solidifiedTotal, runningTotal);
};

/*
TESTING using the example in the book
index   =   0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15
histogram = 0, 0, 4, 0, 0, 6, 0, 0, 3, 0, 5, 0, 1, 0, 0, 0
expected: 26

counting forward...
0 | index = 0; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
0 | index = 1; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
4 | index = 2; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
0 | index = 3; counting = true; height = 4; runningTotal = 4; solidifiedTotal = 0;
0 | index = 4; counting = true; height = 4; runningTotal = 8; solidifiedTotal = 0;
6 | index = 5; counting = true; height = 6; runningTotal = 0; solidifiedTotal = 8;
0 | index = 6; counting = true; height = 6; runningTotal = 6; solidifiedTotal = 8;
0 | index = 7; counting = true; height = 6; runningTotal = 12; solidifiedTotal = 8;
3 | index = 8; counting = true; height = 6; runningTotal = 15; solidifiedTotal = 8;
0 | index = 9; counting = true; height = 6; runningTotal = 21; solidifiedTotal = 8;
5 | index =10; counting = true; height = 6; runningTotal = 22; solidifiedTotal = 8;
0 | index =11; counting = true; height = 6; runningTotal = 28; solidifiedTotal = 8;
1 | index =12; counting = true; height = 6; runningTotal = 32; solidifiedTotal = 8;
0 | index =13; counting = true; height = 6; runningTotal = 38; solidifiedTotal = 8;
0 | index =14; counting = true; height = 6; runningTotal = 44; solidifiedTotal = 8;
0 | index =15; counting = true; height = 6; runningTotal = 50; solidifiedTotal = 8;
index === histogram.length, return 8

counting backward...
0 | index =15; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
0 | index =14; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
0 | index =13; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
1 | index =12; counting = false; height = 0; runningTotal = 0; solidifiedTotal = 0;
0 | index =11; counting = true; height = 1; runningTotal = 1; solidifiedTotal = 0;
5 | index =10; counting = true; height = 5; runningTotal = 0; solidifiedTotal = 1;
0 | index = 9; counting = true; height = 5; runningTotal = 5; solidifiedTotal = 1;
3 | index = 8; counting = true; height = 0; runningTotal = 7; solidifiedTotal = 1;
0 | index = 7; counting = true; height = 0; runningTotal = 12; solidifiedTotal = 1;
0 | index = 6; counting = true; height = 0; runningTotal = 17; solidifiedTotal = 1;
6 | index = 5; counting = true; height = 6; runningTotal = 0; solidifiedTotal = 18;
0 | index = 4; counting = true; height = 0; runningTotal = 6; solidifiedTotal = 18;
0 | index = 3; counting = true; height = 0; runningTotal = 12; solidifiedTotal = 18;
4 | index = 2; counting = true; height = 0; runningTotal = 14; solidifiedTotal = 18;
0 | index = 1; counting = true; height = 0; runningTotal = 20; solidifiedTotal = 18;
0 | index = 0; counting = true; height = 0; runningTotal = 26; solidifiedTotal = 18;
index < 0, return 18

driver function: return 8 + 18 (26)
PASSED!


Edge cases: 
Empty histogram will return 0, which is fine
A histogram with length 1 will also return 0, which is expected
A histogram with all cells as equal heights will also return 0

All pass!
*/

// solved and tested in exactly 45 minutes