import {getRandomName} from '../utils/nameGenerator';
import {biasSpiralTypes, biasTypes, customShapeFlagsColorSettings, shapeTypes} from './sharedConsts';


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

export const storageKeys = {
    layerSettings: 'layerSettings',
    appSettings: 'appSettings',
    shelvedLayerSettings: 'shelvedLayerSettings',
    mainTab: 'mainTab',
    presetDraftMeta: 'presetDraftMeta',
    userPresets: 'userPresets',
};
export const hotkeys = {
    addLayer: 'a',
    clear: 'ctrl+d',
    undo: 'ctrl+z',
    redo: 'ctrl+shift+z',
    hideInterface: 'Escape',
    saveAsPng: 'ctrl+s',
};
export const defaultAppSettings = {
    drawingSpeed: 0.25,
    darkMode: true,
    resolutionMult: window.devicePixelRatio,
    projectNameRand: true,
    projectName: getRandomName(),
};
export const shapeEditorFlagsSize = 15;
export const shapeEditorCanvasSize = 250;
export const coordinateFlagsSize = 30;
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
            angle: 30 / 360,
            angleRand: 0,
            widthRatio: 0.2,
            lineRounded: false,
            widthRatioRand: 0.2,
            lookToOn: false,
            lookToX: 100,
            lookToY: 100,
            rectRoundness: 0,
            rectRoundnessRand: 0.3,
            customShape: [
                [0, 1, 'kfasfj9', `hsl(357, ${customShapeFlagsColorSettings.s}, ${customShapeFlagsColorSettings.l})`],
                [0.5, 0, '=12958fj', `hsl(100, ${customShapeFlagsColorSettings.s}, ${customShapeFlagsColorSettings.l})`],
                [1, 1, '8901jhjfk', `hsl(200, ${customShapeFlagsColorSettings.s}, ${customShapeFlagsColorSettings.l})`],
            ],
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
            biasRectXOn: true,
            biasRectYOn: true,
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
    // {
    //     'preset': {
    //         'id': 'spiralNet',
    //         'name': 'Spiral net',
    //         'description': 'Beautiful pattern created by basic spiral',
    //     },
    //     'size': {
    //         'size': '0.155',
    //         'sizeRand': '0.1',
    //     },
    //     'number': {
    //         'number': '10000',
    //     },
    //     'shape': {
    //         'shape': shapeTypes.circle,
    //         'angle': 0.08333333333333333,
    //         'angleRand': 0,
    //         'widthRatio': 0.2,
    //         'lineRounded': false,
    //         'widthRatioRand': 0.2,
    //         'lookToOn': false,
    //         'lookToX': 100,
    //         'lookToY': 100,
    //     },
    //     'position': {
    //         'biasType': 'spiral',
    //         'biasSpiralType': 'basic',
    //         'biasSpiralThickness': '0',
    //         'biasSpiralDensity': '0.34',
    //         'biasSpiralSpread': '0',
    //         'biasSpiralAngleRand': '0',
    //         'biasX': window.innerWidth / 2,
    //         'biasY': window.innerHeight / 2,
    //         'biasA': 0.1,
    //         'biasB': 0.1,
    //         'biasInf': '0',
    //     },
    //     'color': {
    //         'color': '#00ffcc',
    //         'colorRand': '0.2',
    //         'glow': '0.5',
    //         'transp': '0.65',
    //         'transpRand': '1',
    //     },
    // },
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
        angle: {
            min: 0,
            max: 1,
        },
        angleRand: {
            min: 0,
            max: 1,
        },
        widthRatio: {
            min: 0,
            max: 1,
        },
        lineRounded: [false, true],
        widthRatioRand: {
            min: 0,
            max: 1,
        },
        lookToOn: [false, true],
        lookToX: {
            min: 0,
            max: window.innerWidth,
        },
        lookToY: {
            min: 0,
            max: window.innerHeight,
        },
        rectRoundness: {
            min: 0,
            max: 0.3,
        },
        rectRoundnessRand: {
            min: 0,
            max: 1,
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
        biasRectXOn: [false, true],
        biasRectYOn: [false, true],
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

// TODO add custom shape to preset randomization




