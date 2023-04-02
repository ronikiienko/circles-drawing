import {defaultAppSettings, layerPresets, randomPresetRules} from '../consts/consts';
import {deepCopy, getBiasedRandomNumber, getRandomHsl, rgbToHex, typeofWithArray} from './generalUtils';


const mergeWithDefault = (myValue, defaults) => {
    const merged = {};

    const merge = (obj, def, current = merged) => {
        for (let key in def) {
            // TODO !!!!!!!!!!!!!!!!!!!!!!!! my app uses array to save custom shape.. But if i will make array default too, i will lose items that have bigger index that last default array item..
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                current[key] = deepCopy(def[key]);
            } else if (typeof def[key] === 'object') {
                if (Array.isArray(def[key])) {
                    current[key] = obj[key];
                } else {
                    current[key] = {};
                    merge(obj[key], def[key], current[key]);
                }
            } else {
                current[key] = obj[key];
            }
        }
    };

    merge(myValue, defaults);

    return merged;
};

export const getLayerSettings = (preset) => mergeWithDefault(preset, layerPresets[0]);
export const getAppSettings = (settings) => mergeWithDefault(settings, defaultAppSettings);

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
            lookToX: getRandomValue(randomPresetRules.shape.lookToX),
            lookToY: getRandomValue(randomPresetRules.shape.lookToY),
            rectRoundness: getRandomValue(randomPresetRules.shape.rectRoundness),
            rectRoundnessRand: getRandomValue(randomPresetRules.shape.rectRoundnessRand),
            customShape: [[0, 0, 'randomid125', getRandomHsl()], [0.5, 0.5, '1235gj', getRandomHsl()], [1, 0, 'ajsldkf1', getRandomHsl()], [1, 1, '-86512', getRandomHsl()], [0, 1, '1277', getRandomHsl()]],
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
            biasRectXOn: getRandomValue(randomPresetRules.position.biasRectXOn),
            biasRectYOn: getRandomValue(randomPresetRules.position.biasRectYOn),
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