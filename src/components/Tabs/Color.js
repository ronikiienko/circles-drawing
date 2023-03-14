import {Checkbox, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../utils/ConditionalPanel';


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
                Color rand on:
                <Checkbox
                    checked={settings.color.isFullRand}
                    id="color-isFullRand"
                    onChange={handleChange}
                    type="checkbox"
                />
            </Label>
            <br/>
            <ConditionalPanel active={!settings.color.isFullRand}>
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

            </ConditionalPanel>

        </>
    );
};
