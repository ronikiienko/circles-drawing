import {Label, Select} from '@fluentui/react-components';
import React from 'react';
import {getPreset, layerPresets} from '../../consts/consts';


export const Presets = ({settings, setSettings, classes}) => {
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
        </>
    );
};