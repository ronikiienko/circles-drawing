import {useEffect, useRef} from 'react';
import {useImmer} from 'use-immer';
import {Controls} from './Controls';


export const App = () => {
    const [settings, setSettings] = useImmer({
        size: {
            size: 0.2,
            sizeRand: 0,
        },
        glow: {
            glow: 0,
        },
        transp: {
            transp: 1,
            transpRand: 0,
        },

        color: {
            color: 'pink',
            colorRand: 0.4,
        },
    });
    const canvasRef = useRef(null);
    useEffect(() => console.log(canvasRef), [settings]);
    return (
        <div>
            <Controls settings={settings} setSettings={setSettings}/>
            <canvas ref={canvasRef}></canvas>
            <button onClick={() => {
                setSettings(draft => {
                    draft.color.color = 'blue';
                });
            }}>sjdf
            </button>
        </div>
    );
};