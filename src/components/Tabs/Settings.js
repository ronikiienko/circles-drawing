import {Label, Slider, Switch, Text} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';


export const Settings = ({appSettings, setAppSettings, classes}) => {
    const handleChange = (event) => {
        setAppSettings(draft => {
            if (event.target.type !== 'checkbox') {
                draft[event.target.id] = event.target.value;
            } else {
                draft[event.target.id] = event.target.checked;
            }
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
            <br/>
            <Label className={classes.label}>
                Dark mode:
                <Switch
                    id="darkMode"
                    className={classes.slider}
                    checked={appSettings.darkMode}
                    onChange={handleChange}
                />
            </Label>
            <br/>
            <Label className={classes.row}>
                Resolution:
                <Slider
                    id="resolutionMult"
                    className={classes.slider}
                    value={appSettings.resolutionMult}
                    onChange={handleChange}
                    min={0.1}
                    max={5}
                    step={0.01}
                />
                <Text>{Math.trunc(window.innerWidth * appSettings.resolutionMult)} × {Math.trunc(window.innerHeight * appSettings.resolutionMult)}</Text>
                <InfoButton
                    content={
                        <>
                            Sets resolution multiplier for canvas.
                            Option will take place ONLY after reload.
                            Resolution is not 100% accurate
                        </>
                    }
                />
            </Label>
        </div>
    );
};