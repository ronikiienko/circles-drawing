import {Button} from '@fluentui/react-components';
import React from 'react';
import {getBiasedRandomNumber} from '../../utils/generalUtils';


export const Generation = ({settings, setSettings, classes}) => {
    const randomizeSettings = () => {
        const newSettings = {
            preset: {
                id: 'default',
                name: 'Default',
                description: 'Default lines!!!!!',
            },
            size: {
                size: getBiasedRandomNumber(0, 1, 2),
                sizeRand: getBiasedRandomNumber(0, 1, 2),
            },
            glow: {
                glow: getBiasedRandomNumber(0, 1, 2),
            },
            transp: {
                transp: getBiasedRandomNumber(0, 1, 2),
                transpRand: getBiasedRandomNumber(0, 1, 2),
            },
            number: {
                number: getBiasedRandomNumber(1, 1000),
            },
            shape: {
                shape: 'line',
                lineAngle: getBiasedRandomNumber(0, 1, 2),
                lineAngleRand: getBiasedRandomNumber(0, 1, 2),
                lineRatio: getBiasedRandomNumber(0, 1, 2),
                lineRounded: getBiasedRandomNumber(0, 1, 2) > 0.5,
                lineRatioRand: getBiasedRandomNumber(0, 1, 2),
                lineLookToOn: getBiasedRandomNumber(0, 1, 2) > 0.5,
                lineLookToX: getBiasedRandomNumber(0, window.innerWidth),
                lineLookToY: getBiasedRandomNumber(0, window.innerHeight),
            },
            position: {
                startX: 0,
                startY: 0,
                endX: window.innerWidth,
                endY: window.innerHeight,
                biasX: getBiasedRandomNumber(0, window.innerWidth),
                biasY: getBiasedRandomNumber(0, window.innerHeight),
                biasA: getBiasedRandomNumber(0, 1, 2),
                biasB: getBiasedRandomNumber(0, 1, 2),
                biasInf: getBiasedRandomNumber(0, 1, 2),
            },
            color: {
                color: '#FF00DD',
                colorRand: '0.4',
                isFullRand: true,
            },
        };
        setSettings(newSettings);
    };
    return (
        <div>
            <Button onClick={randomizeSettings}>Randomize settings</Button>
        </div>
    );
};