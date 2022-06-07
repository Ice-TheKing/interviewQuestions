/* QUESTION */
// Oh, no! You have accidentally removed all spaces, punctuation, and capitalization in a lengthy document. 
// A sentence like "I reset the computer. It still didn't boot!" became "iresetthecomputeritstilldidntboot". You'll deal with the punctuation and the capitalization later;
// right now you need to re-insert the spaces. Most of the words are in a dictionary but a few are not. Given a dictionary (a list of strings) and the document (a string),
// design an algorithm to unconcatenate the document in a way that minimizes the number of unrecognized characters.

/* EXAMPLE */
// input: jesslookedjustliketimherbrother
// output: -jess- looked just like -tim- her brother (7 unrecognized characters)

/* SOLUTION */
// make a map keyed by the first characters of each word in the dictionary. The value is an array of all characters that start with that character
// sort all keys' arrays in descending order of length, so longer words will be tried first
// iterate through the doc (recursively)
// at each character, check if the current character is in the dictionary.
// If it is, check to see if any of the words at that character match
    // if we get a match, add a space before the word if there is none, then add a space after the word. Continue recursing 
// If it's not, keep iterating on the next character

// time: o(m^2 * n + n log n) because we are stepping through m chars, and for each char, we check for a match which takes m*n time...
// ...because we check n elements from the dictionary, and splice the doc for each element which takes m time
// n log n because we sort the map we create from the dictionary words

// space: o(m+n)

const reSpace = (doc, dictionary) => {
    // o(n) space. n = strings in dictionary
    let map = createMapOfChars(dictionary);

    // create an array from doc. o(m) space, m = doc.length
    let docArray = doc.split('');

    // step through the array o(m) time
    let result = reSpaceRecurse(doc, map);

    return result.join('');
};

const reSpaceRecurse = (doc, map, index = 0, prevUnrecognized = false) => {
    // are we done?
    if (index >= doc.length) {
        return doc;
    }

    let char = doc.charAt(index);

    // is the current char in our map?
    if (map.has(char)) {
        // check for a match
        let match = findCharMatch(doc, index, map.get(char)); // o(n*m)
        if (match) {
            // add a space before if the previous string was unrecognized. No need to check if index === 0, prevUnrecognized won't = true on index 0
            if (prevUnrecognized) {
                doc.splice(index-1, 0, ' ');
            }
            // add a space after word
            index += match.length;
            doc.splice(index, 0, ' ');
            // continue
            return reSpaceRecurse(doc, map, index+1, false);
        }
    }

    // no match. Continue on and make sure the call knows we previously hit an unrecognzied char
    return reSpaceRecurse(doc, map, index+1, true);
};

// o(n) to add all elements to the map, o(n log n) to sort them all by length. n = strings in the dictionary
const createMapOfChars = (dictionary) => {
    let map = new Map();

    for (let i = 0; i < dictionary.length; i++) {
        // assuming valid input. AKA, assuming all elements in dictionary are non empty strings (even if the string is one character long)
        let char = dictionary[i].charAt(0);
        addToMap(map, char, dictionary[i]);
    }

    // sort arrays at each key in descending order of length
    for (let [key, value] of map) {
        value.sort((a,b) => {
            return b.length - a.length;
        });
    }

    return map;
};

const findCharMatch = (doc, index, matches) => {
    for (let word of matches) { // o(n) where n = strings in dictionary
        if ( word === doc.slice(index, index + word.length).join('') ) { // o(m) where m = doc.length
            // match
            return word;
        }
    }

    return null;
};

const addToMap = (map, key, val) => {
    if (!map.has(key)) {
        map.set(key, []);
    }

    map.set(key, map.get(key).push(val));
};