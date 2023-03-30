import {Button, Checkbox, Input, Label, Select, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {shapeTypes} from '../../consts/sharedConsts';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


export const Shape = ({settings, setClickAndSetProp, handleChange, classes}) => {
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
            <ConditionalPanel active={settings.shape.shape === 'line' || settings.shape.shape === 'ellipse'}>
                <br/>
                <Label className={classes.label}>
                    Look to on:
                    <Checkbox
                        checked={settings.shape.lookToOn}
                        id="shape-lookToOn"
                        onChange={handleChange}
                    />
                    <InfoButton content={
                        <>
                            Choose if all shapes will be rotated such way to look at one point ("Look to" point)
                        </>
                    }/>
                </Label>
                <ConditionalPanel active={settings.shape.shape === 'line'}>
                    <Label className={classes.label}>
                        Line rounded:
                        <Checkbox
                            checked={settings.shape.lineRounded}
                            className="line-rounded"
                            id="shape-lineRounded"
                            onChange={handleChange}
                        />
                    </Label>
                </ConditionalPanel>
                <br/>
                <ConditionalPanel active={!settings.shape.lookToOn}>
                    <Label className={classes.label}>
                        Angle:
                        <Slider
                            className={classes.slider}
                            value={settings.shape.angle}
                            id="shape-angle"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step={0.05}
                        />
                    </Label>
                </ConditionalPanel>
                <Label className={classes.label}>
                    Angle rand:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.angleRand}
                        id="shape-angleRand"
                        onChange={handleChange}
                        type="range"
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Width ratio:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.widthRatio}
                        id="shape-widthRatio"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <Label className={classes.label}>
                    Width ratio rand:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.widthRatioRand}
                        id="shape-widthRatioRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <ConditionalPanel active={settings.shape.lookToOn}>
                    <div className={classes.row}>
                        <Label className={classes.label}>
                            Look to X:
                            <Input
                                size="small"
                                value={settings.shape.lineLookToX}
                                className={classes.number}
                                id="shape-lineLookToX"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Label className={classes.label}>
                            Look to Y:
                            <Input
                                size="small"
                                value={settings.shape.lineLookToY}
                                className={classes.number}
                                id="shape-lineLookToY"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Button size="small" id="shape-lineLookTo" onClick={setClickAndSetProp}>Click and set</Button>
                    </div>

                </ConditionalPanel>
            </ConditionalPanel>
        </>
    );
};