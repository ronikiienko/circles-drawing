import {getBiasedRandomNumber, getPointByDistanceAndAngle, hslArrToHsl} from '../generalUtils';
import {calculateModSums} from '../layerSettings/calculateModSums';
import {calculateModsResults} from './calculateModsResults';
import {calculatePosition} from './calculatePosition';


let last = {
    level: 0,
    x: 0,
    y: 0,
    direction: 0,
};
let branchIndex = 0;

export const getRandomizedShapeSettings = (settings, absoluteIndex) => {
    const isBranchElement = (
        settings.position.branchesOn &&
        settings.position.branchesLength > 0 &&
        settings.position.branchesLength >= last.level &&
        last.level !== 0 &&
        absoluteIndex !== 0
    );

    let xPosition;
    let yPosition;

    if (isBranchElement) {
        xPosition = last.x;
        yPosition = last.y;
    } else {
        if (absoluteIndex === 0) {
            branchIndex = 0;
        } else {
            branchIndex++;
        }
        const [x, y] = calculatePosition(settings, absoluteIndex, branchIndex);
        xPosition = x;
        yPosition = y;
        if (settings.position.branchesOn && settings.position.branchesLength > 0) {
            last = {
                level: 1,
                x: xPosition,
                y: yPosition,
                direction: getBiasedRandomNumber(0, 355),
            };
        }
    }


    const modsResults = calculateModsResults(settings, xPosition, yPosition, absoluteIndex, branchIndex);
    const modsSums = calculateModSums(modsResults, settings, xPosition, yPosition);

    let widthRatio = settings.shape.widthRatio + modsSums.widthRatio;
    let rectRoundness = settings.shape.rectRoundness + modsSums.rectRoundness;
    let size = settings.size.size + modsSums.size;
    let blur = settings.color.blur + modsSums.blur;
    let transp = settings.color.transp + modsSums.transp;
    let strokeTransp = settings.color.strokeTransp + modsSums.strokeTransp;
    let color = hslArrToHsl([
        settings.color.color[0] + modsSums.color[0],
        settings.color.color[1] + modsSums.color[1],
        settings.color.color[2] + modsSums.color[2],
    ], transp);
    let strokeColor = hslArrToHsl([
        settings.color.strokeColor[0] + modsSums.strokeColor[0],
        settings.color.strokeColor[1] + modsSums.strokeColor[1],
        settings.color.strokeColor[2] + modsSums.strokeColor[2],
    ], strokeTransp);
    // TODO if modsSum is empty array (or color array), it's NaN. maby check also color for such situation (and other)
    // console.log(angleModsSum, settings.shape.angle)
    let angle = settings.shape.angle + modsSums.angle;

    if (isBranchElement) {
        const modulatedMagnitude = settings.position.branchesMagnitude + modsSums.branchesMagnitude;
        const modulatedDirection = last.direction + modsSums.branchesDirectionDelta;
        const [x, y] = getPointByDistanceAndAngle(last.x, last.y, modulatedMagnitude, modulatedDirection);
        xPosition = x;
        yPosition = y;
        if (
            xPosition < settings.position.startPos.x ||
            xPosition > settings.position.endPos.x ||
            yPosition < settings.position.startPos.y ||
            yPosition > settings.position.endPos.y
        ) {
            last.level = 0;
        } else {
            last = {
                level: last.level + 1,
                x: xPosition,
                y: yPosition,
                direction: modulatedDirection,
            };
        }
    }

    xPosition = xPosition + modsSums.xOffset + settings.position.xOffset;
    yPosition = yPosition + modsSums.yOffset + settings.position.yOffset;


    return {
        size: {
            size: size,
        },
        shape: {
            shape: settings.shape.shape,
            angle: angle,
            widthRatio: widthRatio,
            rectRoundness: rectRoundness,
            customShape: settings.shape.customShape,
            strokeOn: settings.shape.strokeOn,
            fillOn: settings.shape.fillOn,
            strokeThickness: settings.shape.strokeThickness,
            pixelShape: settings.shape.pixelShape,
        },
        // maby round positions, but it causes grid when using chessPlate bias
        position: {
            // x: Math.floor(xPosition),
            // y: Math.floor(yPosition),
            x: xPosition,
            y: yPosition,
        },
        color: {
            color: color,
            strokeColor: strokeColor,
            glow: settings.color.glow,
            blur: blur,
            blurOn: settings.color.blurOn,
        },
    };
};