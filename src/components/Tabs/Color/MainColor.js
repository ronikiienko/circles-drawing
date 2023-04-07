import {Divider} from '@fluentui/react-components';
import React from 'react';
import {Blur} from './Blur';
import {Color} from './Color';
import {Glow} from './Glow';
import {Overlay} from './Overlay';
import {Transp} from './Transp';


export const MainColor = ({settings, handleChange, classes}) => {
    return (
        <>
            <Color settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <Transp settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <Glow settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <Overlay settings={settings} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <Blur settings={settings} handleChange={handleChange} classes={classes}/>
        </>
    );
};
