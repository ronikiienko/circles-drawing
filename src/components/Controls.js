import {
    Button,
    Divider,
    makeStyles,
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
    Stop16Regular,
} from '@fluentui/react-icons';
import React, {useRef} from 'react';
import {useImmer} from 'use-immer';
import {clear, draw, saveAsImage, undo} from '../draw';
import {useClickAndSet} from '../hooks/useClickAndSet';
import './Controls.css';
import {Color} from './Tabs/Color';
import {Number} from './Tabs/Number';
import {Position} from './Tabs/Position';
import {Presets} from './Tabs/Presets';
import {Saves} from './Tabs/Saves';
import {Settings} from './Tabs/Settings';
import {Shape} from './Tabs/Shape';
import {Size} from './Tabs/Size';
import {ConditionalPanel} from './Utils/ConditionalPanel';
import {CoordinateFlags} from './Utils/CoordinateFlags';
import {TabOverflowMenu} from './Utils/TabOverflowMenu';


const useStyles = makeStyles({
    mainContainer: {
        position: 'absolute',
        top: '10px',
        zIndex: 100,
        backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
        width: '600px',
        opacity: 1,
        boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)',
        maxWidth: '90%',
        borderBottomRightRadius: '10px',
        borderTopRightRadius: '10px',
    },
    hidden: {
        opacity: 0,
    },
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
        ...shorthands.margin('5px'),
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
    button: {
        ...shorthands.margin('3px'),
    },
    text: {
        width: '300px',
        marginLeft: '5px',
    },
    select: {
        marginLeft: '5px',
        width: 'fit-content',
        display: 'inline-flex',
        marginTop: '3px',
        marginBottom: '3px',
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
    position: {
        label: 'Position',
        id: 'tab-button-position',
    },
    presets: {
        label: 'Presets',
        id: 'tab-button-presets',
    },
    // generation: {
    //     label: 'Generation',
    //     id: 'tab-button-generation',
    // },
    settings: {
        label: 'Settings',
        id: 'tab-button-settings',
    },
    saves: {
        label: 'Saves',
        id: 'tab-button-saves',
    },
};
export const Controls = ({settings, setSettings, appSettings, setAppSettings}) => {
    const classes = useStyles();
    const tabsClasses = useStylesTabs();

    const [tab, setTab] = useImmer(tabs.number.id);
    const [hidden, setHidden] = useImmer(false);

    const stopButtonRef = useRef(null);

    // useKeyboardControls(setHidden);
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

    const drawLayer = () => draw(settings, appSettings, stopButtonRef.current);

    return (
        <>
            <div id="controls" style={{opacity: `${hidden ? 0 : 1}`, transition: 'opacity 200ms ease-in-out'}}
                 className={classes.mainContainer}>
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
                        <ConditionalPanel active={tab === tabs.presets.id}>
                            <Presets settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        {/*<ConditionalPanel active={tab === tabs.generation.id}>*/}
                        {/*    <Generation settings={settings} setSettings={setSettings} classes={tabsClasses}/>*/}
                        {/*</ConditionalPanel>*/}
                        <ConditionalPanel active={tab === tabs.settings.id}>
                            <Settings appSettings={appSettings} setAppSettings={setAppSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <ConditionalPanel active={tab === tabs.saves.id}>
                            <Saves settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                        </ConditionalPanel>
                        <br/>
                    </div>
                    <Divider className={classes.divider}>Actions</Divider>
                    <div>
                        <Button
                            className={classes.buttons}
                            onClick={drawLayer}
                            icon={<Add16Regular/>}>Layer</Button>
                        <Button
                            className={classes.buttons}
                            onClick={() => undo()} icon={<ArrowUndo16Regular/>}>Undo</Button>
                        <Button
                            className={classes.clearButton}
                            onClick={clear}
                            appearance="primary"
                            icon={<Delete16Regular/>}
                        >
                            Clear
                        </Button>
                        <Button
                            className={classes.clearButton}
                            ref={stopButtonRef}
                            appearance="primary"
                            icon={<Stop16Regular/>}
                        >
                            Stop
                        </Button>
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

