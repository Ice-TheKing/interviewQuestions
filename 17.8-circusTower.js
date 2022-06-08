/* QUESTION */
// A circus is designing a tower routine consisting of people standing atop one another's shoulders. For practical and aesthetic reasons, each person must be both shorter and lighter
// than the person below them. Given the heights and weights of each person in the circus, write a method to compute the largest possible number of people in such a tower.

/* EXAMPLE */
// input (ht, wt): (65, 100) (70, 150) (56, 90) (75, 190) (60, 95) (68, 110)
// output: the longest tower is length 6 and includes from top to bottom:
// (56, 90) (60, 95) (65, 100) (68, 110) (70, 150) (75, 190)

/* SOLUTION */
// first we can sort the people by height or weight - doesn't matter which one. This ensures we only checking people with the potential to stand on someone else's shoulders.
// check each contestant with each contestant it could potentially stand on. If it can stand on one, set it's tallest height to 1+the height of whatever it's standing on's tallest possible height. 
// finally, find the talest possible height and return that sequence

const circusTower = (people) => {
    // sort by height in descending order
    let sortedPeople = people.sort((a, b) => { return b[0]-a[0] }); // n log n
    let tallestStack = []; // [ [height, index], [height, index] ]

    // check each person to see what the tallest person they could stand on is
    for (let i = 0; i < people.length; i++) {
        let tallestStackHeight = 0; // base case: stands on it's own. height = 1
        let index = i;
        // can this person
        for (let j = 0; j < i; j++) {
            // stand on this person?
            let myHeight = sortedPeople[i][0];
            let myWeight = sortedPeople[i][1];
            let theirHeight = sortedPeople[j][0];
            let theirWeight = sortedPeople[j][1];

            if (myHeight < theirHeight && myWeight < theirWeight) {
                let theirStackHeight = tallestStack[j];
                if (theirStackHeight > tallestStackHeight) {
                    tallestStackHeight = theirStackHeight;
                    index = j;
                }
            }
        }

        tallestStack.push([tallestStackHeight+1, index]);
    }

    let tallestIndex = 0;
    let tallestHeight = 0;
    // search for the tallest stack
    for (let i = 0; i < tallestStack.length; i++) {
        if (tallest[i][0] > tallestHeight) {
            tallestHeight = tallest[i][0];
            tallestIndex = tallest[i][1];
        }
    }

    // rebuild tallest stack from top to bottom
    return assembleStack([], tallestIndex, people, tallestStack);
};

const assembleStack = (stack, index, people, tallestStack) => {
    let nextIndex = tallestStack[index][1];
    
    stack.push(people[index]);

    // if this person is standing on themselves, they are the bottom of the stack
    if (index === nextIndex) {
        return stack;
    }

    // recurse
    return assembleStack(stack, newIndex, people, tallestStack);
};


//    0        1         2         3        4          5
// (75, 190) (70, 150) (68, 110) (65, 100) (60, 95) (56, 90)   // <peopleList>
//[ [ 1,0 ]   [ 2,0 ]   [ 3,1 ]   [ 4,2 ]   [ 5,3 ]  [ 6,4 ] ] // <tallestStack> height, index
// i = 3
// j = 2
// tallestHeight = 2
// index = 2

// what is the tallestIndex?
// tallestIndex is 5 with a height of 6

// return assembleStack = ([(56, 90)], 5, <peopleList>, <tallestStack> );
// return assembleStack = ([(56, 90), (60, 95)], 4, <peopleList>, <tallestStack> );
// return assembleStack = ([(56, 90), (60, 95), (65, 100)], 3, <peopleList>, <tallestStack> );
// return assembleStack = ([(56, 90), (60, 95), (65, 100), (68, 110)], 2, <peopleList>, <tallestStack> );
// return assembleStack = ([(56, 90), (60, 95), (65, 100), (68, 110), (70, 150)], 1, <peopleList>, <tallestStack> );
// return assembleStack = ([(56, 90), (60, 95), (65, 100), (68, 110), (70, 150), (75, 190)], 0, <peopleList>, <tallestStack> );
// return [(56, 90), (60, 95), (65, 100), (68, 110), (70, 150), (75, 190)]