import React from 'react';
import {clear, draw, saveAsImage, undo} from '../draw';
import './Controls.css';


export const Controls = ({settings, setSettings}) => {
    const handleLayerChange = (event) => {
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        if (event.target.type !== 'checkbox') {
            setSettings(draft => {
                draft[category][subcategory1] = event.target.value;
            });
        } else {
            setSettings(draft => {
                draft[category][subcategory1] = event.target.checked;
            });
        }
    };
    const handleBackgroundChange = (event) => {

    };
    return (
        <div id="controls">
            <label className="number-inputs">
                Number:
                <input value={settings.number.number} className="number" id="number-number" onChange={handleLayerChange}
                       type="text" inputMode="numeric"/>
            </label>
            <label className="color-inputs">
                {!settings.color.isFullRand && <>
                    Color: <input value={settings.color.color} className="color" id="color-color"
                                  onChange={handleLayerChange}
                                  type="color"/>
                    Color rand: <input value={settings.color.colorRand} className="color-rand" id="color-colorRand"
                                       onChange={handleLayerChange} type="range" min="0" max="1" step="0.01"/>
                </>}
                Color rand on: <input checked={settings.color.isFullRand} className="color-rand-on"
                                      id="color-isFullRand" onChange={handleLayerChange} type="checkbox"/>
            </label>
            <br/>
            <label className="shape-inputs">
                Shape:
                <select value={settings.shape.shape} className="shape" id="shape-shape" onChange={handleLayerChange}>
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="line">Line</option>
                    <option value="random3">Random 3</option>
                    <option value="random4">Random 4</option>
                </select>
                {settings.shape.shape === 'line' && <>
                    Line look to on: <input checked={settings.shape.lineLookToOn} className="line-look-to-on"
                                            id="shape-lineLookToOn"
                                            onChange={handleLayerChange} type="checkbox"/>
                    Line rounded: <input checked={settings.shape.lineRounded} className="line-rounded"
                                         id="shape-lineRounded"
                                         onChange={handleLayerChange} type="checkbox"/>
                    Line angle rand: <input value={settings.shape.lineAngleRand} className="line-angle-rand"
                                            id="shape-lineAngleRand"
                                            onChange={handleLayerChange} type="range" min="0" max="1" step={0.05}/>
                    Line ratio: <input value={settings.shape.lineRatio} className="line-ratio" id="shape-lineRatio"
                                       onChange={handleLayerChange} type="range" min="0" max="1" step={0.05}/>
                    Line ratio rand: <input value={settings.shape.lineRatioRand} className="line-ratio-rand"
                                            id="shape-lineRatioRand"
                                            onChange={handleLayerChange} type="range" min="0" max="1" step={0.05}/>
                    {settings.shape.lineLookToOn && <>
                        Look to X: <input value={settings.shape.lineLookToX} className="line-look-to-x"
                                          id="shape-lineLookToX"
                                          onChange={handleLayerChange} type="text" inputMode="numeric"/>
                        Look to Y: <input value={settings.shape.lineLookToY} className="line-look-to-y"
                                          id="shape-lineLookToY"
                                          onChange={handleLayerChange} type="text" inputMode="numeric"/>
                    </>}
                    {!settings.shape.lineLookToOn && <>
                        Line angle: <input value={settings.shape.lineAngle} className="line-angle" id="shape-lineAngle"
                                           onChange={handleLayerChange} type="range" min="0" max="1" step={0.05}/>
                    </>}


                </>}
            </label>
            <br/>
            <label className="glow-inputs">
                Glow: <input value={settings.glow.glow} className="glow" id="glow-glow" onChange={handleLayerChange}
                             min="0"
                             max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="transp-inputs">
                Transp: <input value={settings.transp.transp} className="transp" id="transp-transp"
                               onChange={handleLayerChange} min="0" max="1" step="0.05" type="range"/>
                Transp rand: <input value={settings.transp.transpRand} className="transp-rand" id="transp-transpRand"
                                    onChange={handleLayerChange} min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="size-inputs">
                Size: <input value={settings.size.size} className="size" id="size-size" onChange={handleLayerChange}
                             min="0"
                             max="1" step="0.01" type="range"/>
                Size rand: <input value={settings.size.sizeRand} className="size-rand" id="size-sizeRand"
                                  onChange={handleLayerChange} min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="pos-inputs">
                Position:
                Start x: <input value={settings.position.startX} className="start-x" id="position-startX"
                                onChange={handleLayerChange} type="text" inputMode="numeric"/>
                Start y: <input value={settings.position.startY} className="start-y" id="position-startY"
                                onChange={handleLayerChange} type="text" inputMode="numeric"/>
                End x: <input value={settings.position.endX} className="end-x" id="position-endX"
                              onChange={handleLayerChange} type="text" inputMode="numeric"/>
                End y: <input value={settings.position.endY} className="end-y" id="position-endY"
                              onChange={handleLayerChange} type="text" inputMode="numeric"/>
                Bias x: <input value={settings.position.biasX} className="bias-x" id="position-biasX"
                               onChange={handleLayerChange} type="text" inputMode="numeric"/>
                Bias y: <input value={settings.position.biasY} className="bias-y" id="position-biasY"
                               onChange={handleLayerChange} type="text" inputMode="numeric"/>
                Bias inf: <input value={settings.position.biasInf} className="bias-inf" id="position-biasInf"
                                 onChange={handleLayerChange} type="range" min="0" max="1" step="0.1"/>
            </label>
            <br/>
            <button onClick={clear} className="clear-button">Clear</button>
            <button onClick={() => draw(settings)} className="draw-button">Add layer</button>
            <button onClick={() => undo()}>Undo</button>
            <button onClick={saveAsImage}>Save as image</button>
            <button>Change background</button>
        </div>
    );
};