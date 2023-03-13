import React from 'react';
import {useClickAndSet} from '../hooks/useClickAndSet';


export const Shape = ({settings, setSettings, handleChange}) => {
    const setClickAndSetProperty = useClickAndSet({setSettings});
    return (
        <>
            <label>
                Shape:
                <select value={settings.shape.shape} className="shape" id="shape-shape"
                        onChange={handleChange}>
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="line">Line</option>
                    <option value="random3">Random 3</option>
                    <option value="random4">Random 4</option>
                </select>
            </label>
            {settings.shape.shape === 'line' && <>
                <br/>
                Line look to on: <input checked={settings.shape.lineLookToOn} className="line-look-to-on"
                                        id="shape-lineLookToOn"
                                        onChange={handleChange} type="checkbox"/>
                <br/>
                Line rounded: <input checked={settings.shape.lineRounded} className="line-rounded"
                                     id="shape-lineRounded"
                                     onChange={handleChange} type="checkbox"/>
                <br/>
                {!settings.shape.lineLookToOn && <>
                    Line angle: <input value={settings.shape.lineAngle} className="line-angle"
                                       id="shape-lineAngle"
                                       onChange={handleChange} type="range" min="0" max="1" step={0.05}/>
                </>}
                Line angle rand: <input value={settings.shape.lineAngleRand} className="line-angle-rand"
                                        id="shape-lineAngleRand"
                                        onChange={handleChange} type="range" min="0" max="1" step={0.05}/>
                <br/>
                Line ratio: <input value={settings.shape.lineRatio} className="line-ratio" id="shape-lineRatio"
                                   onChange={handleChange} type="range" min="0" max="1" step={0.05}/>
                Line ratio rand: <input value={settings.shape.lineRatioRand} className="line-ratio-rand"
                                        id="shape-lineRatioRand"
                                        onChange={handleChange} type="range" min="0" max="1" step={0.05}/>
                {settings.shape.lineLookToOn && <>
                    <br/>
                    Look to X: <input value={settings.shape.lineLookToX} className="line-look-to-x"
                                      id="shape-lineLookToX"
                                      onChange={handleChange} type="text" inputMode="numeric"/>
                    Look to Y: <input value={settings.shape.lineLookToY} className="line-look-to-y"
                                      id="shape-lineLookToY"
                                      onChange={handleChange} type="text" inputMode="numeric"/>
                    <button id="shape-lineLookTo" onClick={setClickAndSetProperty}>Click and set</button>
                </>}
            </>}
        </>
    );
};