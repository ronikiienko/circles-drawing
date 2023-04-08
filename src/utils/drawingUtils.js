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

// TODO placement is wrong
export const drawPixelShape = (ctx, pixelMatrix, size, centerPoint = [0, 0]) => {
    const onePixelSize = size / pixelMatrix.length;
    for (let rowInd = 0; rowInd < pixelMatrix.length; rowInd++) {
        for (let columnInd = 0; columnInd < pixelMatrix.length; columnInd++) {
            if (pixelMatrix?.[rowInd]?.[columnInd]) {
                ctx.rect(
                    centerPoint[0] + onePixelSize * columnInd - size / 2,
                    centerPoint[1] + onePixelSize * rowInd - size / 2,
                    onePixelSize,
                    onePixelSize,
                );
            }
        }
    }
};