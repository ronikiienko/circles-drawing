import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {layerPresets} from '../consts';
import {makeCanvasHighPPI} from '../draw';
import './App.css';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer(layerPresets.rain);
    useEffect(() => {
        makeCanvasHighPPI(window.innerWidth, window.innerHeight);
    }, []);

    return (
        <FluentProvider theme={teamsLightTheme}>
            <div>
                <Controls settings={settings} setSettings={setSettings}/>
                <canvas></canvas>
            </div>
        </FluentProvider>
    );
};