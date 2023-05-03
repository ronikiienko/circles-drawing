import {Input, Label, Slider, Switch} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const Blur = ({classes, handleChange, settings, setSettings}) => {
    return (
        <>
            <ParamHeader
                off={!settings.color.blurOn}
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header={<>
                    Blur
                    <Switch
                        id="color-blurOn"
                        size="small"
                        checked={settings.color.blurOn}
                        onChange={handleChange}
                    />
                </>}
                paramName="blur"
            >
                <Label className={classes.label}>
                    <Slider
                        size="small"
                        min={0}
                        max={1}
                        step={0.05}
                        value={settings.color.blur}
                        onChange={handleChange}
                        id="color-blur"
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        value={settings.color.blur}
                        id={`color-blur`}
                        onChange={handleChange}
                        appearance="underline"
                    />
                </Label>
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        off={!settings.color.blurOn}
                        classes={classes}
                        setSettings={setSettings}
                        key={mod.id}
                        settings={settings}
                        handleChange={handleChange}
                        modIndex={modIndex}
                        paramName="blur"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.blur.val2}
                                id={`mods-${modIndex}-outputs-blur-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.05"
                                size="small"
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                value={mod.outputs.blur.val2}
                                id={`mods-${modIndex}-outputs-blur-val2`}
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