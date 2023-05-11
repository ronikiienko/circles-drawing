import {indexModTypes, noiseTypes, trigModTypes} from '../../consts/sharedConsts';
import {getVectorByTwoPoints} from '../generalUtils';


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
    return ratio;
};

export const noiseMod = async (x, y, mod) => {
    let noiseValue;
    switch (mod.settings.noiseType) {
        case noiseTypes.perlin.id:
            noiseValue = (mod.settings.perlinNoise(x * mod.settings.noiseZoom, y * mod.settings.noiseZoom) + 1) / 2;
            break;
        case noiseTypes.random.id:
            noiseValue = Math.random();
            break;
        case noiseTypes.value.id:
            // TODO sometimes give little negative number ( when out of field) sometimes gives nan
            noiseValue = mod.settings.valueNoise(x * mod.settings.noiseZoom, y * mod.settings.noiseZoom);
            break;
        case noiseTypes.worley.id:
            noiseValue = 1 - (await mod.settings.worleyNoise.pixel(x, y, true, mod.settings.worleyClosestN)) / 255;
            // TODO problems when use minkowski metric type
    }
    return noiseValue;
};

export const indexMod = (absoluteIndex, indexOfBranch, indexInBranch, shapesNumber, mod, settings) => {
    let value;
    switch (mod.settings.indexType) {
        case indexModTypes.absoluteIndex.id:
            value = absoluteIndex / shapesNumber;
            break;
        case indexModTypes.indexInBranch.id:
            value = indexInBranch / settings.position.branchesLength;
            break;
    }
    return value;
};

export const sinTo01 = (value) => {
    return (value + 1) / 2;
};

export const trigMod = (x, y, mod) => {
    if (mod.settings.trigType === trigModTypes.sine.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY));
        return (xSin + ySin) / 2;
    }
    if (mod.settings.trigType === trigModTypes.circles.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY));
        let avg = (xSin + ySin) / 2;
        return (Math.sin(avg * 50) + 1) / 2;
    }
    if (mod.settings.trigType === trigModTypes.tan.id) {
        let xSin = sinTo01(Math.sin(x / mod.settings.sineZoomX));
        let ySin = sinTo01(Math.sin(y / mod.settings.sineZoomY)) * sinTo01(Math.tan(x / mod.settings.sineZoomX));
        let avg = (xSin + ySin) / 2;
        return (Math.sin(avg * 10) + 1) / 2;
    }
};