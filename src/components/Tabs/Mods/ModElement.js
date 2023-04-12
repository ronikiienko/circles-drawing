import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Input,
    Label,
    makeStyles,
    Select,
    shorthands,
    tokens,
} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {modTypes} from '../../../consts/sharedConsts';
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
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStencil1Alpha),
        marginBlock: '5px',
    },
    removeButton: {
        marginLeft: '20px',
    },
    addButton: {
        width: '100%',
    },
});

export const ModElement = ({index, handleChange, settings, removeMod, classes, setClickAndSetProp}) => {
    const localClasses = useStyles();
    return (
        <>
            <AccordionItem style={{backgroundColor: settings.mods[index].color}} className={localClasses.block}
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
                        }} size="small">
                    </Input>
                    {settings.mods[index].type}
                    <div onClick={(event) => removeMod(event, index)} className={localClasses.removeButton}>
                        <Delete16Regular/></div>
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
                        <ConditionalPanel active={settings.mods[index].type === modTypes.radial}>
                            <div className={classes.block}>
                                <Radial
                                    settings={settings}
                                    classes={classes}
                                    handleChange={handleChange}
                                    setClickAndSetProp={setClickAndSetProp}
                                    index={index}
                                />
                            </div>
                        </ConditionalPanel>
                        <div className={classes.block}>
                            <RemapCharacter
                                index={index}
                                handleChange={handleChange}
                                classes={classes}
                                settings={settings}
                            />
                        </div>
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </>
    );
};