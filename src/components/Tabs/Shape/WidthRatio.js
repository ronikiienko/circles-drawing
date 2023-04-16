import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const WidthRatio = ({settings, classes, handleChange}) => {
    return (
        <>
            <Label className={classes.label}>
                Width ratio:
                <Slider
                    className={classes.slider}
                    value={settings.shape.widthRatio}
                    id="shape-widthRatio"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step={0.05}
                />
            </Label>
        </>
    );
};