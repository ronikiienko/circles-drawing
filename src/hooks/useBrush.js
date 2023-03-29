import {useCallback, useEffect} from 'react';
import {deepCopy} from '../utils/generalUtils';
import {getTranslatedBrushDensity} from '../utils/translaters';
import {addToHistory, drawLayer} from '../worker/canvasWorkerMediators';
import {useIsKeyPressed} from './useIsKeyPressed';


let counter;
export const useBrush = ({settings, appSettings}) => {
    const isBrushOn = useIsKeyPressed('Space');
    const mousemoveHandler = useCallback((event) => {
        console.log('mousemove');
        if (!isBrushOn) return;

        const brushEventInterval = getTranslatedBrushDensity(settings.brush.brushDensity);
        counter++;
        if (counter < brushEventInterval) return;
        counter = 0;

        const rawSettings = deepCopy(settings);
        rawSettings.brush.brushX = event.pageX;
        rawSettings.brush.brushY = event.pageY;
        rawSettings.brush.brushOn = true;

        drawLayer(rawSettings, appSettings, false);
    }, [isBrushOn, appSettings, settings]);

    // TODO when stop holding space earlier than mouseup, nothing is written to history (fixed by removing mouseup listener from mouseupHandler)

    useEffect(() => {
        if (!isBrushOn) return;

        const mousedownHandler = () => {
            console.log('mousedown');
            window.addEventListener('mouseup', mouseupHandler);
            window.addEventListener('mousemove', mousemoveHandler);
        };

        const mouseupHandler = () => {
            console.log('mouseup');
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
            addToHistory(appSettings);
        };

        console.log('adding listeners');
        window.addEventListener('mousedown', mousedownHandler);

        return () => {
            console.log('removing listeners');
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mousedown', mousedownHandler);
        };

    }, [appSettings, isBrushOn, mousemoveHandler]);
};