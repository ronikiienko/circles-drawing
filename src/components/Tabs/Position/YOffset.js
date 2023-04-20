import {Input, Label} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const YOffset = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                classes={classes}
                settings={settings}
                setSettings={setSettings}
                noInputRow={true}
                header="Y offset"
                paramName="yOffset"
            >

            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        classes={classes}
                        setSettings={setSettings}
                        key={mod.id}
                        settings={settings}
                        handleChange={handleChange}
                        paramName="yOffset"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <Input
                                className={classes.number}
                                value={mod.outputs.yOffset.val2}
                                id={`mods-${modIndex}-outputs-yOffset-val2`}
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