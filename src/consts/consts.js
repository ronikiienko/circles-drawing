import {biasSpiralTypes, biasTypes} from './sharedConsts';


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
            overlayMode: 'source-over',
            blurOn: false,
            blur: '0',
            blurRand: '0',
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
            startX: 0,
            startY: 0,
            endX: window.innerWidth,
            endY: window.innerHeight,
            overlayMode: 'source-over',
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
    // rain: {
    //     preset: {
    //         id: 'rain',
    //         name: 'Rain',
    //         description: 'Reminds me of minecraft rain!',
    //     },
    //     size: {
    //         size: '0.4',
    //         sizeRand: '1',
    //     },
    //     number: {
    //         number: '1000',
    //     },
    //     shape: {
    //         shape: 'line',
    //         lineAngle: 70 / 360,
    //         lineAngleRand: 0.1,
    //         lineRatio: 0.1,
    //         lineRounded: false,
    //         lineRatioRand: 0.1,
    //         lineLookToOn: false,
    //         lineLookToX: 100,
    //         lineLookToY: 100,
    //     },
    //     position: {
    //         startX: '0',
    //         startY: '0',
    //         endX: window.innerWidth,
    //         endY: window.innerHeight,
    //         biasX: '100',
    //         biasY: '100',
    //         biasA: 0.1,
    //         biasB: 0.1,
    //         biasInf: '0',
    //         overlayMode: 'source-over',
    //     },
    //     color: {
    //         color: '#0036ff',
    //         colorRand: '0.2',
    //         transp: '0.5',
    //         transpRand: '1',
    //         glow: '0.4',
    //     },
    // },
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
    // spiralNet: {
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
    //         'overlayMode': 'source-over',
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

export const getPreset = (preset) => {
    if (!preset) return false;
    const defaultPreset = layerPresets[0];
    return {
        preset: {
            id: preset.preset?.id || defaultPreset.preset.id,
            name: preset.preset?.name || defaultPreset.preset.name,
            description: preset.preset?.description || defaultPreset.preset.description,
        },
        size: {
            size: preset.size?.size || defaultPreset.size.size,
            sizeRand: preset.size?.sizeRand || defaultPreset.size.sizeRand,
        },
        number: {
            number: preset.number?.number || defaultPreset.number.number,
        },
        shape: {
            shape: preset.shape?.shape || defaultPreset.shape.shape,
            lineAngle: preset.shape?.lineAngle || defaultPreset.shape.lineAngle,
            lineAngleRand: preset.shape?.lineAngleRand || defaultPreset.shape.lineAngleRand,
            lineRatio: preset.shape?.lineRatio || defaultPreset.shape.lineRatio,
            lineRounded: preset.shape?.lineRounded || defaultPreset.shape.lineRounded,
            lineRatioRand: preset.shape?.lineRatioRand || defaultPreset.shape.lineRatioRand,
            lineLookToOn: preset.shape?.lineLookToOn || defaultPreset.shape.lineLookToOn,
            lineLookToX: preset.shape?.lineLookToX || defaultPreset.shape.lineLookToX,
            lineLookToY: preset.shape?.lineLookToY || defaultPreset.shape.lineLookToY,
        },
        position: {
            startX: preset.position?.startX || defaultPreset.position.startX,
            startY: preset.position?.startY || defaultPreset.position.startY,
            endX: preset.position?.endX || defaultPreset.position.endX,
            endY: preset.position?.endY || defaultPreset.position.endY,
            biasType: preset.position?.biasType || defaultPreset.position.biasType,
            biasSpiralType: preset.position?.biasSpiralType || defaultPreset.position.biasSpiralType,
            biasSpiralCustom: preset.position?.biasSpiralCustom || defaultPreset.position.biasSpiralCustom,
            biasSpiralThickness: preset.position?.biasSpiralThickness || defaultPreset.position.biasSpiralThickness,
            biasSpiralDensity: preset.position?.biasSpiralDensity || defaultPreset.position.biasSpiralDensity,
            biasSpiralSpread: preset.position?.biasSpiralSpread || defaultPreset.position.biasSpiralSpread,
            biasSpiralAngleRand: preset.position?.biasSpiralAngleRand || defaultPreset.position.biasSpiralAngleRand,
            biasSpiralMult: preset.position?.biasSpiralMult || defaultPreset.position.biasSpiralMult,
            biasRadiusX: preset.position?.biasRadiusX || defaultPreset.position.biasRadiusX,
            biasRadiusY: preset.position?.biasRadiusY || defaultPreset.position.biasRadiusY,
            biasX: preset.position?.biasX || defaultPreset.position.biasX,
            biasY: preset.position?.biasY || defaultPreset.position.biasY,
            biasA: preset.position?.biasA || defaultPreset.position.biasA,
            biasB: preset.position?.biasB || defaultPreset.position.biasB,
            biasInf: preset.position?.biasInf || defaultPreset.position.biasInf,
        },
        color: {
            color: preset.color?.color || defaultPreset.color.color,
            colorRand: preset.color?.colorRand || defaultPreset.color.colorRand,
            glow: preset.color?.glow || defaultPreset.color.glow,
            transp: preset.color?.transp || defaultPreset.color.transp,
            transpRand: preset.color?.transpRand || defaultPreset.color.transpRand,
            overlayMode: preset.color?.overlayMode || defaultPreset.color.overlayMode,
            blurOn: preset.color?.blurOn || defaultPreset.color.blurOn,
            blur: preset.color?.blur || defaultPreset.color.blur,
            blurRand: preset.color?.blurRand || defaultPreset.color.blurRand,
        },
    };
};

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

export const imageRenderingMap = {
    auto: 'auto',
    crispEdges: 'crisp-edges',
    pixelated: 'pixelated',
};
export const defaultAppSettings = {
    drawingSpeed: 0.25,
    darkMode: true,
    resolutionMult: window.devicePixelRatio,
    imageRendering: imageRenderingMap.auto,
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
};

