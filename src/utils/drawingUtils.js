import {getPointByDistanceAndAngle, getVectorByTwoPoints} from './generalUtils';


export const drawCustomShape = (ctx, centerPoint, pointsArray, angle, size) => {
    pointsArray.forEach((currentPoint, index) => {
        const [originalMagnitude, originalAngle] = getVectorByTwoPoints(
            0.5,
            0.5,
            currentPoint[0],
            currentPoint[1],
        );

        const actualAngle = originalAngle + angle;
        const actualMagnitude = originalMagnitude * size;
        const [actualX, actualY] = getPointByDistanceAndAngle(
            centerPoint[0],
            centerPoint[1],
            actualMagnitude,
            actualAngle,
        );

        if (index === 0) {
            ctx.moveTo(actualX, actualY);
        } else {
            ctx.lineTo(actualX, actualY);
        }
    });
};