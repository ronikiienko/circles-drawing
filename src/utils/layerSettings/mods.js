import {trigModTypes} from '../../consts/sharedConsts';
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

export const trigMod = (x, y, mod) => {
    console.log(mod.trigType);
    if (mod.trigType === trigModTypes.sine.id) {
        const xSin = (Math.sin(x / mod.sineZoomX) + 1) / 2;
        const ySin = (Math.sin(y / mod.sineZoomY) + 1) / 2;
        const avg = (xSin + ySin) / 2;
        return modRemap(avg, mod.modA, mod.modB);
    }
    if (mod.trigType === trigModTypes.tan.id) {
        const xTan = (Math.tan(x / mod.sineZoomX) + 1) / 2;
        const yTan = (Math.tan(y / mod.sineZoomY) + 1) / 2;
        const avg = (xTan + yTan) / 2;
        return modRemap(avg, mod.modA, mod.modB);
    }
    if (mod.trigType === trigModTypes.circles.id) {
        const xSin = (Math.sin(x / mod.sineZoomX) + 1) / 2;
        const ySin = (Math.sin(y / mod.sineZoomY) + 1) / 2;
        const avg = (xSin + ySin) / 2;
        return modRemap(Math.sin(avg), mod.modA, mod.modB);
    }
};