import {Input, Label, makeStyles, shorthands, Slider, tokens} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';
import {ParamHeader, ParamMod} from '../Shared/ParamWrappers';


const useStyles = makeStyles({
    sliderSize: {
        width: '200px',
    },
    modItem: {
        ...shorthands.padding('5px'),
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    modItemBase: {
        backgroundColor: hslArrToHsl([255, 100, 100, 0.3]),
    },
});

export const Size = ({settings, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <>
            <div className={classes.block}>
                <ParamHeader
                    header="Size"
                    settings={settings}
                    classes={classes}
                    paramName="size"
                    setSettings={setSettings}
                >
                    <Label className={classes.label}>
                        <Slider
                            min={0}
                            max={1}
                            step={0.005}
                            id="size-size"
                            value={settings.size.size}
                            onChange={handleChange}
                            className={localClasses.sliderSize}
                            size="small"
                        />
                        <Input
                            appearance="underline"
                            size="small"
                            value={settings.size.size}
                            className={classes.number}
                            id="size-size"
                            onChange={handleChange}
                            type="text"
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
                            paramName="size"
                            modIndex={modIndex}
                        >
                            <Label className={classes.label}>
                                <Slider
                                    className={localClasses.sliderSize}
                                    min={0}
                                    max={1}
                                    step={0.005}
                                    value={mod.outputs.size.val2}
                                    id={`mods-${modIndex}-outputs-size-val2`}
                                    onChange={handleChange}
                                    size="small"
                                />
                                <Input
                                    appearance="underline"
                                    className={classes.number}
                                    size="small"
                                    id={`mods-${modIndex}-outputs-size-val2`}
                                    value={mod.outputs.size.val2}
                                    onChange={handleChange}
                                />
                            </Label>
                        </ParamMod>
                    );
                })}
            </div>
        </>
    );
};