import {defaultAppSettings, layerPresets, randomPresetRules} from '../consts/consts';
import {getBiasedRandomNumber, rgbToHex, typeofWithArray} from './generalUtils';


export const getLayerSettings = (preset) => {
    const defaultPreset = layerPresets[0];
    return {
        preset: {
            id: preset?.preset?.id || defaultPreset.preset.id,
            name: preset?.preset?.name || defaultPreset.preset.name,
            description: preset?.preset?.description || defaultPreset.preset.description,
        },
        size: {
            size: preset?.size?.size || defaultPreset.size.size,
            sizeRand: preset?.size?.sizeRand || defaultPreset.size.sizeRand,
        },
        number: {
            number: preset?.number?.number || defaultPreset.number.number,
        },
        shape: {
            shape: preset?.shape?.shape || defaultPreset.shape.shape,
            angle: preset?.shape?.angle || defaultPreset.shape.angle,
            angleRand: preset?.shape?.angleRand || defaultPreset.shape.angleRand,
            widthRatio: preset?.shape?.widthRatio || defaultPreset.shape.widthRatio,
            lineRounded: preset?.shape?.lineRounded || defaultPreset.shape.lineRounded,
            widthRatioRand: preset?.shape?.widthRatioRand || defaultPreset.shape.widthRatioRand,
            lookToOn: preset?.shape?.lookToOn || defaultPreset.shape.lookToOn,
            lineLookToX: preset?.shape?.lineLookToX || defaultPreset.shape.lineLookToX,
            lineLookToY: preset?.shape?.lineLookToY || defaultPreset.shape.lineLookToY,
        },
        position: {
            startX: preset?.position?.startX || defaultPreset.position.startX,
            startY: preset?.position?.startY || defaultPreset.position.startY,
            endX: preset?.position?.endX || defaultPreset.position.endX,
            endY: preset?.position?.endY || defaultPreset.position.endY,
            biasType: preset?.position?.biasType || defaultPreset.position.biasType,
            biasSpiralType: preset?.position?.biasSpiralType || defaultPreset.position.biasSpiralType,
            biasSpiralCustom: preset?.position?.biasSpiralCustom || defaultPreset.position.biasSpiralCustom,
            biasSpiralThickness: preset?.position?.biasSpiralThickness || defaultPreset.position.biasSpiralThickness,
            biasSpiralDensity: preset?.position?.biasSpiralDensity || defaultPreset.position.biasSpiralDensity,
            biasSpiralSpread: preset?.position?.biasSpiralSpread || defaultPreset.position.biasSpiralSpread,
            biasSpiralAngleRand: preset?.position?.biasSpiralAngleRand || defaultPreset.position.biasSpiralAngleRand,
            biasSpiralMult: preset?.position?.biasSpiralMult || defaultPreset.position.biasSpiralMult,
            biasRadiusX: preset?.position?.biasRadiusX || defaultPreset.position.biasRadiusX,
            biasRadiusY: preset?.position?.biasRadiusY || defaultPreset.position.biasRadiusY,
            biasX: preset?.position?.biasX || defaultPreset.position.biasX,
            biasY: preset?.position?.biasY || defaultPreset.position.biasY,
            biasA: preset?.position?.biasA || defaultPreset.position.biasA,
            biasB: preset?.position?.biasB || defaultPreset.position.biasB,
            biasInf: preset?.position?.biasInf || defaultPreset.position.biasInf,
        },
        color: {
            color: preset?.color?.color || defaultPreset.color.color,
            colorRand: preset?.color?.colorRand || defaultPreset.color.colorRand,
            glow: preset?.color?.glow || defaultPreset.color.glow,
            transp: preset?.color?.transp || defaultPreset.color.transp,
            transpRand: preset?.color?.transpRand || defaultPreset.color.transpRand,
            overlayMode: preset?.color?.overlayMode || defaultPreset.color.overlayMode,
            blurOn: preset?.color?.blurOn || defaultPreset.color.blurOn,
            blur: preset?.color?.blur || defaultPreset.color.blur,
            blurRand: preset?.color?.blurRand || defaultPreset.color.blurRand,
        },
        brush: {
            brushDensity: preset?.brush?.brushDensity || defaultPreset.brush.brushDensity,
            brushOn: preset?.brush?.brushOn || defaultPreset.brush.brushOn,
            brushX: preset?.brush?.brushX || defaultPreset.brush.brushX,
            brushY: preset?.brush?.brushY || defaultPreset.brush.brushY,
        },
    };
};
export const getAppSettings = (settings) => {
    const defaultSettings = defaultAppSettings;
    return {
        projectNameRand: settings?.projectNameRand || defaultSettings.projectNameRand,
        projectName: settings?.projectName || defaultSettings.projectName,
        drawingSpeed: settings?.drawingSpeed || defaultSettings.drawingSpeed,
        darkMode: settings?.darkMode || defaultSettings.darkMode,
        resolutionMult: settings?.resolutionMult || defaultSettings.resolutionMult,
    };
};

