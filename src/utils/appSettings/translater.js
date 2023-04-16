import {getTranslatedPixelShapeBrushSize} from './remappers';


export const getTranslatedAppSettings = (rawSettings) => {
    return {
        waitInterval: Math.trunc(Math.pow(parseFloat(rawSettings.drawingSpeed) + 1, 10)),
        resolutionMult: rawSettings.resolutionMult,
        pixelShapeBrushSize: getTranslatedPixelShapeBrushSize(rawSettings.pixelShapeBrushSize),
    };
};