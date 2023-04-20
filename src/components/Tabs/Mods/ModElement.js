import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Input,
    Label,
    makeStyles,
    Select,
    shorthands,
    Slider,
    Text,
    tokens,
} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {modTypes} from '../../../consts/sharedConsts';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {ModInputs} from './ModInputs';
import {Radial} from './Radial';
import {RemapCharacter} from './RemapCharacter';
import {Trig} from './Trig';


const useStyles = makeStyles({
    nameInputs: {
        // height: '20px',
        marginRight: '5px',
    },
    accordionHeader: {
        paddingInline: '0px',
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
        float: 'right',
        marginLeft: '20px',
    },

});
// TODO while typing mod name many things happen...
export const ModElement = ({
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
                value={settings.mods[modIndex].id}>
                <AccordionHeader className={localClasses.accordionHeader}
                                 style={{backgroundColor: hslArrToHsl(settings.mods[modIndex].color, 0.3)}}>
                    <Input
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
                    <div
                        onClick={(event) => removeMod(event, modIndex)}
                        className={localClasses.removeButton}
                    >
                        <Delete16Regular/>
                    </div>
                    {/*<Button*/}
                    {/*    icon={<Delete16Regular />}*/}
                    {/*    onClick={(event) => removeMod(event, modIndex)}*/}
                    {/*    className={localClasses.removeButton}*/}
                    {/*>*/}

                    {/*</Button>*/}
                </AccordionHeader>
                <AccordionPanel className={localClasses.accordionPanel}>
                    <div>
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
                        <ConditionalPanel active={settings.mods[modIndex].type === modTypes.perlin.id}>
                            <div className={classes.block}>
                                <Label className={classes.label}>
                                    Perlin zoom:
                                    <Slider
                                        size="small"
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        id={`mods-${modIndex}-perlinZoom`}
                                        onChange={handleChange}
                                        value={settings.mods[modIndex].perlinZoom}
                                    />
                                    <Input
                                        className={classes.number}
                                        size="small"
                                        appearance="underline"
                                        id={`mods-${modIndex}-perlinZoom`}
                                        onChange={handleChange}
                                        value={settings.mods[modIndex].perlinZoom}
                                    />
                                </Label>
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
                </AccordionPanel>
            </AccordionItem>
        </>
    );
};