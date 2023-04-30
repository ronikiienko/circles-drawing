import {
    calculateShortestAngleDifference,
    getBiasedRandomNumber,
    getColorsWeightedSum,
    getPointByDistanceAndAngle,
    getVectorByTwoPoints,
    getWeightedSum,
    hslArrToHsl,
} from '../generalUtils';
import {calculateModsResults} from './calculateModsResults';
import {calculatePosition} from './calculatePosition';


let last = {
    level: 0,
    x: 0,
    y: 0,
    direction: 0,
};
let branchIndex = 0;

export const getRandomizedShapeSettings = (settings, absoluteIndex) => {
    const isBranchElement = (
        settings.position.branchesOn &&
        settings.position.branchesLength > 0 &&
        settings.position.branchesLength >= last.level &&
        last.level !== 0 &&
        absoluteIndex !== 0
    );

    let xPosition;
    let yPosition;
    if (isBranchElement) {
        xPosition = last.x;
        yPosition = last.y;
    } else {
        if (absoluteIndex === 0) {
            branchIndex = 0;
        } else {
            branchIndex++;
        }
        const [x, y] = calculatePosition(settings, absoluteIndex, branchIndex);
        xPosition = x;
        yPosition = y;
        if (settings.position.branchesOn && settings.position.branchesLength > 0) {
            last = {
                level: 1,
                x: xPosition,
                y: yPosition,
                direction: getBiasedRandomNumber(0, 355),
            };
        }
    }


    const modsResults = calculateModsResults(settings, xPosition, yPosition, absoluteIndex, branchIndex);

    const sizeModsDeltas = [];
    const colorModsDeltas = [];
    const strokeColorModsDeltas = [];
    const transpModsDeltas = [];
    const strokeTranspModsDeltas = [];
    const blurModsDeltas = [];
    const widthRatioModsDeltas = [];
    const rectRoundnessModsDeltas = [];
    const angleModsDeltas = [];
    const xOffsetModsDeltas = [];
    const yOffsetModsDeltas = [];
    const branchesMagnitudeModsDeltas = [];
    const branchesDirectionModsDeltas = [];

    settings.mods?.forEach((mod) => {
        if (mod.outputs.size.enabled) {
            sizeModsDeltas.push([(mod.outputs.size.val2 - settings.size.size) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.color.enabled) {
            colorModsDeltas.push([
                [
                    (mod.outputs.color.val2[0] - settings.color.color[0]) * modsResults[mod.id],
                    (mod.outputs.color.val2[1] - settings.color.color[1]) * modsResults[mod.id],
                    (mod.outputs.color.val2[2] - settings.color.color[2]) * modsResults[mod.id],

                ],
                modsResults[mod.id] * mod.blendRatio,
            ]);
        }
        if (mod.outputs.transp.enabled) {
            transpModsDeltas.push([(mod.outputs.transp.val2 - settings.color.transp) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.strokeColor.enabled) {
            strokeColorModsDeltas.push([
                [
                    (mod.outputs.strokeColor.val2[0] - settings.color.strokeColor[0]) * modsResults[mod.id],
                    (mod.outputs.strokeColor.val2[1] - settings.color.strokeColor[1]) * modsResults[mod.id],
                    (mod.outputs.strokeColor.val2[2] - settings.color.strokeColor[2]) * modsResults[mod.id],

                ],
                modsResults[mod.id] * mod.blendRatio,
            ]);
        }
        if (mod.outputs.strokeTransp.enabled) {
            strokeTranspModsDeltas.push([(mod.outputs.strokeTransp.val2 - settings.color.strokeTransp) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.blur.enabled) {
            blurModsDeltas.push([(mod.outputs.blur.val2 - settings.color.blur) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.widthRatio.enabled) {
            widthRatioModsDeltas.push([(mod.outputs.widthRatio.val2 - settings.shape.widthRatio) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.rectRoundness.enabled) {
            rectRoundnessModsDeltas.push([(mod.outputs.rectRoundness.val2 - settings.shape.rectRoundness) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.angle.enabled || mod.outputs.lookTo.enabled) {
            let lookToDelta = 0;
            let angleDelta = 0;
            // TODO can't set angle when look to is enabled (angle should be added to look to)
            if (mod.outputs.lookTo.enabled) {
                let [, angle] = getVectorByTwoPoints(xPosition, yPosition, mod.outputs.lookTo.val2.x, mod.outputs.lookTo.val2.y);
                lookToDelta = calculateShortestAngleDifference(settings.shape.angle, angle) * modsResults[mod.id];
            }
            if (mod.outputs.angle.enabled) {
                angleDelta = calculateShortestAngleDifference(settings.shape.angle, mod.outputs.angle.val2) * modsResults[mod.id];
            }
            angleModsDeltas.push([(angleDelta + lookToDelta), modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.xOffset.enabled) {
            xOffsetModsDeltas.push([mod.outputs.xOffset.val2 * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.yOffset.enabled) {
            yOffsetModsDeltas.push([mod.outputs.yOffset.val2 * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.branchesMagnitude.enabled) {
            branchesMagnitudeModsDeltas.push([(mod.outputs.branchesMagnitude.val2 - settings.position.branchesMagnitude) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.branchesDirection.enabled) {
            branchesDirectionModsDeltas.push([mod.outputs.branchesDirection.val2.to - (mod.outputs.branchesDirection.val2.to - mod.outputs.branchesDirection.val2.from) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
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
    // console.log(angleModsSum, settings.shape.angle)
    let angle = settings.shape.angle + angleModsSum;

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