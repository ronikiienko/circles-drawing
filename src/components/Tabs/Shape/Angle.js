import {Label, Text} from '@fluentui/react-components';
import React from 'react';
import {getTranslatedAngle} from '../../../utils/layerSettings/remappers';
import {AngularInput} from '../../Utils/AngularInput';
import {ParamHeader, ParamMod} from '../../Utils/ParamWrappers';


export const Angle = ({settings, classes, handleChange, setClickAndSetProp, setSettings}) => {
    return (
        <>
            <ParamHeader
                settings={settings}
                classes={classes}
                setSettings={setSettings}
                header="Angle"
                paramName="angle"
            >
                <AngularInput
                    value={settings.shape.angle}
                    id="shape-angle"
                    onChange={handleChange}
                    size={30}
                />
                <Text className={classes.slider}>{getTranslatedAngle(settings.shape.angle).toFixed(0)}</Text>
            </ParamHeader>
            {settings.mods.map((mod, modIndex) => {
                return (
                    <ParamMod
                        classes={classes}
                        setSettings={setSettings}
                        key={mod.id}
                        settings={settings}
                        handleChange={handleChange}
                        paramName="angle"
                        modIndex={modIndex}
                    >
                        <Label className={classes.label}>
                            <AngularInput
                                value={mod.outputs.angle.val2}
                                id={`mods-${modIndex}-outputs-angle-val2`}
                                onChange={handleChange}
                                size={30}
                            />
                            <Text
                                className={classes.slider}>{getTranslatedAngle(mod.outputs.angle.val2).toFixed(0)}</Text>
                        </Label>
                    </ParamMod>
                );
            })}
        </>
    );
};