import {Input, Label, makeStyles, Select, shorthands, Slider, Text, tokens} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React, {memo} from 'react';
import {modTypes} from '../../../consts/sharedConsts';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {AccordionItem} from '../../Utils/Accordion';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {DialogButton} from '../../Utils/DialogButton';
import {ModInputs} from './ModInputs';
import {Noise} from './Noise';
import {Radial} from './Radial';
import {RemapCharacter} from './RemapCharacter';
import {Trig} from './Trig';


const useStyles = makeStyles({
    nameInputs: {
        // height: '20px',
        marginRight: '5px',
    },
    accordionHeader: {
        paddingInline: '5px',
        paddingBlock: '3px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accordionPanel: {
        ...shorthands.margin('0px'),
        paddingInline: '4px',
    },
    block: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStencil1Alpha),
        marginBlock: '5px',
    },
    removeButton: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            color: tokens.colorNeutralForeground2BrandHover,
        },
        ':active': {
            backgroundColor: tokens.colorNeutralBackground1Pressed,
            color: tokens.colorNeutralForeground2BrandPressed,
        },
        ...shorthands.padding('5px'),
        float: 'right',
        marginLeft: '20px',
    },

});
// TODO while typing mod name many things happen...

const areEqual = (prevProps, nextProps) => {
    let areEqual = prevProps.settings.mods === nextProps.settings.mods;
    if (areEqual) {
        for (const key of Object.keys(prevProps)) {
            if (key !== 'settings' && prevProps[key] !== nextProps[key]) {
                areEqual = false;
                break;
            }
        }
    }

    return areEqual;
};

export const ModElement = memo(({
                                    modIndex,
                                    handleChange,
                                    settings,
                                    removeMod,
                                    classes,
                                    setDragProp,
                                    setClickAndSetProp,
                                    setSettings,
                                }) => {
    const localClasses = useStyles();
    return (
        <>
            <AccordionItem
                className={localClasses.block}
                value={settings.mods[modIndex].id}
                id={settings.mods[modIndex].id}
                header={
                    <div
                        className={localClasses.accordionHeader}
                        style={{backgroundColor: hslArrToHsl(settings.mods[modIndex].color, 0.3)}}
                    >
                        <div>
                            <Input
                                appearance="underline"
                                id={`mods-${modIndex}-name`}
                                value={settings.mods[modIndex].name}
                                onChange={handleChange}
                                className={localClasses.nameInputs}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }}
                                size="small"
                            />
                            {settings.mods[modIndex].type}
                        </div>
                        <DialogButton
                            onSubmit={(event) => {
                                removeMod(event, modIndex);
                            }}
                            className={localClasses.removeButton}
                            icon={<Delete16Regular/>}
                            header="Are you sure you want to remove modulator?"
                            appearance="subtle"
                        >
                        </DialogButton>
                    </div>
                }
                panel={
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
                }
            >
                {/*<AccordionHeader*/}
                {/*    className={localClasses.accordionHeader}*/}
                {/*    style={{backgroundColor: hslArrToHsl(settings.mods[modIndex].color, 0.3)}}*/}
                {/*>*/}
                {/*    */}
                {/*</AccordionHeader>*/}
                {/*<AccordionPanel className={localClasses.accordionPanel}>*/}
                {/*    */}
                {/*</AccordionPanel>*/}
            </AccordionItem>
        </>
    );
}, areEqual);