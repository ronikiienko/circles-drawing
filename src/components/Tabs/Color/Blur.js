import {Label, Slider, Switch} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Blur = ({classes, handleChange, settings}) => {
    return (
        <>
            <div>
                <Label className={classes.label}>
                    Blur on:
                    <Switch
                        id="color-blurOn"
                        size="small"
                        checked={settings.color.blurOn}
                        onChange={handleChange}
                    />
                </Label>
                <ConditionalPanel active={settings.color.blurOn}>
                    <Label className={classes.label}>
                        Blur:
                        <Slider
                            className={classes.slider}
                            min={0}
                            max={1}
                            step={0.05}
                            value={settings.color.blur}
                            onChange={handleChange}
                            id="color-blur"
                        />
                    </Label>
                </ConditionalPanel>
            </div>
        </>
    );
};