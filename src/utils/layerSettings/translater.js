import {createNoise2D} from 'simplex-noise';
import {shapeTypes} from '../../consts/sharedConsts';
import {hexToHslArray} from '../generalUtils';
import {valueNoise} from '../noiseGenerators';
import {
    getTranslatedAngle,
    getTranslatedBiasA,
    getTranslatedBiasB,
    getTranslatedBlur,
    getTranslatedBranchesMagnitude,
    getTranslatedBrushDensity,
    getTranslatedChessPlateDim,
    getTranslatedNoiseZoom,
    getTranslatedPosOffset,
    getTranslatedRectRoundness,
    getTranslatedSineZoom,
    getTranslatedSize,
    getTranslatedWidthRatio,
} from './remappers';


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
            angle: getTranslatedAngle(rawSettings.shape.angle),
            widthRatio: getTranslatedWidthRatio(rawSettings.shape.widthRatio),
            rectRoundness: parseFloat(rawSettings.shape.rectRoundness),
            customShape: rawSettings.shape.customShape,
            strokeOn: rawSettings.shape.strokeOn,
            strokeThickness: Math.pow(parseFloat(rawSettings.shape.strokeThickness), 2),
            fillOn: rawSettings.shape.fillOn,
            pixelShapeRes: parseFloat(rawSettings.shape.pixelShapeRes),
            pixelShape: rawSettings.shape.pixelShape,
        },
        mods: rawSettings.mods.map(mod => {
            return {
                id: mod.id,
                blendRatio: parseFloat(mod.blendRatio),
                settings: {
                    type: mod.settings.type,
                    perlinNoise: createNoise2D(),
                    valueNoise: valueNoise(),
                    sineZoomX: getTranslatedSineZoom(mod.settings.sineZoomX),
                    sineZoomY: getTranslatedSineZoom(mod.settings.sineZoomY),
                    trigType: mod.settings.trigType,
                    indexType: mod.settings.indexType,
                    noiseType: mod.settings.noiseType,
                    noiseZoom: getTranslatedNoiseZoom(mod.settings.noiseZoom, mod.settings.noiseType),
                    radialRadiusPos: {
                        x: parseFloat(mod.settings.radialRadiusPos.x),
                        y: parseFloat(mod.settings.radialRadiusPos.y),
                    },
                    radialCenterPos: {
                        x: parseFloat(mod.settings.radialCenterPos.x),
                        y: parseFloat(mod.settings.radialCenterPos.y),
                    },
                    remapLevels: mod.settings.remapLevels.map(remapLevel => {
                        return {
                            y: parseFloat(remapLevel.y),
                            id: remapLevel.id,
                        };
                    }),
                },
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
                    blur: {
                        enabled: mod.outputs.blur.enabled,
                        val2: getTranslatedBlur(mod.outputs.blur.val2),
                    },
                    widthRatio: {
                        enabled: mod.outputs.widthRatio.enabled,
                        val2: getTranslatedWidthRatio(mod.outputs.widthRatio.val2),
                    },
                    rectRoundness: {
                        enabled: mod.outputs.rectRoundness.enabled,
                        val2: getTranslatedRectRoundness(mod.outputs.rectRoundness.val2),
                    },
                    angle: {
                        enabled: mod.outputs.angle.enabled,
                        val2: {
                            from: getTranslatedAngle(mod.outputs.angle.val2.from),
                            to: getTranslatedAngle(mod.outputs.angle.val2.to),
                        },
                    },
                    lookTo: {
                        enabled: mod.outputs.lookTo.enabled,
                        val2: {
                            x: parseFloat(mod.outputs.lookTo.val2.x),
                            y: parseFloat(mod.outputs.lookTo.val2.y),
                        },
                    },
                    xOffset: {
                        enabled: mod.outputs.xOffset.enabled,
                        val2: getTranslatedPosOffset(mod.outputs.xOffset.val2),
                    },
                    yOffset: {
                        enabled: mod.outputs.yOffset.enabled,
                        val2: getTranslatedPosOffset(mod.outputs.yOffset.val2),
                    },
                    branchesMagnitude: {
                        enabled: mod.outputs.branchesMagnitude.enabled,
                        val2: getTranslatedBranchesMagnitude(mod.outputs.branchesMagnitude.val2),
                    },
                    branchesDirectionDelta: {
                        enabled: mod.outputs.branchesDirectionDelta.enabled,
                        val2: {
                            from: parseFloat(mod.outputs.branchesDirectionDelta.val2.from),
                            to: parseFloat(mod.outputs.branchesDirectionDelta.val2.to),
                        },
                    },
                    branchesDirection: {
                        enabled: mod.outputs.branchesDirection.enabled,
                        val2: {
                            from: parseFloat(mod.outputs.branchesDirection.val2.from),
                            to: parseFloat(mod.outputs.branchesDirection.val2.to),
                        },
                    },
                },
                modOutputs: mod.modOutputs.map(modOutput => {
                    return {
                        id: modOutput.id,
                        mult: modOutput.mult,
                    };
                }),
            };
        }),
        position: {
            startPos: {
                x: parseFloat(rawSettings.position.startPos.x),
                y: parseFloat(rawSettings.position.startPos.y),
            },
            endPos: {
                x: parseFloat(rawSettings.position.endPos.x),
                y: parseFloat(rawSettings.position.endPos.y),
            },
            branchesOn: rawSettings.position.branchesOn,
            branchesLength: parseFloat(rawSettings.position.branchesLength),
            branchesMagnitude: getTranslatedBranchesMagnitude(rawSettings.position.branchesMagnitude),
            branchesDirection: parseFloat(rawSettings.position.branchesDirection),
            biasSpiralType: rawSettings.position.biasSpiralType,
            chessPlateWidth: getTranslatedChessPlateDim(rawSettings.position.chessPlateWidth),
            chessPlateHeight: getTranslatedChessPlateDim(rawSettings.position.chessPlateHeight),
            biasSpiralCustom: rawSettings.position.biasSpiralCustom,
            biasSpiralThickness: Math.trunc(Math.pow(parseFloat(rawSettings.position.biasSpiralThickness) + 1, 6)),
            biasSpiralDensity: Math.pow(parseFloat(rawSettings.position.biasSpiralDensity) + 1, 7),
            biasSpiralSpread: Math.pow(parseFloat(rawSettings.position.biasSpiralSpread) + 1, 7) - 1,
            biasSpiralAngleRand: parseFloat(rawSettings.position.biasSpiralAngleRand) * 5,
            biasSpiralMult: Math.pow(parseFloat(rawSettings.position.biasSpiralMult) * 20, 2.3) * 0.05,
            biasType: rawSettings.position.biasType,
            biasRadius: Math.pow(Math.pow(rawSettings.position.biasPos.x - rawSettings.position.biasRadiusPos.x, 2) + Math.pow(rawSettings.position.biasPos.y - rawSettings.position.biasRadiusPos.y, 2), 1 / 2),
            biasPos: {
                x: parseFloat(rawSettings.position.biasPos.x),
                y: parseFloat(rawSettings.position.biasPos.y),
            },
            biasA: getTranslatedBiasA(rawSettings.position.biasA),
            biasB: getTranslatedBiasB(rawSettings.position.biasB),
            biasInf: parseFloat(rawSettings.position.biasInf),
            biasRectXOn: rawSettings.position.biasRectXOn,
            biasRectYOn: rawSettings.position.biasRectYOn,
            xOffset: getTranslatedPosOffset(rawSettings.position.xOffset),
            yOffset: getTranslatedPosOffset(rawSettings.position.yOffset),
        },
        color: {
            color: hexToHslArray(rawSettings.color.color),
            strokeColor: hexToHslArray(rawSettings.color.strokeColor),
            transp: transp,
            strokeTransp: strokeTransp,
            glow: parseFloat(rawSettings.color.glow) * 100,
            overlayMode: rawSettings.color.overlayMode,
            blurOn: rawSettings.color.blurOn,
            blur: getTranslatedBlur(rawSettings.color.blur),
        },
        brush: {
            brushDensity: getTranslatedBrushDensity(rawSettings.brush.brushDensity),
            brushOn: rawSettings.brush.brushOn,
            brushPos: {
                x: parseFloat(rawSettings.brush.brushPos.x),
                y: parseFloat(rawSettings.brush.brushPos.y),
            },
        },
    };
};

