import {
    getBiasedRandomNumber,
    getPointByDistanceAndAngle,
    turnDegreesToRadians,
    turnRadiansToDegrees,
    wait,
} from '../utils';
import {biasSpiralTypes, biasTypes, CMD, maxUndoTimes} from './sharedConsts';
import {getTranslatedAppSettings, getTranslatedLayerSettings} from './translaters';


let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let drawingStoppedFlag = false;

const history = [];

onmessage = async (event) => {
    const data = event.data;
    switch (event.data.cmd) {
        case CMD.initCanvas: {
            canvas = data.canvas;
            ctx = canvas.getContext('2d');
        }
            break;
        case CMD.drawLayer: {
            draw(data.rawSettings, data.rawAppSettings);
        }
            break;
        case CMD.undo: {
            undo();
        }
            break;
        case CMD.setCanvasPPI: {
            makeCanvasHighPPI(data.width, data.height, data.resolutionMult);
        }
            break;
        case CMD.stopDrawing: {
            drawingStoppedFlag = true;
        }
            break;
        case CMD.clear: {
            clear();
        }
            break;
    }
};

export const makeCanvasHighPPI = (width, height, resolutionMult) => {
    canvas.width = width * resolutionMult;
    canvas.height = height * resolutionMult;

    ctx.scale(resolutionMult, resolutionMult);

    canvasWidth = width;
    canvasHeight = height;
};

const drawShape = (settings) => {
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
            x: Math.floor(xPosition),
            y: Math.floor(yPosition),
        },
        color: {
            color: color,
            glow: settings.color.glow,
            blur: blur,
        },
    };
};

export const draw = async (rawSettings, rawAppSettings) => {
    let settings = getTranslatedLayerSettings(rawSettings);
    const appSettings = getTranslatedAppSettings(rawAppSettings);

    if (history.length > maxUndoTimes - 1) history.shift();
    history.push(ctx.getImageData(0, 0, canvasWidth * appSettings.resolutionMult, canvasHeight * appSettings.resolutionMult));

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
        drawShape(randomizedShapeSettings);

        if (drawingStoppedFlag) {
            drawingStoppedFlag = false;
            break;
        }
    }
};

export const undo = async () => {
    if (!history.length) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.putImageData(history[history.length - 1], 0, 0);
    history.pop();
};

export const clear = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

// TODO add elipse shape
// TODO add round rect shape
// TODO add stroke shapes