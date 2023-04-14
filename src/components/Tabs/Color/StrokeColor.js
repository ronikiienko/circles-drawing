import {Label} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const StrokeColor = ({classes, handleChange, settings, setSettings}) => {
    return (
        <>
            <ParamHeader
                header="Stroke color"
                settings={settings}
                paramName="strokeColor"
                classes={classes}
                setSettings={setSettings}
            >
                <input
                    value={settings.color.strokeColor}
                    className={classes.slider}
                    id="color-strokeColor"
                    onChange={handleChange}
                    type="color"
                />
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        classes={classes}
                        setSettings={setSettings}
                        key={mod.id}
                        modIndex={modIndex}
                        handleChange={handleChange}
                        settings={settings}
                        paramName="strokeColor"
                    >
                        <Label className={classes.label}>
                            <input
                                value={mod.outputs.strokeColor.val2}
                                className={classes.slider}
                                id={`mods-${modIndex}-outputs-strokeColor-val2`}
                                onChange={handleChange}
                                type="color"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};