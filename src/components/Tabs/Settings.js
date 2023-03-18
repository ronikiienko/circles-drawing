import {Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Settings = ({appSettings, setAppSettings, classes}) => {
    const handleChange = (event) => {
        setAppSettings(draft => {
            draft[event.target.id] = event.target.value;
        });
    };
    return (
        <div>
            <Label className={classes.label}>
                Drawing speed:
                <Slider
                    id="drawingSpeed"
                    className={classes.slider}
                    value={appSettings.drawingSpeed}
                    onChange={handleChange}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </Label>
        </div>
    );
};