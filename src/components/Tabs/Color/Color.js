import {Checkbox, Label, Slider} from '@fluentui/react-components';
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
            <ConditionalPanel active={settings.position.gradOn}>
                <div className={classes.label}>
                    <Label className={classes.label}>
                        Color gradient on:
                        <Checkbox
                            id="color-colorGradOn"
                            onChange={handleChange}
                            checked={settings.color.colorGradOn}
                        />
                    </Label>
                    <ConditionalPanel active={settings.color.colorGradOn}>
                        <Label title="fill color" className={classes.label}>
                            <PaintBucket20Filled/>2
                            <input
                                value={settings.color.color2}
                                className={classes.slider}
                                id="color-color2"
                                onChange={handleChange}
                                type="color"
                            />
                        </Label>
                    </ConditionalPanel>
                </div>
                <ConditionalPanel active={settings.shape.strokeOn}>
                    <br/>
                    <div className={classes.label}>
                        <Label className={classes.label}>
                            Stroke color gradient on:
                            <Checkbox
                                id="color-strokeColorGradOn"
                                onChange={handleChange}
                                checked={settings.color.strokeColorGradOn}
                            />
                        </Label>
                        <ConditionalPanel active={settings.color.strokeColorGradOn}>
                            <Label title="fill color" className={classes.label}>
                                <Circle20Regular/>2
                                <input
                                    value={settings.color.strokeColor2}
                                    className={classes.slider}
                                    id="color-strokeColor2"
                                    onChange={handleChange}
                                    type="color"
                                />
                            </Label>
                        </ConditionalPanel>
                    </div>
                </ConditionalPanel>
                <br/>
            </ConditionalPanel>
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
                    size="small"
                />
            </Label>
            <br/>
        </>
    );
};