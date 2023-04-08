import {useEffect} from 'react';
import {useIsKeyPressed} from './useIsKeyPressed';


export const usePixelShapeEditor = ({canvasRef, setSettings, settings}) => {
    const isRemoving = useIsKeyPressed('AltLeft');
    useEffect(() => {
        const canvas = canvasRef.current;
        const pixelSize = canvas.width / settings.shape.pixelShapeDims;

        const pageXYToPixelXY = (pageX, pageY) => {
            const boundingClientRect = canvas.getBoundingClientRect();
            const canvasX = pageX - boundingClientRect.left;
            const canvasY = pageY - boundingClientRect.top;
            const pixelX = Math.trunc(canvasX / pixelSize);
            const pixelY = Math.trunc(canvasY / pixelSize);
            return [pixelX, pixelY];
        };

        const mousedownHandler = (event) => {
            event.stopPropagation();
            const [pixelX, pixelY] = pageXYToPixelXY(event.pageX, event.pageY);
            setSettings(draft => {
                draft.shape.pixelShape[pixelY][pixelX] = !isRemoving;
            });
            canvas.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
        };

        const mousemoveHandler = (event) => {
            event.stopPropagation();
            const [pixelX, pixelY] = pageXYToPixelXY(event.pageX, event.pageY);
            setSettings(draft => {
                draft.shape.pixelShape[pixelY][pixelX] = !isRemoving;
            });
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
    }, [setSettings, canvasRef, settings.shape.pixelShapeDims, isRemoving]);
};