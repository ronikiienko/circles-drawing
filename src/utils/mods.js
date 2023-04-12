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
    console.log(ratio);
    return ratio;
};