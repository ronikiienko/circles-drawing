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

export const perlinMod = (x, y, mod) => {
    return modRemap((mod.perlin(x * mod.perlinZoom, y * mod.perlinZoom) + 1) / 2, mod.modA, mod.modB);
};

export const indexMod = (currentIndex, shapesNumber, mod) => {
    return modRemap(currentIndex / shapesNumber, mod.modA, mod.modB);
};

export const sineMod = (x, y, mod) => {
    // const xSin = (Math.sin(x / 100) + 1) / 2
    // const ySin = (Math.sin(y / 100) + 1) / 2
    // const avg = (xSin + ySin) / 2
    // return modRemap(Math.sin(avg * 50) , mod.modA, mod.modB)
    const xSin = (Math.sin(x / mod.sineZoomX) + 1) / 2;
    const ySin = (Math.sin(y / mod.sineZoomY) + 1) / 2;
    const avg = (xSin + ySin) / 2;
    return modRemap(Math.sin(avg * 70), mod.modA, mod.modB);
};