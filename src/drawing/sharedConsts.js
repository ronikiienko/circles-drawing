export const CMD = {
    initCanvas: 'INIT_CANVAS',
    drawLayer: 'DRAW_LAYER',
    undo: 'UNDO',
    setCanvasPPI: 'SET_CANVAS_PPI',
    clear: 'CLEAR',
    stopDrawing: 'STOP_DRAWING',
};

export const maxUndoTimes = 10;
export const biasTypes = {
    rectangular: 'rectangular',
    radial: 'radial',
    spiral: 'spiral',
};
export const biasSpiralTypes = {
    basic: 'basic',
    fourLeaf: 'fourLeaf',
    reducing: 'reducing',
    circles: 'circles',
    custom: 'custom',
};