import {FluentProvider, makeStyles, teamsDarkTheme, teamsLightTheme, tokens} from '@fluentui/react-components';
import {useEffect, useRef} from 'react';
import {useImmer} from 'use-immer';
import {defaultAppSettings, getPreset, layerPresets, storageKeys, tabs} from '../consts/consts';
import {initializeOffscreenCanvas, setCanvasResolution} from '../drawing/draw';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {getItemFromStorage, setItemToStorage} from '../utils';
import './App.css';
import {Controls} from './Controls';


const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: tokens.colorNeutralBackground1,
    },
    canvas: {
        backgroundColor: tokens.colorNeutralBackground1,
    },
});

export const App = () => {
    const canvasRef = useRef(null);

    const classes = useStyles();

    const [settings, setSettings] = useImmer(() => getPreset(getItemFromStorage(storageKeys.layerSettings)) || getPreset(layerPresets.default));
    const [appSettings, setAppSettings] = useImmer(() => getItemFromStorage(storageKeys.appSettings) || defaultAppSettings);
    const [mainTab, setMainTab] = useImmer(() => getItemFromStorage(storageKeys.mainTab) || tabs.number.id);
    const debouncedSettings = useDebouncedValue(settings, 2000);
    const debouncedAppSettings = useDebouncedValue(appSettings, 2000);
    const debouncedResolutionMult = useDebouncedValue(appSettings.resolutionMult, 500);


    // TODO review performance of this way of saving
    useEffect(() => {
        setItemToStorage(storageKeys.layerSettings, debouncedSettings);
    }, [debouncedSettings]);

    useEffect(() => {
        setItemToStorage(storageKeys.appSettings, debouncedAppSettings);
    }, [debouncedAppSettings]);

    useEffect(() => {
        setItemToStorage(storageKeys.mainTab, mainTab);
    }, [mainTab]);

    useEffect(() => {
        initializeOffscreenCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        setCanvasResolution(window.innerWidth, window.innerHeight, debouncedResolutionMult, canvasRef.current);
    }, [debouncedResolutionMult]);

    return (
        <FluentProvider theme={appSettings.darkMode ? teamsDarkTheme : teamsLightTheme}>
            <div className={classes.mainContainer}>
                <Controls mainTab={mainTab} setMainTab={setMainTab} settings={settings} setSettings={setSettings}
                          appSettings={appSettings}
                          setAppSettings={setAppSettings}/>
                <canvas ref={canvasRef} style={{imageRendering: appSettings.imageRendering}}
                        className={classes.canvas}></canvas>
            </div>
        </FluentProvider>
    );
};