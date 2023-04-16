import {defaultAppSettings} from '../../consts/consts';


export const getAppSettings = (settings) => {
    const defaultSettings = defaultAppSettings;
    return {
        projectNameRand: settings?.projectNameRand ?? defaultSettings.projectNameRand,
        projectName: settings?.projectName ?? defaultSettings.projectName,
        drawingSpeed: settings?.drawingSpeed ?? defaultSettings.drawingSpeed,
        darkMode: settings?.darkMode ?? defaultSettings.darkMode,
        resolutionMult: settings?.resolutionMult ?? defaultSettings.resolutionMult,
        pixelShapeBrushSize: settings?.pixelShapeBrushSize ?? defaultSettings.pixelShapeBrushSize,
        pixelShapeBrushType: settings?.pixelShapeBrushType ?? defaultSettings.pixelShapeBrushType,
    };
};