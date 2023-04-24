import {biasSpiralTypes, biasTypes, modTypes, shapeTypes} from '../../consts/sharedConsts';
import {
    average,
    clampValueToRange,
    getBiasedRandomNumber,
    getColorsWeightedSum,
    getPointByDistanceAndAngle,
    getPosWeightedSum,
    getVectorByTwoPoints,
    getWeightedSum,
    hslArrToHsl,
    turnDegreesToRadians,
} from '../generalUtils';
import {indexMod, noiseMod, radialMod, trigMod} from './mods';


const defaultLast = {
    level: 0,
    x: 0,
    y: 0,
    direction: 0,
};
let last = {
    level: defaultLast.level,
    x: defaultLast.x,
    y: defaultLast.y,
    direction: defaultLast.direction,
};

export const getRandomizedShapeSettings = (settings, i) => {
    let isBranchElement = settings.position.branchesOn && settings.position.branchesLength >= last.level && last.level !== 0 && i !== 0;

    let xPosition;
    let yPosition;
    if (!isBranchElement) {
        const realBiasX = settings.brush.brushOn ? settings.brush.brushPos.x : settings.position.biasPos.x;
        const realBiasY = settings.brush.brushOn ? settings.brush.brushPos.y : settings.position.biasPos.y;
        switch (settings.position.biasType) {
            case biasTypes.off.id: {
                xPosition = getBiasedRandomNumber(settings.position.startPos.x, settings.position.endPos.x);
                yPosition = getBiasedRandomNumber(settings.position.startPos.y, settings.position.endPos.y);
            }
                break;
            case biasTypes.rectangular.id: {
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
            case biasTypes.radial.id: {
                const angle = getBiasedRandomNumber(0, 359);

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
            case biasTypes.spiral.id: {
                const spinI = Math.trunc(i / settings.position.biasSpiralThickness);
                const angle = spinI * settings.position.biasSpiralDensity;
                const angleRad = turnDegreesToRadians(angle);

                let distanceFromBias;

                switch (settings.position.biasSpiralType) {
                    case biasSpiralTypes.basic.id: {
                        distanceFromBias = Math.pow(angleRad, 1);
                    }
                        break;
                    case biasSpiralTypes.fourLeaf.id: {
                        distanceFromBias = angleRad * Math.sin(angleRad * 2);
                    }
                        break;
                    case biasSpiralTypes.reducing.id: {
                        distanceFromBias = Math.pow(angleRad, 1 / 2) * 20;
                    }
                        break;
                    case biasSpiralTypes.circles.id: {
                        distanceFromBias = angleRad * 4 * Math.cos(Math.pow(angleRad, 1 / 1.2));
                    }
                        break;
                    case biasSpiralTypes.custom.id: {
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
                break;
            case biasTypes.chessPlate.id: {
                const fieldWidth = settings.position.endPos.x - settings.position.startPos.x;
                const fieldHeight = settings.position.endPos.y - settings.position.startPos.y;
                // TODO maby replace Math.trunc with Math.floor everywhere
                const rowIndex = Math.trunc(i / settings.position.chessPlateWidth);
                const colIndex = Math.trunc(i - rowIndex * settings.position.chessPlateWidth);
                const xDistance = fieldWidth / (settings.position.chessPlateWidth - 1);
                const yDistance = fieldHeight / (settings.position.chessPlateHeight - 1);
                xPosition = xDistance * colIndex + settings.position.startPos.x;
                yPosition = yDistance * rowIndex + settings.position.startPos.y;
            }
        }
        if (settings.position.branchesOn && settings.position.branchesLength > 0) {
            last = {
                level: 1,
                x: xPosition,
                y: yPosition,
                direction: getBiasedRandomNumber(0, 355),
            };
        }
    } else {
        xPosition = last.x;
        yPosition = last.y;
    }


    const modResultsTemp = {};
    const modResults = {};
    settings.mods.forEach((mod) => {
        // TODO launch this conditionaly (if no outputs not calculate)
        // TODO if for example angle mod is on, but shape is circle, not calculate it
        let value;
        switch (mod.type) {
            case modTypes.radial.id:
                value = radialMod(xPosition, yPosition, mod);
                break;
            case modTypes.noise.id:
                value = noiseMod(xPosition, yPosition, mod);
                break;
            case modTypes.index.id:
                value = indexMod(i, settings.number.number, mod);
                break;
            case modTypes.trig.id:
                value = trigMod(xPosition, yPosition, mod);
                break;
        }
        value = clampValueToRange(0, 1, value);
        modResultsTemp[mod.id] = value;
        modResults[mod.id] = value;
    });
    settings.mods.forEach(mod => {
        mod.modOutputs.forEach((output) => {
            const affectAmount = (modResults[output.id] * modResultsTemp[mod.id] - modResults[output.id]) * output.mult;
            modResults[output.id] = clampValueToRange(0, 1, modResults[output.id] + affectAmount);
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
    let lookToModsDeltas = [];
    let xOffsetModsDeltas = [];
    let yOffsetModsDeltas = [];
    let branchesMagnitudeModsDeltas = [];
    let branchesDirectionModsDeltas = [];

    let lookToModsValues = [];

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
        if (mod.outputs.lookTo.enabled) {
            lookToModsDeltas.push([{
                x: mod.outputs.lookTo.val2.x,
                y: mod.outputs.lookTo.val2.y,
            }, modResults[mod.id] * mod.blendRatio]);
            lookToModsValues.push(modResults[mod.id]);
        }
        if (mod.outputs.xOffset.enabled) {
            xOffsetModsDeltas.push([mod.outputs.xOffset.val2 * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.yOffset.enabled) {
            yOffsetModsDeltas.push([mod.outputs.yOffset.val2 * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.branchesMagnitude.enabled) {
            branchesMagnitudeModsDeltas.push([(mod.outputs.branchesMagnitude.val2 - settings.position.branchesMagnitude) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.branchesDirection.enabled) {
            branchesDirectionModsDeltas.push([mod.outputs.branchesDirection.val2.to - (mod.outputs.branchesDirection.val2.to - mod.outputs.branchesDirection.val2.from) * modResults[mod.id], modResults[mod.id] * mod.blendRatio]);
        }
    });
    // TODO review lookTo mods and how they are calculated
    const lookToModsAvg = average(...lookToModsValues);

    const sizeModsSum = getWeightedSum(...sizeModsDeltas) || 0;
    const colorModsSum = getColorsWeightedSum(...colorModsDeltas);
    const strokeColorModsSum = getColorsWeightedSum(...strokeColorModsDeltas);
    const transpModsSum = getWeightedSum(...transpModsDeltas);
    const strokeTranspModsSum = getWeightedSum(...strokeTranspModsDeltas);
    const blurModsSum = getWeightedSum(...blurModsDeltas);
    const widthRatioModsSum = getWeightedSum(...widthRatioModsDeltas);
    const rectRoundnessModsSum = getWeightedSum(...rectRoundnessModsDeltas);
    const angleModsSum = getWeightedSum(...angleModsDeltas);
    const lookToModsSum = getPosWeightedSum(...lookToModsDeltas);
    const xOffsetModsSum = getWeightedSum(...xOffsetModsDeltas);
    const yOffsetModsSum = getWeightedSum(...yOffsetModsDeltas);
    const branchesMagnitudeModsSum = getWeightedSum(...branchesMagnitudeModsDeltas);
    const branchesDirectionModsSum = getWeightedSum(...branchesDirectionModsDeltas);

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
    // TODO if modsSum is empty array (or color array), it's NaN. maby check also color for such situation (and other)

    let angle = settings.shape.angle + angleModsSum;
    // TODO REVIEW PLEASE
    if (lookToModsSum?.x && lookToModsSum?.y && settings.shape.shape !== shapeTypes.random3 && settings.shape.shape !== shapeTypes.random4 && settings.shape.shape !== shapeTypes.circle) {
        const [, lookToAngle] = getVectorByTwoPoints(xPosition, yPosition, lookToModsSum.x, lookToModsSum.y);
        angle = lookToAngle * lookToModsAvg + angle;
    }

    if (isBranchElement) {
        const modulatedMagnitude = settings.position.branchesMagnitude + branchesMagnitudeModsSum;
        const modulatedDirection = last.direction + branchesDirectionModsSum;
        const [x, y] = getPointByDistanceAndAngle(last.x, last.y, modulatedMagnitude, modulatedDirection);
        xPosition = x;
        yPosition = y;
        if (
            xPosition < settings.position.startPos.x ||
            xPosition > settings.position.endPos.x ||
            yPosition < settings.position.startPos.y ||
            yPosition > settings.position.endPos.y
        ) {
            last.level = 0;
        } else {
            last = {
                level: last.level + 1,
                x: xPosition,
                y: yPosition,
                direction: modulatedDirection,
            };
        }
    }

    xPosition = xPosition + xOffsetModsSum + settings.position.xOffset;
    yPosition = yPosition + yOffsetModsSum + settings.position.yOffset;


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
        // maby round positions, but it causes grid when using chessPlate bias
        position: {
            // x: Math.floor(xPosition),
            // y: Math.floor(yPosition),
            x: xPosition,
            y: yPosition,
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