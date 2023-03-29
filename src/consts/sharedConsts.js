export const CMD = {
    initCanvas: 'INIT_CANVAS',
    drawLayer: 'DRAW_LAYER',
    undo: 'UNDO',
    redo: 'REDO',
    setCanvasPPI: 'SET_CANVAS_PPI',
    clear: 'CLEAR',
    stopDrawing: 'STOP_DRAWING',
    addToHistory: 'ADD_TO_HISTORY',
    getImageData: 'GET_IMAGE_DATA',
    setImageData: 'SET_IMAGE_DATA',
};

export const maxUndoTimes = 10;
export const biasTypes = {
    rectangular: 'rectangular',
    radial: 'radial',
    spiral: 'spiral',
    off: 'off',
};
export const biasSpiralTypes = {
    basic: 'basic',
    fourLeaf: 'fourLeaf',
    reducing: 'reducing',
    circles: 'circles',
    custom: 'custom',
};

export const shapeTypes = {
    circle: 'circle',
    rectangle: 'rectangle',
    line: 'line',
    random3: 'random3',
    random4: 'random4',
};

const randomPresetRules = {
    size: {
        size: {
            min: 0,
            max: 1,
        },
        sizeRand: {
            min: 0,
            max: 1,
        },
    },
    number: {
        number: {
            min: 0,
            max: 100,
        },
    },
    shape: {
        shape: ['li'],
    },
};