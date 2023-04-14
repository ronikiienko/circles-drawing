import {Label, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {Circle20Regular} from '@fluentui/react-icons';
import React from 'react';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {ParamAddModButton, ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


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
        backgroundColor: tokens.colorNeutralStencil1Alpha,
    },
});
export const Color = ({classes, handleChange, settings, setSettings}) => {
    const localClasses = useStyles();
    return (
        <>
            <ParamHeader header="Fill color">
                <span>
                    Base value:
                </span>
                <input
                    value={settings.color.color}
                    className={classes.slider}
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        key={mod.id}
                        modIndex={modIndex}
                        handleChange={handleChange}
                        settings={settings}
                        paramName="color"
                    >
                        <Label className={classes.label}>
                            <input
                                value={mod.outputs.color.val2}
                                className={classes.slider}
                                id={`mods-${modIndex}-outputs-color-val2`}
                                onChange={handleChange}
                                type="color"
                            />
                        </Label>
                    </ParamMod>
                );
            })}
            <ParamAddModButton
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                paramName="color"
            />
            <br/>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <Label title="Stroke color">
                    <Circle20Regular/>
                    <input
                        value={settings.color.strokeColor}
                        className={classes.slider}
                        id="color-strokeColor"
                        onChange={handleChange}
                        type="color"
                    />
                </Label>
                <br/>
            </ConditionalPanel>
        </>
    );
    }
;