import {Input, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {noiseTypes, worleyNoiseMetricTypes} from '../../../consts/sharedConsts';
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
            <ConditionalPanel active={mod.settings.noiseType === noiseTypes.worley.id}>
                <br/>
                <Label className={classes.label}>
                    Worley metric type:
                    <Select
                        size="small"
                        className={classes.select}
                        value={mod.settings.worleyMetricType}
                        id={`mods-${modIndex}-settings-worleyMetricType`}
                        onChange={handleChange}
                    >
                        {Object.values(worleyNoiseMetricTypes).map(worleyMetricType => {
                            return <option key={worleyMetricType.id}
                                           value={worleyMetricType.id}>{worleyMetricType.name}</option>;
                        })}
                    </Select>
                </Label>
                <br/>
                <Label className={classes.label}>
                    Crests number:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.worleyCrestsNumber}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-worleyCrestsNumber`}
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Worley threshold:
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        className={classes.slider}
                        size="small"
                        value={mod.settings.worleyThreshold}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-worleyThreshold`}
                    />
                    <Input
                        appearance="underline"
                        className={classes.number}
                        size="small"
                        value={mod.settings.worleyThreshold}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-worleyThreshold`}
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Worley closest N:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.worleyClosestN}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-worleyClosestN`}
                    />
                </Label>
                <ConditionalPanel active={mod.settings.worleyMetricType === worleyNoiseMetricTypes.minkowski.id}>
                    <br/>
                    <Label className={classes.label}>
                        Minkowski distance P:
                        <Input
                            className={classes.number}
                            size="small"
                            value={mod.settings.worleyMinkowskiP}
                            type="text"
                            onChange={handleChange}
                            id={`mods-${modIndex}-settings-worleyMinkowskiP`}
                        />
                    </Label>
                </ConditionalPanel>
            </ConditionalPanel>
            <br/>
            <ConditionalPanel
                active={mod.settings.noiseType !== noiseTypes.random.id && mod.settings.noiseType !== noiseTypes.worley.id}>
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