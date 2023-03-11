import React from 'react';


export const Controls = ({settings, setSettings}) => {
    return (
        <div id="controls">
            <label className="number-inputs">
                Number:
                <input value="10" className="number" type="text" inputMode="numeric"/>
            </label>
            <label className="color-inputs">
                Color: <input className="color" type="color"/>
                Color rand: <input className="color-rand" type="range" min="0" max="1" step="0.01"/>
                Color rand on: <input className="color-rand-on" type="checkbox"/>
            </label>
            <br/>
            <label className="shape-inputs">
                Shape:
                <select className="shape">
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="line">Line</option>
                    <option value="random3">Random 3</option>
                    <option value="random4">Random 4</option>
                </select>
            </label>
            <br/>
            <label className="glow-inputs">
                Glow: <input value="0" className="glow" min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="transp-inputs">
                Transp: <input className="transp" min="0" max="1" step="0.05" type="range"/>
                Transp rand: <input className="transp-rand" min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="size-inputs">
                Size: <input className="size" min="0" max="1" step="0.01" type="range"/>
                Size rand: <input className="size-rand" min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="pos-inputs">
                Position:
                Start x: <input className="start-x" type="text" inputMode="numeric"/>
                Start y: <input className="start-y" type="text" inputMode="numeric"/>
                End x: <input className="end-x" type="text" inputMode="numeric"/>
                End y: <input className="end-y" type="text" inputMode="numeric"/>
                Bias x: <input className="bias-x" type="text" inputMode="numeric"/>
                Bias y: <input className="bias-y" type="text" inputMode="numeric"/>
                Bias inf: <input className="bias-inf" type="range" min="0" max="1" step="0.1"/>
            </label>
            <br/>
            <button className="clear-button">Clear</button>
            <button className="draw-button">Add layer</button>
        </div>
    );
};