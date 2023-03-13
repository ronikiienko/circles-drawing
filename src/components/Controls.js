import React from 'react';
import {useImmer} from 'use-immer';
import {clear, draw, saveAsImage, undo} from '../draw';
import './Controls.css';
import {Presets} from './Presets';
import {Button} from './styledElements/Button';
import {Tabs} from './Tabs';


export const Controls = ({settings, setSettings}) => {
    const [tab, setTab] = useImmer('number');
    const handleChange = (event) => {
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        setSettings(draft => {
            if (event.target.type !== 'checkbox') {
                draft[category][subcategory1] = event.target.value;
            } else {
                draft[category][subcategory1] = event.target.checked;
            }
        });
    };
    return (
        <div id="controls">
            <Tabs
                openedTab={tab}
                setOpenedTab={setTab}
                tabsArray={[
                    {id: 'number', label: 'Number'},
                    {id: 'size', label: 'Size'},
                    {id: 'shape', label: 'Shape'},
                    {id: 'color', label: 'Color'},
                    {id: 'transp', label: 'Transp'},
                    {id: 'position', label: 'Position'},
                    {id: 'glow', label: 'Glow'},
                    {id: 'presets', label: 'Presets'},
                ]}
            />
            {tab === 'number' && <label className="number-inputs">
                Number:
                <input value={settings.number.number} className="number" id="number-number"
                       onChange={handleChange}
                       type="text" inputMode="numeric"/>
            </label>}
            {tab === 'color' && <label className="color-inputs">
                {!settings.color.isFullRand && <>
                    Color: <input value={settings.color.color} className="color" id="color-color"
                                  onChange={handleChange}
                                  type="color"/>
                    Color rand: <input value={settings.color.colorRand} className="color-rand" id="color-colorRand"
                                       onChange={handleChange} type="range" min="0" max="1" step="0.01"/>
                </>}
                Color rand on: <input checked={settings.color.isFullRand} className="color-rand-on"
                                      id="color-isFullRand" onChange={handleChange} type="checkbox"/>
            </label>}
            {tab === 'shape' && <>
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
                    </>}



                </>}
            </>}
            {tab === 'glow' && <label className="glow-inputs">
                Glow: <input value={settings.glow.glow} className="glow" id="glow-glow"
                             onChange={handleChange}
                             min="0"
                             max="1" step="0.1" type="range"/>
            </label>}
            {tab === 'transp' && <label className="transp-inputs">
                Transp: <input value={settings.transp.transp} className="transp" id="transp-transp"
                               onChange={handleChange} min="0" max="1" step="0.05" type="range"/>
                Transp rand: <input value={settings.transp.transpRand} className="transp-rand"
                                    id="transp-transpRand"
                                    onChange={handleChange} min="0" max="1" step="0.1" type="range"/>
            </label>}
            {tab === 'size' && <label className="size-inputs">
                Size: <input value={settings.size.size} className="size" id="size-size"
                             onChange={handleChange}
                             min="0"
                             max="1" step="0.01" type="range"/>
                Size rand: <input value={settings.size.sizeRand} className="size-rand" id="size-sizeRand"
                                  onChange={handleChange} min="0" max="1" step="0.1" type="range"/>
            </label>}
            {tab === 'position' && <label className="pos-inputs">
                Start x: <input value={settings.position.startX} className="start-x" id="position-startX"
                                onChange={handleChange} type="text" inputMode="numeric"/>
                Start y: <input value={settings.position.startY} className="start-y" id="position-startY"
                                onChange={handleChange} type="text" inputMode="numeric"/>
                <br/>
                End x: <input value={settings.position.endX} className="end-x" id="position-endX"
                              onChange={handleChange} type="text" inputMode="numeric"/>
                End y: <input value={settings.position.endY} className="end-y" id="position-endY"
                              onChange={handleChange} type="text" inputMode="numeric"/>
                <br/>
                Bias x: <input value={settings.position.biasX} className="bias-x" id="position-biasX"
                               onChange={handleChange} type="text" inputMode="numeric"/>
                Bias y: <input value={settings.position.biasY} className="bias-y" id="position-biasY"
                               onChange={handleChange} type="text" inputMode="numeric"/>
                <br/>
                Bias inf: <input value={settings.position.biasInf} className="bias-inf" id="position-biasInf"
                                 onChange={handleChange} type="range" min="0" max="1" step="0.1"/>
                <br/>
                Overlay: <select value={settings.position.overlayMode} className="overlayMode"
                                 id="position-overlayMode"
                                 onChange={handleChange}>
                <option value="source-over">source-over</option>
                <option value="source-in">source-in</option>
                <option value="source-out">source-out</option>
                <option value="source-atop">source-atop</option>
                <option value="destination-over">destination-over</option>
                <option value="destination-in">destination-in</option>
                <option value="destination-out">destination-out</option>
                <option value="destination-atop">destination-atop</option>
                <option value="lighter">lighter</option>
                <option value="copy">copy</option>
                <option value="xor">xor</option>
                <option value="screen">screen</option>
                <option value="overlay">overlay</option>
                <option value="darken">darken</option>
                <option value="lighten">lighten</option>
                <option value="color-dodge">color-dodge</option>
                <option value="color-burn">color-burn</option>
                <option value="hard-light">hard-light</option>
                <option value="soft-light">soft-light</option>
                <option value="difference">difference</option>
                <option value="exclusion">exclusion</option>
                <option value="hue">hue</option>
                <option value="saturation">saturation</option>
                <option value="color">color</option>
                <option value="luminosity">luminosity</option>
                <option value="saturation">saturation</option>
            </select>
            </label>}
            {tab === 'presets' && <Presets setSettings={setSettings}/>}
            <br/>
            <Button onClick={clear} className="clear-button">Clear</Button>
            <Button onClick={() => draw(settings)} className="draw-button">Add layer</Button>
            <Button onClick={() => undo()}>Undo</Button>
            <Button onClick={saveAsImage}>Save as image</Button>
        </div>
    );
};