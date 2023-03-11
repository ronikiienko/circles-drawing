import {useEffect, useRef} from 'react';
import {useImmer} from 'use-immer';
import {defaultSettings} from '../consts';
import {makeCanvasHighPPI} from '../draw';
import './App.css';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer(defaultSettings);
    const canvasRef = useRef(null);
    useEffect(() => {
        makeCanvasHighPPI(canvasRef.current, window.innerWidth, window.innerHeight);
    }, []);

    return (
        <div>
            <Controls settings={settings} setSettings={setSettings}/>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};