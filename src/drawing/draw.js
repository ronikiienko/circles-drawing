import {saveAs} from 'file-saver';
import {CMD} from '../consts/sharedConsts';
import {getRandomName} from '../nameGenerator';


let worker;
let canvas;

export const initializeOffscreenCanvas = () => {
    canvas = document.querySelector('canvas');
    worker = new Worker(
        new URL('canvasWorker.js', import.meta.url),
        {type: 'module'},
    );
    const canvasWorker = canvas.transferControlToOffscreen();
    worker.postMessage({cmd: CMD.initCanvas, canvas: canvasWorker}, [canvasWorker]);
};

export const drawLayer = (rawSettings, rawAppSettings, addToHistory = true) => {
    worker.postMessage({cmd: CMD.drawLayer, rawSettings, rawAppSettings, addToHistory});
};

export const addToHistory = (rawAppSettings) => {
    worker.postMessage({cmd: CMD.addToHistory, rawAppSettings});
};

export const stopDrawing = () => {
    worker.postMessage({cmd: CMD.stopDrawing});
};

export const undo = () => {
    worker.postMessage({cmd: CMD.undo});
};

export const redo = () => {
    worker.postMessage({cmd: CMD.redo});
};

export const setCanvasResolution = (width, height, resolutionMult, canvasElement) => {
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';
    worker.postMessage({cmd: CMD.setCanvasPPI, width, height, resolutionMult});
};

export const clear = () => {
    worker.postMessage({cmd: CMD.clear});
};

export const saveAsImage = (png) => {
    console.log(png);
    const type = png ? '' : 'image/jpeg';
    const fileExt = png ? '.png' : '.jpeg';
    console.log('canvas', canvas);
    const dataUrl = canvas.toDataURL(type);
    saveAs(dataUrl, `${getRandomName()}${fileExt}`);
    console.log('hi');
};




