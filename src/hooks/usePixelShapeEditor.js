import {useEffect} from 'react';
import {pixelShapeBrushTypes} from '../consts/sharedConsts';
import {getTranslatedPixelShapeBrushSize} from '../utils/appSettings/remappers';


export const usePixelShapeEditor = ({canvasRef, setSettings, settings, appSettings}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const pixelSize = canvas.width / settings.shape.pixelShapeRes;

        const pageXYToPixels = (pageX, pageY) => {
            const boundingClientRect = canvas.getBoundingClientRect();
            const canvasX = pageX - boundingClientRect.left;
            const canvasY = pageY - boundingClientRect.top;
            const centerX = Math.trunc(canvasX / pixelSize);
            const centerY = Math.trunc(canvasY / pixelSize);
            const pixels = [];
            const brushSize = getTranslatedPixelShapeBrushSize(appSettings.pixelShapeBrushSize);
            for (let x = centerX - brushSize; x <= centerX + brushSize; x++) {
                for (let y = centerY - brushSize; y <= centerY + brushSize; y++) {
                    pixels.push([x, y]);
                }
            }
            return pixels;
        };

        const mousedownHandler = (event) => {
            event.stopPropagation();
            setPixels(pageXYToPixels(event.pageX, event.pageY));
            canvas.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
        };

        const setPixels = (pixels) => {
            setSettings(draft => {
                for (const pixel of pixels) {
                    if (typeof draft.shape.pixelShape[pixel[0]] === 'undefined' ||
                        typeof draft.shape.pixelShape[pixel[0]]?.[pixel[1]] === 'undefined'
                    ) continue;
                    let newPixelValue;
                    if (appSettings.pixelShapeBrushType === pixelShapeBrushTypes.pencil) newPixelValue = 1;
                    if (appSettings.pixelShapeBrushType === pixelShapeBrushTypes.eraser) newPixelValue = 0;
                    draft.shape.pixelShape[pixel[0]][pixel[1]] = newPixelValue;
                }
            });
        };

        const mousemoveHandler = (event) => {
            event.stopPropagation();
            setPixels(pageXYToPixels(event.pageX, event.pageY));
        };

        const mouseupHandler = () => {
            canvas.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
        };

        canvas.addEventListener('mousedown', mousedownHandler);
        return () => {
            canvas.removeEventListener('mousedown', mousedownHandler);
            canvas.removeEventListener('mousemove', mousemoveHandler);
        };
    }, [setSettings, canvasRef, settings.shape.pixelShapeRes, appSettings.pixelShapeBrushSize, appSettings.pixelShapeBrushType]);
};