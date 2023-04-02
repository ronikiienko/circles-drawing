import {Label, Link, Select, Slider, Switch} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {Circle20Filled, Circle20Regular} from '@fluentui/react-icons';
import React from 'react';
import {overlayModes} from '../../consts/consts';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


export const Color = ({settings, handleChange, classes}) => {
    return (
        <>
            <Label title="fill color" className={classes.label}>
                <Circle20Filled/>
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
            <Label className={classes.label}>
                Overlay:
                <Select
                    size="small"
                    value={settings.color.overlayMode}
                    className={classes.select}
                    id="color-overlayMode"
                    onChange={handleChange}
                >
                    {Object.values(overlayModes).map(overlayMode =>
                        <option
                            key={overlayMode}
                            value={overlayMode}
                        >
                            {overlayMode}
                        </option>)
                    }
                </Select>
                <InfoButton content={
                    <>
                        Overlay mode adjusts how new layer blends with existing painting.{' '}
                        <Link target="_blank"
                              href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation">Every
                            mode explained here</Link>
                    </>
                }/>
            </Label>
            <div className={classes.row}>
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
                </ConditionalPanel>
            </div>
        </>
    );
};
