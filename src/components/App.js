import {FluentProvider, makeStyles, teamsDarkTheme, teamsLightTheme, tokens} from '@fluentui/react-components';
import {useEffect, useRef} from 'react';
import {defaultAppSettings, layerPresets, storageKeys, tabs} from '../consts/consts';
import {useDebouncedPersistedImmer} from '../hooks/useDebouncedPersistedImmer';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {usePersistedImmer} from '../hooks/usePersistedImmer';
import {getAppSettings, getLayerSettings} from '../utils/presetUtils';
import {initializeOffscreenCanvas, setCanvasResolution} from '../worker/canvasWorkerMediators';
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

    const [settings, setSettings] = useDebouncedPersistedImmer(layerPresets[0], storageKeys.layerSettings, 500, getLayerSettings);
    const [appSettings, setAppSettings] = useDebouncedPersistedImmer(defaultAppSettings, storageKeys.appSettings, 500, getAppSettings);
    const [mainTab, setMainTab] = usePersistedImmer(tabs.number.id, storageKeys.mainTab);

    const debouncedResolutionMult = useDebouncedValue(appSettings.resolutionMult, 500);

    useEffect(() => {
        initializeOffscreenCanvas();
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
                <canvas id="main-canvas" ref={canvasRef} className={classes.canvas}></canvas>
            </div>
        </FluentProvider>
    );
};