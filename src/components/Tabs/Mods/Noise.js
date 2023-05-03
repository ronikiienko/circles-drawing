import {Input, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {noiseTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';


export const Noise = ({classes, modIndex, handleChange, settings}) => {
    return (
        <>
            <Label className={classes.label}>
                Noise type:
                <Select
                    size="small"
                    className={classes.select}
                    value={settings.mods[modIndex].noiseType}
                    id={`mods-${modIndex}-noiseType`}
                    onChange={handleChange}
                >
                    {Object.values(noiseTypes).map(noiseType => {
                        return <option key={noiseType.id} value={noiseType.id}>{noiseType.name}</option>;
                    })}
                </Select>
            </Label>
            <br/>
            <ConditionalPanel active={settings.mods[modIndex].noiseType !== noiseTypes.random.id}>
                <Label className={classes.label}>
                    Noise zoom:
                    <Slider
                        size="small"
                        min={0}
                        max={1}
                        step={0.01}
                        id={`mods-${modIndex}-noiseZoom`}
                        onChange={handleChange}
                        value={settings.mods[modIndex].noiseZoom}
                    />
                    <Input
                        className={classes.number}
                        size="small"
                        appearance="underline"
                        id={`mods-${modIndex}-noiseZoom`}
                        onChange={handleChange}
                        value={settings.mods[modIndex].noiseZoom}
                    />
                </Label>
            </ConditionalPanel>
        </>
    );
};