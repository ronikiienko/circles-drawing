import {Input, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {noiseTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';


export const Noise = ({classes, modIndex, handleChange, mod}) => {
    return (
        <>
            <Label className={classes.label}>
                Noise type:
                <Select
                    size="small"
                    className={classes.select}
                    value={mod.settings.noiseType}
                    id={`mods-${modIndex}-settings-noiseType`}
                    onChange={handleChange}
                >
                    {Object.values(noiseTypes).map(noiseType => {
                        return <option key={noiseType.id} value={noiseType.id}>{noiseType.name}</option>;
                    })}
                </Select>
            </Label>
            <br/>
            <ConditionalPanel active={mod.settings.noiseType !== noiseTypes.random.id}>
                <Label className={classes.label}>
                    Noise zoom:
                    <Slider
                        size="small"
                        min={0}
                        max={1}
                        step={0.01}
                        id={`mods-${modIndex}-settings-noiseZoom`}
                        onChange={handleChange}
                        value={mod.settings.noiseZoom}
                    />
                    <Input
                        className={classes.number}
                        size="small"
                        appearance="underline"
                        id={`mods-${modIndex}-settings-noiseZoom`}
                        onChange={handleChange}
                        value={mod.settings.noiseZoom}
                    />
                </Label>
            </ConditionalPanel>
        </>
    );
};