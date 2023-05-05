import {Input, Label} from '@fluentui/react-components';
import React from 'react';
import {AngularInput} from '../../Shared/AngularInput';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const Angle = ({settings, classes, handleChange, setClickAndSetProp, setSettings}) => {
    return (
        <>
            <ParamHeader
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header="Angle"
                paramName="angle"
            >
                <Label className={classes.label}>
                    <AngularInput
                        value={settings.shape.angle}
                        id="shape-angle"
                        onChange={handleChange}
                        size={30}
                        min={1}
                        max={360}
                    />
                    <Input
                        onChange={handleChange}
                        id="shape-angle"
                        value={settings.shape.angle}
                        appearance="underline"
                        className={classes.number}
                        size="small"
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
                        paramName="angle"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <AngularInput
                                value={mod.outputs.angle.val2}
                                id={`mods-${modIndex}-outputs-angle-val2`}
                                onChange={handleChange}
                                size={30}
                                min={1}
                                max={360}
                            />
                            <Input
                                onChange={handleChange}
                                id={`mods-${modIndex}-outputs-angle-val2`}
                                value={mod.outputs.angle.val2}
                                appearance="underline"
                                className={classes.number}
                                size="small"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};