import {defaultAppSettings, layerPresets} from '../consts/consts';


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
            lineAngle: preset?.shape?.lineAngle || defaultPreset.shape.lineAngle,
            lineAngleRand: preset?.shape?.lineAngleRand || defaultPreset.shape.lineAngleRand,
            lineRatio: preset?.shape?.lineRatio || defaultPreset.shape.lineRatio,
            lineRounded: preset?.shape?.lineRounded || defaultPreset.shape.lineRounded,
            lineRatioRand: preset?.shape?.lineRatioRand || defaultPreset.shape.lineRatioRand,
            lineLookToOn: preset?.shape?.lineLookToOn || defaultPreset.shape.lineLookToOn,
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

export const presetDescriptionGenerator = () => {

};