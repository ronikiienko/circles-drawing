import {Button, Divider, makeStyles, mergeClasses, shorthands, Tab, TabList, tokens} from '@fluentui/react-components';
import {
    Add16Regular,
    ArrowUndo16Regular,
    Code16Regular,
    Delete16Regular,
    Eye16Regular,
    Image16Regular,
} from '@fluentui/react-icons';
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


const useStyles = makeStyles({
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    divider: {
        marginBlock: '5px',
        '::before': {
            ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
        },
        '::after': {
            ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
        },
    },
    buttons: {
        ...shorthands.margin('5px'),
    },
    clearButton: {
        float: 'right',
    },
    unhideButton: {
        position: 'fixed',
        right: '5px',
        top: '5px',
        zIndex: 1000,
    },
    inputsContainer: {
        overflowY: 'auto',
        height: '150px',
        maxHeight: '150px',
    },
    contentContainer: {
        // overflow: 'scroll',
        ...shorthands.overflow('hidden'),
        paddingInline: '40px',
        paddingBottom: '20px',
    },
});

const useStylesTabs = makeStyles({
    label: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '10px',
    },
    slider: {
        marginLeft: '5px',
    },
    number: {
        width: '50px',
        marginLeft: '5px',
    },
    select: {
        marginLeft: '5px',
        width: 'fit-content',
        display: 'inline-flex',
    },
    row: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '10px',
        marginBottom: '6px',
    },
});
export const Controls = ({settings, setSettings}) => {
    const classes = useStyles();
    const tabsClasses = useStylesTabs();

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

    useEffect(() => console.log(hidden), [hidden]);

    return (
        <>
            <div id="controls" className={hidden ? 'hidden' : ''}>
                <TabList className={classes.tabsContainer} selectedValue={tab}
                         onTabSelect={(event, data) => setTab(data.value)}>
                    <Tab value="number">Number</Tab>
                    <Tab value="size">Size</Tab>
                    <Tab value="shape">Shape</Tab>
                    <Tab value="color">Color</Tab>
                    <Tab value="transp">Transp</Tab>
                    <Tab value="position">Position</Tab>
                    <Tab value="glow">Glow</Tab>
                    <Tab value="presets">Presets</Tab>
                </TabList>
                <div className={classes.contentContainer}>
                    <div className={classes.inputsContainer}>
                        <ConditionalPanel active={tab === 'number'}>
                            <Number settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'size'}>
                            <Size settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'shape'}>
                            <Shape settings={settings} setSettings={setSettings} handleChange={handleChange}
                                   classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'color'}>
                            <Color settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'glow'}>
                            <Glow settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'transp'}>
                            <Transp settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'position'}>
                            <Position settings={settings} setSettings={setSettings} handleChange={handleChange}
                                      classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === 'presets'}>
                            <Presets setSettings={setSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <br/>
                    </div>
                    <Divider className={classes.divider}>Actions</Divider>
                    <div>
                        <Button
                            className={classes.buttons}
                            onClick={() => draw(settings)}
                            icon={<Add16Regular/>}>Add layer</Button>
                        <Button
                            className={classes.buttons}
                            onClick={() => undo()} icon={<ArrowUndo16Regular/>}>Undo</Button>
                        <Button
                            className={mergeClasses(classes.button, classes.clearButton)}
                            onClick={clear}
                            appearance="primary"
                            icon={<Delete16Regular/>}>Clear</Button>
                        <div>
                            <Button
                                appearance="subtle"
                                className={classes.buttons}
                                size="small"
                                onClick={saveAsImage}
                                icon={<Image16Regular/>}>Save jpeg</Button>
                            <Button
                                appearance="subtle"
                                className={classes.buttons}
                                size="small"
                                onClick={() => saveAsImage(true)}
                                icon={<Image16Regular/>}>Save png</Button>
                            <Button
                                appearance="subtle"
                                className={classes.buttons}
                                size="small"
                                onClick={() => console.log(settings)}
                                icon={<Code16Regular/>}>Log settings</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button className={classes.unhideButton} icon={<Eye16Regular/>} onClick={() => setHidden(prev => !prev)}
                    appearance="subtle"/>
        </>

    );
};

