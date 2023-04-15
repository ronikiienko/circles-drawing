import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Input,
    Label,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
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
        paddingBlock: '5px',
    },
    block: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        // ...shorthands.border('3px', 'solid', tokens.colorNeutralStencil1Alpha),
        marginBlock: '5px',
    },
    removeButton: {
        marginLeft: '20px',
    },
    addButton: {
        width: '100%',
    },
    outputsContainer: {
        float: 'right',
        width: '200px',
    },
    outputContainer: {
        ...shorthands.margin('0px'),
        lineHeight: '8px',
        fontSize: '10px',
    },
    addModInputButton: {
        float: 'right',
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
            <AccordionItem style={{backgroundColor: hslArrToHsl(settings.mods[index].color, 0.3)}}
                           className={localClasses.block}
                           value={settings.mods[index].id}>
                <AccordionHeader className={localClasses.accordionHeader}>
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
                                            key={modType}
                                            value={modType}
                                        >
                                            {modType}
                                        </option>)
                                    }
                                </Select>
                            </Label>
                        </div>
                        <ConditionalPanel active={settings.mods[index].type === modTypes.perlin}>
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
                        <ConditionalPanel active={settings.mods[index].type === modTypes.radial}>
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
                        <div className={classes.block}>
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
                            {settings.mods.map((mod, modIndex) => {
                                const hasThisModOutput = mod.modOutputs.some(modOutput => {
                                    return modOutput.id === settings.mods[index].id;
                                });
                                if (hasThisModOutput) return (
                                    <Text style={{margin: '2px'}} key={mod.id}>{mod.name}</Text>
                                );
                            })}
                        </div>
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </>
    );
};