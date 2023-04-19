import {createNoise2D} from 'simplex-noise';
import {biasTypes, modTypes, shapeTypes} from '../../consts/sharedConsts';
import {hexToHslArray} from '../generalUtils';
import {
    getTranslatedAngle,
    getTranslatedBiasA,
    getTranslatedBiasB,
    getTranslatedBlur,
    getTranslatedBrushDensity,
    getTranslatedModA,
    getTranslatedModB,
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
            widthRatio: parseFloat(rawSettings.shape.widthRatio),
            lookToOn: rawSettings.shape.lookToOn,
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
                type: mod.type,
                id: mod.id,
                perlin: mod.type === modTypes.perlin.id ? createNoise2D() : null,
                sineZoomX: getTranslatedSineZoom(mod.sineZoomX),
                sineZoomY: getTranslatedSineZoom(mod.sineZoomY),
                perlinZoom: Math.pow((1.0000001 - parseFloat(mod.perlinZoom)) / 5, 2),
                radialRadiusPos: {
                    x: parseFloat(mod.radialRadiusPos.x),
                    y: parseFloat(mod.radialRadiusPos.y),
                },
                radialCenterPos: {
                    x: parseFloat(mod.radialCenterPos.x),
                    y: parseFloat(mod.radialCenterPos.y),
                },
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
                        val2: getTranslatedAngle(mod.outputs.angle.val2),
                    },
                    lookTo: {
                        enabled: mod.outputs.lookTo.enabled,
                        val2: {
                            x: parseFloat(mod.outputs.lookTo.val2.x),
                            y: parseFloat(mod.outputs.lookTo.val2.y),
                        },
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
            startPos: {
                x: parseFloat(rawSettings.position.startPos.x),
                y: parseFloat(rawSettings.position.startPos.y),
            },
            endPos: {
                x: parseFloat(rawSettings.position.endPos.x),
                y: parseFloat(rawSettings.position.endPos.y),
            },
            biasSpiralType: rawSettings.position.biasSpiralType,
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

