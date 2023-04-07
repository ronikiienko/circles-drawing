import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React from 'react';
import {Blur} from './Blur';
import {Color} from './Color';
import {Glow} from './Glow';
import {Overlay} from './Overlay';
import {Transp} from './Transp';


const useStyles = makeStyles({
    block: {
        ...shorthands.padding('8px'),
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        backgroundColor: tokens.colorNeutralStencil1Alpha,
    },
});

export const MainColor = ({settings, handleChange, classes}) => {
    const localStyles = useStyles();
    return (
        <>
            <div className={localStyles.block}>
                <Color settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={localStyles.block}>
                <Transp settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={localStyles.block}>
                <Glow settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={localStyles.block}>
                <Overlay settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <div className={localStyles.block}>
                <Blur settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
        </>
    );
};
