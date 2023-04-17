import {nanoid} from 'nanoid';
import {getRandomHslArr} from '../utils/generalUtils';
import {getRandomName} from '../utils/nameGenerators';
import {biasSpiralTypes, biasTypes, modTypes, pixelShapeBrushTypes, shapeTypes} from './sharedConsts';


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
    mods: {
        label: 'Mods',
        id: 'tab-button-mods',
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
    // generation: {
    //     label: 'Generation',
    //     id: 'tab-button-generation',
    // },
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
    pixelShapeBrushSize: 0.2,
    pixelShapeBrushType: pixelShapeBrushTypes.pencil,
};
export const shapeEditorFlagsSize = 15;
export const shapeEditorCanvasSize = 300;
export const coordinateFlagsSize = 30;

export const getDefaultModOutput = (id) => {
    return {
        id: id,
    };
};
export const getDefaultMod = (name) => {
    const id = nanoid(8);
    return {
        name: name || 'Default',
        type: modTypes.radial,
        color: getRandomHslArr([null, 100, 70, 0.5]),
        id: id,
        radialRadiusPos: {
            x: 200,
            y: 200,
        },
        radialCenterPos: {
            x: 100,
            y: 100,
        },
        perlinZoom: 0.2,
        modA: 0.3,
        modB: 0.3,
        blendRatio: 0.1,
        outputs: {
            size: {
                enabled: false,
                val2: 0.8,
            },
            color: {
                enabled: false,
                val2: '#009dff',
            },
            strokeColor: {
                enabled: false,
                val2: '#caeeff',
            },
            transp: {
                enabled: false,
                val2: 0.2,
            },
            strokeTransp: {
                enabled: false,
                val2: 0.5,
            },
            blur: {
                enabled: false,
                val2: 0.5,
            },
            widthRatio: {
                enabled: false,
                val2: 0.2,
            },
            rectRoundness: {
                enabled: false,
                val2: 0.4,
            },
        },
        modOutputs: [],
    };
};


export const getCustomShapePoint = (x = 0.4, y = 0.4) => {
    return {
        x,
        y,
        id: nanoid(),
        color: getRandomHslArr([undefined, 60, 50, 1]),
    };
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
        },
        number: {
            number: '10',
        },
        shape: {
            shape: shapeTypes.rectangle,
            angle: 30 / 360,
            angleRand: 0,
            widthRatio: 0.2,
            lookToOn: false,
            lookToPos: {
                x: 100,
                y: 100,
            },
            rectRoundness: 0,
            // TODO add default getter function for custom shape points
            customShape: [
                getCustomShapePoint(0, 1),
                getCustomShapePoint(0, 0.5),
                getCustomShapePoint(1, 1),
            ],
            strokeOn: false,
            strokeThickness: 0.2,
            fillOn: true,
            pixelShapeRes: 10,
            pixelShape: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
            ],
        },
        position: {
            startPos: {
                x: 0,
                y: 0,
            },
            endPos: {
                x: window.innerWidth,
                y: window.innerHeight,
            },
            biasType: biasTypes.off, // rectangular radial spiral
            biasSpiralType: biasSpiralTypes.basic,
            biasSpiralCustom: 'Math.pow(angleRad, 1.2)',
            biasSpiralThickness: 0.5,
            biasSpiralDensity: 0.5,
            biasSpiralSpread: 0.5,
            biasSpiralAngleRand: 0.5,
            biasSpiralMult: 0.2,
            biasRadiusPos: {
                x: 200,
                y: 200,
            },
            biasPos: {
                x: 100,
                y: 100,
            },
            biasA: 0.5,
            biasB: 0.5,
            biasInf: 0.5,
            biasRectXOn: true,
            biasRectYOn: true,
            gradOn: false,
            gradA: 0.5,
            gradB: 0.5,
            gradInf: 1,
        },
        mods: [getDefaultMod()],
        color: {
            color: '#FF00DD',
            strokeColor: '#FFFF00',
            transp: '0.7',
            strokeTransp: 0.7,
            glow: '0',
            overlayMode: overlayModes.sourceOver,
            blurOn: false,
            blur: '0',
        },
        brush: {
            brushDensity: 0.5,
            brushOn: false,
            brushPos: {
                x: 0,
                y: 0,
            },
        },
    },
    {
        'preset': {
            'id': 'spiralNet',
            'name': 'Spiral net',
            'description': 'Beautiful pattern created by basic spiral',
        },
        'size': {
            'size': '0.155',
        },
        'number': {
            'number': '10000',
        },
        'shape': {
            'shape': shapeTypes.circle,
            'angle': 0.08333333333333333,
            'angleRand': 0,
            'widthRatio': 0.2,
            'widthRatioRand': 0.2,
            'lookToOn': false,
            'lookToX': 100,
            'lookToY': 100,
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

// TODO add custom shape to preset randomization




