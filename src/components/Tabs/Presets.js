import {Input, Label, makeStyles, Select, Textarea} from '@fluentui/react-components';
import React from 'react';
import {getPreset, layerPresets} from '../../consts/consts';


const useStyles = makeStyles({
    presetName: {
        width: '200px',
        marginLeft: '5px',
        marginBlock: '3px',
    },
    presetDescription: {
        width: '200px',
        marginLeft: '5px',
        marginBlock: '3px',
    },
});

export const Presets = ({settings, setSettings, classes}) => {
    const localClasses = useStyles();
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
            <br/>
            <Label className={classes.label}>
                Preset name:
                <Input
                    className={localClasses.presetName}
                    size="small"
                    type="text"
                />
            </Label>
            <Label className={classes.label}>
                Preset description:
                <Textarea
                    className={localClasses.presetDescription}
                    size="small"
                    type="text"
                />
            </Label>
        </>
    );
};