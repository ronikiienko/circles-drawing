import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Color = ({settings, handleChange, classes}) => {
    return (
        <>
            <Label className={classes.label}>
                Color:
                <input
                    value={settings.color.color}
                    className={classes.slider}
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Color rand:
                <Slider
                    value={settings.color.colorRand}
                    className={classes.slider}
                    id="color-colorRand"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.01"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Transp:
                <Slider
                    value={settings.color.transp}
                    className={classes.slider}
                    id="color-transp"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.05"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Transp rand:
                <Slider
                    value={settings.color.transpRand}
                    className={classes.slider}
                    id="color-transpRand"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.1"
                />
            </Label>
            <br/>
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
                />
            </Label>
        </>
    );
};
