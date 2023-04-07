import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const RectangleSpecific = ({settings, classes, handleChange}) => {
    return (
        <>
            <Label className={classes.label}>
                Rectangle roundness:
                <Slider
                    id="shape-rectRoundness"
                    value={settings.shape.rectRoundness}
                    onChange={handleChange}
                    className={classes.slider}
                    min="0"
                    max="1"
                    step={0.05}
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Rectangle roundness rand:
                <Slider
                    id="shape-rectRoundnessRand"
                    value={settings.shape.rectRoundnessRand}
                    onChange={handleChange}
                    className={classes.slider}
                    min="0"
                    max="1"
                    step={0.05}
                />
            </Label>
        </>
    );
};