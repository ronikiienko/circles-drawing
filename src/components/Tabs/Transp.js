import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Transp = ({settings, handleChange, classes}) => {
    return (
        <>
            <Label className={classes.label}>
                Transp:
                <Slider
                    value={settings.transp.transp}
                    className={classes.slider}
                    id="transp-transp"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.05"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Transp rand:
                <Slider
                    value={settings.transp.transpRand}
                    className={classes.slider}
                    id="transp-transpRand"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.1"
                />
            </Label>
        </>

    );
};