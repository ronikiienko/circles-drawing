import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const Transp = ({classes, handleChange, settings, setSettings}) => {
    return (
        <>
            <ParamHeader
                header="Transparency"
                settings={settings}
                setSettings={setSettings}
                classes={classes}
                paramName="transp"
            >
                <Label className={classes.label}>
                    <Slider
                        value={settings.color.transp}
                        id="color-transp"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.05"
                        size="small"
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        value={settings.color.transp}
                        id="color-transp"
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
                        paramName="transp"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.transp.val2}
                                id={`mods-${modIndex}-outputs-transp-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.05"
                                size="small"
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                value={mod.outputs.transp.val2}
                                id={`mods-${modIndex}-outputs-transp-val2`}
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