import {Checkbox, Label, Slider, Switch} from '@fluentui/react-components';
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
                    <Label className={classes.label}>
                        Blur rand:
                        <Slider
                            className={classes.slider}
                            min={0}
                            max={1}
                            step={0.05}
                            value={settings.color.blurRand}
                            onChange={handleChange}
                            id="color-blurRand"
                        />
                    </Label>
                    <ConditionalPanel active={settings.position.gradOn}>
                        <br/>
                        <div className={classes.label}>
                            <Label className={classes.label}>
                                Blur gradient on:
                                <Checkbox
                                    id="color-blurGradOn"
                                    onChange={handleChange}
                                    checked={settings.color.blurGradOn}
                                />
                            </Label>
                            <ConditionalPanel active={settings.color.blurGradOn}>
                                <Label title="fill color" className={classes.label}>
                                    Blur 2:
                                    <Slider
                                        className={classes.slider}
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        value={settings.color.blur2}
                                        onChange={handleChange}
                                        id="color-blur2"
                                    />
                                </Label>
                            </ConditionalPanel>
                        </div>
                    </ConditionalPanel>
                </ConditionalPanel>
            </div>
        </>
    );
};