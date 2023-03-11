import React from 'react';


export const Controls = ({settings, setSettings}) => {
    const handleChange = (event) => {
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        setSettings(draft => {
            draft[category][subcategory1] = event.target.value;
        });
    };
    return (
        <div id="controls">
            <label className="number-inputs">
                Number:
                <input value={settings.number.number} className="number" id="number-number" onChange={handleChange}
                       type="text" inputMode="numeric"/>
            </label>
            <label className="color-inputs">
                Color: <input value={settings.color.color} className="color" id="color-color" onChange={handleChange}
                              type="color"/>
                Color rand: <input value={settings.color.colorRand} className="color-rand" id="color-colorRand"
                                   onChange={handleChange} type="range" min="0" max="1" step="0.01"/>
                Color rand on: <input checked={settings.color.isFullRand} className="color-rand-on"
                                      id="color-isFullRand" onChange={handleChange} type="checkbox"/>
            </label>
            <br/>
            <label className="shape-inputs">
                Shape:
                <select value={settings.shape.shape} id="shape-shape" onChange={handleChange} className="shape">
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="line">Line</option>
                    <option value="random3">Random 3</option>
                    <option value="random4">Random 4</option>
                </select>
            </label>
            <br/>
            <label className="glow-inputs">
                Glow: <input value={settings.glow.glow} className="glow" id="glow-glow" onChange={handleChange} min="0"
                             max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="transp-inputs">
                Transp: <input value={settings.transp.transp} className="transp" id="transp-transp"
                               onChange={handleChange} min="0" max="1" step="0.05" type="range"/>
                Transp rand: <input value={settings.transp.transpRand} className="transp-rand" id="transp-transpRand"
                                    onChange={handleChange} min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="size-inputs">
                Size: <input value={settings.size.size} className="size" id="size-size" onChange={handleChange} min="0"
                             max="1" step="0.01" type="range"/>
                Size rand: <input value={settings.size.sizeRand} className="size-rand" id="size-sizeRand"
                                  onChange={handleChange} min="0" max="1" step="0.1" type="range"/>
            </label>
            <br/>
            <label className="pos-inputs">
                Position:
                Start x: <input value={settings.position.startX} className="start-x" id="position-startX"
                                onChange={handleChange} type="text" inputMode="numeric"/>
                Start y: <input value={settings.position.startY} className="start-y" id="position-startY"
                                onChange={handleChange} type="text" inputMode="numeric"/>
                End x: <input value={settings.position.endX} className="end-x" id="position-endX"
                              onChange={handleChange} type="text" inputMode="numeric"/>
                End y: <input value={settings.position.endY} className="end-y" id="position-endY"
                              onChange={handleChange} type="text" inputMode="numeric"/>
                Bias x: <input value={settings.position.biasX} className="bias-x" is="position-biasY"
                               onChange={handleChange} type="text" inputMode="numeric"/>
                Bias y: <input value={settings.position.biasY} className="bias-y" id="position-biasX"
                               onChange={handleChange} type="text" inputMode="numeric"/>
                Bias inf: <input value={settings.position.biasInf} className="bias-inf" id="position-biasInf"
                                 onChange={handleChange} type="range" min="0" max="1" step="0.1"/>
            </label>
            <br/>
            <button className="clear-button">Clear</button>
            <button className="draw-button">Add layer</button>
        </div>
    );
};