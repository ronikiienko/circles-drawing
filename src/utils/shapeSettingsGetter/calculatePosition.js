import {biasSpiralTypes, biasTypes} from '../../consts/sharedConsts';
import {getBiasedRandomNumber, getPointByDistanceAndAngle, turnDegreesToRadians} from '../generalUtils';


export const calculatePosition = (settings, absoluteIndex, branchIndex) => {
    const realBiasX = settings.brush.brushOn ? settings.brush.brushPos.x : settings.position.biasPos.x;
    const realBiasY = settings.brush.brushOn ? settings.brush.brushPos.y : settings.position.biasPos.y;
    switch (settings.position.biasType) {
        case biasTypes.off.id: {
            return [
                getBiasedRandomNumber(settings.position.startPos.x, settings.position.endPos.x),
                getBiasedRandomNumber(settings.position.startPos.y, settings.position.endPos.y),
            ];
        }
        case biasTypes.rectangular.id: {
            const x = getBiasedRandomNumber(
                settings.position.startPos.x,
                settings.position.endPos.x,
                0,
                settings.position.biasRectXOn ? {
                    bias: settings.position.biasPos.x,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                } : undefined,
            );
            const y = getBiasedRandomNumber(
                settings.position.startPos.y,
                settings.position.endPos.y,
                0,
                settings.position.biasRectYOn ? {
                    bias: settings.position.biasPos.y,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                } : undefined,
            );
            return [x, y];
        }
        case biasTypes.radial.id: {
            const angle = getBiasedRandomNumber(0, 359);

            const diapason = Math.pow(settings.position.biasRadius, 2);

            const distanceFromBias = Math.pow(
                getBiasedRandomNumber(
                    0,
                    diapason,
                    0,
                    {
                        bias: 0,
                        biasA: settings.position.biasA,
                        biasB: settings.position.biasB,
                        biasInf: settings.position.biasInf,
                    },
                ),
                1 / 2,
            );

            const [
                x,
                y,
            ] = getPointByDistanceAndAngle(
                realBiasX,
                realBiasY,
                distanceFromBias,
                angle,
            );
            return [x, y];
        }
        case biasTypes.spiral.id: {
            const spinI = Math.trunc(branchIndex / settings.position.biasSpiralThickness);
            const angle = spinI * settings.position.biasSpiralDensity;
            const angleRad = turnDegreesToRadians(angle);

            let distanceFromBias;

            switch (settings.position.biasSpiralType) {
                case biasSpiralTypes.basic.id: {
                    distanceFromBias = Math.pow(angleRad, 1);
                }
                    break;
                case biasSpiralTypes.fourLeaf.id: {
                    distanceFromBias = angleRad * Math.sin(angleRad * 2);
                }
                    break;
                case biasSpiralTypes.reducing.id: {
                    distanceFromBias = Math.pow(angleRad, 1 / 2) * 20;
                }
                    break;
                case biasSpiralTypes.circles.id: {
                    distanceFromBias = angleRad * 4 * Math.cos(Math.pow(angleRad, 1 / 1.2));
                }
                    break;
                case biasSpiralTypes.custom.id: {
                    try {
                        distanceFromBias = eval(String(settings.position.biasSpiralCustom));
                    } catch (e) {
                        distanceFromBias = 0;
                    }
                }
            }
            distanceFromBias = distanceFromBias * settings.position.biasSpiralMult;
            let radius = getBiasedRandomNumber(distanceFromBias - settings.position.biasSpiralSpread, distanceFromBias + settings.position.biasSpiralSpread, 0, {
                bias: distanceFromBias,
                biasA: settings.position.biasA,
                biasB: settings.position.biasB,
                biasInf: settings.position.biasInf,
            });
            const [
                x,
                y,
            ] = getPointByDistanceAndAngle(realBiasX, realBiasY, radius, getBiasedRandomNumber(angle - settings.position.biasSpiralAngleRand, angle + settings.position.biasSpiralAngleRand, 2));
            return [x, y];
        }
        case biasTypes.chessPlate.id: {
            const fieldWidth = settings.position.endPos.x - settings.position.startPos.x;
            const fieldHeight = settings.position.endPos.y - settings.position.startPos.y;
            // TODO maby replace Math.trunc with Math.floor everywhere
            const rowIndex = Math.trunc(branchIndex / settings.position.chessPlateWidth);
            const colIndex = Math.trunc(branchIndex - rowIndex * settings.position.chessPlateWidth);
            const xDistance = fieldWidth / (settings.position.chessPlateWidth - 1);
            const yDistance = fieldHeight / (settings.position.chessPlateHeight - 1);
            return [xDistance * colIndex + settings.position.startPos.x, yDistance * rowIndex + settings.position.startPos.y];
        }
    }
};
