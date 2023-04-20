import {Button, Input, Label, Switch} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {
    Branch16Regular,
    BranchRequest20Regular,
    Code16Regular,
    Folder16Regular,
    Image16Regular,
} from '@fluentui/react-icons';
import {saveAs} from 'file-saver';
import React from 'react';
import {storageKeys} from '../../consts/consts';
import {getItemFromStorage, setItemToStorage} from '../../utils/generalUtils';
import {getLayerSettings} from '../../utils/layerSettings/getter';
import {saveAsImage} from '../../worker/canvasWorkerMediators';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


export const Saves = ({settings, setSettings, appSettings, handleAppSettingsChange, classes}) => {
    const shelveSettings = () => setItemToStorage(storageKeys.shelvedLayerSettings, settings);
    const unshelveSettings = () => {
        const shelvedSettings = getItemFromStorage(storageKeys.shelvedLayerSettings);
        if (!shelvedSettings) return;
        setSettings(getItemFromStorage(storageKeys.shelvedLayerSettings));
    };

    const savePresetAsFile = () => {
        let blob = new Blob([JSON.stringify(settings)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${settings.preset.name}-preset.txt`);
    };

    const handleUserPresetFile = async (event) => {
        try {
            let fileData = event.target.files[0];
            let text = await fileData.text();
            let settings = getLayerSettings(JSON.parse(text));
            setSettings(settings);
        } catch (e) {
            alert('Could not load preset');
        }
    };

    return (
        <>
            <div>
                <Button
                    icon={<Branch16Regular/>}
                    size="small"
                    appearance="subtle"
                    className={classes.button}
                    onClick={shelveSettings}
                >Shelve settings</Button>
                <Button
                    icon={<BranchRequest20Regular/>}
                    size="small"
                    appearance="subtle"
                    className={classes.button}
                    onClick={unshelveSettings}
                >Unshelve settings</Button>
            </div>
            <div>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => saveAsImage(appSettings.projectName, false)}
                    icon={<Image16Regular/>}
                >Save jpeg</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => saveAsImage(appSettings.projectName, true)}
                    icon={<Image16Regular/>}
                >Save png</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => console.log(settings)}
                    icon={<Code16Regular/>}
                >Log settings</Button>
            </div>
            <div>
                <Button
                    icon={<Folder16Regular/>}
                    size="small"
                    appearance="subtle"
                    onClick={savePresetAsFile}
                >
                    Save preset as file
                </Button>
                <Label>
                    <input onChange={handleUserPresetFile} style={{display: 'none'}} type="file"/>
                    <Button
                        as="a"
                        icon={<Folder16Regular/>}
                        size="small"
                        appearance="subtle"
                    >
                        Open preset file
                    </Button>
                </Label>
            </div>
            {/*<Button*/}
            {/*    onClick={() => saveAsProject(appSettings.projectName, appSettings)}*/}
            {/*    className={classes.button}*/}
            {/*>Save as image data</Button>*/}
            {/*<input onChange={openAsProject} type={'file'}/>*/}
            {/*<Button onClick={() => getImageData()} className={classes.button}>Open lossless</Button>*/}
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