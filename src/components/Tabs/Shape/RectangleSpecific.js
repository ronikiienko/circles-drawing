import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const RectangleSpecific = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                header="Roundness"
                settings={settings}
                classes={classes}
                paramName="rectRoundness"
                setSettings={setSettings}
            >
                <Label className={classes.label}>
                    <Slider
                        value={settings.shape.rectRoundness}
                        id="shape-rectRoundness"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.05}
                        size="small"
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        value={settings.shape.rectRoundness}
                        id="shape-rectRoundness"
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
                        paramName="rectRoundness"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.rectRoundness.val2}
                                id={`mods-${modIndex}-outputs-rectRoundness-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.05"
                                size="small"
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                value={mod.outputs.rectRoundness.val2}
                                id={`mods-${modIndex}-outputs-rectRoundness-val2`}
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