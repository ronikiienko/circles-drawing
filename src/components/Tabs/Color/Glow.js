import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Glow = ({settings, handleChange, classes}) => {
    return (
        <>
            <Label className={classes.label}>
                Glow:
                <Slider
                    value={settings.color.glow}
                    className={classes.slider}
                    id="color-glow"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.1"
                    size="small"
                />
            </Label>
            <br/>
        </>
    );
};