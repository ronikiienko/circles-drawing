import {Checkbox, Label, Link, Select, Slider, Switch} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {Circle20Regular, PaintBucket20Filled} from '@fluentui/react-icons';
import React from 'react';
import {overlayModes} from '../../../consts/consts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Color = ({settings, handleChange, classes}) => {
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
