import {Input, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {trigModTypes} from '../../../consts/sharedConsts';


export const Trig = ({settings, handleChange, classes, modIndex}) => {
    return (
        <>
            <Label className={classes.label}>
                Trig type:
                <Select
                    size="small"
                    value={settings.mods[modIndex].trigType}
                    className={classes.select}
                    id={`mods-${modIndex}-trigType`}
                    onChange={handleChange}
                >
                    {Object.values(trigModTypes).map(modType =>
                        <option
                            key={modType.id}
                            value={modType.id}
                        >
                            {modType.name}
                        </option>)
                    }
                </Select>
            </Label>
            <br/>
            <Label className={classes.label}>
                Zoom X:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    className={classes.slider}
                    size="small"
                    value={settings.mods[modIndex].sineZoomX}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${modIndex}-sineZoomX`}
                />
                <Input
                    appearance="underline"
                    className={classes.number}
                    size="small"
                    value={settings.mods[modIndex].sineZoomX}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${modIndex}-sineZoomX`}
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Zoom Y:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    className={classes.slider}
                    size="small"
                    value={settings.mods[modIndex].sineZoomY}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${modIndex}-sineZoomY`}
                />
                <Input
                    appearance="underline"
                    className={classes.number}
                    size="small"
                    value={settings.mods[modIndex].sineZoomY}
                    type="text"
                    onChange={handleChange}
                    id={`mods-${modIndex}-sineZoomY`}
                />
            </Label>
        </>
    );
};