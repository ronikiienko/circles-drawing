import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Sine = ({settings, handleChange, classes, index}) => {
    return (
        <>
            <Label className={classes.label}>
                Zoom X:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    className={classes.slider}
                    size="small"
                    value={settings.mods[index].sineZoomX}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${index}-sineZoomX`}
                />
                <Input
                    appearance="underline"
                    className={classes.number}
                    size="small"
                    value={settings.mods[index].sineZoomX}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${index}-sineZoomX`}
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Zoom Y:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    className={classes.slider}
                    size="small"
                    value={settings.mods[index].sineZoomY}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${index}-sineZoomY`}
                />
                <Input
                    appearance="underline"
                    className={classes.number}
                    size="small"
                    value={settings.mods[index].sineZoomY}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${index}-sineZoomY`}
                />
            </Label>
        </>
    );
};