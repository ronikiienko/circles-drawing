import {Label, makeStyles, Select, shorthands, Slider, Text, tokens} from '@fluentui/react-components';
import React from 'react';
import {indexModTypes, modTypes} from '../../../../consts/sharedConsts';
import {ConditionalPanel} from '../../../Shared/ConditionalPanel';
import {Remap} from '../../../Shared/Remap';
import {ModInputs} from '../ModInputs';
import {Noise} from '../Noise';
import {Radial} from '../Radial';
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
export const Panel = ({
                          classes,
                          settings,
                          modIndex,
                          handleChange,
                          setDragProp,
                          setClickAndSetProp,
                          setSettings,
                          mod,
                      }) => {
    const localClasses = useStyles();
    return (
        <div className={localClasses.accordionPanel}>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Mod type:
                    <Select
                        size="small"
                        value={mod.settings.type}
                        className={classes.select}
                        id={`mods-${modIndex}-settings-type`}
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
            <ConditionalPanel active={mod.settings.type === modTypes.noise.id}>
                <div className={classes.block}>
                    <Noise
                        handleChange={handleChange}
                        mod={mod}
                        classes={classes}
                        modIndex={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={mod.settings.type === modTypes.radial.id}>
                <div className={classes.block}>
                    <Radial
                        mod={mod}
                        classes={classes}
                        handleChange={handleChange}
                        setDragProp={setDragProp}
                        setClickAndSetProp={setClickAndSetProp}
                        index={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={mod.settings.type === modTypes.trig.id}>
                <div className={classes.block}>
                    <Trig
                        mod={mod}
                        classes={classes}
                        handleChange={handleChange}
                        modIndex={modIndex}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={mod.settings.type === modTypes.index.id}>
                <div className={classes.block}>
                    <Label className={classes.label}>
                        Index mod type:
                        <Select
                            className={classes.slider}
                            onChange={handleChange}
                            id={`mods-${modIndex}-settings-indexType`}
                            value={mod.settings.indexType}
                            size="small"
                        >
                            {Object.values(indexModTypes).map(indexModType => {
                                return <option
                                    key={indexModType.id}
                                    value={indexModType.id}
                                >
                                    {indexModType.name}
                                </option>;
                            })}
                        </Select>
                    </Label>
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
                        value={mod.blendRatio}
                        size="small"
                    />
                    <Text>
                        {mod.blendRatio}
                    </Text>
                </Label>
                <Remap
                    id={`mods-${modIndex}-settings-remapLevels`}
                    value={settings.mods[modIndex].settings.remapLevels}
                    setSettings={setSettings}
                />
            </div>
            <div className={classes.block}>
                <ModInputs
                    classes={classes}
                    handleChange={handleChange}
                    setSettings={setSettings}
                    modIndex={modIndex}
                    settings={settings}
                    mod={mod}
                />
            </div>
        </div>
    );
};