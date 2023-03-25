import {Button, Input, Label, makeStyles, Select, Textarea} from '@fluentui/react-components';
import React from 'react';
import {getPreset, layerPresets, storageKeys} from '../../consts/consts';
import {usePersistedImmer} from '../../hooks/usePersistedImmer';


const useStyles = makeStyles({
    presetName: {
        width: '200px',
        marginBlock: '3px',
    },
    presetDescription: {
        width: '200px',
        marginBlock: '3px',
    },
    verticalLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        alignItems: 'flex-start',
    },
    savePresetButton: {
        marginTop: '5px',
        width: '200px',
    },
});

export const Presets = ({settings, setSettings, classes}) => {
    const localClasses = useStyles();
    const [presetDraftMeta, setPresetDraftMeta] = usePersistedImmer({}, storageKeys.presetDraftMeta);

    const handlePresetDraftMetaChange = (event) => {
        setPresetDraftMeta(draft => {
            draft[event.target.id] = event.target.value;
        });
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
            <Button className={localClasses.savePresetButton}>Save preset</Button>
        </>
    );
};