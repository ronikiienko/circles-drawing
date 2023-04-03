import {CMD, maxUndoTimes, shapeTypes} from '../consts/sharedConsts';
import {db} from '../db';
import {drawCustomShape} from '../utils/drawingUtils';
import {getBiasedRandomNumber, turnDegreesToRadians} from '../utils/generalUtils';
import {getRandomizedShapeSettings, getTranslatedAppSettings, getTranslatedLayerSettings} from '../utils/translaters';


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

const makeCanvasHighPPI = (width, height, resolutionMult) => {

    canvas.width = width * resolutionMult;
    canvas.height = height * resolutionMult;

    ctx.scale(resolutionMult, resolutionMult);

    canvasWidth = width;
    canvasHeight = height;
};

const drawShape = (settings) => {
    if (settings.color.blurOn) ctx.filter = `blur(${settings.color.blur}px)`;
    ctx.shadowBlur = settings.color.glow;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = settings.color.color;
    ctx.strokeStyle = settings.color.strokeColor;
    ctx.shadowColor = settings.color.color;

    if (settings.shape.shape !== shapeTypes.line && settings.shape.strokeOn) ctx.lineWidth = settings.size.size * settings.shape.strokeThickness;

    ctx.beginPath();
    if (settings.shape.shape === shapeTypes.custom) {
        drawCustomShape(ctx, [settings.position.x, settings.position.y], settings.shape.customShape, settings.shape.angle, settings.size.size);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.circle) {
        ctx.arc(settings.position.x, settings.position.y, settings.size.size, 0, Math.PI * 2, true);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.rectangle) {
        ctx.save();
        ctx.translate(settings.position.x - settings.size.size / 2, settings.position.y - settings.size.size / 2);
        ctx.rotate(turnDegreesToRadians(settings.shape.angle));
        if (settings.shape.rectRoundness) {
            ctx.roundRect(0, 0, settings.size.size, settings.size.size, settings.shape.rectRoundness);
        } else {
            ctx.rect(0, 0, settings.size.size, settings.size.size);
        }
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
        ctx.restore();
    }
    if (settings.shape.shape === shapeTypes.line) {
        // TODO if shape is line, use fill color instead of stroke color
        ctx.lineWidth = settings.size.size * settings.shape.widthRatio;
        if (settings.shape.lineRounded) {
            ctx.lineCap = 'round';
        } else {
            ctx.lineCap = 'butt';
        }
        ctx.save();
        ctx.translate(settings.position.x, settings.position.y);
        ctx.rotate(turnDegreesToRadians(settings.shape.angle));

        ctx.moveTo(-settings.size.size, 0);
        ctx.lineTo(settings.size.size, 0);

        ctx.stroke();
        ctx.restore();
    }
    if (settings.shape.shape === shapeTypes.ellipse) {
        const height = settings.size.size * settings.shape.widthRatio;

        ctx.ellipse(settings.position.x, settings.position.y, settings.size.size, height, turnDegreesToRadians(settings.shape.angle), 0, 2 * Math.PI);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.random3 || settings.shape.shape === shapeTypes.random4) {
        ctx.moveTo(settings.position.x, settings.position.y);
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        if (settings.shape.shape === shapeTypes.random4) ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x, settings.position.y);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
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
        if (isDrawingFlag) return;
        isDrawingFlag = true;

        const number = settings.number.number;

        const targetFps = 60;

        const drawShapes = (startIndex, endIndex) => {
            for (let i = startIndex; i < endIndex; i++) {
                const randomizedShapeSettings = getRandomizedShapeSettings(settings, i);
                drawShape(randomizedShapeSettings);
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
            let shapesPerFrame = Math.round(Math.max(Math.min(maxShapesToMaintainFpsAltered, number - maxShapesToMaintainFpsAltered), 1));

            console.log(currentFps, shapesPerFrame);

            const endIndex = shapesDrawn + shapesPerFrame;
            drawShapes(shapesDrawn, endIndex);

            if (endIndex < number && isDrawingFlag) {
                requestAnimationFrame((newTimestamp) => scheduleFrame(newTimestamp, endIndex));
            } else {
                if (addToHistory) {
                    history.add(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult))
                        .then(() => isDrawingFlag = false);
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