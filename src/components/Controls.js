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
    ArrowRedo16Regular,
    ArrowUndo16Regular,
    Delete16Regular,
    Eye16Regular,
    Stop16Regular,
} from '@fluentui/react-icons';
import React, {useRef} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useImmer} from 'use-immer';
import {hotkeys, tabs} from '../consts/consts';
import {useBrush} from '../hooks/useBrush';
import {useClickAndSet} from '../hooks/useClickAndSet';
import {useResizer} from '../hooks/useResizer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';
import {getRandomName} from '../utils/nameGenerator';
import {clearCanvas, drawLayer, redo, saveAsImage, stopDrawing, undo} from '../worker/canvasWorkerMediators';
import './Controls.css';
import {Brush} from './Tabs/Brush';
import {Color} from './Tabs/Color';
import {Number} from './Tabs/Number';
import {Position} from './Tabs/Position';
import {Presets} from './Tabs/Presets/Presets';
import {Saves} from './Tabs/Saves';
import {Settings} from './Tabs/Settings';
import {Shape} from './Tabs/Shape/Shape';
import {Size} from './Tabs/Size';
import {ConditionalPanel} from './Utils/ConditionalPanel';
import {CoordinateFlags} from './Utils/CoordinateFlags';
import {Resizer} from './Utils/Resizer';
import {TabOverflowMenu} from './Utils/TabOverflowMenu';


const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.flex(1),
        justifyContent: 'space-between',
        ...shorthands.overflow('hidden', 'hidden'),
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1,
        backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
        width: '600px',
        opacity: 1,
        boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)',
        ...shorthands.borderRadius('10px'),
        minHeight: '300px',
        minWidth: '200px',
        maxWidth: '95%',
        height: '600px',
        // height: '300px',
    },

    header: {},
    content: {
        '::-webkit-scrollbar-thumb': {
            backgroundColor: tokens.colorScrollbarOverlay,
            ...shorthands.borderRadius('30px'),
        },
        '::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
        },
        '@media (max-width: 1250px)': {},
        scrollbarWidth: '40px',
        overflowY: 'auto',
        marginInline: '30px',
        flexGrow: '1',
        paddingRight: '10px',
    },
    footer: {
        paddingInline: '30px',
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
    hidden: {
        opacity: 0,
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
        zIndex: 10,
    },
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
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
    buttonInline: {
        marginInline: '3px',
    },
    fullWidth: {
        width: '100%',
        marginBlock: '3px',
    },
    text: {
        width: '200px',
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
        display: 'flex',
        alignItems: 'center',
        marginBlock: '5px',
    },
    verticalLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});


