export const layerPresets = {
    default: {
        meta: {
            name: 'Default',
            description: 'Default lines!!!!!',
        },
        size: {
            size: '0.5',
            sizeRand: '0',
        },
        glow: {
            glow: '0',
        },
        transp: {
            transp: '0.7',
            transpRand: '0.2',
        },
        number: {
            number: '10',
        },
        shape: {
            shape: 'line',
            lineAngle: 30 / 360,
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
            overlayMode: 'source-over',
        },
        color: {
            color: '#FF00DD',
            colorRand: '0.4',
            isFullRand: false,
        },
    },
    solidBg: {
        meta: {
            name: 'Solid background',
            description: 'Big rectangles for creating solid background!',
        },
        size: {
            size: '1',
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
            number: '1000',
        },
        shape: {
            shape: 'circle',
            lineAngle: 30 / 360,
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
            overlayMode: 'destination-over',
        },
        color: {
            color: '#FFAFFF',
            colorRand: '0',
            isFullRand: false,
        },
    },
};

export const defaultBackgroundSettings = {
    color: '#FFFFFF',
};

export const overlayModes = [
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'lighter',
    'copy',
    'xor',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export const highPPICanvasRatio = window.devicePixelRatio;