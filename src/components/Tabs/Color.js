import {Checkbox, Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../utils/ConditionalPanel';


const useStyles = makeStyles({
    label: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '10px',
        // height: '25px'
    },
    color: {
        marginLeft: '10px',
    },
    numberInput: {
        width: '50px',
        marginLeft: '5px',
        marginRight: '10px',
    },
    slider: {
        marginLeft: '10px',
    },
});

export const Color = ({settings, handleChange}) => {
    const classes = useStyles();
    return (
        <>
            <Label className={classes.label}>
                Color:
                <input
                    value={settings.color.color}
                    className={classes.color}
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Color rand on:
                <Checkbox
                    checked={settings.color.isFullRand}
                    id="color-isFullRand"
                    onChange={handleChange}
                    type="checkbox"
                />
            </Label>
            <br/>
            <ConditionalPanel active={!settings.color.isFullRand}>
                <Label className={classes.label}>
                    Color rand:
                    <Slider
                        value={settings.color.colorRand}
                        className={classes.slider}
                        id="color-colorRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                </Label>

            </ConditionalPanel>

        </>
    );
};
