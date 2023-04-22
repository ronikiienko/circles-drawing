import {Input, Label} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const XOffset = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                classes={classes}
                settings={settings}
                setSettings={setSettings}
                header="X offset"
                paramName="xOffset"
            >
                <Label className={classes.label}>
                    <Input
                        className={classes.number}
                        value={settings.position.xOffset}
                        id={`position-xOffset`}
                        onChange={handleChange}
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
                        paramName="xOffset"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <Input
                                className={classes.number}
                                value={mod.outputs.xOffset.val2}
                                id={`mods-${modIndex}-outputs-xOffset-val2`}
                                onChange={handleChange}
                                size="small"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};