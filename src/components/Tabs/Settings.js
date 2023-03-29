import {Button, Label, Slider, Switch, Text} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';


export const Settings = ({appSettings, setAppSettings, handleAppSettingsChange, classes}) => {
    const resetResolution = () => {
        setAppSettings(draft => {
            draft.resolutionMult = window.devicePixelRatio;
        });
    };

    return (
        <div>
            <Label className={classes.label}>
                Drawing speed:
                <Slider
                    size="small"
                    id="drawingSpeed"
                    className={classes.slider}
                    value={appSettings.drawingSpeed}
                    onChange={handleAppSettingsChange}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Dark mode:
                <Switch
                    size="small"
                    id="darkMode"
                    className={classes.slider}
                    checked={appSettings.darkMode}
                    onChange={handleAppSettingsChange}
                />
            </Label>
            <br/>
            <Label className={classes.row}>
                Resolution:
                <Slider
                    size="small"
                    id="resolutionMult"
                    className={classes.slider}
                    value={appSettings.resolutionMult}
                    onChange={handleAppSettingsChange}
                    min={0.1}
                    max={5}
                    step={0.01}
                />
                <Text>{Math.trunc(window.innerWidth * appSettings.resolutionMult)} × {Math.trunc(window.innerHeight * appSettings.resolutionMult)}</Text>
                <InfoButton
                    content={
                        <>
                            Sets resolution multiplier for canvas.
                            Changing will clear current drawing.
                        </>
                    }
                />
                <Button size="small" onClick={resetResolution}>Reset resolution</Button>
            </Label>

        </div>
    );
};