import {
    Button,
    Input,
    Label,
    makeStyles,
    mergeClasses,
    Select,
    shorthands,
    Text,
    Textarea,
    tokens,
} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import {nanoid} from 'nanoid';
import React from 'react';
import {getPreset, layerPresets, storageKeys} from '../../consts/consts';
import {useLocalStorageState} from '../../hooks/useLocalStorageState';
import {usePersistedImmer} from '../../hooks/usePersistedImmer';
import {deepCopy} from '../../utils';


const useStyles = makeStyles({
    presetName: {
        width: '100%',
        marginBlock: '3px',
    },
    presetDescription: {
        width: '100%',
        marginBlock: '3px',
    },
    verticalLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    savePresetButton: {
        marginTop: '5px',
        width: '100%',
    },
    presetElementContainer: {
        ...shorthands.padding('5px'),
        marginBlock: '5px',
        ...shorthands.border('1px', 'solid'),
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    presetElementButton: {
        marginInline: '2px',
    },
    selected: {
        backgroundColor: tokens.colorNeutralForeground2BrandSelected,
    },
});

export const Presets = ({settings, setSettings, classes}) => {
    const localClasses = useStyles();
    const [presetDraftMeta, setPresetDraftMeta] = usePersistedImmer({
        name: '',
        description: '',
    }, storageKeys.presetDraftMeta);

    const [userPresets, setUserPresets] = useLocalStorageState(storageKeys.userPresets, []);

    const handlePresetDraftMetaChange = (event) => {
        setPresetDraftMeta(draft => {
            draft[event.target.id] = event.target.value;
        });
    };

    const handlePresetSave = () => {
        const newPreset = deepCopy(settings);
        newPreset.preset.name = presetDraftMeta.name;
        newPreset.preset.description = presetDraftMeta.description;
        newPreset.preset.id = nanoid();
        setUserPresets(() => {
            const newPresets = deepCopy(userPresets);
            newPresets.push(newPreset);
            return newPresets;
        });
    };

    const removeUserPreset = (index) => {
        if (confirm('Are you sure you want to remove preset?') === true) {
            setUserPresets(prevUserPresets => {
                const newUserPresets = deepCopy(prevUserPresets);
                newUserPresets.splice(index, 1);
                return newUserPresets;
            });
        }
    };

    const handleChange = event => setSettings(getPreset(layerPresets[event.target.value]));
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Presets:
                    <Select
                        className={classes.select}
                        size="small"
                        value={settings.preset.id}
                        onChange={handleChange}
                    >
                        {Object.values(layerPresets).map(preset => {
                            return <option
                                key={preset.preset.id}
                                value={preset.preset.id}
                                title={preset.preset.description}
                            >
                                {preset.preset.name}
                            </option>;
                        })}
                    </Select>
                </Label>
            </div>
            <div className={localClasses.presetCreationContainer}>
                <Label className={localClasses.verticalLabel}>
                    Preset name:
                    <Input
                        id="name"
                        onChange={handlePresetDraftMetaChange}
                        value={presetDraftMeta.name}
                        className={localClasses.presetName}
                        size="small"
                        type="text"
                    />
                </Label>
                <Label className={localClasses.verticalLabel}>
                    Preset description:
                    <Textarea
                        id="description"
                        onChange={handlePresetDraftMetaChange}
                        value={presetDraftMeta.description}
                        className={localClasses.presetDescription}
                        size="small"
                        type="text"
                    />
                </Label>
                <Button onClick={handlePresetSave} className={localClasses.savePresetButton}>Save preset</Button>
            </div>
            <Text
                as="h6"
            >User presets:</Text>
            {userPresets.map((preset, index) => {
                return (
                    <span
                        className={settings.preset.id === preset.preset.id ? mergeClasses(localClasses.presetElementContainer, localClasses.selected) : localClasses.presetElementContainer}
                        key={preset.preset.id}
                        title={preset.preset.description}>
                        <span>{preset.preset.name}</span>
                        <span className={localClasses.presetElementButtons}>
                            <Button
                                className={localClasses.presetElementButton}
                                size="small"
                                icon={<Delete16Regular/>}
                                onClick={() => removeUserPreset(index)}
                            >
                            </Button>
                            <Button
                                className={localClasses.presetElementButton}
                                size="small"
                                onClick={() => setSettings(deepCopy(preset))}
                            >
                                Use
                            </Button>
                        </span>
                    </span>
                );
            })}
        </>
    );
};