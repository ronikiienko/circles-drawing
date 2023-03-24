import {Button} from '@fluentui/react-components';
import {Code16Regular, Image16Regular} from '@fluentui/react-icons';
import React from 'react';
import {storageKeys} from '../../consts/consts';
import {saveAsImage} from '../../drawing/draw';
import {getItemFromStorage, setItemToStorage} from '../../utils';


export const Saves = ({settings, setSettings, classes}) => {
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
                    onClick={() => saveAsImage(false)}
                    icon={<Image16Regular/>}>Save jpeg</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => saveAsImage(true)}
                    icon={<Image16Regular/>}>Save png</Button>
                <Button
                    appearance="subtle"
                    className={classes.button}
                    size="small"
                    onClick={() => console.log(settings)}
                    icon={<Code16Regular/>}>Log settings</Button>
            </div>
        </>
    );
};