import {CMD, maxUndoTimes} from '../consts/sharedConsts';
import {getBiasedRandomNumber, getPointByDistanceAndAngle, wait} from '../utils';
import {getRandomizedShapeSettings, getTranslatedAppSettings, getTranslatedLayerSettings} from './translaters';


let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let drawingStoppedFlag = false;

const history = [];

onmessage = async (event) => {
    const data = event.data;
    switch (event.data.cmd) {
        case CMD.initCanvas: {
            canvas = data.canvas;
            ctx = canvas.getContext('2d');
        }
            break;
        case CMD.drawLayer: {
            drawLayer(data.rawSettings, data.rawAppSettings);
        }
            break;
        case CMD.undo: {
            undo();
        }
            break;
        case CMD.setCanvasPPI: {
            makeCanvasHighPPI(data.width, data.height, data.resolutionMult);
        }
            break;
        case CMD.stopDrawing: {
            drawingStoppedFlag = true;
        }
            break;
        case CMD.clear: {
            clear();
        }
            break;
    }
};

// const db = new Dexie("history")
//
// db.version(1).stores({
//     history: '++ind'
// })
//
// export const pushToHistory = (data) => {
//     return db.table('history').put(data)
// }
//
// export const getUndo = () => {
//     return db.table('history').orderBy('ind').last()
// }
//
// getUndo()
//     .then(value => console.log(value))

export const makeCanvasHighPPI = (width, height, resolutionMult) => {
    canvas.width = width * resolutionMult;
    canvas.height = height * resolutionMult;

    ctx.scale(resolutionMult, resolutionMult);

    canvasWidth = width;
    canvasHeight = height;
};

const drawShape = (settings) => {
    if (settings.color.blur) ctx.filter = `blur(${settings.color.blur}px)`;
    ctx.shadowBlur = settings.color.glow;
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

        const {x, y} = getPointByDistanceAndAngle(
            settings.position.x,
            settings.position.y,
            settings.size.size,
            settings.shape.lineAngle,
        );
        ctx.lineTo(x, y);
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

export const drawLayer = async (rawSettings, rawAppSettings) => {
    let settings = getTranslatedLayerSettings(rawSettings);
    const appSettings = getTranslatedAppSettings(rawAppSettings);

    if (history.length > maxUndoTimes - 1) history.shift();
    // pushToHistory(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult))
    history.push(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));

    ctx.globalCompositeOperation = settings.color.overlayMode;
    if (!settings.color.blur) ctx.filter = 'none';

    const waitInterval = appSettings.waitInterval;
    let lastWaited = 0;

    for (let i = 0; i < settings.number.number; i++) {
        if (i - lastWaited === waitInterval) {
            await wait(4);
            lastWaited = i;
        }
        const randomizedShapeSettings = getRandomizedShapeSettings(settings, i);
        drawShape(randomizedShapeSettings);

        if (drawingStoppedFlag) {
            drawingStoppedFlag = false;
            break;
        }
    }
};

export const undo = async () => {
    if (!history.length) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.putImageData(history[history.length - 1], 0, 0);
    history.pop();
};

export const clear = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes