import {getRandomName} from '../utils/nameGenerator';
import {biasSpiralTypes, biasTypes, shapeTypes} from './sharedConsts';


export const overlayModes = {
    sourceOver: 'source-over',
    sourceIn: 'source-in',
    sourceOut: 'source-out',
    sourceAtop: 'source-atop',
    destinationOver: 'destination-over',
    destinationIn: 'destination-in',
    destinationOut: 'destination-out',
    destinationAtop: 'destination-atop',
    lighter: 'lighter',
    copy: 'copy',
    xor: 'xor',
    screen: 'screen',
    overlay: 'overlay',
    darken: 'darken',
    lighten: 'lighten',
    colorDodge: 'color-dodge',
    colorBurn: 'color-burn',
    hardLight: 'hard-light',
    softLight: 'soft-light',
    difference: 'difference',
    exclusion: 'exclusion',
    hue: 'hue',
    saturation: 'saturation',
    color: 'color',
    luminosity: 'luminosity',
};

export const coordinateFlagsSize = 30;

export const storageKeys = {
    layerSettings: 'layerSettings',
    appSettings: 'appSettings',
    shelvedLayerSettings: 'shelvedLayerSettings',
    mainTab: 'mainTab',
    presetDraftMeta: 'presetDraftMeta',
    userPresets: 'userPresets',
};

export const tabs = {
    number: {
        label: 'Number',
        id: 'tab-button-number',
    },
    size: {
        label: 'Size',
        id: 'tab-button-size',
    },
    shape: {
        label: 'Shape',
        id: 'tab-button-shape',
    },
    color: {
        label: 'Color',
        id: 'tab-button-color',
    },
    position: {
        label: 'Position',
        id: 'tab-button-position',
    },
    presets: {
        label: 'Presets',
        id: 'tab-button-presets',
    },
    // generation: {
    //     label: 'Generation',
    //     id: 'tab-button-generation',
    // },
    settings: {
        label: 'Settings',
        id: 'tab-button-settings',
    },
    saves: {
        label: 'Saves',
        id: 'tab-button-saves',
    },
    brush: {
        label: 'Brush',
        id: 'tab-button-brush',
    },
    generation: {
        label: 'Generation',
        id: 'tab-button-generation',
    },
};

export const hotkeys = {
    addLayer: 'a',
    clear: 'ctrl+d',
    undo: 'ctrl+z',
    redo: 'ctrl+shift+z',
    hideInterface: 'Escape',
    saveAsPng: 'ctrl+s',
};

export const layerPresets = [
    {
        preset: {
            id: 'default',
            name: 'Default',
            description: 'Default lines!!!!!',
        },
        size: {
            size: '0.5',
            sizeRand: '0',
        },
        number: {
            number: '10',
        },
        shape: {
            shape: shapeTypes.line,
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
            biasType: biasTypes.off, // rectangular radial spiral
            biasSpiralType: biasSpiralTypes.basic,
            biasSpiralCustom: 'Math.pow(angleRad, 1.2)',
            biasSpiralThickness: 0.5,
            biasSpiralDensity: 0.5,
            biasSpiralSpread: 0.5,
            biasSpiralAngleRand: 0.5,
            biasSpiralMult: 0.2,
            biasRadiusX: 200,
            biasRadiusY: 200,
            biasX: '100',
            biasY: '100',
            biasA: 0.5,
            biasB: 0.5,
            biasInf: 0.5,
        },
        color: {
            color: '#FF00DD',
            colorRand: '0.2',
            transp: '0.7',
            transpRand: '0.2',
            glow: '0',
            overlayMode: overlayModes.sourceOver,
            blurOn: false,
            blur: '0',
            blurRand: '0',
        },
        brush: {
            brushDensity: 0.5,
            brushOn: false,
            brushX: 0,
            brushY: 0,
        },
    },
    {
        preset: {
            id: 'solidBg',
            name: 'Solid background',
            description: 'Big circles for creating solid background!',
        },
        size: {
            size: '1',
            sizeRand: '0',
        },
        number: {
            number: '500',
        },
        shape: {
            shape: shapeTypes.circle,
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
            startX: 0,
            startY: 0,
            endX: window.innerWidth,
            endY: window.innerHeight,
        },
        color: {
            color: '#FFAFFF',
            colorRand: '0.2',
            isFullRand: false,
            transp: '1',
            transpRand: '0',
            glow: '0',
        },
    },
    {
        preset: {
            id: 'rain',
            name: 'Rain',
            description: 'Reminds me of minecraft rain!',
        },
        size: {
            size: '0.4',
            sizeRand: '1',
        },
        number: {
            number: '1000',
        },
        shape: {
            shape: shapeTypes.line,
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
            biasA: 0.1,
            biasB: 0.1,
            biasInf: '0',
        },
        color: {
            color: '#0036ff',
            colorRand: '0.2',
            transp: '0.5',
            transpRand: '1',
            glow: '0.4',
        },
    },
    // littleCircles: {
    //     'preset': {
    //         'id': 'littleCircles',
    //         'name': 'Little circles',
    //         'description': 'Soft background. Circles with feeling of depth!',
    //     },
    //     'size': {
    //         'size': '0.13',
    //         'sizeRand': '1',
    //     },
    //     'number': {
    //         'number': '1000',
    //     },
    //     'shape': {
    //         'shape': 'circle',
    //         'lineAngle': 0.08333333333333333,
    //         'lineAngleRand': 0,
    //         'lineRatio': 0.2,
    //         'lineRounded': false,
    //         'lineRatioRand': 0.2,
    //         'lineLookToOn': false,
    //         'lineLookToX': 100,
    //         'lineLookToY': 100,
    //     },
    //     'position': {
    //         'startX': '0',
    //         'startY': '0',
    //         'endX': window.innerWidth,
    //         'endY': window.innerHeight,
    //         'biasX': '100',
    //         'biasY': '100',
    //         'biasA': 0.1,
    //         'biasB': 0.1,
    //         'biasInf': '0',
    //         'overlayMode': 'source-over',
    //     },
    //     'color': {
    //         'color': '#ff0000',
    //         'colorRand': '0.2',
    //         'transp': '0.55',
    //         'transpRand': '1',
    //         'glow': '0.6',
    //     },
    // },
    // bacteriaAttack: {
    //     'preset': {
    //         'id': 'bacteriaAttack',
    //         'name': 'Bacteria attack',
    //         'description': 'Rounded lines, all looking (going) to one point',
    //     },
    //     'size': {
    //         'size': '0.41',
    //         'sizeRand': '1',
    //     },
    //     'number': {
    //         'number': '200',
    //     },
    //     'shape': {
    //         'shape': 'line',
    //         'lineAngle': 0.08333333333333333,
    //         'lineAngleRand': '0.15',
    //         'lineRatio': '0.25',
    //         'lineRounded': true,
    //         'lineRatioRand': '0.5',
    //         'lineLookToOn': true,
    //         'lineLookToX': 827,
    //         'lineLookToY': 201,
    //     },
    //     'position': {
    //         'startX': '0',
    //         'startY': '0',
    //         'endX': window.innerWidth,
    //         'endY': window.innerHeight,
    //         'biasX': 845,
    //         'biasY': 192,
    //         'biasA': 0.1,
    //         'biasB': 0.1,
    //         'biasInf': '0',
    //         'overlayMode': 'source-over',
    //     },
    //     'color': {
    //         'color': '#37ff00',
    //         'colorRand': '0.2',
    //         'transp': '0.6',
    //         'transpRand': '0.5',
    //         'glow': '0.5',
    //     },
    // },
    {
        'preset': {
            'id': 'spiralNet',
            'name': 'Spiral net',
            'description': 'Beautiful pattern created by basic spiral',
        },
        'size': {
            'size': '0.155',
            'sizeRand': '0.1',
        },
        'number': {
            'number': '10000',
        },
        'shape': {
            'shape': shapeTypes.circle,
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
            'biasType': 'spiral',
            'biasSpiralType': 'basic',
            'biasSpiralThickness': '0',
            'biasSpiralDensity': '0.34',
            'biasSpiralSpread': '0',
            'biasSpiralAngleRand': '0',
            'biasX': window.innerWidth / 2,
            'biasY': window.innerHeight / 2,
            'biasA': 0.1,
            'biasB': 0.1,
            'biasInf': '0',
        },
        'color': {
            'color': '#00ffcc',
            'colorRand': '0.2',
            'glow': '0.5',
            'transp': '0.65',
            'transpRand': '1',
        },
    },
];

