import {useCallback, useEffect} from 'react';
import {addToHistory, drawLayer} from '../drawing/draw';
import {getTranslatedAppSettings} from '../drawing/translaters';
import {deepCopy} from '../utils';
import {useIsKeyPressed} from './useIsKeyPressed';


let counter;
export const useBrush = ({settings, appSettings}) => {
    const isBrushOn = useIsKeyPressed('ControlLeft');
    const mousemoveHandler = useCallback((event) => {
        if (!isBrushOn) return;

        const brushEventInterval = getTranslatedAppSettings(appSettings).brushEventInterval;

        console.log(counter);
        counter++;
        if (counter < brushEventInterval) return;
        counter = 0;
        const rawSettings = deepCopy(settings);
        rawSettings.brush.brushX = event.pageX;
        rawSettings.brush.brushY = event.pageY;
        rawSettings.brush.brushOn = true;
        console.log(rawSettings);
        drawLayer(rawSettings, appSettings, false);
    }, [isBrushOn, appSettings, settings]);

    useEffect(() => {
        const mousedownHandler = () => {
            window.addEventListener('mousemove', mousemoveHandler);
        };

        const mouseupHandler = () => {
            window.removeEventListener('mousemove', mousemoveHandler);
            addToHistory(appSettings);
        };

        if (isBrushOn) {
            console.log('adding listeners');
            window.addEventListener('mousedown', mousedownHandler);
            window.addEventListener('mouseup', mouseupHandler);
        }

        return () => {
            console.log('removing listeners');
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mousedown', mousedownHandler);
            window.removeEventListener('mouseup', mouseupHandler);
        };
    }, [isBrushOn, mousemoveHandler]);
};