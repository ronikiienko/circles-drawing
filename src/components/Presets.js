import React from 'react';
import {useImmer} from 'use-immer';
import {layerPresets} from '../consts';
import {Button} from './styledElements/Button';


export const Presets = ({setSettings}) => {
    const [preset, setPreset] = useImmer('default');
    const handleChange = (event) => {
        setPreset(event.target.value);
    };
    return (
        <>
            <label>
                Presets: <select value={preset} onChange={handleChange}>
                {Object.entries(layerPresets).map(([key, preset]) => {
                    return <option key={key} value={key} title={preset.meta.description}>{preset.meta.name}</option>;
                })}
            </select>
                <Button onClick={() => setSettings(layerPresets[preset])}>Apply preset</Button>
            </label>
        </>
    );
};