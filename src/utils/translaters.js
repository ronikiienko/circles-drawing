import {createNoise2D} from 'simplex-noise';
import {biasSpiralTypes, biasTypes, modTypes, shapeTypes} from '../consts/sharedConsts';
import {
    clampValueToRange,
    getBiasedRandomNumber,
    getColorsWeightedSum,
    getPointByDistanceAndAngle,
    getVectorByTwoPoints,
    getWeightedSum,
    hexToHslArray,
    hslArrToHsl,
    turnDegreesToRadians,
} from './generalUtils';
import {perlinMod, radialMod, randomMod} from './mods';


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

export const getTranslatedLayerSettings = (rawSettings) => {
    // reused values
    const shape = rawSettings.shape.shape;
    let shapeAdjustedSizeMult;
    switch (shape) {
        case shapeTypes.circle:
        case shapeTypes.ellipse:
            shapeAdjustedSizeMult = 1;
            break;
        default:
            shapeAdjustedSizeMult = 2;
    }

    const transp = parseFloat(rawSettings.color.transp);
    const strokeTransp = parseFloat(rawSettings.color.strokeTransp);

    return {
        size: {
            size: getTranslatedSize(rawSettings.size.size) * shapeAdjustedSizeMult,
        },
        number: {
            number: Math.trunc(parseFloat(rawSettings.number.number)),
        },
        shape: {
            shape: shape,
            angle: parseFloat(rawSettings.shape.angle) * 360,
            angleRand: parseFloat(rawSettings.shape.angleRand),
            widthRatio: parseFloat(rawSettings.shape.widthRatio),
            widthRatioRand: parseFloat(rawSettings.shape.widthRatioRand),
            lookToOn: rawSettings.shape.lookToOn,
            lookToX: rawSettings.shape.lookToX,
            lookToY: rawSettings.shape.lookToY,
            rectRoundness: parseFloat(rawSettings.shape.rectRoundness),
            rectRoundnessRand: parseFloat(rawSettings.shape.rectRoundnessRand),
            customShape: rawSettings.shape.customShape,
            strokeOn: rawSettings.shape.strokeOn,
            strokeThickness: Math.pow(parseFloat(rawSettings.shape.strokeThickness), 2),
            fillOn: rawSettings.shape.fillOn,
            pixelShapeRes: parseFloat(rawSettings.shape.pixelShapeRes),
            pixelShape: rawSettings.shape.pixelShape,
        },
        mods: rawSettings.mods.map(mod => {
            return {
                type: mod.type,
                id: mod.id,
                perlin: mod.type === modTypes.perlin ? createNoise2D() : null,
                perlinZoom: Math.pow((1.0000001 - parseFloat(mod.perlinZoom)) / 5, 2),
                radialRadiusX: parseFloat(mod.radialRadiusX),
                radialRadiusY: parseFloat(mod.radialRadiusY),
                radialCenterX: parseFloat(mod.radialCenterX),
                radialCenterY: parseFloat(mod.radialCenterY),
                modA: getTranslatedModA(mod.modA),
                modB: getTranslatedModB(mod.modB),
                blendRatio: parseFloat(mod.blendRatio),
                outputs: {
                    size: {
                        enabled: mod.outputs.size.enabled,
                        val2: getTranslatedSize(mod.outputs.size.val2) * shapeAdjustedSizeMult,
                    },
                    color: {
                        enabled: mod.outputs.color.enabled,
                        val2: hexToHslArray(mod.outputs.color.val2),
                    },
                    strokeColor: {
                        enabled: mod.outputs.strokeColor.enabled,
                        val2: hexToHslArray(mod.outputs.strokeColor.val2),
                    },
                    transp: {
                        enabled: mod.outputs.transp.enabled,
                        val2: parseFloat(mod.outputs.transp.val2),
                    },
                    strokeTransp: {
                        enabled: mod.outputs.strokeTransp.enabled,
                        val2: parseFloat(mod.outputs.strokeTransp.val2),
                    },
                },
                modOutputs: mod.modOutputs.map(modOutput => {
                    return {
                        id: modOutput.id,
                    };
                }),
            };
        }) ?? [],
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
            biasA: getTranslatedBiasA(rawSettings.position.biasA),
            biasB: getTranslatedBiasB(rawSettings.position.biasB),
            biasInf: parseFloat(rawSettings.position.biasInf),
            biasRectXOn: rawSettings.position.biasRectXOn,
            biasRectYOn: rawSettings.position.biasRectYOn,
            gradOn: rawSettings.position.gradOn && rawSettings.position.biasType !== biasTypes.off,
            gradA: getTranslatedBiasA(rawSettings.position.gradA),
            gradB: getTranslatedBiasB(rawSettings.position.gradB),
            gradInf: parseFloat(rawSettings.position.gradInf),
        },
        color: {
            color: hexToHslArray(rawSettings.color.color),
            strokeColor: hexToHslArray(rawSettings.color.strokeColor),
            transp: transp,
            strokeTransp: strokeTransp,
            glow: parseFloat(rawSettings.color.glow) * 100,
            overlayMode: rawSettings.color.overlayMode,
            blurOn: rawSettings.color.blurOn,
            blur: Math.pow(parseFloat(rawSettings.color.blur) + 1, 4) - 1,
        },
        brush: {
            brushDensity: getTranslatedBrushDensity(rawSettings.brush.brushDensity),
            brushOn: rawSettings.brush.brushOn,
            brushX: rawSettings.brush.brushX,
            brushY: rawSettings.brush.brushY,
        },
    };
};

