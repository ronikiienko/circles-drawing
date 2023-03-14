import {Button, Tab, TabList} from '@fluentui/react-components';
import React, {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {clear, draw, saveAsImage, undo} from '../draw';
import './Controls.css';
import {Color} from './Tabs/Color';
import {Glow} from './Tabs/Glow';
import {Number} from './Tabs/Number';
import {Position} from './Tabs/Position';
import {Presets} from './Tabs/Presets';
import {Shape} from './Tabs/Shape';
import {Size} from './Tabs/Size';
import {Transp} from './Tabs/Transp';
import {ConditionalPanel} from './utils/ConditionalPanel';


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
            <TabList selectedValue={tab} onTabSelect={(event, data) => setTab(data.value)}>
                <Tab value="number">Number</Tab>
                <Tab value="size">Size</Tab>
                <Tab value="shape">Shape</Tab>
                <Tab value="color">Color</Tab>
                <Tab value="transp">Transp</Tab>
                <Tab value="position">Position</Tab>
                <Tab value="glow">Glow</Tab>
                <Tab value="presets">Presets</Tab>
            </TabList>
            <ConditionalPanel active={tab === 'number'}>
                <Number settings={settings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'color'}>
                <Color settings={settings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'shape'}>
                <Shape settings={settings} setSettings={setSettings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'glow'}>
                <Glow settings={settings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'transp'}>
                <Transp settings={settings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'size'}>
                <Size settings={settings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'position'}>
                <Position settings={settings} setSettings={setSettings} handleChange={handleChange}/>
            </ConditionalPanel>
            <ConditionalPanel active={tab === 'presets'}>
                <Presets setSettings={setSettings}/>
            </ConditionalPanel>
            <br/>
            <Button size="small" onClick={clear} className="clear-button">Clear</Button>
            <Button size="small" onClick={() => draw(settings)} className="draw-button">Add layer</Button>
            <Button size="small" onClick={() => undo()}>Undo</Button>
            <Button size="small" onClick={saveAsImage}>Save jpeg</Button>
            <Button size="small" onClick={() => saveAsImage(true)}>Save png</Button>
            <Button size="small" id="hide" onClick={handleHide}>Hide</Button>
            <Button size="small" onClick={() => console.log(settings)}>Log settings</Button>
        </div>
    );
};