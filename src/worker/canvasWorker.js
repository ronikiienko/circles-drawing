import {CMD, maxUndoTimes} from '../consts/sharedConsts';
import {db} from '../db';
import {getTranslatedAppSettings} from '../utils/appSettings/translater';
import {getTranslatedLayerSettings} from '../utils/layerSettings/translater';
import {getRandomizedShapeSettings} from '../utils/shapeSettingsGetter/shapeSettingsGetter';
import {drawShape} from './drawShape';


let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

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
            isDrawingFlag = false;
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

const sendProgressMessage = (progress) => {
    postMessage({
        cmd: CMD.progress,
        data: progress,
    });
};

const makeCanvasHighPPI = (width, height, resolutionMult) => {

    canvas.width = width * resolutionMult;
    canvas.height = height * resolutionMult;

    ctx.scale(resolutionMult, resolutionMult);

    canvasWidth = width;
    canvasHeight = height;
};

export const drawLayer = async (rawSettings, rawAppSettings, addToHistory) => {
    if (isDrawingFlag) return;
    // if (addToHistory && isDrawingFlag) return;
    let settings = getTranslatedLayerSettings(rawSettings);
    const appSettings = getTranslatedAppSettings(rawAppSettings);


    ctx.globalCompositeOperation = settings.color.overlayMode;
    if (!settings.color.blurOn) ctx.filter = 'none';

    const smartDraw = () => {
        // TODO use drawing speed as max number of shapes per frame
        isDrawingFlag = true;

        const number = settings.number.number;
        const sendProgressInterval = Math.max(number / 50, 2);

        const targetFps = 60;

        const drawShapes = (startIndex, endIndex) => {
            for (let i = startIndex; i < endIndex; i++) {
                if (i % sendProgressInterval === 0) sendProgressMessage(i / number);
                const randomizedShapeSettings = getRandomizedShapeSettings(settings, i);
                drawShape(ctx, randomizedShapeSettings);
            }
        };
        const scheduleFrame = (timestamp, shapesDrawn, init) => {
            const elapsedTime = timestamp - prevTimestamp;
            const currentFps = 1000 / elapsedTime;

            const maxShapesToMaintainFps = currentFps / targetFps * (shapesDrawn - prevShapesDrawn);
            let maxShapesToMaintainFpsAltered;
            if (init) {
                maxShapesToMaintainFpsAltered = 1;
            } else if (currentFps < 10) {
                maxShapesToMaintainFpsAltered = 1;
            } else if (maxShapesToMaintainFps < 50) {
                maxShapesToMaintainFpsAltered = maxShapesToMaintainFps + 0.5;
            } else if (maxShapesToMaintainFps < 100) {
                maxShapesToMaintainFpsAltered = maxShapesToMaintainFps + 5;
            } else if (maxShapesToMaintainFps >= 100) {
                maxShapesToMaintainFpsAltered = maxShapesToMaintainFps + 10;
            }
            let shapesPerFrame = Math.round(Math.max(Math.min(maxShapesToMaintainFpsAltered, number - shapesDrawn), 1));

            const endIndex = shapesDrawn + shapesPerFrame;
            drawShapes(shapesDrawn, endIndex);

            if (endIndex < number && isDrawingFlag) {
                requestAnimationFrame((newTimestamp) => scheduleFrame(newTimestamp, endIndex));
            } else {
                if (addToHistory) {
                    history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult))
                        .then(() => isDrawingFlag = false);
                } else {
                    isDrawingFlag = false;
                }
            }

            prevTimestamp = timestamp;
            prevShapesDrawn = shapesDrawn;
        };

        let prevTimestamp = 0;
        let prevShapesDrawn = 0;

        requestAnimationFrame((timestamp) => scheduleFrame(timestamp, 0, true));
    };
    smartDraw();
};


export const clear = async (appSettings) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    await history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes