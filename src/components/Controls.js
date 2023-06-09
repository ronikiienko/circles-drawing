import {
    Button,
    Divider,
    Field,
    makeStyles,
    ProgressBar,
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
import React, {useCallback, useRef} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useImmer} from 'use-immer';
import {hotkeys, tabs} from '../consts/consts';
import {progressStatuses} from '../consts/sharedConsts';
import {useBrush} from '../hooks/useBrush';
import {useClickAndSet} from '../hooks/useClickAndSet';
import {useDrawingProgress} from '../hooks/useDrawingProgress';
import {useResizer} from '../hooks/useResizer';
import {useTranslatedScroll} from '../hooks/useTranslatedScroll';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';
import {getRandomName} from '../utils/nameGenerators';
import {clearCanvas, drawLayer, redo, saveAsImage, stopDrawing, undo} from '../worker/canvasWorkerMediators';
import './Controls.css';
import {ConditionalPanel} from './Shared/ConditionalPanel';
import {CoordinateFlags} from './Shared/CoordinateFlags';
import {Resizer} from './Shared/Resizer';
import {Brush} from './Tabs/Brush';
import {MainColor} from './Tabs/Color/MainColor';
import {Mods} from './Tabs/Mods/Mods';
import {Number} from './Tabs/Number';
import {Position} from './Tabs/Position/Position';
import {Presets} from './Tabs/Presets/Presets';
import {Saves} from './Tabs/Saves';
import {Settings} from './Tabs/Settings';
import {Shape} from './Tabs/Shape/Shape';
import {Size} from './Tabs/Size';


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
        marginInline: '20px',
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
    header: {
        display: 'flex',
        justifyContent: 'center',
    },
    tabsContainer: {
        paddingBottom: '3px',
        width: '95%',
        maxWidth: 'fit-content',
        ...shorthands.overflow('scroll', 'scroll'),
        '::-webkit-scrollbar': {
            display: 'block',
            width: '0px',
            height: '3px',
        },
        '&:hover::-webkit-scrollbar-thumb': {
            height: '3px',
            backgroundColor: tokens.colorNeutralStencil1Alpha,
            ...shorthands.borderRadius(tokens.borderRadiusMedium),
        },
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
        maxWidth: '50px',
        marginLeft: '5px',
    },
    marginLeft: {
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
    rowSmall: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.margin('2px'),
    },
    verticalLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    block: {
        paddingInline: '8px',
        paddingBlock: '4px',
        // ...shorthands.padding('8px'),
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        backgroundColor: tokens.colorNeutralStencil1Alpha,
        minWidth: 'fit-content',
        minHeight: 'fit-content',
    },
    verticalBlock: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        backgroundColor: tokens.colorNeutralStencil1Alpha,
        paddingBlock: '2px',
        marginBlock: '5px',
    },
    outlineVerticalBlock: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStencil1Alpha),
        paddingBlock: '2px',
        marginBlock: '5px',
    },
    verticallyCentered: {
        display: 'flex',
        alignItems: 'center',
    },
});

