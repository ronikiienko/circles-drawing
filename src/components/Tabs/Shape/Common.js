import {Checkbox, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {shapeTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Common = ({settings, classes, handleChange}) => {
    return (
        <>
            <Label className={classes.label}>
                Shape:
                <Select size="small" className={classes.select} value={settings.shape.shape} id="shape-shape"
                        onChange={handleChange}>
                    {Object.values(shapeTypes).map(shapeType => {
                        return <option key={shapeType} value={shapeType}>{shapeType}</option>;
                    })}
                </Select>
            </Label>
            <br/>
            <Label className={classes.label}>
                Fill:
                <Checkbox
                    id="shape-fillOn"
                    onChange={handleChange}
                    checked={settings.shape.fillOn}
                />
            </Label>
            <Label className={classes.label}>
                Stroke:
                <Checkbox
                    id="shape-strokeOn"
                    onChange={handleChange}
                    checked={settings.shape.strokeOn}
                />
            </Label>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <br/>
                <Label className={classes.label}>
                    Stroke thickness:
                    <Slider
                        id="shape-strokeThickness"
                        value={settings.shape.strokeThickness}
                        onChange={handleChange}
                        className={classes.slider}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
            </ConditionalPanel>
        </>
    );
};