export const biasTanhFunction = (x, biasInf, biasA, biasB) => {
    return Math.tanh(Math.pow(x, 1 / biasB) * biasA) * biasInf;
};

export const getBiasedRandomNumber = (min, max, decimals = 0, biasSettings) => {
    const precision = Math.pow(10, decimals);
    const randomNumber = Math.floor(Math.random() * (max * precision - min * precision + 1) + min * precision) / precision;
    if (!biasSettings) return randomNumber;
    const {bias, biasInf, biasA, biasB} = biasSettings;
    const randomMix = Math.random();
    const mix = biasTanhFunction(randomMix, biasInf, biasA, biasB);
    return randomNumber * (1 - mix) + bias * mix;
};

/**
 * Both, magnitude and angle require array of 2 - 4 properties. 1 - minVal 2 - maxVal 3 - decimalsNum 4 - biasSettings
 * @param magnitude
 * @param angle
 */

export const getRandomVector = (magnitude, angle) => {
    const randomAngle = getBiasedRandomNumber(angle[0], angle[1], angle[2], angle[3]);
    const randomMagnitude = getBiasedRandomNumber(magnitude[0], magnitude[1], magnitude[2], magnitude[3]);
    return [randomMagnitude, randomAngle];
};

export const getPointByDistanceAndAngle = (fromX, fromY, distance, angle) => {
    const angleRad = turnDegreesToRadians(angle);
    const x = fromX + Math.cos(angleRad) * distance;
    const y = fromY + Math.sin(angleRad) * distance;
    return [x, y];
};

export const getVectorByTwoPoints = (lookFromX, lookFromY, lookToX, lookToY) => {
    const xOffset = lookToX - lookFromX;
    const yOffset = lookToY - lookFromY;
    const angle = turnRadiansToDegrees(Math.atan2(yOffset, xOffset));
    const magnitude = Math.sqrt(Math.pow(xOffset, 2) + Math.pow(yOffset, 2));
    return [magnitude, angle];
};

export const hexToRgbArray = (hex) => {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
};
export const hexToHslArray = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h;
    let s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return [h, s, l];
};


export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}).join('');

export const wait = (ms) => new Promise(resolve => setTimeout(() => {
    resolve();
}, ms));

export const turnDegreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

export const turnRadiansToDegrees = (radians) => {
    return radians * 180 / Math.PI;
};

/**
 * The side you need to know should be falsy
 */
export const calculateByPythagoreanTheorem = (a, b, c) => {
    if (!c) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    if (!b) {
        return Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    }
    if (!a) {
        return Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
    }
};

export const getItemFromStorage = (itemName) => {
    try {
        return JSON.parse(window.localStorage.getItem(itemName));
    } catch (e) {
        console.log(e, 'b');
        return undefined;
    }
};

export const setItemToStorage = (itemName, itemData) => {
    try {
        let stringToSave = JSON.stringify(itemData);
        return window.localStorage.setItem(itemName, stringToSave);
    } catch (e) {
        return undefined;
    }
};

export const clampValueToRange = (min, max, value) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

export const parseJSON = (value) => {
    return value === 'undefined' ? undefined : JSON.parse(value);
};

export const deepCopy = (value) => {
    try {
        return JSON.parse(JSON.stringify(value));
    } catch (e) {
        return undefined;
    }
};

/**
 *
 * @param value
 * @returns {"undefined"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"|string|"array"}
 */
export const typeofWithArray = (value) => {
    let typeOf = typeof value;
    if (typeOf === 'object') {
        typeOf = Array.isArray(value) ? 'array' : 'object';
    }
    return typeOf;
};

export const setObjectPropertyByStringPath = (objectToChange, path, newValue, splitter = '-') => {
    let schema = objectToChange; // a moving reference to internal objects within obj
    const pList = path.split(splitter);
    for (let i = 0; i < pList.length - 1; i++) {
        const elem = pList[i];
        if (!schema[elem]) schema[elem] = {};
        schema = schema[elem];
    }
    schema[pList[pList.length - 1]] = newValue;
};