import {biasSpiralTypes, biasTypes} from '../consts/sharedConsts';
import {
    getBiasedRandomNumber,
    getPointByDistanceAndAngle,
    hexToHslArray,
    turnDegreesToRadians,
    turnRadiansToDegrees,
} from '../utils';


export const translateBiasA = (biasA) => {
    return parseFloat((Math.pow(parseFloat(biasA) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasA) * 10;
};

export const translateBiasB = (biasB) => {
    return parseFloat((Math.pow(parseFloat(biasB) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasB) * 10;
};

export const getTranslatedBrushDensity = (brushDensity) => {
    return Math.trunc(Math.pow(parseFloat(brushDensity) + 1, 5));
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
        brush: {
            brushDensity: getTranslatedBrushDensity(rawSettings.brush.brushDensity),
            brushOn: rawSettings.brush.brushOn,
            brushX: rawSettings.brush.brushX,
            brushY: rawSettings.brush.brushY,
        },
    };
};

export const getTranslatedAppSettings = (rawSettings) => {
    return {
        waitInterval: Math.trunc(Math.pow(parseFloat(rawSettings.drawingSpeed) + 1, 10)),
        resolutionMult: rawSettings.resolutionMult,
    };
};

export const getRandomizedShapeSettings = (settings, i) => {
    let color;
    const transp = settings.color.transp + getBiasedRandomNumber(-settings.color.transpRand, settings.color.transpRand, 2);
    const blur = !settings.color.blur ? 0 : settings.color.blur + getBiasedRandomNumber(-settings.color.blurRand, settings.color.blurRand);
    let xPosition;
    let yPosition;
    const realBiasX = settings.brush.brushOn ? settings.brush.brushX : settings.position.biasX;
    const realBiasY = settings.brush.brushOn ? settings.brush.brushY : settings.position.biasY;
    switch (settings.position.biasType) {
        case biasTypes.off: {
            xPosition = getBiasedRandomNumber(settings.position.startX, settings.position.endX);
            yPosition = getBiasedRandomNumber(settings.position.startY, settings.position.endY);
        }
            break;
        case biasTypes.rectangular: {
            xPosition = getBiasedRandomNumber(
                settings.position.startX,
                settings.position.endX,
                0,
                {
                    bias: settings.position.biasX,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                },
            );
            yPosition = getBiasedRandomNumber(
                settings.position.startY,
                settings.position.endY,
                0,
                {
                    bias: settings.position.biasY,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                },
            );
        }
            break;
        case biasTypes.radial: {
            const angle = getBiasedRandomNumber(0, 360);

            const diapason = Math.pow(settings.position.biasRadius, 2);

            const distanceFromBias = getBiasedRandomNumber(
                0,
                diapason,
                0,
                {
                    bias: 0,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                    biasInf: settings.position.biasInf,
                },
            );
            const {
                x,
                y,
            } = getPointByDistanceAndAngle(
                realBiasX,
                realBiasY,
                Math.pow(distanceFromBias, 1 / 2),
                angle,
            );
            xPosition = x;
            yPosition = y;
        }
            break;
        case biasTypes.spiral: {
            const spinI = Math.trunc(i / settings.position.biasSpiralThickness);
            const angle = spinI * settings.position.biasSpiralDensity;
            const angleRad = turnDegreesToRadians(angle);

            let distanceFromBias;
            switch (settings.position.biasSpiralType) {
                case biasSpiralTypes.basic: {
                    distanceFromBias = Math.pow(angleRad, 1);
                }
                    break;
                case biasSpiralTypes.fourLeaf: {
                    distanceFromBias = angleRad * Math.sin(angleRad * 2);
                }
                    break;
                case biasSpiralTypes.reducing: {
                    distanceFromBias = Math.pow(angleRad, 1 / 2) * 20;
                }
                    break;
                case biasSpiralTypes.circles: {
                    distanceFromBias = angleRad * 4 * Math.cos(Math.pow(angleRad, 1 / 1.2));
                }
                    break;
                case biasSpiralTypes.custom: {
                    try {
                        distanceFromBias = eval(String(settings.position.biasSpiralCustom));
                    } catch (e) {
                        distanceFromBias = 0;
                    }
                }
            }
            distanceFromBias = distanceFromBias * settings.position.biasSpiralMult;
            for (let j = 0; j < settings.position.biasSpiralThickness; j++) {
                let radius = getBiasedRandomNumber(distanceFromBias - settings.position.biasSpiralSpread, distanceFromBias + settings.position.biasSpiralSpread, 0, {
                    bias: distanceFromBias,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                    biasInf: settings.position.biasInf,
                });
                const {
                    x,
                    y,
                } = getPointByDistanceAndAngle(realBiasX, realBiasY, radius, getBiasedRandomNumber(angle - settings.position.biasSpiralAngleRand, angle + settings.position.biasSpiralAngleRand, 2));
                xPosition = x;
                yPosition = y;
            }
        }
    }


    let lineAngle;
    if (settings.shape.lineLookToOn) {
        const lookToXOffset = settings.shape.lineLookToX - xPosition;
        const lookToYOffset = settings.shape.lineLookToY - yPosition;
        lineAngle = turnRadiansToDegrees(Math.atan(lookToYOffset / lookToXOffset));
    } else {
        lineAngle = settings.shape.lineAngle;
    }

    color = `hsla(
                ${(settings.color.color[0] + getBiasedRandomNumber(-settings.color.colorRand, settings.color.colorRand, 1)) % 360},
                ${settings.color.color[1]}%,
                ${settings.color.color[2]}%,
                ${transp}
            )`;
    return {
        size: {
            size: settings.size.size + getBiasedRandomNumber(-settings.size.sizeRand, settings.size.sizeRand, 2),
        },
        shape: {
            shape: settings.shape.shape,
            lineAngle: lineAngle + getBiasedRandomNumber(-10, 10) * (Math.pow(settings.shape.lineAngleRand + 1, 3) - 1),
            lineRatio: settings.shape.lineRatio + getBiasedRandomNumber(-1, 1) * 0.2 * settings.shape.lineRatioRand,
            lineRounded: settings.shape.lineRounded,
        },
        position: {
            x: Math.floor(xPosition),
            y: Math.floor(yPosition),
        },
        color: {
            color: color,
            glow: settings.color.glow,
            blur: blur,
        },
    };
};

