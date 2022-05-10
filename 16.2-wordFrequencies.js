/* QUESTION */
// Design a method to find the frequency of occurrences of any given word in a book. What if we were running this algorithm multiple times?

/* SOLUTION */
// go through the entire book, and increase counter each time the word is found. o(n) where n = the number of words in the book

const wordFrequencies = (book, word) => {
    let counter = 0;
    for (let i = 0; i < book.length; i++) {
        if (book[i] === word) {
            counter++;
        }
    }
    return counter;
};



// follow up: What if we were running this algorithm multiple times?
// create a hash map of words and frequencies

const wordFrequencies = (book, word) => {
    let map = new Map();
    for (let i = 0; i < book.length; i++) {
        if (!map.has(book[i])) {
            map.set(book[i], 1);
        }
        map.set(book[i], map.get(book[i])+1 );
    }

    return getWordFrequency(map, word);
};

const getWordFrequency = (map, word) => {
    if (!map.has(word)) {
        return 0;
    }

    return map.get(word);
};