import React from 'react';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';
import {Blur} from './Blur';
import {Color} from './Color';
import {Glow} from './Glow';
import {Overlay} from './Overlay';
import {StrokeColor} from './StrokeColor';
import {StrokeTransp} from './StrokeTransp';
import {Transp} from './Transp';


export const MainColor = ({setSettings, settings, handleChange, classes}) => {
    return (
        <>
            <ConditionalPanel active={settings.shape.fillOn}>
                <div className={classes.block}>
                    <Color
                        setSettings={setSettings}
                        settings={settings}
                        handleChange={handleChange}
                        classes={classes}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <div className={classes.block}>
                    <StrokeColor
                        setSettings={setSettings}
                        settings={settings}
                        handleChange={handleChange}
                        classes={classes}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.fillOn}>
                <div className={classes.block}>
                    <Transp
                        setSettings={setSettings}
                        settings={settings}
                        handleChange={handleChange}
                        classes={classes}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <div className={classes.block}>
                    <StrokeTransp
                        setSettings={setSettings}
                        settings={settings}
                        handleChange={handleChange}
                        classes={classes}
                    />
                </div>
            </ConditionalPanel>
            <div className={classes.block}>
                <Glow settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Overlay settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Blur setSettings={setSettings} settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
        </>
    );
};
