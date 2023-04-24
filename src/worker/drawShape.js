import {shapeTypes} from '../consts/sharedConsts';
import {drawCustomShape, drawPixelShape} from '../utils/drawingUtils';
import {getBiasedRandomNumber, turnDegreesToRadians} from '../utils/generalUtils';


export const drawShape = (ctx, settings) => {
    if (settings.color.blurOn) ctx.filter = `blur(${settings.color.blur}px)`;
    ctx.shadowBlur = settings.color.glow;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = settings.color.color;
    ctx.strokeStyle = settings.color.strokeColor;
    ctx.shadowColor = settings.color.color;

    if (settings.shape.strokeOn) ctx.lineWidth = settings.size.size * settings.shape.strokeThickness;

    ctx.beginPath();
    if (settings.shape.shape === shapeTypes.custom) {
        drawCustomShape(ctx, [settings.position.x, settings.position.y], settings.shape.customShape, settings.shape.angle, settings.size.size);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.pixel) {
        ctx.save();
        ctx.translate(settings.position.x, settings.position.y);
        ctx.rotate(turnDegreesToRadians(settings.shape.angle));
        drawPixelShape(ctx, settings.shape.pixelShape, settings.size.size);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
        ctx.restore();
    }
    if (settings.shape.shape === shapeTypes.circle) {
        ctx.arc(settings.position.x, settings.position.y, settings.size.size, 0, Math.PI * 2, true);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.rectangle) {
        const width = settings.size.size;
        const height = settings.size.size * settings.shape.widthRatio;
        ctx.save();
        ctx.translate(settings.position.x, settings.position.y);
        ctx.rotate(turnDegreesToRadians(settings.shape.angle));
        if (settings.shape.rectRoundness) {
            ctx.roundRect(-width / 2, -height / 2, width, height, settings.size.size / 2 * settings.shape.rectRoundness);
        } else {
            ctx.rect(-width / 2, -height / 2, width, height);
        }
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
        ctx.restore();
    }
    if (settings.shape.shape === shapeTypes.ellipse) {
        const height = settings.size.size * settings.shape.widthRatio;

        ctx.ellipse(settings.position.x, settings.position.y, settings.size.size, height, turnDegreesToRadians(settings.shape.angle), 0, 2 * Math.PI);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
    if (settings.shape.shape === shapeTypes.random3 || settings.shape.shape === shapeTypes.random4) {
        ctx.moveTo(settings.position.x, settings.position.y);
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        if (settings.shape.shape === shapeTypes.random4) ctx.lineTo(settings.position.x + getBiasedRandomNumber(-settings.size.size, settings.size.size), settings.position.y + getBiasedRandomNumber(-settings.size.size, settings.size.size));
        ctx.lineTo(settings.position.x, settings.position.y);
        settings.shape.strokeOn && ctx.stroke();
        settings.shape.fillOn && ctx.fill();
    }
};