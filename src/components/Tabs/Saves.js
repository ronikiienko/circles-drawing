import {Button, Input, Label, Switch} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {Code16Regular, Image16Regular} from '@fluentui/react-icons';
import React from 'react';
import {storageKeys} from '../../consts/consts';
import {saveAsImage, saveAsImageData} from '../../drawing/draw';
import {getItemFromStorage, setItemToStorage} from '../../utils';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


export const Saves = ({settings, setSettings, appSettings, handleAppSettingsChange, classes}) => {
    const shelveSettings = () => setItemToStorage(storageKeys.shelvedLayerSettings, settings);
    const unshelveSettings = () => {
        const shelvedSettings = getItemFromStorage(storageKeys.shelvedLayerSettings);
        if (!shelvedSettings) return;
        setSettings(getItemFromStorage(storageKeys.shelvedLayerSettings));
    };
    return (
        <>
            <div>
                <Button className={classes.button} onClick={shelveSettings}>Shelve settings</Button>
                <Button className={classes.button} onClick={unshelveSettings}>Unshelve settings</Button>
            </div>
            <div>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => saveAsImage(appSettings.projectName, false)}
                    icon={<Image16Regular/>}>Save jpeg</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => saveAsImage(appSettings.projectName, true)}
                    icon={<Image16Regular/>}>Save png</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => console.log(settings)}
                    icon={<Code16Regular/>}>Log settings</Button>
            </div>
            <Button onClick={() => saveAsImageData(appSettings)} className={classes.button}>Save as image data</Button>
            {/*<Button onClick={() => getImageData()} className={classes.button}>Open lossless</Button>*/}
            <br/>
            <Label className={classes.label}>
                Random project name:
                <Switch
                    id="projectNameRand"
                    checked={appSettings.projectNameRand}
                    onChange={handleAppSettingsChange}
                />
                <InfoButton
                    content={
                        <>
                            If this switch is on, new random project name will be generated when you clear canvas.
                            <br/>
                            Otherwise you will see input to type your own prefered project name.
                            <br/>
                            Project name will be used to name exported jpeg&apos;s/png&apos;s or exported projects.
                        </>
                    }
                />
            </Label>
            <ConditionalPanel active={!appSettings.projectNameRand}>
                <br/>
                <Label className={classes.label}>
                    Project name:
                    <Input
                        id="projectName"
                        value={appSettings.projectName}
                        onChange={handleAppSettingsChange}
                        className={classes.text}
                        size="small"
                    />
                </Label>
            </ConditionalPanel>
        </>
    );
};