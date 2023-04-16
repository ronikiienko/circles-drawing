import {randomPresetRules} from '../consts/consts';
import {getBiasedRandomNumber, rgbToHex, typeofWithArray} from './generalUtils';


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
        },
        number: {
            number: getRandomValue(randomPresetRules.number.number),
        },
        shape: {
            shape: getRandomValue(randomPresetRules.shape.shape),
            angle: getRandomValue(randomPresetRules.shape.angle),
            angleRand: getRandomValue(randomPresetRules.shape.angleRand),
            widthRatio: getRandomValue(randomPresetRules.shape.widthRatio),
            widthRatioRand: getRandomValue(randomPresetRules.shape.widthRatioRand),
            lookToOn: getRandomValue(randomPresetRules.shape.lookToOn),
            lookToX: getRandomValue(randomPresetRules.shape.lookToX),
            lookToY: getRandomValue(randomPresetRules.shape.lookToY),
            rectRoundness: getRandomValue(randomPresetRules.shape.rectRoundness),
            rectRoundnessRand: getRandomValue(randomPresetRules.shape.rectRoundnessRand),
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