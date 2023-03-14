import {overlayModes} from '../consts';
import {useClickAndSet} from '../hooks/useClickAndSet';


export const Position = ({settings, setSettings, handleChange}) => {
    const {setClickAndSetProp, setDragProp} = useClickAndSet({setSettings});
    return (
        <>
            Start x: <input value={settings.position.startX} className="start-x" id="position-startX"
                            onChange={handleChange} type="text" inputMode="numeric"/>
            Start y: <input value={settings.position.startY} className="start-y" id="position-startY"
                            onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="position-start" onClick={setClickAndSetProp}>Click and set</button>
            <br/>
            End x: <input value={settings.position.endX} className="end-x" id="position-endX"
                          onChange={handleChange} type="text" inputMode="numeric"/>
            End y: <input value={settings.position.endY} className="end-y" id="position-endY"
                          onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="position-end" onClick={setClickAndSetProp}>Click and set</button>
            <br/>
            Bias x: <input value={settings.position.biasX} className="bias-x" id="position-biasX"
                           onChange={handleChange} type="text" inputMode="numeric"/>
            Bias y: <input value={settings.position.biasY} className="bias-y" id="position-biasY"
                           onChange={handleChange} type="text" inputMode="numeric"/>
            <button id="position-bias" onClick={setClickAndSetProp}>Click and set</button>
            <br/>
            Bias inf: <input value={settings.position.biasInf} className="bias-inf" id="position-biasInf"
                             onChange={handleChange} type="range" min="0" max="1" step="0.1"/>
            <br/>
            Overlay: <select value={settings.position.overlayMode} className="overlayMode"
                             id="position-overlayMode"
                             onChange={handleChange}>
            <option value="source-over">source-over</option>
            {overlayModes.map(overlayMode => <option key={overlayMode} value={overlayMode}>{overlayMode}</option>)}
        </select>
            <div onMouseDown={setDragProp} className="settings-coords-flag start" title="Start point"
                 style={{left: settings.position.startX - 5, top: settings.position.startY - 5}}
                 id="position-start"></div>
            <div onMouseDown={setDragProp} className="settings-coords-flag end" title="End point"
                 style={{left: settings.position.endX - 5, top: settings.position.endY - 5}} id="position-end"></div>
            <div onMouseDown={setDragProp} className="settings-coords-flag bias" title="Bias point"
                 style={{left: settings.position.biasX - 5, top: settings.position.biasY - 5}} id="position-bias"></div>
        </>
    );
};