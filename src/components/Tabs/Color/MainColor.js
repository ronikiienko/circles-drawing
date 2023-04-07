import {Divider, Label, Link, Select, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {overlayModes} from '../../../consts/consts';
import {Blur} from './Blur';
import {Color} from './Color';
import {Transp} from './Transp';


export const MainColor = ({settings, handleChange, classes}) => {
    return (
        <>
            <Color settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <Transp settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
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
            <Divider/>
            <Blur settings={settings} handleChange={handleChange} classes={classes}/>
        </>
    );
};
