import {nanoid} from 'nanoid';
import {getRandomHslArr} from '../utils/generalUtils';
import {getRandomName} from '../utils/nameGenerators';
import {
    biasSpiralTypes,
    biasTypes,
    indexModTypes,
    modTypes,
    noiseTypes,
    pixelShapeBrushTypes,
    shapeTypes,
    trigModTypes,
} from './sharedConsts';


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
    navState: 'navState',
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
export const shapeEditorFlagsSize = 20;
export const shapeEditorCanvasSize = 300;
export const coordinateFlagsSize = 30;

export const getDefaultModOutput = (id) => {
    return {
        id: id ?? nanoid(),
        mult: 1,
    };
};

export const getRemapLevel = (y = 0.4) => {
    return {
        y,
        id: nanoid(10),
    };
};

export const getDefaultMod = (name) => {
    const id = nanoid(8);
    return {
        name: name || 'Default',
        blendRatio: 0.1,
        id: id,
        color: getRandomHslArr([null, 100, 70, 0.5]),
        settings: {
            type: modTypes.radial.id,
            radialRadiusPos: {
                x: 200,
                y: 200,
            },
            radialCenterPos: {
                x: 100,
                y: 100,
            },
            noiseType: noiseTypes.perlin.id,
            noiseZoom: 0.2,
            sineZoomX: 0.2,
            sineZoomY: 0.2,
            indexType: indexModTypes.absoluteIndex.id,
            trigType: trigModTypes.sine,
            modA: 0.3,
            modB: 0.3,
            // if change discretization, also change remap levels
            remapLevelsDiscretization: 40,
            remapLevels: [
                {
                    'y': 0.013333333333333308,
                    'id': 'Oj4WAJVIRPJcQmRKKshYT',
                },
                {
                    'y': 0.023333333333333317,
                    'id': 'ImYFfQ-W0dFrDTK5javxy',
                },
                {
                    'y': 0.03500000000000003,
                    'id': 'ZrNEz9y8LLMeGMYTwMq0l',
                },
                {
                    'y': 0.053333333333333344,
                    'id': 'MnfvP2VIzMVKW-TokP_Md',
                },
                {
                    'y': 0.07333333333333336,
                    'id': 'eXW9-NY5jv2s_sob9Viux',
                },
                {
                    'y': 0.09666666666666668,
                    'id': 'SqH1_qEpmKSSw8IUTFSLZ',
                },
                {
                    'y': 0.1233333333333333,
                    'id': 'e_N5rzorG9g9bMuyEKeLW',
                },
                {
                    'y': 0.15000000000000002,
                    'id': 'TXk4D4ywhuCVYdn4j-oNs',
                },
                {
                    'y': 0.17333333333333334,
                    'id': 'NZnP--h9O-4o6z8WwFpfT',
                },
                {
                    'y': 0.19499999999999995,
                    'id': 'aPY815lLDwh6NFUl-v8Wx',
                },
                {
                    'y': 0.22499999999999998,
                    'id': 'QR1i3o2wis13ZHB0b71Uj',
                },
                {
                    'y': 0.2633333333333333,
                    'id': 'PjzZH72dLerqvnatBfJ1c',
                },
                {
                    'y': 0.30666666666666664,
                    'id': 'T5fgIU2LKMgJ2gQjRE_Ag',
                },
                {
                    'y': 0.33666666666666667,
                    'id': 'j6g6u-oPavSyt9IjNKOiy',
                },
                {
                    'y': 0.36,
                    'id': 'FyTH6IggfxqIY0lx3szCC',
                },
                {
                    'y': 0.39,
                    'id': 'BU5WBafGXQNtndauck8QO',
                },
                {
                    'y': 0.42000000000000004,
                    'id': '-YT4K1RJG3IDV5h-prmkB',
                },
                {
                    'y': 0.44499999999999995,
                    'id': '7wyDvS5MWyJghEWyQ_dra',
                },
                {
                    'y': 0.475,
                    'id': 'sWcClcHwxpaZ4NiTnaWjZ',
                },
                {
                    'y': 0.515,
                    'id': 'fmmbm8p3NNYhG1DSDlnm7',
                },
                {
                    'y': 0.5549999999999999,
                    'id': 'k1MPW5X-GYWFMryIseI_D',
                },
                {
                    'y': 0.5783333333333334,
                    'id': 'pzAfvfLCP15MsioijPa6K',
                },
                {
                    'y': 0.6066666666666667,
                    'id': 'Pkh3k_uAN86YmcobNrvpI',
                },
                {
                    'y': 0.635,
                    'id': '8c3BggtBxWXONq-qMFewL',
                },
                {
                    'y': 0.655,
                    'id': 'PT7ObSKtqBuZgJDt3zG1R',
                },
                {
                    'y': 0.6766666666666667,
                    'id': 'LE03BYrJ-8D4Eueo7k8Yw',
                },
                {
                    'y': 0.7,
                    'id': 'veZeI4aYjNfgglg_a4pWH',
                },
                {
                    'y': 0.7233333333333334,
                    'id': '4PjclEOeRusKFgv6mqRvt',
                },
                {
                    'y': 0.7433333333333334,
                    'id': 'PUr_TGXt11PAx8esQwuZc',
                },
                {
                    'y': 0.7633333333333333,
                    'id': 'y1dyrxtLiMljjBw3_k5Fk',
                },
                {
                    'y': 0.7833333333333333,
                    'id': 'mRADEModIcOtppLMvfcfi',
                },
                {
                    'y': 0.8016666666666666,
                    'id': 'zzj1XdaExlF4SR_tXsZ37',
                },
                {
                    'y': 0.8166666666666667,
                    'id': 'vc588gxM1Oj9JoZ3ngs48',
                },
                {
                    'y': 0.8383333333333334,
                    'id': 'ODeVt4fdaAqimF1DbE1n_',
                },
                {
                    'y': 0.855,
                    'id': 'mbfrO6Sv_EtFjk6QJq1Bu',
                },
                {
                    'y': 0.88,
                    'id': 'hxihVsMHN5XfaFPHN4i_Q',
                },
                {
                    'y': 0.8983333333333333,
                    'id': 'IR7rvFImGEhvLyCYjoNUk',
                },
                {
                    'y': 0.9299999999999999,
                    'id': '9OPeBIvfDXudOfv3UYs-i',
                },
                {
                    'y': 0.955,
                    'id': 'IclDtR1soek6ppWkqxPEv',
                },
                {
                    'y': 0.9866666666666667,
                    'id': 'pTzwMynWVPv-PVLFcougA',
                },
            ],
        },
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
            angle: {
                enabled: false,
                val2: {
                    from: -10,
                    to: 10,
                },
            },
            lookTo: {
                enabled: false,
                val2: {
                    x: 500,
                    y: 500,
                },
            },
            xOffset: {
                enabled: false,
                val2: 15,
            },
            yOffset: {
                enabled: false,
                val2: 15,
            },
            branchesMagnitude: {
                enabled: false,
                val2: 0.2,
            },
            branchesDirectionDelta: {
                enabled: false,
                val2: {
                    from: -5,
                    to: 5,
                },
            },
            branchesDirection: {
                enabled: false,
                val2: {
                    from: -20,
                    to: 20,
                },
            },
        },
        modOutputs: [],
    };
};

export const getDefaultCustomShape = (pointsNumber = 3) => {
    return new Array(pointsNumber).fill(undefined).map(() => getCustomShapePoint(Math.random(), Math.random()));
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
            angle: 30,
            widthRatio: 0.4,
            rectRoundness: 0,
            customShape: getDefaultCustomShape(),
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
            branchesOn: false,
            branchesLength: 0,
            branchesMagnitude: 0.2,
            branchesDirection: 45,
            biasType: biasTypes.off.id, // rectangular radial spiral
            chessPlateWidth: 10,
            chessPlateHeight: 10,
            biasSpiralType: biasSpiralTypes.basic.id,
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
            xOffset: 0,
            yOffset: 0,
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

export const defaultNavState = {
    mainTab: tabs.number.id,
    modsAccordion: [],
    presetsAccordion: [],
};




