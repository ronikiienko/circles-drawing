export const getTranslatedBiasA = (biasA) => {
    return parseFloat((Math.pow(parseFloat(biasA) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasA) * 10;
};
export const getTranslatedBiasB = (biasB) => {
    return parseFloat((Math.pow(parseFloat(biasB) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasB) * 10;
};
export const getTranslatedModA = (modA) => {
    return Math.pow(parseFloat(modA) + 1, 3) - 1;
};
export const getTranslatedModB = (modB) => {
    return Math.pow(parseFloat(modB) + 1, 3) - 1;
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
    return parseFloat(widthRatio);
};
export const getTranslatedRectRoundness = (rectRoundness) => {
    return parseFloat(rectRoundness);
};
export const getTranslatedAngle = (angle) => {
    return parseFloat(angle) * 360;
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
