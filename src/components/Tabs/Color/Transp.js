import {Checkbox, Label, Slider} from '@fluentui/react-components';
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
            <ConditionalPanel active={settings.position.gradOn}>
                <div className={classes.label}>
                    <Label className={classes.label}>
                        Transp gradient on:
                        <Checkbox
                            id="color-transpGradOn"
                            onChange={handleChange}
                            checked={settings.color.transpGradOn}
                        />
                    </Label>
                    <ConditionalPanel active={settings.color.transpGradOn}>
                        <Label title="fill color" className={classes.label}>
                            Transp 2:
                            <Slider
                                size="small"
                                className={classes.slider}
                                min={0}
                                max={1}
                                step={0.05}
                                value={settings.color.transp2}
                                onChange={handleChange}
                                id="color-transp2"
                            />
                        </Label>
                    </ConditionalPanel>
                </div>
                <br/>
                <div className={classes.label}>
                    <Label className={classes.label}>
                        Stroke transp gradient on:
                        <Checkbox
                            id="color-strokeTranspGradOn"
                            onChange={handleChange}
                            checked={settings.color.strokeTranspGradOn}
                        />
                    </Label>
                    <ConditionalPanel active={settings.color.strokeTranspGradOn}>
                        <Label title="fill color" className={classes.label}>
                            Stroke transp 2:
                            <Slider
                                size="small"
                                className={classes.slider}
                                min={0}
                                max={1}
                                step={0.05}
                                value={settings.color.strokeTranspGradOn}
                                onChange={handleChange}
                                id="color-strokeTranspGradOn"
                            />
                        </Label>
                    </ConditionalPanel>
                </div>
                <br/>
            </ConditionalPanel>
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
                    size="small"
                />
            </Label>
            <br/>
        </>
    );
};