export const getRandomPreset = () => {
    const getRandomValue = (valueRule) => {
        const valueRuleType = typeofWithArray(valueRule);
        switch (valueRuleType) {
            case 'object':
                if (valueRule.type === 'color') {
                    return rgbToHex(
                        getBiasedRandomNumber(valueRule.rMin, valueRule.rMax),
                        getBiasedRandomNumber(valueRule.gMin, valueRule.gMax),
                        getBiasedRandomNumber(valueRule.bMin, valueRule.bMax),
                    );
                }
                return getBiasedRandomNumber(valueRule.min, valueRule.max, 2);
            case 'array':
                return valueRule[getBiasedRandomNumber(0, valueRule.length - 1)];
            default:
                return valueRule;
        }
    };
    return {
        preset: {
            id: getRandomValue(randomPresetRules.preset.id),
            name: getRandomValue(randomPresetRules.preset.name),
            description: getRandomValue(randomPresetRules.preset.description),
        },
        size: {
            size: getRandomValue(randomPresetRules.size.size),
            sizeRand: getRandomValue(randomPresetRules.size.sizeRand),
        },
        number: {
            number: getRandomValue(randomPresetRules.number.number),
        },
        shape: {
            shape: getRandomValue(randomPresetRules.shape.shape),
            angle: getRandomValue(randomPresetRules.shape.angle),
            angleRand: getRandomValue(randomPresetRules.shape.angleRand),
            widthRatio: getRandomValue(randomPresetRules.shape.widthRatio),
            lineRounded: getRandomValue(randomPresetRules.shape.lineRounded),
            widthRatioRand: getRandomValue(randomPresetRules.shape.widthRatioRand),
            lookToOn: getRandomValue(randomPresetRules.shape.lookToOn),
            lineLookToX: getRandomValue(randomPresetRules.shape.lineLookToX),
            lineLookToY: getRandomValue(randomPresetRules.shape.lineLookToY),
        },
        position: {
            startX: getRandomValue(randomPresetRules.position.startX),
            startY: getRandomValue(randomPresetRules.position.startY),
            endX: getRandomValue(randomPresetRules.position.endX),
            endY: getRandomValue(randomPresetRules.position.endY),
            biasType: getRandomValue(randomPresetRules.position.biasType),
            biasSpiralType: getRandomValue(randomPresetRules.position.biasSpiralType),
            biasSpiralCustom: getRandomValue(randomPresetRules.position.biasSpiralCustom),
            biasSpiralThickness: getRandomValue(randomPresetRules.position.biasSpiralThickness),
            biasSpiralDensity: getRandomValue(randomPresetRules.position.biasSpiralDensity),
            biasSpiralSpread: getRandomValue(randomPresetRules.position.biasSpiralSpread),
            biasSpiralAngleRand: getRandomValue(randomPresetRules.position.biasSpiralAngleRand),
            biasSpiralMult: getRandomValue(randomPresetRules.position.biasSpiralMult),
            biasRadiusX: getRandomValue(randomPresetRules.position.biasRadiusX),
            biasRadiusY: getRandomValue(randomPresetRules.position.biasRadiusY),
            biasX: getRandomValue(randomPresetRules.position.biasX),
            biasY: getRandomValue(randomPresetRules.position.biasY),
            biasA: getRandomValue(randomPresetRules.position.biasA),
            biasB: getRandomValue(randomPresetRules.position.biasB),
            biasInf: getRandomValue(randomPresetRules.position.biasInf),
        },
        color: {
            color: getRandomValue(randomPresetRules.color.color),
            colorRand: getRandomValue(randomPresetRules.color.colorRand),
            glow: getRandomValue(randomPresetRules.color.glow),
            transp: getRandomValue(randomPresetRules.color.transp),
            transpRand: getRandomValue(randomPresetRules.color.transpRand),
            overlayMode: getRandomValue(randomPresetRules.color.overlayMode),
            blurOn: getRandomValue(randomPresetRules.color.blurOn),
            blur: getRandomValue(randomPresetRules.color.blur),
            blurRand: getRandomValue(randomPresetRules.color.blurRand),
        },
        brush: {
            brushDensity: getRandomValue(randomPresetRules.brush.brushDensity),
            brushOn: getRandomValue(randomPresetRules.brush.brushOn),
            brushX: getRandomValue(randomPresetRules.brush.brushX),
            brushY: getRandomValue(randomPresetRules.brush.brushY),
        },
    };
};

export const presetDescriptionGenerator = () => {

};