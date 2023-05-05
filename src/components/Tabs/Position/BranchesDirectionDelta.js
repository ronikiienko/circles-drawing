import {Input, Label} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const BranchesDirectionDelta = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header="Branches direction (from - to)"
                paramName="branchesDirectionDelta"
                noInputRow
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
                        paramName="branchesDirectionDelta"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <Input
                                size="small"
                                className={classes.number}
                                id={`mods-${modIndex}-outputs-branchesDirectionDelta-val2-from`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesDirectionDelta.val2.from}
                            />
                        </Label>
                        <Label className={classes.label}>
                            <Input
                                size="small"
                                className={classes.number}
                                id={`mods-${modIndex}-outputs-branchesDirectionDelta-val2-to`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesDirectionDelta.val2.to}
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};
