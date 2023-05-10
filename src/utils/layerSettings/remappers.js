import {noiseTypes} from '../../consts/sharedConsts';


export const getTranslatedBiasA = (biasA) => {
    return parseFloat((Math.pow(parseFloat(biasA) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasA) * 10;
};
export const getTranslatedBiasB = (biasB) => {
    return parseFloat((Math.pow(parseFloat(biasB) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasB) * 10;
};
export const getTranslatedBrushDensity = (brushDensity) => {
    return Math.trunc(Math.pow(parseFloat(brushDensity) + 1, 5));
};
export const getTranslatedSize = (size) => {
    return Math.pow(parseFloat(size) + 1, 7) * 2 - 1.9;
};
export const getTranslatedBlur = (blur) => {
    return Math.pow(parseFloat(blur) + 1, 4) - 1;
};
export const getTranslatedWidthRatio = (widthRatio) => {
    return Math.pow(parseFloat(widthRatio), 3);
};
export const getTranslatedRectRoundness = (rectRoundness) => {
    return parseFloat(rectRoundness);
};
export const getTranslatedAngle = (angle) => {
    return parseFloat(angle);
};

export const getAngle = (angle) => {
    return parseFloat(angle) / 360;
};

export const getTranslatedSineZoom = (zoom) => {
    return Math.pow(parseFloat(zoom) + 1, 9);
};

export const getTranslatedChessPlateDim = (chessPlateDim) => {
    return parseFloat(chessPlateDim);
    // return Math.trunc(Math.pow(parseFloat(chessPlateDim) + 1, 8))
};

export const getTranslatedNoiseZoom = (zoom, noiseType) => {
    switch (noiseType) {
        case noiseTypes.random.id:
            return parseFloat(zoom);
        case noiseTypes.perlin.id:
            return Math.pow((1.0000001 - parseFloat(zoom)) / 5, 2);
        case noiseTypes.value.id:
            return Math.pow((1.0000001 - parseFloat(zoom)) / 3, 2);
    }
};

export const getTranslatedPosOffset = (offset) => {
    return parseFloat(offset);
};

export const getTranslatedBranchesMagnitude = (branchesMagnitude) => {
    return Math.pow(parseFloat(branchesMagnitude) + 1, 4) * 6 - 5;
};
