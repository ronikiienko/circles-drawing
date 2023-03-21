import {Label, Link, Select, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {overlayModes} from '../../consts';


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
                    {overlayModes.map(overlayMode =>
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
        </>
    );
};
