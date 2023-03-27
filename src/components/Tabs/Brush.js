import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Brush = ({appSettings, handleAppSettingsChange, classes}) => {
    return (
        <>
            <Label className={classes.label}>
                Brush density:
                <Slider
                    className={classes.slider}
                    id="brushDensity"
                    min={0}
                    max={1}
                    step={0.05}
                    value={appSettings.brushDensity}
                    onChange={handleAppSettingsChange}
                />
            </Label>
        </>
    );
};