import React, {useEffect} from 'react';
import {useImmer} from 'use-immer';


export const Position = ({settings, setSettings, handleChange}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    useEffect(() => {
        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;
            setSettings(draft => {
                draft.position[`${clickAndSetProperty}X`] = event.pageX;
                draft.position[`${clickAndSetProperty}Y`] = event.pageY;
            });
            setClickAndSetProperty(null);
        };
        window.addEventListener('click', clickAndSetHandler);
        return () => window.removeEventListener('click', clickAndSetHandler);
    }, [setClickAndSetProperty, clickAndSetProperty, setSettings]);

    const handleClickAndSetPropertyChange = (event) => {
        event.stopPropagation();
        setClickAndSetProperty(event.target.id);
    };
    return (
        <>
            Start x: <input value={settings.position.startX} className="start-x" id="position-startX"
                            onChange={handleChange} type="text" inputMode="numeric"/>
            Start y: <input value={settings.position.startY} className="start-y" id="position-startY"
                            onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="start" onClick={handleClickAndSetPropertyChange}>Click and set</button>
            <br/>
            End x: <input value={settings.position.endX} className="end-x" id="position-endX"
                          onChange={handleChange} type="text" inputMode="numeric"/>
            End y: <input value={settings.position.endY} className="end-y" id="position-endY"
                          onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="end" onClick={handleClickAndSetPropertyChange}>Click and set</button>
            <br/>
            Bias x: <input value={settings.position.biasX} className="bias-x" id="position-biasX"
                           onChange={handleChange} type="text" inputMode="numeric"/>
            Bias y: <input value={settings.position.biasY} className="bias-y" id="position-biasY"
                           onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="bias" onClick={handleClickAndSetPropertyChange}>Click and set</button>
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
        </>
    );
};