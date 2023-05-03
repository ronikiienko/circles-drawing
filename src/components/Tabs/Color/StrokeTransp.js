import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const StrokeTransp = ({classes, handleChange, settings, setSettings}) => {
    return (
        <>
            <ParamHeader
                header="Stroke transparency"
                settings={settings}
                paramName="strokeTransp"
                classes={classes}
                setSettings={setSettings}
            >
                <Label className={classes.label}>
                    <Slider
                        value={settings.color.strokeTransp}
                        id="color-strokeTransp"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.05"
                        size="small"
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        value={settings.color.strokeTransp}
                        id="color-strokeTransp"
                        onChange={handleChange}
                        appearance="underline"
                    />
                </Label>
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        classes={classes}
                        setSettings={setSettings}
                        key={mod.id}
                        settings={settings}
                        handleChange={handleChange}
                        modIndex={modIndex}
                        paramName="strokeTransp"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.strokeTransp.val2}
                                id={`mods-${modIndex}-outputs-strokeTransp-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.05"
                                size="small"
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                value={mod.outputs.strokeTransp.val2}
                                id={`mods-${modIndex}-outputs-strokeTransp-val2`}
                                onChange={handleChange}
                                appearance="underline"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};