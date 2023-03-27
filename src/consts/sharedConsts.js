export const CMD = {
    initCanvas: 'INIT_CANVAS',
    drawLayer: 'DRAW_LAYER',
    undo: 'UNDO',
    redo: 'REDO',
    setCanvasPPI: 'SET_CANVAS_PPI',
    clear: 'CLEAR',
    stopDrawing: 'STOP_DRAWING',
    addToHistory: 'ADD_TO_HISTORY',
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