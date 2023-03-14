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
            description: 'Big circles for creating solid background!',
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
            overlayMode: 'source-over',
        },
        color: {
            color: '#FFAFFF',
            colorRand: '0',
            isFullRand: false,
        },
    },
    rain: {
        meta: {
            name: 'Rain',
            description: 'Reminds me of minecraft rain!',
        },
        size: {
            size: '0.4',
            sizeRand: '1',
        },
        glow: {
            glow: '0.4',
        },
        transp: {
            transp: '0.5',
            transpRand: '1',
        },
        number: {
            number: '1000',
        },
        shape: {
            shape: 'line',
            lineAngle: 70 / 360,
            lineAngleRand: 0.1,
            lineRatio: 0.1,
            lineRounded: false,
            lineRatioRand: 0.1,
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
            color: '#0036ff',
            colorRand: '0.5',
            isFullRand: false,
        },
    },
    littleCircles: {
        'meta': {
            'name': 'Little circles',
            'description': 'Soft background. Circles with feeling of depth!',
        },
        'size': {
            'size': '0.13',
            'sizeRand': '1',
        },
        'glow': {
            'glow': '0.6',
        },
        'transp': {
            'transp': '0.55',
            'transpRand': '1',
        },
        'number': {
            'number': '1000',
        },
        'shape': {
            'shape': 'circle',
            'lineAngle': 0.08333333333333333,
            'lineAngleRand': 0,
            'lineRatio': 0.2,
            'lineRounded': false,
            'lineRatioRand': 0.2,
            'lineLookToOn': false,
            'lineLookToX': 100,
            'lineLookToY': 100,
        },
        'position': {
            'startX': '0',
            'startY': '0',
            'endX': window.innerWidth,
            'endY': window.innerHeight,
            'biasX': '100',
            'biasY': '100',
            'biasInf': '0',
            'overlayMode': 'source-over',
        },
        'color': {
            'color': '#ff0000',
            'colorRand': '0.54',
            'isFullRand': false,
        },
    },
    bacteriaAttack: {
        'meta': {
            'name': 'Bacteria attack',
            'description': 'Rounded lines, all looking (going) to one point',
        },
        'size': {
            'size': '0.41',
            'sizeRand': '1',
        },
        'glow': {
            'glow': '0.5',
        },
        'transp': {
            'transp': '0.6',
            'transpRand': '0.5',
        },
        'number': {
            'number': '200',
        },
        'shape': {
            'shape': 'line',
            'lineAngle': 0.08333333333333333,
            'lineAngleRand': '0.15',
            'lineRatio': '0.25',
            'lineRounded': true,
            'lineRatioRand': '0.5',
            'lineLookToOn': true,
            'lineLookToX': 827,
            'lineLookToY': 201,
        },
        'position': {
            'startX': '0',
            'startY': '0',
            'endX': window.innerWidth,
            'endY': window.innerHeight,
            'biasX': 845,
            'biasY': 192,
            'biasInf': '0',
            'overlayMode': 'source-over',
        },
        'color': {
            'color': '#37ff00',
            'colorRand': '0.77',
            'isFullRand': false,
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
export const coordinateFlagsSize = 20;
export const maxUndoTimes = 10;