import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Brush = ({settings, handleChange, classes}) => {
    return (
        <>
            <Label className={classes.label}>
                Brush density:
                <Slider
                    className={classes.slider}
                    id="brush-brushDensity"
                    min={0}
                    max={1}
                    step={0.05}
                    value={settings.brush.brushDensity}
                    onChange={handleChange}
                />
            </Label>
        </>
    );
};