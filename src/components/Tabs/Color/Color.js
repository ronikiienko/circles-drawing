import {Label} from '@fluentui/react-components';
import {Circle20Regular, PaintBucket20Filled} from '@fluentui/react-icons';
import React from 'react';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Color = ({classes, handleChange, settings}) => {
    return (
        <>
            <Label title="fill color" className={classes.label}>
                <PaintBucket20Filled/>
                <input
                    value={settings.color.color}
                    className={classes.slider}
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </Label>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <Label title="Stroke color">
                    <Circle20Regular/>
                    <input
                        value={settings.color.strokeColor}
                        className={classes.slider}
                        id="color-strokeColor"
                        onChange={handleChange}
                        type="color"
                    />
                </Label>
                <br/>
            </ConditionalPanel>
        </>
    );
};