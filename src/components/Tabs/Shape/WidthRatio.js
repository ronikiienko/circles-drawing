import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const WidthRatio = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                header="Width ratio"
                settings={settings}
                classes={classes}
                paramName="widthRatio"
                setSettings={setSettings}
            >
                <Label className={classes.label}>
                    <Slider
                        value={settings.shape.widthRatio}
                        id="shape-widthRatio"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.01}
                        size="small"
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        value={settings.shape.widthRatio}
                        id="shape-widthRatio"
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
                        paramName="widthRatio"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.widthRatio.val2}
                                id={`mods-${modIndex}-outputs-widthRatio-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.01"
                                size="small"
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                value={mod.outputs.widthRatio.val2}
                                id={`mods-${modIndex}-outputs-widthRatio-val2`}
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