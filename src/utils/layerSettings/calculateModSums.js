import {
    calculateShortestAngleDifference,
    getColorsWeightedSum,
    getVectorByTwoPoints,
    getWeightedSum,
} from '../generalUtils';


export const calculateModSums = (modsResults, settings, xPosition, yPosition) => {
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
    const branchesDirectionDeltaModsDeltas = [];
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
                // TODO how can i get full randomness? 360 degrees
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
        if (mod.outputs.branchesDirectionDelta.enabled) {
            branchesDirectionDeltaModsDeltas.push([mod.outputs.branchesDirectionDelta.val2.to - (mod.outputs.branchesDirectionDelta.val2.to - mod.outputs.branchesDirectionDelta.val2.from) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
        if (mod.outputs.branchesDirection.enabled) {
            // TODO i want to be able to get full randomness 360 degrees
            branchesDirectionModsDeltas.push([mod.outputs.branchesDirection.val2.to - (mod.outputs.branchesDirection.val2.to - mod.outputs.branchesDirection.val2.from) * modsResults[mod.id], modsResults[mod.id] * mod.blendRatio]);
        }
    });

    return {
        size: getWeightedSum(...sizeModsDeltas) || 0,
        color: getColorsWeightedSum(...colorModsDeltas),
        strokeColor: getColorsWeightedSum(...strokeColorModsDeltas),
        transp: getWeightedSum(...transpModsDeltas),
        strokeTransp: getWeightedSum(...strokeTranspModsDeltas),
        blur: getWeightedSum(...blurModsDeltas),
        widthRatio: getWeightedSum(...widthRatioModsDeltas),
        rectRoundness: getWeightedSum(...rectRoundnessModsDeltas),
        angle: getWeightedSum(...angleModsDeltas),
        xOffset: getWeightedSum(...xOffsetModsDeltas),
        yOffset: getWeightedSum(...yOffsetModsDeltas),
        branchesMagnitude: getWeightedSum(...branchesMagnitudeModsDeltas),
        branchesDirectionDelta: getWeightedSum(...branchesDirectionDeltaModsDeltas),
        branchesDirection: getWeightedSum(...branchesDirectionModsDeltas),
    };
};