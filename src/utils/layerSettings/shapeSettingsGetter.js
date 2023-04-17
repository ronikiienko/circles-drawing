import {biasSpiralTypes, biasTypes, modTypes, shapeTypes} from '../../consts/sharedConsts';
import {
    getBiasedRandomNumber,
    getColorsWeightedSum,
    getPointByDistanceAndAngle,
    getVectorByTwoPoints,
    getWeightedSum,
    hslArrToHsl,
    turnDegreesToRadians,
} from '../generalUtils';
import {perlinMod, radialMod, randomMod} from './mods';


export const getRandomizedShapeSettings = (settings, i) => {
    let xPosition;
    let yPosition;
    const realBiasX = settings.brush.brushOn ? settings.brush.brushPos.x : settings.position.biasPos.x;
    const realBiasY = settings.brush.brushOn ? settings.brush.brushPos.y : settings.position.biasPos.y;
    switch (settings.position.biasType) {
        case biasTypes.off: {
            xPosition = getBiasedRandomNumber(settings.position.startPos.x, settings.position.endPos.x);
            yPosition = getBiasedRandomNumber(settings.position.startPos.y, settings.position.endPos.y);
        }
            break;
        case biasTypes.rectangular: {
            xPosition = getBiasedRandomNumber(
                settings.position.startPos.x,
                settings.position.endPos.x,
                0,
                settings.position.biasRectXOn ? {
                    bias: settings.position.biasPos.x,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                } : undefined,
            );
            yPosition = getBiasedRandomNumber(
                settings.position.startPos.y,
                settings.position.endPos.y,
                0,
                settings.position.biasRectYOn ? {
                    bias: settings.position.biasPos.y,
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
        const [, lookToAngle] = getVectorByTwoPoints(xPosition, yPosition, settings.shape.lookToPos.x, settings.shape.lookToPos.y);
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
    let blurModsDeltas = [];
    let widthRatioModsDeltas = [];
    let rectRoundnessModsDeltas = [];
    let angleModsDeltas = [];

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
        if (mod.outputs.blur.enabled) {
            blurModsDeltas.push([(mod.outputs.blur.val2 - settings.color.blur) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.widthRatio.enabled) {
            widthRatioModsDeltas.push([(mod.outputs.widthRatio.val2 - settings.shape.widthRatio) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.rectRoundness.enabled) {
            rectRoundnessModsDeltas.push([(mod.outputs.rectRoundness.val2 - settings.shape.rectRoundness) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.angle.enabled) {
            angleModsDeltas.push([(mod.outputs.angle.val2 - settings.shape.angle) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
    });

    const sizeModsSum = getWeightedSum(...sizeModsDeltas) || 0;
    const colorModsSum = getColorsWeightedSum(...colorModsDeltas);
    const strokeColorModsSum = getColorsWeightedSum(...strokeColorModsDeltas);
    const transpModsSum = getWeightedSum(...transpModsDeltas);
    const strokeTranspModsSum = getWeightedSum(...strokeTranspModsDeltas);
    const blurModsSum = getWeightedSum(...blurModsDeltas);
    const widthRatioModsSum = getWeightedSum(...widthRatioModsDeltas);
    const rectRoundnessModsSum = getWeightedSum(...rectRoundnessModsDeltas);
    const angleModsSum = getWeightedSum(...angleModsDeltas);

    let widthRatio = settings.shape.widthRatio + widthRatioModsSum;
    let rectRoundness = settings.shape.rectRoundness + rectRoundnessModsSum;
    let size = settings.size.size + sizeModsSum;
    let blur = settings.color.blur + blurModsSum;
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
    angle = angle + settings.shape.angle + angleModsSum;

    return {
        size: {
            size: size,
        },
        shape: {
            shape: settings.shape.shape,
            angle: angle,
            widthRatio: widthRatio,
            rectRoundness: rectRoundness,
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