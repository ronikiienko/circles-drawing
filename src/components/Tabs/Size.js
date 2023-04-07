import {Checkbox, Input, Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


const useStyles = makeStyles({
    sliderSize: {
        marginLeft: '10px',
        width: '250px',
    },
});

export const Size = ({settings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Size:
                    <Slider
                        min={0}
                        max={1}
                        step={0.005}
                        id="size-size"
                        value={settings.size.size}
                        onChange={handleChange}
                        className={localClasses.sliderSize}
                        size="small"
                    />
                    <Input
                        size="small"
                        value={settings.size.size}
                        className={classes.number}
                        id="size-size"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Size rand:
                    <Slider
                        className={classes.number}
                        value={settings.size.sizeRand}
                        id="size-sizeRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.1"
                        size="small"
                    />
                </Label>
                <br/>
                <ConditionalPanel active={settings.position.gradOn}>
                    <Label className={classes.label}>
                        Size gradient on:
                        <Checkbox
                            id="size-sizeGradOn"
                            onChange={handleChange}
                            checked={settings.size.sizeGradOn}
                        />
                    </Label>
                    <ConditionalPanel active={settings.size.sizeGradOn}>
                        <br/>
                        <Label className={classes.label}>
                            Size2:
                            <Slider
                                min={0}
                                max={1}
                                step={0.005}
                                id="size-size2"
                                value={settings.size.size2}
                                onChange={handleChange}
                                className={localClasses.sliderSize}
                                size="small"
                            />
                            <Input
                                size="small"
                                value={settings.size.size2}
                                className={classes.number}
                                id="size-size2"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                    </ConditionalPanel>
                </ConditionalPanel>
            </div>
        </>
    );
};