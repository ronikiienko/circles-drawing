import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {defaultAppSettings, getPreset, layerPresets, storageKeys} from '../consts';
import {makeCanvasHighPPI} from '../draw';
import {getItemFromStorage, setItemToStorage} from '../utils';
import './App.css';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer(getItemFromStorage(storageKeys.layerSettings) || getPreset(layerPresets.biasedCircles));
    const [appSettings, setAppSettings] = useImmer(getItemFromStorage(storageKeys.appSettings) || defaultAppSettings);
    useEffect(() => {
        setItemToStorage(storageKeys.layerSettings);
        makeCanvasHighPPI(window.innerWidth, window.innerHeight);
    }, []);

    useEffect(() => {
        setItemToStorage(storageKeys.layerSettings, settings);
    }, [settings]);

    useEffect(() => {
        setItemToStorage(storageKeys.layerSettings, appSettings);
    }, [appSettings]);

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