import {Button, Input, Label, Switch} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {CoordinateFlag} from '../../Utils/CoordinateFlag';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const LookTo = ({classes, handleChange, settings, setClickAndSetProp, setSettings, setDragProp}) => {
    return (
        <>
            <ParamHeader
                classes={classes}
                settings={settings}
                setSettings={setSettings}
                off={!settings.shape.lookToOn}
                header={
                    <div className={classes.label}>
                        Look to
                        <Switch
                            checked={settings.shape.lookToOn}
                            id="shape-lookToOn"
                            onChange={handleChange}
                        />
                        <InfoButton content={
                            <>
                                Choose if all shapes will be rotated such way to look at one point ("Look to" point)
                            </>
                        }/>
                    </div>
                }
                paramName="lookTo"
                noInputRow={true}
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
                        paramName="lookTo"
                        modIndex={modIndex}
                        off={!settings.shape.lookToOn}
                    >
                        <div className={classes.rowSmall}>
                            <Label className={classes.label}>
                                X:
                                <Input
                                    appearance="underline"
                                    size="small"
                                    value={mod.outputs.lookTo.val2.x}
                                    className={classes.number}
                                    id={`mods-${modIndex}-outputs-lookTo-val2-x`}
                                    onChange={handleChange}
                                    type="text"
                                />
                            </Label>
                            <Label className={classes.label}>
                                Y:
                                <Input
                                    appearance="underline"
                                    size="small"
                                    value={mod.outputs.lookTo.val2.y}
                                    className={classes.number}
                                    id={`mods-${modIndex}-outputs-lookTo-val2-y`}
                                    onChange={handleChange}
                                    type="text"
                                />
                            </Label>
                            <Button size="small" id={`mods-${modIndex}-outputs-lookTo-val2`}
                                    onClick={setClickAndSetProp}>Click and set</Button>
                        </div>
                        <CoordinateFlag
                            size={20}
                            id={`mods-${modIndex}-outputs-lookTo-val2`}
                            text="L"
                            title={`"Look to" of mod: ${mod.name} (${mod.type})`}
                            x={mod.outputs.lookTo.val2.x}
                            y={mod.outputs.lookTo.val2.y}
                            onMouseDown={setDragProp}
                            color={hslArrToHsl(mod.color)}
                            dot={false}
                        />
                    </ParamMod>
                );
            })}
        </>
    );
};