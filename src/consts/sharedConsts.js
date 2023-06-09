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
    progress: 'PROGRESS',
};

export const progressStatuses = {
    finished: {
        id: 'finished',
        name: 'Finished',
    },
    drawing: {
        id: 'drawing',
        name: 'Drawing',
    },
    saving: {
        id: 'saving',
        name: 'Saving',
    },
    loading: {
        id: 'loading',
        name: 'Loading',
    },
};

export const maxUndoTimes = 10;
export const biasTypes = {
    rectangular: {
        id: 'rectangular',
        name: 'Rectangular',
    },
    radial: {
        id: 'radial',
        name: 'Radial',
    },
    spiral: {
        id: 'spiral',
        name: 'Spiral',
    },
    off: {
        id: 'off',
        name: 'Off',
    },
    chessPlate: {
        id: 'chessPlate',
        name: 'Chess plate',
    },
};
export const biasSpiralTypes = {
    basic: {
        id: 'basic',
        name: 'Basic',
    },
    fourLeaf: {
        id: 'fourLeaf',
        name: 'Four Leaf',
    },
    reducing: {
        id: 'reducing',
        name: 'Reducing',
    },
    circles: {
        id: 'circles',
        name: 'Circles',
    },
    custom: {
        id: 'custom',
        name: 'Custom',
    },
};

// angleRad * Math.pow( Math.cos(angleRad), 1))
// angleRad * Math.asin(Math.pow( Math.cos(angleRad), 1))
// angleRad * Math.acos(Math.pow( Math.cos(angleRad), 1))
// angleRad * Math.acos(Math.pow( Math.cos(angleRad), 2))
// angleRad * Math.acos(Math.pow( Math.cos(angleRad), 1/2))

export const shapeTypes = {
    circle: 'circle',
    rectangle: 'rectangle',
    random3: 'random3',
    random4: 'random4',
    ellipse: 'ellipse',
    custom: 'custom',
    pixel: 'pixel',
};

export const pixelShapeBrushTypes = {
    pencil: 'pencil',
    eraser: 'eraser',
};

export const modTypes = {
    radial: {
        id: 'radial',
        name: 'Radial',
    },
    noise: {
        id: 'noise',
        name: 'Noise',
    },
    index: {
        id: 'index',
        name: 'By index',
    },
    trig: {
        id: 'trig',
        name: 'Trigonometry',
    },
    rays: {
        id: 'rays',
        name: 'Rays',
    },
};

export const trigModTypes = {
    sine: {
        id: 'sine',
        name: 'Sine',
    },
    tan: {
        id: 'tan',
        name: 'Tan',
    },
    circles: {
        id: 'circles',
        name: 'Circles',
    },
    test: {
        id: 'test',
        name: 'Test',
    },
};

export const indexModTypes = {
    absoluteIndex: {
        id: 'absoluteIndex',
        name: 'Absolute index',
    },
    indexInBranch: {
        id: 'indexInBranch',
        name: 'Index in branch',
    },
};

export const noiseTypes = {
    perlin: {
        id: 'perlin',
        name: 'Perlin noise',
    },
    random: {
        id: 'random',
        name: 'Random noise',
    },
    value: {
        id: 'value',
        name: 'Value noise',
    },
    worley: {
        id: 'worley',
        name: 'Worley noise',
    },
};

export const worleyNoiseMetricTypes = {
    euclidean: {
        id: 'euclidean',
        name: 'Euclidean',
    },
    manhattan: {
        id: 'manhattan',
        name: 'Manhattan',
    },
    minkowski: {
        id: 'minkowski',
        name: 'Minkowski',
    },
};