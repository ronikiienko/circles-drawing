import {getLastState, setLastState} from '../consts/db';
import {CMD, maxUndoTimes} from '../consts/sharedConsts';
import {getBiasedRandomNumber, getPointByDistanceAndAngle, wait} from '../utils';
import {getRandomizedShapeSettings, getTranslatedAppSettings, getTranslatedLayerSettings} from './translaters';


let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let drawingStoppedFlag = false;

class HistoryCareTaker {
    mementos = [];
    currentIndex = 0;

    constructor() {
    }

    add(snapshot) {
        this.mementos.splice(this.currentIndex + 1);
        if (this.mementos.length > maxUndoTimes - 1) this.mementos.shift();
        this.mementos.push(snapshot);
        this.currentIndex = this.mementos.length - 1;
        setLastState(snapshot);
        console.log('ADD', 'current index:', this.currentIndex);
    }

    undo(rawAppSettings) {
        if (!this.mementos.length || this.currentIndex - 1 < 0) return;
        this.currentIndex--;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(this.mementos[this.currentIndex], 0, 0);
        setLastState(ctx.getImageData(0, 0, canvasWidth * rawAppSettings.resolutionMult, canvasHeight * rawAppSettings.resolutionMult));
        console.log('UNDO', 'current index:', this.currentIndex);
    }

    redo(rawAppSettings) {
        if (!this.mementos.length || !this.mementos[this.currentIndex + 1]) return;
        this.currentIndex++;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(this.mementos[this.currentIndex], 0, 0);
        setLastState(ctx.getImageData(0, 0, canvasWidth * rawAppSettings.resolutionMult, canvasHeight * rawAppSettings.resolutionMult));
        console.log('REDO', 'current index:', this.currentIndex);
    }
}

const history = new HistoryCareTaker();

onmessage = async (event) => {
    const data = event.data;
    switch (event.data.cmd) {
        case CMD.initCanvas: {
            canvas = data.canvas;
            ctx = canvas.getContext('2d');
            const lastState = await getLastState();
            if (lastState) ctx.putImageData(await getLastState(), 0, 0);
            history.add(lastState);
        }
            break;
        case CMD.drawLayer: {
            drawLayer(data.rawSettings, data.rawAppSettings);
        }
            break;
        case CMD.undo: {
            history.undo(data.rawAppSettings);
        }
            break;
        case CMD.redo: {
            history.redo(data.rawAppSettings);
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

    history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));
};

export const clear = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes