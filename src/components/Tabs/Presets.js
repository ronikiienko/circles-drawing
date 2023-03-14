import {Button, Label, Select} from '@fluentui/react-components';
import React from 'react';
import {useImmer} from 'use-immer';
import {layerPresets} from '../../consts';
// import {Button} from './styledElements/Button';


export const Presets = ({setSettings, classes}) => {
    const [preset, setPreset] = useImmer('default');
    const handleChange = (event) => {
        setPreset(event.target.value);
    };
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Presets:
                    <Select
                        className={classes.select}
                        size="small"
                        value={preset}
                        onChange={handleChange}
                    >
                        {Object.entries(layerPresets).map(([key, preset]) => {
                            return <option
                                key={key}
                                value={key}
                                title={preset.meta.description}
                            >
                                {preset.meta.name}
                            </option>;
                        })}
                    </Select>
                </Label>
                <Button size="small" onClick={() => setSettings(layerPresets[preset])}>Apply preset</Button>
            </div>

        </>
    );
};