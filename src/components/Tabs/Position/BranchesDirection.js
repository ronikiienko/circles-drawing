import {Input, Label} from '@fluentui/react-components';
import React from 'react';
import {AngularInput} from '../../Shared/AngularInput';
import {ParamHeader, ParamMod} from '../../Shared/ParamWrappers';


export const BranchesDirection = ({settings, classes, setSettings, handleChange}) => {
    return (
        <>
            <ParamHeader
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header="Branches direction"
                paramName="branchesDirection"
            >
                <Label className={classes.label}>
                    <AngularInput
                        id="position-branchesDirection"
                        onChange={handleChange}
                        value={settings.position.branchesDirection}
                        min={1}
                        max={360}
                    />
                    <Input
                        appearance="underline"
                        size="small"
                        id="position-branchesDirection"
                        onChange={handleChange}
                        value={settings.position.branchesDirection}
                        className={classes.number}
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
                        paramName="branchesDirection"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <AngularInput
                                id={`mods-${modIndex}-outputs-branchesDirection-val2`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesDirection.val2}
                                min={1}
                                max={360}
                            />
                            <Input
                                appearance="underline"
                                size="small"
                                id={`mods-${modIndex}-outputs-branchesDirection-val2`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesDirection.val2}
                                className={classes.number}
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};