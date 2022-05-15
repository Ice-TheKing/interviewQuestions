/* QUESTION */
// Given a list of people with their birth and death years, implement a method to compute the year with the most number of people alive.
// You may assume that all people were born between 1900 and 2000 (inclusive). 
// If a person was alive during any portion of that year, they should be included in that year's count. For example, Person (birth = 1908, death = 1909) is included in the count for both 1908 and 1909

/* SOLUTION */
// Brute force, make a hash map with each year and the count for how many were alive during that time. Iterate through hash map and return the largest
// o(n*y+m) time where n = each person, y = how long that person's been alive, m = each year accounted for, o(m) space

const livingPeople = (people) => {
    if (!people.length) {
        return null;
    }

    let map = yearsMap(people);

    let mostAlive = {};

    for (let entry of map) {
        let year = entry[0];
        let count = entry[1];
        if (!mostAlive.year || count > mostAlive.count) {
            mostAlive.count = count;
            mostAlive.year = year;
        };
    }

    return mostAlive.year;
};

const totalPeople = (people) => {
    let yearsMap = new Map();

    for (let i = 0; i < people.length; i++) {
        for (let j = people[i].birth; j < people[i].death; j++) {
            if (!yearsMap.get(i)) {
                yearsMap.set(i, 0);
            }
            yearsMap.set(i, yearsMap.get(i)+1);
        }
    }

    return yearsMap;
};

// optimize? Best we can do is o(n) time where n = num people or n = number of years

// sort by birth year.
// loop through people
// Store each person's death year in a map (key = year, value = sum of deaths). 
// Whenever next person's birth year will increment, tally up number of people alive that year. 
// If > currentGreatest, replaceCurrent greatest. 
// Then subtract deaths from that year, then check the next year

// n log n for sorting people. n for going through people.
// o (n log n) total
// o (m) space, where m = the total number of death years there are

const livingPeopleOptimized = (people) => {
    if (!people || people.length === 0) {
        return null;
    }

    sortByBirth(people);

    let mostAlive = {};
    let population = 0;

    let deathYearMap = new Map();

    let previousYear = people[0].birth;
    for (let i = 0; i < people.length; i++) {
        // have we gotten to a new year? If so, subtract deaths this year before incrementing to the new year
        if (people[i].birth !== previousYear) {
            let deaths = deathYearMap.get(previousYear);

            if (deaths) {
                population -= deaths;
            }

            // new year
            previousYear = people[i].birth;
        }

        // increment deaths at death year
        if(!deathYearMap.get(people[i].death)) {
            deathYearMap.set(people[i].death, 0);
        }
        deathYearMap.set(people[i], deathYearMap.get(people[i])+1);

        // increment population
        population++;

        if (!mostAlive.count || population > mostAlive.count) {
            mostAlive.count = population;
            mostAlive.year = people[i].year;
        }
    }

    return mostAlive.year;
};

const sortByBirth = (people) => {
    people.sort((a, b) => a.year - b.year);
};