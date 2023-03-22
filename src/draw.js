import FileSaver from 'file-saver';
import {biasSpiralTypes, biasTypes, highPPICanvasRatio, maxUndoTimes} from './consts';
import {
    getBiasedRandomNumber,
    getPointByDistanceAndAngle,
    hexToHslArray,
    turnDegreesToRadians,
    turnRadiansToDegrees,
    wait,
} from './utils';


let canvasWidth;
let canvasHeight;
let history = [];
let settingsHistory = [];
export const makeCanvasHighPPI = (width, height, resolutionMult) => {
    const {canvas, ctx} = getCanvas();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    canvas.width = width * resolutionMult;
    canvas.height = height * resolutionMult;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(resolutionMult, resolutionMult);

    canvasWidth = width;
    canvasHeight = height;
};

const getCanvas = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    return {canvas, ctx};
};

const drawShape = (ctx, settings) => {
    if (settings.color.blur) ctx.filter = `blur(${settings.color.blur}px)`;
    ctx.shadowBlur = settings.color.glow;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = settings.color.color;
    ctx.strokeStyle = settings.color.color;
    ctx.shadowColor = settings.color.color;

    ctx.beginPath();
    if (settings.shape.shape === 'circle') {
        ctx.arc(settings.position.x, settings.position.y, settings.size.size, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if (settings.shape.shape === 'rectangle') {
        ctx.rect(settings.position.x, settings.position.y, settings.size.size, settings.size.size);
        ctx.fill();
    }
    if (settings.shape.shape === 'line') {
        ctx.lineWidth = settings.size.size * settings.shape.lineRatio;
        if (settings.shape.lineRounded) {
            ctx.lineCap = 'round';
        } else {
            ctx.lineCap = 'butt';
        }
        ctx.moveTo(settings.position.x, settings.position.y);

        const {x, y} = getPointByDistanceAndAngle(
            settings.position.x,
            settings.position.y,
            settings.size.size,
            settings.shape.lineAngle,
        );
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if (settings.shape.shape === 'random3' || settings.shape.shape === 'random4') {
        ctx.moveTo(settings.position.x, settings.position.y);
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        if (settings.shape.shape === 'random4') ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x, settings.position.y);
        ctx.fill();
    }
};

export const translateBiasA = (biasA) => {
    return parseFloat((Math.pow(parseFloat(biasA) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasA) * 10;
};

export const translateBiasB = (biasB) => {
    return parseFloat((Math.pow(parseFloat(biasB) + 1, 8) * 0.0390625).toFixed(2));
    // return parseFloat(biasB) * 10;
};

const getTranslatedLayerSettings = (rawSettings) => {
    // reused values
    const size = Math.pow(parseFloat(rawSettings.size.size) + 1, 7) * 2;
    const transp = parseFloat(rawSettings.color.transp);
    const blur = parseFloat(rawSettings.color.blur);
    const actualBlur = rawSettings.color.blurOn ? Math.pow(blur + 1, 4) - 1 : 0;
    return {
        size: {
            size: size,
            sizeRand: parseFloat(rawSettings.size.sizeRand) * size * 0.8,
        },
        number: {
            number: parseFloat(rawSettings.number.number),
        },
        shape: {
            shape: rawSettings.shape.shape,
            lineAngle: parseFloat(rawSettings.shape.lineAngle) * 360,
            lineAngleRand: parseFloat(rawSettings.shape.lineAngleRand),
            lineRatio: parseFloat(rawSettings.shape.lineRatio),
            lineRatioRand: parseFloat(rawSettings.shape.lineRatioRand),
            lineRounded: rawSettings.shape.lineRounded,
            lineLookToOn: rawSettings.shape.lineLookToOn,
            lineLookToX: rawSettings.shape.lineLookToX,
            lineLookToY: rawSettings.shape.lineLookToY,
        },
        position: {
            startX: parseFloat(rawSettings.position.startX),
            startY: parseFloat(rawSettings.position.startY),
            endX: parseFloat(rawSettings.position.endX),
            endY: parseFloat(rawSettings.position.endY),
            biasSpiralType: rawSettings.position.biasSpiralType,
            biasSpiralCustom: rawSettings.position.biasSpiralCustom,
            biasSpiralThickness: Math.trunc(Math.pow(parseFloat(rawSettings.position.biasSpiralThickness) + 1, 6)),
            biasSpiralDensity: Math.pow(parseFloat(rawSettings.position.biasSpiralDensity) + 1, 7),
            biasSpiralSpread: Math.pow(parseFloat(rawSettings.position.biasSpiralSpread) + 1, 7) - 1,
            biasSpiralAngleRand: parseFloat(rawSettings.position.biasSpiralAngleRand) * 5,
            biasSpiralMult: Math.pow(parseFloat(rawSettings.position.biasSpiralMult) * 20, 2.3) * 0.05,
            biasType: rawSettings.position.biasType,
            biasRadius: Math.pow(Math.pow(rawSettings.position.biasX - rawSettings.position.biasRadiusX, 2) + Math.pow(rawSettings.position.biasY - rawSettings.position.biasRadiusY, 2), 1 / 2),
            biasX: parseFloat(rawSettings.position.biasX),
            biasY: parseFloat(rawSettings.position.biasY),
            biasA: translateBiasA(rawSettings.position.biasA),
            biasB: translateBiasB(rawSettings.position.biasB),
            biasInf: parseFloat(rawSettings.position.biasInf),
        },
        color: {
            color: hexToHslArray(rawSettings.color.color),
            colorRand: Math.pow(parseFloat(rawSettings.color.colorRand) + 1, 5) * 5.6 - 1,
            transp: transp,
            transpRand: parseFloat(rawSettings.color.transpRand) * transp,
            glow: parseFloat(rawSettings.color.glow) * 100,
            overlayMode: rawSettings.color.overlayMode,
            blur: actualBlur,
            blurRand: Math.pow(parseFloat(rawSettings.color.blurRand) + 1, 3) - 1,
        },
    };
};

const getTranslatedAppSettings = (rawSettings) => {
    return {
        waitInterval: Math.trunc(Math.pow(parseFloat(rawSettings.drawingSpeed) + 1, 10)),
    };
};

const getRandomizedShapeSettings = (settings, i) => {
    let color;
    const transp = settings.color.transp + getBiasedRandomNumber(-settings.color.transpRand, settings.color.transpRand, 2);
    const blur = !settings.color.blur ? 0 : settings.color.blur + getBiasedRandomNumber(-settings.color.blurRand, settings.color.blurRand);
    let xPosition;
    let yPosition;
    switch (settings.position.biasType) {
        case biasTypes.rectangular: {
            xPosition = getBiasedRandomNumber(
                settings.position.startX,
                settings.position.endX,
                0,
                {
                    bias: settings.position.biasX,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                },
            );
            yPosition = getBiasedRandomNumber(
                settings.position.startY,
                settings.position.endY,
                0,
                {
                    bias: settings.position.biasY,
                    biasInf: settings.position.biasInf,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                },
            );
        }
            break;
        case biasTypes.radial: {
            const angle = getBiasedRandomNumber(0, 360);

            const diapason = Math.pow(settings.position.biasRadius, 2);

            const distanceFromBias = getBiasedRandomNumber(
                0,
                diapason,
                0,
                {
                    bias: 0,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                    biasInf: settings.position.biasInf,
                },
            );
            const {
                x,
                y,
            } = getPointByDistanceAndAngle(settings.position.biasX, settings.position.biasY, Math.pow(distanceFromBias, 1 / 2), angle);
            xPosition = x;
            yPosition = y;
        }
            break;
        case biasTypes.spiral: {
            const spinI = Math.trunc(i / settings.position.biasSpiralThickness);
            const angle = spinI * settings.position.biasSpiralDensity;
            const angleRad = turnDegreesToRadians(angle);

            let distanceFromBias;
            switch (settings.position.biasSpiralType) {
                case biasSpiralTypes.basic: {
                    distanceFromBias = Math.pow(angleRad, 1);
                }
                    break;
                case biasSpiralTypes.fourLeaf: {
                    distanceFromBias = angleRad * Math.sin(angleRad * 2);
                }
                    break;
                case biasSpiralTypes.reducing: {
                    distanceFromBias = Math.pow(angleRad, 1 / 2) * 20;
                }
                    break;
                case biasSpiralTypes.circles: {
                    distanceFromBias = angleRad * 4 * Math.cos(Math.pow(angleRad, 1 / 1.2));
                }
                    break;
                case biasSpiralTypes.custom: {
                    try {
                        distanceFromBias = eval(String(settings.position.biasSpiralCustom));
                    } catch (e) {
                        distanceFromBias = 0;
                    }
                }
                // angleRad * Math.sin(Math.pow(angleRad, 1 / 4))
            }
            distanceFromBias = distanceFromBias * settings.position.biasSpiralMult;
            for (let j = 0; j < settings.position.biasSpiralThickness; j++) {
                let radius = getBiasedRandomNumber(distanceFromBias - settings.position.biasSpiralSpread, distanceFromBias + settings.position.biasSpiralSpread, 0, {
                    bias: distanceFromBias,
                    biasA: settings.position.biasA,
                    biasB: settings.position.biasB,
                    biasInf: settings.position.biasInf,
                });
                const {
                    x,
                    y,
                } = getPointByDistanceAndAngle(settings.position.biasX, settings.position.biasY, radius, getBiasedRandomNumber(angle - settings.position.biasSpiralAngleRand, angle + settings.position.biasSpiralAngleRand, 2));
                xPosition = x;
                yPosition = y;
            }
        }
    }


    let lineAngle;
    if (settings.shape.lineLookToOn) {
        const lookToXOffset = settings.shape.lineLookToX - xPosition;
        const lookToYOffset = settings.shape.lineLookToY - yPosition;
        lineAngle = turnRadiansToDegrees(Math.atan(lookToYOffset / lookToXOffset));
    } else {
        lineAngle = settings.shape.lineAngle;
    }

    color = `hsla(
                ${(settings.color.color[0] + getBiasedRandomNumber(-settings.color.colorRand, settings.color.colorRand, 1)) % 360}, 
                ${settings.color.color[1]}%, 
                ${settings.color.color[2]}%, 
                ${transp}
            )`;
    return {
        size: {
            size: settings.size.size + getBiasedRandomNumber(-settings.size.sizeRand, settings.size.sizeRand, 2),
        },
        shape: {
            shape: settings.shape.shape,
            lineAngle: lineAngle + getBiasedRandomNumber(-10, 10) * (Math.pow(settings.shape.lineAngleRand + 1, 3) - 1),
            lineRatio: settings.shape.lineRatio + getBiasedRandomNumber(-1, 1) * 0.2 * settings.shape.lineRatioRand,
            lineRounded: settings.shape.lineRounded,
        },
        position: {
            x: xPosition,
            y: yPosition,
        },
        color: {
            color: color,
            glow: settings.color.glow,
            blur: blur,
        },
    };
};

export const draw = async (rawSettings, rawAppSettings) => {
    const {ctx} = getCanvas();
    let settings = getTranslatedLayerSettings(rawSettings);
    const appSettings = getTranslatedAppSettings(rawAppSettings);


    if (history.length > maxUndoTimes - 1) history.shift();
    history.push(ctx.getImageData(0, 0, canvasWidth * highPPICanvasRatio, canvasHeight * highPPICanvasRatio));
    settingsHistory.push(settings);

    ctx.globalCompositeOperation = settings.color.overlayMode;
    if (!settings.color.blur) ctx.filter = 'none';

    const waitInterval = appSettings.waitInterval;
    let lastWaited = 0;
    for (let i = 0; i < settings.number.number; i++) {
        if (i - lastWaited === waitInterval) {
            await wait(4);
            lastWaited = i;
        }
        const randomizedShapeSettings = getRandomizedShapeSettings(settings, i);
        drawShape(ctx, randomizedShapeSettings);
    }
};

export const undo = async () => {
    console.log(history.length);
    console.log(canvasHeight * highPPICanvasRatio * canvasWidth * highPPICanvasRatio * 4 * 10 / 1000000);
    if (!history.length) return;
    const {ctx} = getCanvas();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.putImageData(history[history.length - 1], 0, 0);
    history.pop();
};

export const clear = () => {
    const {ctx} = getCanvas();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

export const saveAsImage = (png) => {
    const {canvas} = getCanvas();
    const type = png ? '' : 'image/jpeg';
    const fileExt = png ? '.png' : '.jpeg';
    const dataUrl = canvas.toDataURL(type);
    FileSaver.saveAs(dataUrl, `drawing${Date.now()}${fileExt}`);
    console.log('hi');
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes