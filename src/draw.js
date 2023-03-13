import FileSaver from 'file-saver';
import {highPPICanvasRatio} from './consts';
import {getBiasedRandomNumber, hexToRgbArray, turnDegreesToRadians, turnRadiansToDegrees} from './utils';


let canvasWidth;
let canvasHeight;
let history;
export const makeCanvasHighPPI = (width, height) => {
    const {canvas, ctx} = getCanvas();

    canvas.width = width * highPPICanvasRatio;
    canvas.height = height * highPPICanvasRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(highPPICanvasRatio, highPPICanvasRatio);

    canvasWidth = width;
    canvasHeight = height;
};

const getCanvas = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    return {canvas, ctx};
};

const drawShape = (ctx, settings) => {
    ctx.shadowBlur = settings.glow.glow;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = settings.color.color;
    ctx.strokeStyle = settings.color.color;
    ctx.shadowColor = settings.color.color;

    ctx.beginPath();
    if (settings.shape.shape === 'circle') {
        ctx.arc(settings.position.x, settings.position.y, settings.size.size, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if (settings.shape.shape === 'rectangle') {
        ctx.rect(settings.position.x, settings.position.y, settings.size.size, settings.size.size);
        ctx.fill();
    }
    if (settings.shape.shape === 'line') {
        ctx.lineWidth = settings.size.size * settings.shape.lineRatio;
        if (settings.shape.lineRounded) {
            ctx.lineCap = 'round';
        } else {
            ctx.lineCap = 'butt';
        }
        ctx.moveTo(settings.position.x, settings.position.y);
        let angle = settings.shape.lineAngle;
        const angleRad = turnDegreesToRadians(angle);
        const xOffset = Math.cos(angleRad) * settings.size.size;
        const yOffset = Math.sin(angleRad) * settings.size.size;
        ctx.lineTo(settings.position.x + xOffset, settings.position.y + yOffset);
        ctx.stroke();
    }
    if (settings.shape.shape === 'random3' || settings.shape.shape === 'random4') {
        ctx.moveTo(settings.position.x, settings.position.y);
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        if (settings.shape.shape === 'random4') ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x, settings.position.y);
        ctx.fill();
    }
};

const getTranslatedSettings = (rawSettings) => {
    // reused values
    const size = Math.pow(parseFloat(rawSettings.size.size) + 1, 9);
    const transp = parseFloat(rawSettings.transp.transp);

    return {
        size: {
            size: size,
            sizeRand: parseFloat(rawSettings.size.sizeRand) * size * 0.8,
        },
        glow: {
            glow: parseFloat(rawSettings.glow.glow) * 100,
        },
        transp: {
            transp: transp,
            transpRand: parseFloat(rawSettings.transp.transpRand) * transp,
        },
        number: {
            number: parseFloat(rawSettings.number.number),
        },
        shape: {
            shape: rawSettings.shape.shape,
            lineAngle: parseFloat(rawSettings.shape.lineAngle) * 360,
            lineAngleRand: parseFloat(rawSettings.shape.lineAngleRand),
            lineRatio: parseFloat(rawSettings.shape.lineRatio),
            lineRatioRand: parseFloat(rawSettings.shape.lineRatioRand),
            lineRounded: rawSettings.shape.lineRounded,
            lineLookToOn: rawSettings.shape.lineLookToOn,
            lineLookToX: rawSettings.shape.lineLookToX,
            lineLookToY: rawSettings.shape.lineLookToY,
        },
        position: {
            startX: parseFloat(rawSettings.position.startX),
            startY: parseFloat(rawSettings.position.startY),
            endX: parseFloat(rawSettings.position.endX),
            endY: parseFloat(rawSettings.position.endY),
            biasX: parseFloat(rawSettings.position.biasX),
            biasY: parseFloat(rawSettings.position.biasY),
            biasInf: parseFloat(rawSettings.position.biasInf),
            overlayMode: rawSettings.position.overlayMode,
        },
        color: {
            color: hexToRgbArray(rawSettings.color.color),
            colorRand: parseFloat(rawSettings.color.colorRand) * 100,
            isFullRand: rawSettings.color.isFullRand,
        },
    };
};

const getRandomizedShapeSettings = (settings) => {
    let color;
    const transp = settings.transp.transp + getBiasedRandomNumber(-settings.transp.transpRand, settings.transp.transpRand, 2);

    const xPosition = getBiasedRandomNumber(settings.position.startX, settings.position.endX, 0, settings.position.biasX, settings.position.biasInf);
    const yPosition = getBiasedRandomNumber(settings.position.startY, settings.position.endY, 0, settings.position.biasY, settings.position.biasInf);

    let lineAngle;
    if (settings.shape.lineLookToOn) {
        const lookToXOffset = settings.shape.lineLookToX - xPosition;
        const lookToYOffset = settings.shape.lineLookToY - yPosition;
        lineAngle = turnRadiansToDegrees(Math.atan(lookToYOffset / lookToXOffset));
        if (!lineAngle) console.log('settings:', settings, 'offsets:', lookToXOffset, lookToYOffset, lookToXOffset / lookToYOffset);
    } else {
        lineAngle = settings.shape.lineAngle;
    }


    if (!settings.color.isFullRand) {
        color = `rgba(
                ${settings.color.color[0] + getBiasedRandomNumber(-settings.color.colorRand, settings.color.colorRand, 2)}, 
                ${settings.color.color[1] + getBiasedRandomNumber(-settings.color.colorRand, settings.color.colorRand, 2)}, 
                ${settings.color.color[2] + getBiasedRandomNumber(-settings.color.colorRand, settings.color.colorRand, 2)}, 
                ${transp}
            )`;
    } else {
        color = `rgba(
                ${getBiasedRandomNumber(0, 255)}, 
                ${getBiasedRandomNumber(0, 255)}, 
                ${getBiasedRandomNumber(0, 255)}, 
                ${transp}
            )`;
    }
    return {
        size: {
            size: settings.size.size + getBiasedRandomNumber(-settings.size.sizeRand, settings.size.sizeRand, 2),
        },
        glow: {
            glow: settings.glow.glow,
        },
        transp: {
            transp: transp,
        },
        shape: {
            shape: settings.shape.shape,
            lineAngle: lineAngle + getBiasedRandomNumber(-10, 10) * (Math.pow(settings.shape.lineAngleRand + 1, 3) - 1),
            lineRatio: settings.shape.lineRatio + getBiasedRandomNumber(-1, 1) * 0.2 * settings.shape.lineRatioRand,
            lineRounded: settings.shape.lineRounded,
        },
        position: {
            x: xPosition,
            y: yPosition,
        },
        color: {
            color: color,
        },
    };
};

export const draw = (rawSettings) => {
    const {canvas, ctx} = getCanvas();
    history = ctx.getImageData(0, 0, canvasWidth * highPPICanvasRatio, canvasHeight * highPPICanvasRatio);
    const settings = getTranslatedSettings(rawSettings);

    ctx.globalCompositeOperation = settings.position.overlayMode;

    for (let i = 0; i < settings.number.number; i++) {
        const randomizedShapeSettings = getRandomizedShapeSettings(settings);
        drawShape(ctx, randomizedShapeSettings);
    }
};

export const undo = async () => {
    const {canvas, ctx} = getCanvas();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.putImageData(history, 0, 0);
    history = null;
};

export const clear = () => {
    const {canvas, ctx} = getCanvas();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

export const saveAsImage = () => {
    const {canvas, ctx} = getCanvas();
    const dataUrl = canvas.toDataURL('image/jpeg');
    FileSaver.saveAs(dataUrl, `drawing${Date.now()}.jpeg`);
    console.log('hi');
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes