import {getPointByDistanceAndAngle, hslArrToHsl} from '../generalUtils';
import {calculateModsResults} from './calculateModsResults';
import {calculateModSums} from './calculateModSums';
import {calculatePosition} from './calculatePosition';

// TODO reset between different layers (use absoluteIndex probably)
let next = {
    level: 0,
    x: 0,
    y: 0,
    direction: 0,
    isBranchElement: false,
    branchIndex: 0,
};

export const getRandomizedShapeSettings = async (settings, absoluteIndex) => {
    let xPosition;
    let yPosition;

    if (absoluteIndex === 0) {
        next = {
            level: 0,
            x: 0,
            y: 0,
            direction: 0,
            isBranchElement: false,
            branchIndex: 0,
        };
    }
    if (next.isBranchElement && absoluteIndex !== 0) {
        xPosition = next.x;
        yPosition = next.y;
    } else {
        const [x, y] = calculatePosition(settings, absoluteIndex, next.branchIndex);
        xPosition = x;
        yPosition = y;
        next.branchIndex++;
    }


    const modsResults = await calculateModsResults(settings, xPosition, yPosition, absoluteIndex, next.branchIndex, next.level);
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
    let angle = settings.shape.angle + modsSums.angle;
    xPosition = xPosition + modsSums.xOffset + settings.position.xOffset;
    yPosition = yPosition + modsSums.yOffset + settings.position.yOffset;


    const isNextBranchElement = (
        settings.position.branchesOn &&
        settings.position.branchesLength > 0 &&
        next.level + 1 < settings.position.branchesLength &&
        next.level + 1 > 0
    );
    if (isNextBranchElement) {
        // TODO use branch direction here too
        const modulatedMagnitude = settings.position.branchesMagnitude + modsSums.branchesMagnitude;
        const modulatedDirection = absoluteIndex === 0 ? settings.position.branchesDirection + modsSums.branchesDirection : next.direction + modsSums.branchesDirectionDelta;
        let nextPos;
        if (next.isBranchElement) nextPos = getPointByDistanceAndAngle(next.x, next.y, modulatedMagnitude, modulatedDirection);
        else nextPos = getPointByDistanceAndAngle(xPosition, yPosition, modulatedMagnitude, modulatedDirection);
        next = {
            level: next.level + 1,
            x: nextPos[0],
            y: nextPos[1],
            direction: modulatedDirection,
            isBranchElement: true,
            branchIndex: next.branchIndex,
        };
    } else {
        next = {
            level: 0,
            x: null,
            y: null,
            direction: settings.position.branchesDirection + modsSums.branchesDirection,
            isBranchElement: false,
            branchIndex: next.branchIndex,
        };
    }


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