export const getTranslatedPixelShapeBrushSize = (pixelShapeBrushSize) => Math.trunc(parseFloat(pixelShapeBrushSize) * 8);
export const getTranslatedAppSettings = (rawSettings) => {
    return {
        waitInterval: Math.trunc(Math.pow(parseFloat(rawSettings.drawingSpeed) + 1, 10)),
        resolutionMult: rawSettings.resolutionMult,
        pixelShapeBrushSize: getTranslatedPixelShapeBrushSize(rawSettings.pixelShapeBrushSize),
    };
};

export const getRandomizedShapeSettings = (settings, i) => {
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
                settings.position.biasRectXOn ? {
                    bias: settings.position.biasX,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                } : undefined,
            );
            yPosition = getBiasedRandomNumber(
                settings.position.startY,
                settings.position.endY,
                0,
                settings.position.biasRectYOn ? {
                    bias: settings.position.biasY,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                } : undefined,
            );
        }
            break;
        case biasTypes.radial: {
            const angle = getBiasedRandomNumber(0, 360);

            const diapason = Math.pow(settings.position.biasRadius, 2);

            const distanceFromBias = Math.pow(
                getBiasedRandomNumber(
                    0,
                    diapason,
                    0,
                    {
                        bias: 0,
                        biasA: settings.position.biasA,
                        biasB: settings.position.biasB,
                        biasInf: settings.position.biasInf,
                    },
                ),
                1 / 2,
            );

            const [
                x,
                y,
            ] = getPointByDistanceAndAngle(
                realBiasX,
                realBiasY,
                distanceFromBias,
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
            let radius = getBiasedRandomNumber(distanceFromBias - settings.position.biasSpiralSpread, distanceFromBias + settings.position.biasSpiralSpread, 0, {
                bias: distanceFromBias,
                biasA: settings.position.biasA,
                biasB: settings.position.biasB,
                biasInf: settings.position.biasInf,
            });
            const [
                x,
                y,
            ] = getPointByDistanceAndAngle(realBiasX, realBiasY, radius, getBiasedRandomNumber(angle - settings.position.biasSpiralAngleRand, angle + settings.position.biasSpiralAngleRand, 2));
            xPosition = x;
            yPosition = y;
        }
    }

    let angle;
    if (settings.shape.lookToOn && settings.shape.shape !== shapeTypes.random3 && settings.shape.shape !== shapeTypes.random4 && settings.shape.shape !== shapeTypes.circle) {
        const [, lookToAngle] = getVectorByTwoPoints(xPosition, yPosition, settings.shape.lookToX, settings.shape.lookToY);
        angle = lookToAngle + settings.shape.angle;
    } else {
        angle = settings.shape.angle;
    }

    const modResultsTemp = {};
    const modResults = {};
    settings.mods.forEach((mod) => {
        // TODO launch this conditionaly (if no outputs not calculate)
        let value;
        switch (mod.type) {
            case modTypes.random:
                value = randomMod(mod);
                break;
            case modTypes.radial:
                value = radialMod(xPosition, yPosition, mod);
                break;
            case modTypes.perlin:
                value = perlinMod(xPosition, yPosition, mod);
        }
        modResultsTemp[mod.id] = value;
        modResults[mod.id] = value;
    });

    settings.mods.forEach(mod => {
        mod.modOutputs.forEach((output) => {
            modResults[output.id] *= modResultsTemp[mod.id];
        });
    });

    let sizeModsDeltas = [];
    let colorModsDeltas = [];
    let strokeColorModsDeltas = [];
    let transpModsDeltas = [];
    let strokeTranspModsDeltas = [];

    settings.mods?.forEach((mod) => {
        if (mod.outputs.size.enabled) {
            sizeModsDeltas.push([(mod.outputs.size.val2 - settings.size.size) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.color.enabled) {
            colorModsDeltas.push([
                [
                    (mod.outputs.color.val2[0] - settings.color.color[0]) * modResults[mod.id],
                    (mod.outputs.color.val2[1] - settings.color.color[1]) * modResults[mod.id],
                    (mod.outputs.color.val2[2] - settings.color.color[2]) * modResults[mod.id],

                ],
                modResults[mod.id] * mod.blendRatio,
            ]);
        }
        if (mod.outputs.transp.enabled) {
            transpModsDeltas.push([(mod.outputs.transp.val2 - settings.color.transp) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.strokeColor.enabled) {
            strokeColorModsDeltas.push([
                [
                    (mod.outputs.strokeColor.val2[0] - settings.color.strokeColor[0]) * modResults[mod.id],
                    (mod.outputs.strokeColor.val2[1] - settings.color.strokeColor[1]) * modResults[mod.id],
                    (mod.outputs.strokeColor.val2[2] - settings.color.strokeColor[2]) * modResults[mod.id],

                ],
                modResults[mod.id] * mod.blendRatio,
            ]);
        }
        if (mod.outputs.strokeTransp.enabled) {
            strokeTranspModsDeltas.push([(mod.outputs.strokeTransp.val2 - settings.color.strokeTransp) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
    });

    const sizeModsSum = getWeightedSum(...sizeModsDeltas) || 0;
    const colorModsSum = getColorsWeightedSum(...colorModsDeltas);
    const strokeColorModsSum = getColorsWeightedSum(...strokeColorModsDeltas);
    const transpModsSum = getWeightedSum(...transpModsDeltas);
    const strokeTranspModsSum = getWeightedSum(...strokeTranspModsDeltas);

    let size = settings.size.size + sizeModsSum;
    let blur = settings.color.blur;
    let transp = settings.color.transp + transpModsSum;
    let strokeTransp = settings.color.strokeTransp + strokeTranspModsSum;
    let color = hslArrToHsl([
        settings.color.color[0] + colorModsSum[0],
        settings.color.color[1] + colorModsSum[1],
        settings.color.color[2] + colorModsSum[2],
    ], transp);
    let strokeColor = hslArrToHsl([
        settings.color.strokeColor[0] + strokeColorModsSum[0],
        settings.color.strokeColor[1] + strokeColorModsSum[1],
        settings.color.strokeColor[2] + strokeColorModsSum[2],
    ], strokeTransp);

    const baseRectRoundness = size / 2 * settings.shape.rectRoundness;

    return {
        size: {
            size: size,
        },
        shape: {
            shape: settings.shape.shape,
            angle: angle + getBiasedRandomNumber(-10, 10) * (Math.pow(settings.shape.angleRand + 1, 3) - 1),
            widthRatio: clampValueToRange(0, 1, settings.shape.widthRatio + getBiasedRandomNumber(-1, 1, 2) * settings.shape.widthRatio * settings.shape.widthRatioRand),
            rectRoundness: baseRectRoundness + getBiasedRandomNumber(-1, 1, 2) * baseRectRoundness * settings.shape.rectRoundnessRand * 0.6,
            customShape: settings.shape.customShape,
            strokeOn: settings.shape.strokeOn,
            fillOn: settings.shape.fillOn,
            strokeThickness: settings.shape.strokeThickness,
            pixelShape: settings.shape.pixelShape,
        },
        position: {
            x: Math.floor(xPosition),
            y: Math.floor(yPosition),
        },
        color: {
            color: color,
            strokeColor: strokeColor,
            glow: settings.color.glow,
            blur: blur,
            blurOn: settings.color.blurOn,
        },
    };
};

