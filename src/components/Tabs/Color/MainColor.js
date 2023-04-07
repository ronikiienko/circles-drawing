import React from 'react';
import {Blur} from './Blur';
import {Color} from './Color';
import {Glow} from './Glow';
import {Overlay} from './Overlay';
import {Transp} from './Transp';


export const MainColor = ({settings, handleChange, classes}) => {
    return (
        <>
            <div className={classes.block}>
                <Color settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Transp settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Glow settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Overlay settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={classes.block}>
                <Blur settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
        </>
    );
};
