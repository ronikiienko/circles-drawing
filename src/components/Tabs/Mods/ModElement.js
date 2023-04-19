import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button,
    Input,
    Label,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    mergeClasses,
    Select,
    shorthands,
    Slider,
    Text,
    tokens,
} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {getDefaultModOutput} from '../../../consts/consts';
import {modTypes} from '../../../consts/sharedConsts';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {Radial} from './Radial';
import {RemapCharacter} from './RemapCharacter';


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
        marginLeft: '20px',
    },
    addButton: {
        width: '100%',
    },
    inputsContainer: {
        ...shorthands.overflow('hidden', 'hidden'),
    },
    addModInputButton: {
        float: 'right',
    },
    modInputButton: {
        ...shorthands.margin('2px'),
    },
});
// TODO while typing mod name many things happen...
export const ModElement = ({
                               index,
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
                value={settings.mods[index].id}>
                <AccordionHeader className={localClasses.accordionHeader}
                                 style={{backgroundColor: hslArrToHsl(settings.mods[index].color, 0.3)}}>
                    <Input
                        id={`mods-${index}-name`}
                        value={settings.mods[index].name}
                        onChange={handleChange}
                        className={localClasses.nameInputs}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                        size="small"
                    />
                    {settings.mods[index].type}
                    <div
                        onClick={(event) => removeMod(event, index)}
                        className={localClasses.removeButton}
                    >
                        <Delete16Regular/>
                    </div>
                </AccordionHeader>
                <AccordionPanel className={localClasses.accordionPanel}>
                    <div>
                        <div className={classes.block}>
                            <Label className={classes.label}>
                                Mod type:
                                <Select
                                    size="small"
                                    value={settings.mods[index].type}
                                    className={classes.select}
                                    id={`mods-${index}-type`}
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
                        <ConditionalPanel active={settings.mods[index].type === modTypes.perlin.id}>
                            <div className={classes.block}>
                                <Label className={classes.label}>
                                    Perlin zoom:
                                    <Slider
                                        size="small"
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        id={`mods-${index}-perlinZoom`}
                                        onChange={handleChange}
                                        value={settings.mods[index].perlinZoom}
                                    />
                                    <Input
                                        className={classes.number}
                                        size="small"
                                        appearance="underline"
                                        id={`mods-${index}-perlinZoom`}
                                        onChange={handleChange}
                                        value={settings.mods[index].perlinZoom}
                                    />
                                </Label>
                            </div>
                        </ConditionalPanel>
                        <ConditionalPanel active={settings.mods[index].type === modTypes.radial.id}>
                            <div className={classes.block}>
                                <Radial
                                    settings={settings}
                                    classes={classes}
                                    handleChange={handleChange}
                                    setDragProp={setDragProp}
                                    setClickAndSetProp={setClickAndSetProp}
                                    index={index}
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
                                    id={`mods-${index}-blendRatio`}
                                    onChange={handleChange}
                                    value={settings.mods[index].blendRatio}
                                    size="small"
                                />
                                <Text>
                                    {settings.mods[index].blendRatio}
                                </Text>
                            </Label>
                            <RemapCharacter
                                index={index}
                                handleChange={handleChange}
                                classes={classes}
                                settings={settings}
                            />
                        </div>
                        <div className={mergeClasses(localClasses.inputsContainer, classes.block)}>
                            <Menu>
                                <MenuTrigger>
                                    <MenuButton
                                        className={localClasses.addModInputButton}
                                        appearance="subtle"
                                        disabled={!settings.mods.some(mod => !mod.modOutputs.some(modOutput => modOutput.id === settings.mods[index].id))}
                                        size="small"
                                    >
                                        {settings.mods.some(mod => !mod.modOutputs.some(modOutput => modOutput.id === settings.mods[index].id)) ? 'Choose mods' : 'No mods left. Create more'}
                                    </MenuButton>
                                </MenuTrigger>
                                <MenuPopover>
                                    <MenuList>
                                        {
                                            settings.mods.map((mod, modIndex) => {
                                                if (mod.modOutputs.some(modOutput => modOutput.id === settings.mods[index].id)) return null;
                                                return (
                                                    <MenuItem
                                                        style={{backgroundColor: hslArrToHsl(mod.color, 0.2)}}
                                                        key={mod.id}
                                                        onClick={() => setSettings((draft) => {
                                                            draft.mods[modIndex].modOutputs.push(getDefaultModOutput(settings.mods[index].id));
                                                        })}
                                                    >
                                                        {mod.name} ({mod.type})
                                                    </MenuItem>
                                                );
                                            })}
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                            {settings.mods.map((mod) => {
                                const hasThisModOutput = mod.modOutputs.some(modOutput => {
                                    return modOutput.id === settings.mods[index].id;
                                });
                                if (hasThisModOutput) return (
                                    <Button
                                        style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}}
                                        size="small"
                                        key={mod.id}
                                        className={localClasses.modInputButton}
                                        onClick={() => {
                                            setSettings((draft) => {
                                                const indexOfMod = draft.mods.findIndex((element) => element.id === mod.id);
                                                const indexOfModOutput = draft.mods[indexOfMod].modOutputs.find(element => element.id === draft.mods[index].id);
                                                draft.mods[indexOfMod].modOutputs.splice(indexOfModOutput, 1);
                                            });
                                        }}
                                    >
                                        {mod.name}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </>
    );
};