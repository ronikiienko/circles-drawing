import {Checkbox, Label} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {BiasCoords} from './BiasCoords';


export const RectangularSpecific = ({settings, classes, handleChange, setClickAndSetProp}) => {
    return (
        <>
            <Label className={classes.label}>
                Bias X on:
                <Checkbox
                    checked={settings.position.biasRectXOn}
                    id="position-biasRectXOn"
                    onChange={handleChange}
                />
                <InfoButton content={
                    <>
                        Choose if shapes will be biased by X axis
                    </>
                }/>
            </Label>
            <Label className={classes.label}>
                Bias Y on:
                <Checkbox
                    checked={settings.position.biasRectYOn}
                    id="position-biasRectYOn"
                    onChange={handleChange}
                />
                <InfoButton content={
                    <>
                        Choose if shapes will be biased by Y axis
                    </>
                }/>
            </Label>
            <BiasCoords handleChange={handleChange} settings={settings} setClickAndSetProp={setClickAndSetProp}
                        classes={classes}/>
        </>
    );
};