import {Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Transp = ({classes, handleChange, settings}) => {
    return (
        <>
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
                    size="small"
                />
            </Label>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <Label className={classes.label}>
                    Stroke transp:
                    <Slider
                        value={settings.color.strokeTransp}
                        className={classes.slider}
                        id="color-strokeTransp"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.05"
                        size="small"
                    />
                </Label>
                <br/>
            </ConditionalPanel>
        </>
    );
};