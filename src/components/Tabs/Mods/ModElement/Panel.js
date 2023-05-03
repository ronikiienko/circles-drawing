import {Label, makeStyles, Select, shorthands, Slider, Text, tokens} from '@fluentui/react-components';
import React from 'react';
import {modTypes} from '../../../../consts/sharedConsts';
import {ConditionalPanel} from '../../../Shared/ConditionalPanel';
import {ModInputs} from '../ModInputs';
import {Noise} from '../Noise';
import {Radial} from '../Radial';
import {RemapCharacter} from '../RemapCharacter';
import {Trig} from '../Trig';


const useStyles = makeStyles({
    accordionPanel: {
        ...shorthands.margin('0px'),
        paddingInline: '4px',
    },
    block: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStencil1Alpha),
        marginBlock: '5px',
    },
});
export const Panel = ({classes, settings, modIndex, handleChange, setDragProp, setClickAndSetProp, setSettings}) => {
    const localClasses = useStyles();
    return (
        <div className={localClasses.accordionPanel}>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Mod type:
                    <Select
                        size="small"
                        value={settings.mods[modIndex].type}
                        className={classes.select}
                        id={`mods-${modIndex}-type`}
                        onChange={handleChange}
                    >
                        {Object.values(modTypes).map(modType =>
                            <option
                                key={modType.id}
                                value={modType.id}
                            >
                                {modType.name}
                            </option>)
                        }
                    </Select>
                </Label>
            </div>
            <ConditionalPanel active={settings.mods[modIndex].type === modTypes.noise.id}>
                <div className={classes.block}>
                    <Noise
                        handleChange={handleChange}
                        settings={settings}
                        classes={classes}
                        modIndex={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.mods[modIndex].type === modTypes.radial.id}>
                <div className={classes.block}>
                    <Radial
                        settings={settings}
                        classes={classes}
                        handleChange={handleChange}
                        setDragProp={setDragProp}
                        setClickAndSetProp={setClickAndSetProp}
                        index={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.mods[modIndex].type === modTypes.trig.id}>
                <div className={classes.block}>
                    <Trig
                        settings={settings}
                        classes={classes}
                        handleChange={handleChange}
                        modIndex={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Blend ratio:
                    <Slider
                        min={0.01}
                        max={1}
                        step={0.01}
                        id={`mods-${modIndex}-blendRatio`}
                        onChange={handleChange}
                        value={settings.mods[modIndex].blendRatio}
                        size="small"
                    />
                    <Text>
                        {settings.mods[modIndex].blendRatio}
                    </Text>
                </Label>
                <RemapCharacter
                    index={modIndex}
                    handleChange={handleChange}
                    classes={classes}
                    settings={settings}
                />
            </div>
            <div className={classes.block}>
                <ModInputs
                    classes={classes}
                    handleChange={handleChange}
                    settings={settings}
                    setSettings={setSettings}
                    modIndex={modIndex}
                />
            </div>
        </div>
    );
};