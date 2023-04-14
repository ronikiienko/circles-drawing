import {Input, Label, makeStyles, shorthands, Slider, tokens} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';
import {ParamHeader, ParamMod} from '../Utils/ParamWrappers';


const useStyles = makeStyles({
    sliderSize: {
        width: '250px',
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
                            key={mod.id}
                            settings={settings}
                            handleChange={handleChange}
                            paramName="size"
                            modIndex={modIndex}
                        >
                            <br/>
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
                                    className={classes.number}
                                    size="small"
                                    value={mod.outputs.size.val2}
                                />
                            </Label>
                        </ParamMod>
                    );
                })}
            </div>
        </>
    );
};