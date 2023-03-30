import {CMD, maxUndoTimes, shapeTypes} from '../consts/sharedConsts';
import {db} from '../db';
import {getBiasedRandomNumber, getPointByDistanceAndAngle, turnDegreesToRadians, wait} from '../utils/generalUtils';
import {getRandomizedShapeSettings, getTranslatedAppSettings, getTranslatedLayerSettings} from '../utils/translaters';


let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let drawingStoppedFlag = false;
let isDrawingFlag = false;

// TODO needs more testing
// TODO problems when simultaneously not one (specifically history index is undefined in getHistoryIndex (fixed* by starting drawing only if previous finished)
// TODO when using brush, not letting drawing simultaneously may be very uncomfortable
class HistoryCareTaker {
    constructor() {
    }

    async #getHistoryIndex() {
        const firstItem = await db.table('appState').toCollection().first();
        return firstItem.historyIndex;
    }

    async #setHistoryIndex(newHistoryIndex) {
        const firstItem = await db.table('appState').toCollection().first();
        firstItem && await db.table('appState').where('historyIndex').equals(firstItem.historyIndex).delete();
        await db.table('appState').put({historyIndex: newHistoryIndex});
    }

    async #getHistoryLength() {
        return db.table('history').toCollection().count();
    }

    async add(snapshot) {
        await db.table('history').where('index').above(await this.#getHistoryIndex()).delete();

        if (await this.#getHistoryLength() > maxUndoTimes - 1) {
            const firstItem = await db.table('history').toCollection().first();
            await db.table('history').where('index').equals(firstItem.index).delete();
        }

        const newHistoryIndex = await db.table('history').put({data: snapshot});

        await this.#setHistoryIndex(newHistoryIndex);
    }

    async undo() {
        if (!await this.#getHistoryLength()) return;
        const currentHistoryIndex = await this.#getHistoryIndex();
        const prevItem = await db.table('history').where('index').below(currentHistoryIndex).last();
        if (!prevItem) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(prevItem.data, 0, 0);
        await this.#setHistoryIndex(prevItem.index);
    }

    async redo() {
        if (!await this.#getHistoryLength()) return;
        const currentHistoryIndex = await this.#getHistoryIndex();
        const nextItem = await db.table('history').where('index').above(currentHistoryIndex).first();
        if (!nextItem) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(nextItem.data, 0, 0);
        await this.#setHistoryIndex(nextItem.index);
    }

    async initHistoryIfNeeded(snapshot) {
        if (!(await db.table('history').toCollection().first())) {
            const newHistoryIndex = await db.table('history').put({
                data: snapshot,
            });
            await this.#setHistoryIndex(newHistoryIndex);
        }
    }

    async getCurrent() {
        const currentItem = await db.table('history').get(await this.#getHistoryIndex());
        return currentItem.data;
    }
}

const history = new HistoryCareTaker();

onmessage = async (event) => {
    const data = event.data;
    switch (event.data.cmd) {
        case CMD.initCanvas: {
            canvas = data.canvas;
            ctx = canvas.getContext('2d');
            await history.initHistoryIfNeeded(ctx.getImageData(0, 0, 20, 20));
            ctx.putImageData(await history.getCurrent(), 0, 0);
        }
            break;
        case CMD.drawLayer: {
            await drawLayer(data.settings, data.appSettings, data.addToHistory);
        }
            break;
        case CMD.addToHistory: {
            await history.add(ctx.getImageData(0, 0, canvasWidth * data.appSettings.resolutionMult, canvasHeight * data.appSettings.resolutionMult));
        }
            break;
        case CMD.undo: {
            history.undo();
        }
            break;
        case CMD.redo: {
            history.redo();
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
            await clear(data.appSettings);
        }
            break;
        case CMD.getImageData: {
            postMessage({
                cmd: CMD.getImageData,
                data: ctx.getImageData(0, 0, canvasWidth * data.appSettings.resolutionMult, canvasHeight * data.appSettings.resolutionMult),
            });
        }
            break;
        // case CMD.setImageData: {
        //
        // }
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
    if (settings.shape.shape === shapeTypes.circle) {
        ctx.arc(settings.position.x, settings.position.y, settings.size.size, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.rectangle) {
        if (settings.shape.rectRoundness) {
            ctx.roundRect(settings.position.x, settings.position.y, settings.size.size, settings.size.size, settings.shape.rectRoundness);
        } else {
            ctx.rect(settings.position.x, settings.position.y, settings.size.size, settings.size.size);
        }
        ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.line) {
        ctx.lineWidth = settings.size.size * settings.shape.widthRatio;
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
            settings.shape.angle,
        );
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if (settings.shape.shape === shapeTypes.ellipse) {
        const height = settings.size.size * settings.shape.widthRatio;

        ctx.ellipse(settings.position.x, settings.position.y, settings.size.size, height, turnDegreesToRadians(settings.shape.angle), 0, 2 * Math.PI);
        ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.random3 || settings.shape.shape === shapeTypes.random4) {
        ctx.moveTo(settings.position.x, settings.position.y);
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        if (settings.shape.shape === shapeTypes.random4) ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x, settings.position.y);
        ctx.fill();
    }
};

export const drawLayer = async (rawSettings, rawAppSettings, addToHistory) => {
    if (addToHistory && isDrawingFlag) return;
    isDrawingFlag = true;
    let settings = getTranslatedLayerSettings(rawSettings);
    const appSettings = getTranslatedAppSettings(rawAppSettings);


    ctx.globalCompositeOperation = settings.color.overlayMode;
    if (!settings.color.blur) ctx.filter = 'none';

    const waitInterval = appSettings.waitInterval;
    let lastWaited = 0;

    drawingStoppedFlag = false;

    for (let i = 0; i < settings.number.number; i++) {
        if (i - lastWaited === waitInterval) {
            await wait(4);
            lastWaited = i;
        }
        const randomizedShapeSettings = getRandomizedShapeSettings(settings, i);
        drawShape(randomizedShapeSettings);

        if (drawingStoppedFlag) {
            break;
        }
    }

    if (addToHistory) await history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));
    isDrawingFlag = false;
};

export const clear = async (appSettings) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    await history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes