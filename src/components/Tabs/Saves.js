import {Button} from '@fluentui/react-components';
import React from 'react';
import {storageKeys} from '../../consts';
import {getItemFromStorage, setItemToStorage} from '../../utils';


export const Saves = ({settings, setSettings, classes}) => {
    const shelveSettings = () => setItemToStorage(storageKeys.shelvedLayerSettings, settings);
    const unshelveSettings = () => {
        const shelvedSettings = getItemFromStorage(storageKeys.shelvedLayerSettings);
        if (!shelvedSettings) return;
        setSettings(getItemFromStorage(storageKeys.shelvedLayerSettings));
    };
    return (
        <div>
            <Button className={classes.button} onClick={shelveSettings}>Shelve settings</Button>
            <Button className={classes.button} onClick={unshelveSettings}>Unshelve settings</Button>
        </div>
    );
};