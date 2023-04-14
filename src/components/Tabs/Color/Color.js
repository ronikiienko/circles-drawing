import {Label, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React from 'react';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


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
    return (
        <>
            <ParamHeader
                header="Fill color"
                settings={settings}
                paramName="color"
                classes={classes}
                setSettings={setSettings}
            >
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
                        classes={classes}
                        setSettings={setSettings}
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
        </>
    );
    }
;