export const defaultSettings = {
    size: {
        size: '0.5',
        sizeRand: '0',
    },
    glow: {
        glow: '0',
    },
    transp: {
        transp: '1',
        transpRand: '0',
    },
    number: {
        number: '10',
    },
    shape: {
        shape: 'line',
        lineAngle: 0,
        lineAngleRand: 0,
        lineRatio: 0.2,
        lineRounded: false,
        lineRatioRand: 0.2,
        lineLookToOn: false,
        lineLookToX: 100,
        lineLookToY: 100,
    },
    position: {
        startX: '0',
        startY: '0',
        endX: window.innerWidth,
        endY: window.innerHeight,
        biasX: '100',
        biasY: '100',
        biasInf: '0',
    },
    color: {
        color: '#000000',
        colorRand: '0.4',
        isFullRand: false,
    },
};

export const highPPICanvasRatio = 1.5;