/* QUESTION */
// Write a method to shuffle a deck of cards. It must be a perfect shuffle - in other words, each of the 52! permutations of the deck has to be equally likely. 
// Assume that you are given a random number generator which is perfect

/* SOLUTION */
// start inclusive, end exclusive
const rng = (start, end) => { /*...*/ };


// at each step, pick a random card remaining and add it to the new shuffled deck
// o(n) time, o(n) space
const shuffle = (deck) => {
    let newDeck = [];

    return recursiveShuffle(deck, newDeck);
};

const recursiveShuffle = (deck, newDeck) => {
    if (deck.length === 0) {
        return newDeck;
    }

    // generate from 0 to length of deck. Append that card to new deck
    let card = rng(0, deck.length);
    newDeck.push(deck.splice(card, 1));

    return recursiveShuffle(deck, newDeck);
};


// shuffle in place
// o(n) time, o(1) space
const shuffleInPlace = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        // swap card for any card before it (including the spot it's already at)
        let place = rng(0, i+1);
        
        let temp = deck[i];
        deck[i] = deck[place];
        deck[place] = temp;
    }
};