export const Controls = ({mainTab, setMainTab, settings, setSettings, appSettings, setAppSettings}) => {
    const localClasses = useStyles();
    const tabsClasses = useStylesTabs();

    const containerRef = useRef(null);

    const [hidden, setHidden] = useImmer(false);

    useBrush({settings, appSettings});
    const {setDragProp, setClickAndSetProp} = useClickAndSet({setSettings});
    const handleResize = useResizer(containerRef);

    useHotkeys(hotkeys.undo, undo);
    useHotkeys(hotkeys.redo, redo);
    useHotkeys(hotkeys.hideInterface, () => setHidden(prevHidden => !prevHidden));
    useHotkeys(hotkeys.clear, () => clear(appSettings), {preventDefault: true});
    useHotkeys(hotkeys.saveAsPng, () => saveAsImage(appSettings.projectName, true), {preventDefault: true});
    useHotkeys(hotkeys.addLayer, () => drawLayer(settings, appSettings));

    const handleChange = (event) => {
        setSettings(draft => {
            if (event.target.type !== 'checkbox') {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.value);
            } else {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.checked);
            }
        });
    };
    const handleAppSettingsChange = (event) => {
        setAppSettings(draft => {
            if (event.target.type !== 'checkbox') {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.value);
            } else {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.checked);
            }
        });
    };

    const clear = () => {
        clearCanvas(appSettings);
        if (appSettings.projectNameRand) setAppSettings(draft => {
            draft.projectName = getRandomName();
        });
    };

    return (
        <>
            <div
                ref={containerRef}
                id="controls"
                style={{
                    opacity: `${hidden ? 0 : 1}`,
                    transition: 'opacity 200ms ease-in-out',
                    display: `${hidden ? 'none' : 'flex'}`,
                }}
                className={localClasses.mainContainer}
            >
                <Resizer onResize={handleResize}/>
                <div className={localClasses.header}>
                    <Overflow minimumVisible={3}>
                        <TabList
                            className={localClasses.tabsContainer}
                            selectedValue={mainTab}
                            onTabSelect={(event, data) => setMainTab(data.value)}
                        >
                            {Object.values(tabs).map(tab => {
                                return (
                                    <OverflowItem key={tab.id} id={tab.id}>
                                        <Tab value={tab.id}>{tab.label}</Tab>
                                    </OverflowItem>
                                );
                            })}
                            <TabOverflowMenu tabs={tabs} setTab={setMainTab}/>
                        </TabList>
                    </Overflow>
                </div>
                <div className={localClasses.content}>
                    <ConditionalPanel active={mainTab === tabs.number.id}>
                        <Number settings={settings} setSettings={setSettings} handleChange={handleChange}
                                classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.size.id}>
                        <Size settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.shape.id}>
                        <Shape settings={settings} setSettings={setSettings} setClickAndSetProp={setClickAndSetProp}
                               handleChange={handleChange}
                               classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.color.id}>
                        <Color settings={settings} handleChange={handleChange} classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.position.id}>
                        <Position settings={settings} setSettings={setSettings}
                                  setClickAndSetProp={setClickAndSetProp}
                                  handleChange={handleChange}
                                  classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.presets.id}>
                        <Presets settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                    </ConditionalPanel>
                    {/*<ConditionalPanel active={mainTab === tabs.generation.id}>*/}
                    {/*    <Generation settings={settings} setSettings={setSettings} classes={tabsClasses}/>*/}
                    {/*</ConditionalPanel>*/}
                    <ConditionalPanel active={mainTab === tabs.settings.id}>
                        <Settings
                            setAppSettings={setAppSettings}
                            appSettings={appSettings}
                            handleAppSettingsChange={handleAppSettingsChange}
                            classes={tabsClasses}
                        />
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.saves.id}>
                        <Saves handleAppSettingsChange={handleAppSettingsChange} appSettings={appSettings}
                               settings={settings} setSettings={setSettings}
                               classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={mainTab === tabs.brush.id}>
                        <Brush
                            settings={settings}
                            handleChange={handleChange}
                            classes={tabsClasses}
                        />
                    </ConditionalPanel>
                    <br/>
                </div>
                <div className={localClasses.footer}>
                    <Divider className={localClasses.divider}>Actions</Divider>
                    <Button
                        className={localClasses.buttons}
                        onClick={() => drawLayer(settings, appSettings)}
                        icon={<Add16Regular/>}
                    >Layer</Button>
                    <Button
                        className={localClasses.buttons}
                        onClick={undo}
                        icon={<ArrowUndo16Regular/>}>Undo</Button>
                    <Button
                        className={localClasses.buttons}
                        onClick={redo}
                        icon={<ArrowRedo16Regular/>}>Redo</Button>
                    <Button
                        className={localClasses.clearButton}
                        onClick={clear}
                        appearance="primary"
                        icon={<Delete16Regular/>}
                    >
                        Clear
                    </Button>
                    <Button
                        className={localClasses.clearButton}
                        appearance="primary"
                        icon={<Stop16Regular/>}
                        onClick={stopDrawing}
                    >
                        Stop
                    </Button>
                </div>
                <CoordinateFlags settings={settings} setDragProp={setDragProp}/>
            </div>
            <Button
                className={localClasses.unhideButton}
                icon={<Eye16Regular/>}
                onClick={() => setHidden(prev => !prev)}
                appearance="subtle"
            />
        </>

    );
};

