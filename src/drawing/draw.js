import {saveAs} from 'file-saver';
import {save} from 'save-file';
import {CMD} from '../consts/sharedConsts';


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

export const drawLayer = (settings, appSettings, addToHistory = true) => {
    worker.postMessage({cmd: CMD.drawLayer, settings, appSettings, addToHistory});
};

export const addToHistory = (appSettings) => {
    worker.postMessage({cmd: CMD.addToHistory, appSettings});
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

export const clearCanvas = (appSettings) => {
    worker.postMessage({cmd: CMD.clear, appSettings});
};

export const saveAsImage = (name, png) => {
    const type = png ? '' : 'image/jpeg';
    const fileExt = png ? '.png' : '.jpeg';
    const dataUrl = canvas.toDataURL(type);
    saveAs(dataUrl, `${name}${fileExt}`);
};


// TODO not working
export const saveAsImageData = async (name, appSettings) => {
    const imageData = await getImageData(appSettings);
    console.log(imageData);
    // // const txt = JSON.stringify(imageData);
    // // console.log(txt);
    // const blob = new Blob([imageData.data], {type: 'application/octet-stream'});
    // console.log(blob);
    // saveAs(blob, `${getRandomName()}.mde`);

    save(imageData, `${name}.mde`);
};

export const getImageData = (appSettings) => {
    return new Promise(resolve => {
        worker.postMessage({cmd: CMD.getImageData, appSettings});
        worker.onmessage = (event) => {
            if (event.data.cmd === CMD.getImageData) resolve(event.data.data);
        };
    });
};

// export const setImageData = (imageData) => {
//     worker.postMessage({cmd: CMD.setImageData})
// }



