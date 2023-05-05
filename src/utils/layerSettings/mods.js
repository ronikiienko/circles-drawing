import {noiseTypes, trigModTypes} from '../../consts/sharedConsts';
import {getVectorByTwoPoints, modRemap} from '../generalUtils';


export const radialMod = (x, y, mod) => {
    const [distanceFromCenterToPoint] = getVectorByTwoPoints(mod.settings.radialCenterPos.x, mod.settings.radialCenterPos.y, x, y);
    const [radius] = getVectorByTwoPoints(mod.settings.radialCenterPos.x, mod.settings.radialCenterPos.y, mod.settings.radialRadiusPos.x, mod.settings.radialRadiusPos.y);
    const distanceFromPointToRadius = radius - distanceFromCenterToPoint;
    let ratio;
    if (distanceFromPointToRadius >= 0) {
        ratio = distanceFromPointToRadius / radius;
    } else {
        ratio = 0;
    }
    ratio = modRemap(ratio, mod.settings.modA, mod.settings.modB);
    return ratio;
};

export const randomMod = (mod) => {
    return modRemap(Math.random(), mod.settings.modA, mod.settings.modB);
};

export const noiseMod = (x, y, mod) => {
    let noiseValue;
    switch (mod.settings.noiseType) {
        case noiseTypes.perlin.id:
            noiseValue = (mod.settings.perlinNoise(x * mod.settings.noiseZoom, y * mod.settings.noiseZoom) + 1) / 2;
            break;
        case noiseTypes.random.id:
            noiseValue = Math.random();
            break;
        case noiseTypes.value.id:
            noiseValue = mod.settings.valueNoise(x * mod.settings.noiseZoom, y * mod.settings.noiseZoom);
    }
    return modRemap(noiseValue, mod.settings.modA, mod.settings.modB);
};

export const indexMod = (currentIndex, shapesNumber, mod) => {
    return modRemap(currentIndex / shapesNumber, mod.settings.modA, mod.settings.modB);
};

export const sinTo01 = (value) => {
    return (value + 1) / 2;
};

export const trigMod = (x, y, mod) => {
    if (mod.settings.trigType === trigModTypes.sine.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY));
        let avg = (xSin + ySin) / 2;
        return modRemap(avg, mod.settings.modA, mod.settings.modB);
    }
    if (mod.settings.trigType === trigModTypes.circles.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY));
        let avg = (xSin + ySin) / 2;
        return modRemap((Math.sin(avg * 50) + 1) / 2, mod.settings.modA, mod.settings.modB);
    }
    if (mod.settings.trigType === trigModTypes.tan.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY)) * sinTo01(Math.tan(x / mod.settings.sineZoomX));
        let avg = (xSin + ySin) / 2;
        return modRemap((Math.sin(avg * 10) + 1) / 2, mod.settings.modA, mod.settings.modB);
    }
};