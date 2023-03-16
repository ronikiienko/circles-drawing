export const generateRandomNumber = (min, max, decimals) => {
    const actualDecimals = decimals ? decimals : 0;
    const precision = Math.pow(10, actualDecimals);
    return Number(Math.floor(Math.random() * (max * precision - min * precision + 1) + min * precision) / precision);
};

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

    // const mix = randomMix * influence;
    // const mix = Math.pow(Math.random() < 0.1 ? 0 : Math.random() - 0.1, 1 / 2.2) * influence
    // const mix = (1 - Math.pow(Math.random(), influence * 5))
    // const mix = Math.pow(1 - Math.pow(rand - 1, 2), 1 / 2) * influence
};

export const hexToRgbArray = (hex) => {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
};

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