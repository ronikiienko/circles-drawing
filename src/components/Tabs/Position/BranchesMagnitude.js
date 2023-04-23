import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const BranchesMagnitude = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <ParamHeader
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header="Branches magnitude"
                paramName="branchesMagnitude"
            >
                <Label className={classes.label}>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        size="small"
                        className={classes.number}
                        id="position-branchesMagnitude"
                        onChange={handleChange}
                        value={settings.position.branchesMagnitude}
                    />
                    <Input
                        size="small"
                        className={classes.number}
                        id="position-branchesMagnitude"
                        onChange={handleChange}
                        value={settings.position.branchesMagnitude}
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
                        paramName="branchesMagnitude"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <Slider
                                min={0}
                                max={1}
                                step={0.01}
                                size="small"
                                className={classes.number}
                                id={`mods-${modIndex}-outputs-branchesMagnitude-val2`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesMagnitude.val2}
                            />
                            <Input
                                size="small"
                                className={classes.number}
                                id={`mods-${modIndex}-outputs-branchesMagnitude-val2`}
                                onChange={handleChange}
                                value={settings.mods[modIndex].outputs.branchesMagnitude.val2}
                            />
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};