// TODO make some functions like "subHandleChange" which for example will accept event.target.id and prepend some path to it. mods-index-....
export const Controls = ({navState, setNavState, settings, setSettings, appSettings, setAppSettings}) => {
    const localClasses = useStyles();
    const tabsClasses = useStylesTabs();

    const tabListRef = useRef(null);
    useTranslatedScroll(tabListRef, 1 / 4);

    const drawingProgress = useDrawingProgress();

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
    const handleChange = useCallback((event) => {
        setSettings(draft => {
            if (event.target.type !== 'checkbox') {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.value);
            } else {
                setObjectPropertyByStringPath(draft, event.target.id, event.target.checked);
            }
        });
    }, [setSettings]);
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
                        <TabList
                            ref={tabListRef}
                            className={localClasses.tabsContainer}
                            selectedValue={navState.mainTab}
                            onTabSelect={(event, data) => {
                                setNavState(draft => {
                                    draft.mainTab = data.value;
                                });
                            }}
                        >
                            {Object.values(tabs).map(tab => {
                                return <Tab key={tab.id} id={tab.id} value={tab.id}>{tab.label}</Tab>;
                            })}
                        </TabList>
                </div>
                <div className={localClasses.content}>
                    <ConditionalPanel active={navState.mainTab === tabs.number.id}>
                        <Number settings={settings} setSettings={setSettings} handleChange={handleChange}
                                classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.size.id}>
                        <Size setSettings={setSettings} settings={settings} handleChange={handleChange}
                              classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.shape.id}>
                        <Shape setDragProp={setDragProp} settings={settings} setSettings={setSettings}
                               setClickAndSetProp={setClickAndSetProp}
                               handleChange={handleChange}
                               classes={tabsClasses}
                               appSettings={appSettings}
                               handleAppSettingsChange={handleAppSettingsChange}
                        />
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.color.id}>
                        <MainColor setSettings={setSettings} settings={settings} handleChange={handleChange}
                                   classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.mods.id}>
                        <Mods
                            setClickAndSetProp={setClickAndSetProp}
                            setSettings={setSettings}
                            settings={settings}
                            setDragProp={setDragProp}
                            handleChange={handleChange}
                            classes={tabsClasses}
                            navState={navState}
                            setNavState={setNavState}
                        />
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.position.id}>
                        <Position settings={settings} setSettings={setSettings}
                                  setClickAndSetProp={setClickAndSetProp}
                                  handleChange={handleChange}
                                  classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.presets.id}>
                        <Presets settings={settings} setSettings={setSettings} classes={tabsClasses}/>
                    </ConditionalPanel>
                    {/*<ConditionalPanel active={mainTab === tabs.generation.id}>*/}
                    {/*    <Generation settings={settings} setSettings={setSettings} classes={tabsClasses}/>*/}
                    {/*</ConditionalPanel>*/}
                    <ConditionalPanel active={navState.mainTab === tabs.settings.id}>
                        <Settings
                            setAppSettings={setAppSettings}
                            appSettings={appSettings}
                            handleAppSettingsChange={handleAppSettingsChange}
                            classes={tabsClasses}
                        />
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.saves.id}>
                        <Saves handleAppSettingsChange={handleAppSettingsChange} appSettings={appSettings}
                               settings={settings} setSettings={setSettings}
                               classes={tabsClasses}/>
                    </ConditionalPanel>
                    <ConditionalPanel active={navState.mainTab === tabs.brush.id}>
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
                        disabled={drawingProgress.status !== progressStatuses.finished.id}
                        className={localClasses.buttons}
                        onClick={() => drawLayer(settings, appSettings)}
                        icon={<Add16Regular/>}
                    >
                        Layer
                    </Button>
                    <Button
                        disabled={drawingProgress.status !== progressStatuses.finished.id}
                        className={localClasses.buttons}
                        onClick={undo}
                        icon={<ArrowUndo16Regular/>}
                    >
                        Undo
                    </Button>
                    <Button
                        disabled={drawingProgress.status !== progressStatuses.finished.id}
                        className={localClasses.buttons}
                        onClick={redo}
                        icon={<ArrowRedo16Regular/>}
                    >
                        Redo
                    </Button>
                    <Button
                        disabled={drawingProgress.status !== progressStatuses.finished.id}
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
                    <ConditionalPanel active={drawingProgress.status !== progressStatuses.finished.id}>
                        <Field
                            validationMessage={`${progressStatuses[drawingProgress.status].name} ${drawingProgress.currentIndex ?? ''}/${drawingProgress.totalNumber ?? ''}`}
                            validationState="none"
                        >
                            <ProgressBar
                                value={drawingProgress.progress}
                                max={1}
                            />
                        </Field>
                    </ConditionalPanel>
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

// TODO handle if two tabs opened somehow