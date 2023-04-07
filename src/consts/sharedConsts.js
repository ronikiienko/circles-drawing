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

export const customShapeFlagsColorSettings = {
    s: '80%',
    l: '40%',
};