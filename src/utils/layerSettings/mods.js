import {noiseTypes, trigModTypes} from '../../consts/sharedConsts';
import {getVectorByTwoPoints, modRemap} from '../generalUtils';


export const radialMod = (x, y, mod) => {
    const [distanceFromCenterToPoint] = getVectorByTwoPoints(mod.radialCenterPos.x, mod.radialCenterPos.y, x, y);
    const [radius] = getVectorByTwoPoints(mod.radialCenterPos.x, mod.radialCenterPos.y, mod.radialRadiusPos.x, mod.radialRadiusPos.y);
    const distanceFromPointToRadius = radius - distanceFromCenterToPoint;
    let ratio;
    if (distanceFromPointToRadius >= 0) {
        ratio = distanceFromPointToRadius / radius;
    } else {
        ratio = 0;
    }
    ratio = modRemap(ratio, mod.modA, mod.modB);
    return ratio;
};

export const randomMod = (mod) => {
    return modRemap(Math.random(), mod.modA, mod.modB);
};

export const noiseMod = (x, y, mod) => {
    let noiseValue;
    switch (mod.noiseType) {
        case noiseTypes.perlin.id:
            noiseValue = (mod.perlinNoise(x * mod.noiseZoom, y * mod.noiseZoom) + 1) / 2;
            break;
        case noiseTypes.random.id:
            noiseValue = Math.random();
            break;
        case noiseTypes.value.id:
            noiseValue = mod.valueNoise(x * mod.noiseZoom, y * mod.noiseZoom);
    }
    return modRemap(noiseValue, mod.modA, mod.modB);
};

export const indexMod = (currentIndex, shapesNumber, mod) => {
    return modRemap(currentIndex / shapesNumber, mod.modA, mod.modB);
};

export const sinTo01 = (value) => {
    return (value + 1) / 2;
};

export const trigMod = (x, y, mod) => {
    if (mod.trigType === trigModTypes.sine.id) {
        let xSin = sinTo01(Math.sin(x / mod.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.sineZoomY));
        let avg = (xSin + ySin) / 2;
        return modRemap(avg, mod.modA, mod.modB);
    }
    if (mod.trigType === trigModTypes.circles.id) {
        let xSin = sinTo01(Math.sin(x / mod.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.sineZoomY));
        let avg = (xSin + ySin) / 2;
        return modRemap((Math.sin(avg * 50) + 1) / 2, mod.modA, mod.modB);
    }
    if (mod.trigType === trigModTypes.tan.id) {
        let xSin = sinTo01(Math.sin(x / mod.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.sineZoomY)) * sinTo01(Math.tan(x / mod.sineZoomX));
        let avg = (xSin + ySin) / 2;
        return modRemap((Math.sin(avg * 10) + 1) / 2, mod.modA, mod.modB);
    }
};