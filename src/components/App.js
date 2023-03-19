import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {defaultAppSettings, getPreset, layerPresets, storageKeys} from '../consts';
import {makeCanvasHighPPI} from '../draw';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {getItemFromStorage, setItemToStorage} from '../utils';
import './App.css';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer(getItemFromStorage(storageKeys.layerSettings) || getPreset(layerPresets.biasedCircles));
    const [appSettings, setAppSettings] = useImmer(getItemFromStorage(storageKeys.appSettings) || defaultAppSettings);
    const debouncedSettings = useDebouncedValue(settings, 2000);
    const debouncedAppSettings = useDebouncedValue(appSettings, 2000);
    useEffect(() => {
        makeCanvasHighPPI(window.innerWidth, window.innerHeight);
    }, []);

    // TODO review performance of this way of saving
    useEffect(() => {
        setItemToStorage(storageKeys.layerSettings, debouncedSettings);
    }, [debouncedSettings]);

    useEffect(() => {
        setItemToStorage(storageKeys.appSettings, debouncedAppSettings);
    }, [debouncedAppSettings]);

    return (
        <FluentProvider theme={teamsLightTheme}>
            <div>
                <Controls settings={settings} setSettings={setSettings} appSettings={appSettings}
                          setAppSettings={setAppSettings}/>
                <canvas></canvas>
            </div>
        </FluentProvider>
    );
};