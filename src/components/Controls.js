import {
    Button,
    Divider,
    makeStyles,
    mergeClasses,
    Overflow,
    OverflowItem,
    shorthands,
    Tab,
    TabList,
    tokens,
} from '@fluentui/react-components';
import {
    Add16Regular,
    ArrowUndo16Regular,
    Code16Regular,
    Delete16Regular,
    Eye16Regular,
    Image16Regular,
} from '@fluentui/react-icons';
import React from 'react';
import {useImmer} from 'use-immer';
import {clear, draw, saveAsImage, undo} from '../draw';
import {useClickAndSet} from '../hooks/useClickAndSet';
import {useKeyboardControls} from '../hooks/useKeyboardControls';
import './Controls.css';
import {Color} from './Tabs/Color';
import {Generation} from './Tabs/Generation';
import {Glow} from './Tabs/Glow';
import {Number} from './Tabs/Number';
import {Position} from './Tabs/Position';
import {Presets} from './Tabs/Presets';
import {Settings} from './Tabs/Settings';
import {Shape} from './Tabs/Shape';
import {Size} from './Tabs/Size';
import {Transp} from './Tabs/Transp';
import {ConditionalPanel} from './Utils/ConditionalPanel';
import {CoordinateFlags} from './Utils/CoordinateFlags';
import {TabOverflowMenu} from './Utils/TabOverflowMenu';


const useStyles = makeStyles({
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
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
        overflowX: 'auto',
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

const tabs = {
    number: {
        label: 'Number',
        id: 'tab-button-number',
    },
    size: {
        label: 'Size',
        id: 'tab-button-size',
    },
    shape: {
        label: 'Shape',
        id: 'tab-button-shape',
    },
    color: {
        label: 'Color',
        id: 'tab-button-color',
    },
    transp: {
        label: 'Transp',
        id: 'tab-button-transp',
    },
    position: {
        label: 'Position',
        id: 'tab-button-position',
    },
    glow: {
        label: 'Glow',
        id: 'tab-button-glow',
    },
    presets: {
        label: 'Presets',
        id: 'tab-button-presets',
    },
    generation: {
        label: 'Generation',
        id: 'tab-button-generation',
    },
    settings: {
        label: 'Settings',
        id: 'tab-button-settings',
    },
};
export const Controls = ({settings, setSettings, appSettings, setAppSettings}) => {
    const classes = useStyles();
    const tabsClasses = useStylesTabs();

    const [tab, setTab] = useImmer(tabs.number.id);
    const [hidden, setHidden] = useImmer(false);

    useKeyboardControls(setHidden);
    const {setDragProp, setClickAndSetProp} = useClickAndSet({setSettings});

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
        <>
            <div id="controls" className={hidden ? 'hidden' : ''}>
                <Overflow minimumVisible={3}>
                    <TabList
                        className={classes.tabsContainer}
                        selectedValue={tab}
                        onTabSelect={(event, data) => setTab(data.value)}
                    >
                        {Object.values(tabs).map(tab => {
                            return (
                                <OverflowItem key={tab.id} id={tab.id}>
                                    <Tab value={tab.id}>{tab.label}</Tab>
                                </OverflowItem>
                            );
                        })}
                        <TabOverflowMenu tabs={tabs} setTab={setTab}/>
                    </TabList>
                </Overflow>
                <div className={classes.contentContainer}>
                    <div className={classes.inputsContainer}>
                        <ConditionalPanel active={tab === tabs.number.id}>
                            <Number settings={settings} setSettings={setSettings} handleChange={handleChange}
                                    classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.size.id}>
                            <Size settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.shape.id}>
                            <Shape settings={settings} setClickAndSetProp={setClickAndSetProp}
                                   handleChange={handleChange}
                                   classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.color.id}>
                            <Color settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.position.id}>
                            <Position settings={settings} setSettings={setSettings}
                                      setClickAndSetProp={setClickAndSetProp}
                                      handleChange={handleChange}
                                      classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.transp.id}>
                            <Transp settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.glow.id}>
                            <Glow settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.presets.id}>
                            <Presets settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.generation.id}>
                            <Generation settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.settings.id}>
                            <Settings appSettings={appSettings} setAppSettings={setAppSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <br/>
                    </div>
                    <Divider className={classes.divider}>Actions</Divider>
                    <div>
                        <Button
                            className={classes.buttons}
                            onClick={() => draw(settings, appSettings)}
                            icon={<Add16Regular/>}>Layer</Button>
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
                <CoordinateFlags settings={settings} setDragProp={setDragProp}/>
            </div>
            <Button
                className={classes.unhideButton}
                icon={<Eye16Regular/>}
                onClick={() => setHidden(prev => !prev)}
                appearance="subtle"
            />
        </>

    );
};

