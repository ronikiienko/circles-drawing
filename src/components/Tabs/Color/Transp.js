import {Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


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
                    Base value:
                    <Slider
                        value={settings.color.transp}
                        className={classes.slider}
                        id="color-transp"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.05"
                        size="small"
                    />
                </Label>
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        key={mod.id}
                        settings={settings}
                        handleChange={handleChange}
                        modIndex={modIndex}
                        paramName="transp"
                    >
                        <Label className={classes.label}>
                            <Slider
                                value={mod.outputs.transp.val2}
                                className={classes.slider}
                                id={`mods-${modIndex}-outputs-transp-val2`}
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.05"
                                size="small"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};