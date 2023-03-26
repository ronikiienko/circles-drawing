import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button,
    Input,
    Label,
    makeStyles,
    Textarea,
} from '@fluentui/react-components';
import {Add16Regular, BuildingFactory16Regular, Person16Regular} from '@fluentui/react-icons';
import {nanoid} from 'nanoid';
import React from 'react';
import {layerPresets, storageKeys} from '../../../consts/consts';
import {useLocalStorageState} from '../../../hooks/useLocalStorageState';
import {usePersistedImmer} from '../../../hooks/usePersistedImmer';
import {deepCopy} from '../../../utils';
import {PresetElement} from './PresetElement';


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
        marginBottom: '10px',
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

    return (
        <>
            <Accordion collapsible={true}>
                <AccordionItem value="1">
                    <AccordionHeader icon={<BuildingFactory16Regular/>}>Factory presets</AccordionHeader>
                    <AccordionPanel>
                        {layerPresets.map(preset => {
                            return (
                                <PresetElement
                                    key={preset.preset.id}
                                    preset={preset}
                                    setSettings={setSettings}
                                    settings={settings}
                                />
                            );
                        })}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionHeader icon={<Person16Regular/>}>Your presets</AccordionHeader>
                    <AccordionPanel>
                        {userPresets.map((preset, index) => {
                            return (
                                <PresetElement
                                    key={preset.preset.id}
                                    preset={preset}
                                    setSettings={setSettings}
                                    settings={settings}
                                    removeButton
                                    index={index}
                                    removeUserPreset={removeUserPreset}
                                />
                            );
                        })}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="3">
                    <AccordionHeader icon={<Add16Regular/>}>Create preset</AccordionHeader>
                    <AccordionPanel>
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
                            <Button onClick={handlePresetSave} className={localClasses.savePresetButton}>Save
                                preset</Button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>


        </>
    );
};