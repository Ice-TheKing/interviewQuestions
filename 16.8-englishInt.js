/* QUESTION */
// Given any integer, print an English phrase that describes the integer

/* SOLUTION */
// check negative
// 1. convert first two digits (include the case where the tens place is zero)
// 2. hundreds
// repeat for each next 3 digits - append thousand, million, billion, trillion, etc.

// 1532
// one thousand, two hundred, thirty four

// -102,542
// negative one hundred two thousand, five hundred fourty two

// 100,000
// one hundred thousand

// 100,001
// one hundred thousand one

// 12
// twelve

// 4
// four


const englishInt = (n) => {
    if (!n || isNaN(Number(n))) {
        return '';
    }
    if (n === 0) { // the literal only time we say zero
        return 'zero';
    }
    
    let numArray = n.toString().split('');
    let word = '';

    // pull negative sign off
    if (n < 0) {
        numArray.shift();
    }

    let iterations = 0;
    while (numArray.length >= 3) {
        // first two digits
        let digit1 = numArray.pop();
        let digit2 = numArray.pop();
        // third digit
        let digit3 = numArray.pop();

        let suffix = englishOnesAndTens(Number(digit2), Number(digit1));
        let prefix = englishOnesAndTens(Number(digit3));

        // append 'hundred'/'thousand'
        let iterationWord = englishIterations(iterations);
        let hundred = '';
        if (prefix) {
            hundred = englishIterations(1);
        }

        let word = `${prefix}${hundred}${suffix}${iterationWord}${word}`;
        iterations++;
    }

    // numArray is 2 digits or less
    if (numArray.length === 2) {
        if (Number(numArray.join('')) < 20) {
            let iterationWord = englishIterations(iterations);
            word = `${convertOnesEnglish(`${numArray[1]}${numArray[0]}`)}${iterationWord}${word}`;
        } else {
            let digit1 = numArray.pop();
            let digit2 = numArray.pop();
            let suffix = englishOnesAndTens(Number(digit2), Number(digit1));

            let iterationWord = englishIterations(iterations);

            word = `${suffix}${iterationWord}${word}`;
        }
    } else if (numArray.length === 1) {
        let iterationWord = englishIterations(iterations);
        word = `${convertOnesEnglish(Number(numArray.pop()))}${iterationWord}${word}`;
    }

    // check negative
    if (n < 0) {
        word = `negative ${word}`;
    }

    return word;
};

const englishOnesAndTens = (tens, ones) => {
    let word = '';
    if (!tens && !ones) {
        return word;
    } else if (!tens) {
        word = convertOnesEnglish(ones);
        return word;
    } else if (tens < 2) {
        word = covertOnesEnglish(Number(`${tens}${ones}`));
        // word = 'nineteen'
        return word;
    } else if (ones === 0) {
        // 20 == 'twenty' not 'twenty zero'
        // TODO: Remove, changed this in convertOnesEnglish
        word = convertTensEnglish(tens);
        return word;
    } else {
        let prefix = convertTensEnglish(tens);
        let suffix = convertOnesEnglish(ones);
        word = `${prefix} ${suffix}`
        return word;
    }
};

const englishIterations = (n) => {
    let word = '';
    switch (n) {
        case 0:
            break;
        case 1:
            english = 'hundred';
            break;
        case 2:
            english = 'thousand';
            break;
        case 3:
            english = 'million';
            break;
        case 4:
            english = 'billion';
            break;
        case 5:
            english = 'trillion';
            break;
        case 6:
            english = 'quadrillion';
            break;
        case 7:
            english = 'quintillion';
            break;
        case 8:
            english = 'sextillion';
            break;
        case 9:
            english = 'septillion';
            break;
    }
    return word;
};

const convertTensEnglish = (int) => {
    let english;
    switch(int) {
        case 2:
             english = 'twenty';
            break;
        case 3:
            english = 'thirty';
            break;
        case 4:
            english = 'fourty';
            break;
        case 5:
            english = 'fifty';
            break;
        case 6:
            english = 'sixty';
            break;
        case 7:
            english = 'seventy';
            break;
        case 8:
            english = 'eighty';
            break;
        case 9:
            english = 'ninety';
            break;
    }
    return english;
};

const covertOnesEnglish = (int) => {
    let english;
    switch(int) {
        case 0: // we never ever say zero
            break;
        case 1:
            english = 'one';
            break;
        case 2:
            english = 'two';
            break;
        case 3:
            english = 'three';
            break;
        case 4:
            english = 'four';
            break;
        case 5:
            english = 'five';
            break;
        case 6:
            english = 'six';
            break;
        case 7:
            english = 'seven';
            break;
        case 8:
            english = 'eight';
            break;
        case 9:
            english = 'nine';
            break;
        case 10:
            english = 'ten';
            break;
        case 11:
            english = 'eleven';
            break;
        case 12:
            english = 'twelve';
            break;
        case 13:
            english = 'thirteen';
            break;
        case 14:
            english = 'fourteen';
            break;
        case 15:
            english = 'fifteen';
            break;
        case 16:
            english = 'sixteen';
            break;
        case 17:
            english = 'seventeen';
            break;
        case 18:
            english = 'eighteen';
            break;
        case 19:
            english = 'nineteen';
            break;
    }

    return english;
};