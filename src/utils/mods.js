import {getVectorByTwoPoints, modRemap} from './generalUtils';


export const radialMod = (x, y, mod) => {
    const [distanceFromCenterToPoint] = getVectorByTwoPoints(mod.radialCenterX, mod.radialCenterY, x, y);
    const [radius] = getVectorByTwoPoints(mod.radialCenterX, mod.radialCenterY, mod.radialRadiusX, mod.radialRadiusY);
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
    return modRemap((mod.perlin(x / 500, y / 500) + 1) / 2, mod.modA, mod.modB);
};