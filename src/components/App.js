import {useEffect, useRef} from 'react';
import {useImmer} from 'use-immer';
import {defaultSettings} from '../consts';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer(defaultSettings);
    const canvasRef = useRef(null);
    useEffect(() => console.log(settings), [settings]);
    return (
        <div>
            <Controls settings={settings} setSettings={setSettings}/>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};