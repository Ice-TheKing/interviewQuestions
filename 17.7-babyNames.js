/* QUESTION */
// Each year, the government releases a list of the 10000 most common baby names and their frequencies (the number of babies with that name).
// The only problem with this is that some names have multiple spellings. For example, "John" and "Jon" are essentially the same name but would be listed separately in the list.
// Given two lists, one of names/frequencies and the other of pairs of equivalent names, write an algorithm to print a new list of the true frequency of each name.
// Note that if John and Jon are synonyms, and Jon and Johnny are synonyms, then John and Johnny are synonyms. (It is both transitive and symmetric.)
// In the final list, any name can be used as the "real" name.

/* SOLUTION */
// 1: build a map of synonyms (keyed with all the names, with ONE shared name as the value)
// 2: count names based on the map of synonyms. Make a second map for the counts of each synonym.
// 3: return the final list

// 1: build a map of synonyms
// for each synyonym, check the map of synonyms for BOTH names
    // if both are in the map and their object.name is different, pick the first one's mapped object's name, and set the second one's object's mapped name to the same object
    // if one is in the map, map whichever is not mapped already to the value of the name
    // else pick one and map them both with the same name as the value (two keys, same value)

// 2: count names based on the map of synonyms
    // make a new map for counts
    // for each name, check the synyonyms map and increment the name in count map by synyonym map's value

const babyNames = (names, pairs) => {
    let synonymMap = buildAdjacencyMap(pairs);
    let countMap = new Map();

    for (let i = 0; i < names.length; i++) {
        let name = names[i][0];
        let count = names[i][1];
        incrementMapValue(synonymMap.get(name), count, countMap);
    }

    let babyNamesCount = [];

    for (let [key, value] of countMap) {
        babyNamesList.push(`${key}: ${value}`);
    }

    return babyNamesCount;
};

const buildAdjacencyMap = (pairs) => {
    let synonymMap = new Map();

    // for each pair of synyonym, check the map of synonyms for BOTH names
    for (let i = 0; i < pairs.length; i++) {
        let name1 = pairs[i][0];
        let name2 = pairs[i][1];
        let list1 = synonymMap.get(pairs[i][0]);
        let list2 = synonymMap.get(pairs[i][1]);

        if (!list1 && !list2) {
            // neither exists. Set them both to the same name obj
            let namesList = [name1, name2];

            synonymMap.set(name1, namesList);
            synonymMap.set(name2, namesList);
        } else if (!list1 || !list2) {
            // one exists but not the other
            let namesList = list1 || list2; // set nameObj to whichever one has the name obj

            namesList.push(list1 ? name1 : name2);

            synonymMap.set(name1, namesList);
            synonymMap.set(name2, namesList);
        } else if (list1 !== list2) {
            // both exist, but are not the same, so we have a transitive collision
            // merge the two lists
            combineLists(map, list1, list2);
        }
        // only other condition is, they are both in the map and both already mapped to the same name in which case we don't need to do anything
    }

    // set all values to the first element in their list (since the shared arrays are identical, we'll get the same name from each similarity list)
    for (let val of synonymMap.values()) {
        val = val[0];
    }

    return synonymMap;
};

const combineLists = (map, list1, list2) => {
    let combination = [...list1, ...list2];

    for (let i = 0; i < list1.length; i++) {
        map.set(list1[i], combination);
    }
    for (let i = 0; i < list2.length; i++) {
        map.set(list2[i], combination);
    }
};

const incrementMapValue = (name, count, map) => {
    // if val doesn't exist, create it
    if (!map.has(name)) {
        map.set(name, 0);
    }

    // incremenet value
    map.set(value, map.get(value)+count);
};