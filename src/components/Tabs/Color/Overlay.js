import {Label, Link, Select} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {overlayModes} from '../../../consts/consts';


export const Overlay = ({settings, handleChange, classes}) => {
    return (
        <>
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
        </>
    );
};