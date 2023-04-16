import {createNoise2D} from 'simplex-noise';
import {biasTypes, modTypes, shapeTypes} from '../../consts/sharedConsts';
import {hexToHslArray} from '../generalUtils';
import {
    getTranslatedBiasA,
    getTranslatedBiasB,
    getTranslatedBlur,
    getTranslatedBrushDensity,
    getTranslatedModA,
    getTranslatedModB,
    getTranslatedSize,
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
            angle: parseFloat(rawSettings.shape.angle) * 360,
            angleRand: parseFloat(rawSettings.shape.angleRand),
            widthRatio: parseFloat(rawSettings.shape.widthRatio),
            lookToOn: rawSettings.shape.lookToOn,
            lookToX: rawSettings.shape.lookToX,
            lookToY: rawSettings.shape.lookToY,
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
                    blur: {
                        enabled: mod.outputs.blur.enabled,
                        val2: getTranslatedBlur(mod.outputs.blur.val2),
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
            blur: getTranslatedBlur(rawSettings.color.blur),
        },
        brush: {
            brushDensity: getTranslatedBrushDensity(rawSettings.brush.brushDensity),
            brushOn: rawSettings.brush.brushOn,
            brushX: rawSettings.brush.brushX,
            brushY: rawSettings.brush.brushY,
        },
    };
};

