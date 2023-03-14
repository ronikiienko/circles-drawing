import {Input, Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';


const useStyles = makeStyles({
    label: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
    },
    sliderSize: {
        marginLeft: '10px',
        width: '250px',
    },
    sliderSizeRand: {
        marginLeft: '10px',
    },
    numberSizeInput: {
        width: '40px',
        marginLeft: '5px',
    },
});

export const Size = ({settings, handleChange}) => {
    const classes = useStyles();
    return (
        <>
            <Label className={classes.label}>
                Size:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    id="size-size"
                    value={settings.size.size}
                    onChange={handleChange}
                    className={classes.sliderSize}
                />
                <Input
                    size="small"
                    value={settings.size.size}
                    className={classes.numberSizeInput}
                    id="size-size"
                    onChange={handleChange}
                    type="text"
                />
            </Label>
            <br/>
            <Label className={classes.label}>
                Size rand:
                <Slider
                    className={classes.sliderSizeRand}
                    value={settings.size.sizeRand}
                    id="size-sizeRand"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.1"
                />
            </Label>
        </>

    );
};