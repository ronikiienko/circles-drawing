import {FluentProvider, makeStyles, teamsDarkTheme, teamsLightTheme, tokens} from '@fluentui/react-components';
import {useEffect, useRef} from 'react';
import {defaultAppSettings, getPreset, layerPresets, storageKeys, tabs} from '../consts/consts';
import {initializeOffscreenCanvas, setCanvasResolution} from '../drawing/draw';
import {useDebouncedPersistedImmer} from '../hooks/useDebouncedPersistedImmer';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {usePersistedImmer} from '../hooks/usePersistedImmer';
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

    const [settings, setSettings] = useDebouncedPersistedImmer(layerPresets.default, storageKeys.layerSettings, 1000, getPreset);
    console.log(settings);
    const [appSettings, setAppSettings] = useDebouncedPersistedImmer(defaultAppSettings, storageKeys.appSettings, 1000);
    const [mainTab, setMainTab] = usePersistedImmer(tabs.number.id, storageKeys.mainTab);

    const debouncedResolutionMult = useDebouncedValue(appSettings.resolutionMult, 500);

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