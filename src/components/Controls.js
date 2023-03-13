import React, {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {clear, draw, saveAsImage, undo} from '../draw';
import './Controls.css';
import {Position} from './Position';
import {Presets} from './Presets';
import {Shape} from './Shape';
import {Button} from './styledElements/Button';
import {ConditionalPanel, Tabs} from './Tabs';


export const Controls = ({settings, setSettings}) => {
    const [tab, setTab] = useImmer('number');
    const [hidden, setHidden] = useImmer(false);
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

    const handleHide = (event) => {
        const id = event.target.id;
        if (id === 'hide') setHidden(true);
        if (id === 'controls' && hidden) setHidden(false);
    };

    useEffect(() => console.log(hidden), [hidden]);

    return (
        <div id="controls" className={hidden ? 'hidden' : ''} onClick={handleHide}>
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
            <ConditionalPanel active={tab === 'number'}>
                <label className="number-inputs">
                    Number:
                    <input
                        value={settings.number.number}
                        className="number"
                        id="number-number"
                        onChange={handleChange}
                        type="text" inputMode="numeric"
                    />
                </label>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'color'}>
                <label>
                    Color:
                    <input
                        value={settings.color.color}
                        className="color"
                        id="color-color"
                        onChange={handleChange}
                        type="color"
                    />
                </label>
                <ConditionalPanel active={!settings.color.isFullRand}>
                    Color rand:
                    <input
                        value={settings.color.colorRand}
                        className="color-rand" id="color-colorRand"
                        onChange={handleChange}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                    />
                </ConditionalPanel>
                <label>
                    Color rand on:
                    <input
                        checked={settings.color.isFullRand}
                        className="color-rand-on"
                        id="color-isFullRand"
                        onChange={handleChange}
                        type="checkbox"
                    />
                </label>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'shape'}>
                <Shape
                    settings={settings}
                    setSettings={setSettings}
                    handleChange={handleChange}
                />
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'glow'}>
                <label>
                    Glow:
                    <input
                        value={settings.glow.glow}
                        className="glow"
                        id="glow-glow"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.1"
                        type="range"
                    />
                </label>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'transp'}>
                <label>
                    Transp:
                    <input
                        value={settings.transp.transp}
                        className="transp"
                        id="transp-transp"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.05"
                        type="range"
                    />
                </label>
                <label>
                    Transp rand:
                    <input
                        value={settings.transp.transpRand}
                        className="transp-rand"
                        id="transp-transpRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.1"
                        type="range"
                    />
                </label>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'size'}>
                <label>
                    Size:
                    <input
                        value={settings.size.size}
                        className="size"
                        id="size-size"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                        type="range"
                    />
                </label>
                <label>
                    Size rand:
                    <input
                        value={settings.size.sizeRand}
                        className="size-rand"
                        id="size-sizeRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.1"
                        type="range"
                    />
                </label>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'position'}>
                <Position
                    settings={settings}
                    setSettings={setSettings}
                    handleChange={handleChange}
                />
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'presets'}>
                <Presets
                    setSettings={setSettings}
                />
            </ConditionalPanel>
            <br/>
            <Button onClick={clear} className="clear-button">Clear</Button>
            <Button onClick={() => draw(settings)} className="draw-button">Add layer</Button>
            <Button onClick={() => undo()}>Undo</Button>
            <Button onClick={saveAsImage}>Save as image</Button>
            <Button id="hide" onClick={handleHide}>Hide</Button>
            <Button onClick={() => console.log(settings)}>Log settings</Button>
        </div>
    );
};