export const biasPresets = {
    squashed: {
        name: 'Squashed',
        description: 'Very strong bias. All shapes just squashed',
        biasA: 1,
        biasB: 1,
        biasInf: 1,
    },
    soft: {
        name: 'Soft bias',
        description: 'Soft, normal and organic bias',
        biasA: 0.55,
        biasB: 0.6,
        biasInf: 1,
    },
    rectangled: {
        name: 'Rectangled',
        description: 'Bias with flat curve. Every shape has similar bias, so looks like a rectangle',
        biasA: 0.3,
        biasB: 1,
        biasInf: 1,
    },
    softRectangled: {
        name: 'Soft rectangled',
        description: 'Bias with flat curve, but not so strong. Some shapes still spawn outside.',
        biasA: 0.88,
        biasB: 0.45,
        biasInf: 0.68,
    },
    sticky: {
        name: 'Sticky',
        description: 'Shapes just stick to x and y axis.',
        biasA: 0.7,
        biasB: 0.45,
        biasInf: 1,
    },
    sticky1: {
        name: 'Sticky 1',
        description: 'Shapes stick to x and y axis even more.',
        biasA: 0.9,
        biasB: 0.45,
        biasInf: 1,
    },
};

export const defaultAppSettings = {
    drawingSpeed: 0.25,
    darkMode: true,
    resolutionMult: window.devicePixelRatio,
    projectNameRand: true,
    projectName: getRandomName(),
};

export const randomPresetRules = {
    preset: {
        name: 'Autogenerated',
        description: 'Autogenerated preset',
        id: 'autogenerated',
    },
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
            min: 10,
            max: 100,
        },
    },
    shape: {
        shape: Object.values(shapeTypes),
        lineAngle: {
            min: 0,
            max: 1,
        },
        lineAngleRand: {
            min: 0,
            max: 1,
        },
        lineRatio: {
            min: 0,
            max: 1,
        },
        lineRounded: [false, true],
        lineRatioRand: {
            min: 0,
            max: 1,
        },
        lineLookToOn: [false, true],
        lineLookToX: {
            min: 0,
            max: window.innerWidth,
        },
        lineLookToY: {
            min: 0,
            max: window.innerHeight,
        },
    },
    position: {
        startX: 0,
        startY: 0,
        endX: window.innerWidth,
        endY: window.innerHeight,
        biasType: Object.values(biasTypes),
        biasSpiralType: Object.values(biasSpiralTypes),
        biasSpiralCustom: 'Math.pow(angleRad, 1.2)',
        biasSpiralThickness: {
            min: 0,
            max: 1,
        },
        biasSpiralDensity: {
            min: 0,
            max: 1,
        },
        biasSpiralSpread: {
            min: 0,
            max: 1,
        },
        biasSpiralAngleRand: {
            min: 0,
            max: 1,
        },
        biasSpiralMult: {
            min: 0,
            max: 1,
        },
        biasRadiusX: {
            min: 0,
            max: window.innerWidth,
        },
        biasRadiusY: {
            min: 0,
            max: window.innerHeight,
        },
        biasX: {
            min: 0,
            max: window.innerWidth,
        },
        biasY: {
            min: 0,
            max: window.innerHeight,
        },
        biasA: {
            min: 0,
            max: 1,
        },
        biasB: {
            min: 0,
            max: 1,
        },
        biasInf: {
            min: 0,
            max: 1,
        },
    },
    color: {
        color: {
            type: 'color',
            rMin: 0,
            rMax: 255,
            gMin: 0,
            gMax: 255,
            bMin: 0,
            bMax: 255,
        },
        colorRand: {
            min: 0,
            max: 1,
        },
        isFullRand: [false, true],
        transp: {
            min: 0,
            max: 1,
        },
        transpRand: {
            min: 0,
            max: 1,
        },
        glow: {
            min: 0,
            max: 1,
        },
        overlayMode: overlayModes.sourceOver,
        blurOn: [false, true],
        blur: {
            min: 0,
            max: 1,
        },
        blurRand: {
            min: 0,
            max: 1,
        },
    },
    brush: {
        brushDensity: 0.5,
        brushOn: false,
        brushX: 0,
        brushY: 0,
    },
};



