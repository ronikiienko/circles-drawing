import {hexToHslArray} from '../utils';


export const translateBiasA = (biasA) => {
    return parseFloat((Math.pow(parseFloat(biasA) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasA) * 10;
};

export const translateBiasB = (biasB) => {
    return parseFloat((Math.pow(parseFloat(biasB) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasB) * 10;
};

export const getTranslatedLayerSettings = (rawSettings) => {
    // reused values
    const size = Math.pow(parseFloat(rawSettings.size.size) + 1, 7) * 2;
    const transp = parseFloat(rawSettings.color.transp);
    const blur = parseFloat(rawSettings.color.blur);
    const actualBlur = rawSettings.color.blurOn ? Math.pow(blur + 1, 4) - 1 : 0;
    return {
        size: {
            size: size,
            sizeRand: parseFloat(rawSettings.size.sizeRand) * size * 0.8,
        },
        number: {
            number: parseFloat(rawSettings.number.number),
        },
        shape: {
            shape: rawSettings.shape.shape,
            lineAngle: parseFloat(rawSettings.shape.lineAngle) * 360,
            lineAngleRand: parseFloat(rawSettings.shape.lineAngleRand),
            lineRatio: parseFloat(rawSettings.shape.lineRatio),
            lineRatioRand: parseFloat(rawSettings.shape.lineRatioRand),
            lineRounded: rawSettings.shape.lineRounded,
            lineLookToOn: rawSettings.shape.lineLookToOn,
            lineLookToX: rawSettings.shape.lineLookToX,
            lineLookToY: rawSettings.shape.lineLookToY,
        },
        position: {
            startX: parseFloat(rawSettings.position.startX),
            startY: parseFloat(rawSettings.position.startY),
            endX: parseFloat(rawSettings.position.endX),
            endY: parseFloat(rawSettings.position.endY),
            biasSpiralType: rawSettings.position.biasSpiralType,
            biasSpiralCustom: rawSettings.position.biasSpiralCustom,
            biasSpiralThickness: Math.trunc(Math.pow(parseFloat(rawSettings.position.biasSpiralThickness) + 1, 6)),
            biasSpiralDensity: Math.pow(parseFloat(rawSettings.position.biasSpiralDensity) + 1, 7),
            biasSpiralSpread: Math.pow(parseFloat(rawSettings.position.biasSpiralSpread) + 1, 7) - 1,
            biasSpiralAngleRand: parseFloat(rawSettings.position.biasSpiralAngleRand) * 5,
            biasSpiralMult: Math.pow(parseFloat(rawSettings.position.biasSpiralMult) * 20, 2.3) * 0.05,
            biasType: rawSettings.position.biasType,
            biasRadius: Math.pow(Math.pow(rawSettings.position.biasX - rawSettings.position.biasRadiusX, 2) + Math.pow(rawSettings.position.biasY - rawSettings.position.biasRadiusY, 2), 1 / 2),
            biasX: parseFloat(rawSettings.position.biasX),
            biasY: parseFloat(rawSettings.position.biasY),
            biasA: translateBiasA(rawSettings.position.biasA),
            biasB: translateBiasB(rawSettings.position.biasB),
            biasInf: parseFloat(rawSettings.position.biasInf),
        },
        color: {
            color: hexToHslArray(rawSettings.color.color),
            colorRand: Math.pow(parseFloat(rawSettings.color.colorRand) + 1, 5) * 5.6 - 1,
            transp: transp,
            transpRand: parseFloat(rawSettings.color.transpRand) * transp,
            glow: parseFloat(rawSettings.color.glow) * 100,
            overlayMode: rawSettings.color.overlayMode,
            blur: actualBlur,
            blurRand: Math.pow(parseFloat(rawSettings.color.blurRand) + 1, 3) - 1,
        },
    };
};

export const getTranslatedAppSettings = (rawSettings) => {
    return {
        waitInterval: Math.trunc(Math.pow(parseFloat(rawSettings.drawingSpeed) + 1, 10)),
        resolutionMult: rawSettings.resolutionMult,
    };
};

