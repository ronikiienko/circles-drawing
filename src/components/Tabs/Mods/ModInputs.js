import {
    Button,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    mergeClasses,
    shorthands,
    tokens,
} from '@fluentui/react-components';
import {Delete12Regular} from '@fluentui/react-icons';
import React from 'react';
import {getDefaultModOutput} from '../../../consts/consts';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {AngularInput} from '../../Utils/AngularInput';


const useStyles = makeStyles({
    inputsContainer: {
        ...shorthands.overflow('hidden', 'hidden'),
    },
    addModInputButton: {
        float: 'right',
    },
    modInputContainer: {
        alignItems: 'center',
        display: 'inline-flex',
        ...shorthands.margin('2px'),
        width: 'fit-content',
        paddingInline: '4px',
        paddingBlock: '2px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    modInputInput: {
        maxHeight: '10px',
        maxWidth: '35px',
        marginInline: '5px',
    },
});
export const ModInputs = ({settings, modIndex, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <div className={localClasses.inputsContainer}>
            <Menu>
                {(() => {
                    const areModsLeft = settings.mods.some(mod => mod.id !== settings.mods[modIndex].id && !mod.modOutputs.some(modOutput => modOutput.id === settings.mods[modIndex].id));
                    return (
                        <MenuTrigger>
                            <MenuButton
                                className={localClasses.addModInputButton}
                                appearance="subtle"
                                disabled={!areModsLeft}
                                size="small"
                            >
                                {areModsLeft ? 'Choose mods' : 'No mods left. Create more'}
                            </MenuButton>
                        </MenuTrigger>
                    );

                })()}
                <MenuPopover>
                    <MenuList>
                        {
                            settings.mods.map((modToAdd, modToAddIndex) => {
                                const isAlreadyConnected = modToAdd.modOutputs.some(modOutput => modOutput.id === settings.mods[modIndex].id);
                                const isThisMod = modToAdd.id === settings.mods[modIndex].id;
                                if (isAlreadyConnected || isThisMod) return null;
                                return (
                                    <MenuItem
                                        style={{backgroundColor: hslArrToHsl(modToAdd.color, 0.2)}}
                                        key={modToAdd.id}
                                        onClick={() => setSettings((draft) => {
                                            draft.mods[modToAddIndex].modOutputs.push(getDefaultModOutput(settings.mods[modIndex].id));
                                        })}
                                    >
                                        {modToAdd.name} ({modToAdd.type})
                                    </MenuItem>
                                );
                            })}
                    </MenuList>
                </MenuPopover>
            </Menu>
            {settings.mods.map((inputMod, inputModIndex) => {
                {
                    return inputMod.modOutputs.map((inputModOutput, inputModOutputIndex) => {
                        if (inputModOutput.id !== settings.mods[modIndex].id) return null;
                        return (
                            <div
                                style={{backgroundColor: hslArrToHsl(inputMod.color, 0.4 * inputModOutput.mult + 0.1)}}
                                key={inputMod.id}
                                className={mergeClasses(localClasses.modInputContainer, classes.label)}
                                title={inputMod.type}
                            >
                                {inputMod.name}
                                <AngularInput
                                    half
                                    value={inputModOutput.mult}
                                    id={`mods-${inputModIndex}-modOutputs-${inputModOutputIndex}-mult`}
                                    onChange={handleChange}
                                    size={35}
                                    min={0}
                                    max={1}
                                    className={classes.slider}
                                />
                                <Button
                                    size="small"
                                    icon={<Delete12Regular/>}
                                    appearance="subtle"
                                    onClick={() => {
                                        setSettings((draft) => {
                                            draft.mods[inputModIndex].modOutputs.splice(inputModOutputIndex, 1);
                                        });
                                    }}
                                >
                                </Button>
                            </div>
                        );
                    });
                }
            })}
        </div>
    );
};