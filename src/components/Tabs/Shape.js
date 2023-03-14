import {Button, Checkbox, Input, Label, Select, Slider} from '@fluentui/react-components';
import React from 'react';
import {useClickAndSet} from '../../hooks/useClickAndSet';
import {ConditionalPanel} from '../utils/ConditionalPanel';
import {CoordinateFlag} from '../utils/coordinateFlag';


export const Shape = ({settings, setSettings, handleChange, classes}) => {
    const {setClickAndSetProp, setDragProp} = useClickAndSet({setSettings});
    return (
        <>
            <Label className={classes.label}>
                Shape:
                <Select size="small" className={classes.select} value={settings.shape.shape} id="shape-shape"
                        onChange={handleChange}>
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="line">Line</option>
                    <option value="random3">Random 3</option>
                    <option value="random4">Random 4</option>
                </Select>
            </Label>
            <ConditionalPanel active={settings.shape.shape === 'line'}>
                <br/>
                <Label className={classes.label}>
                    Line look to on:
                    <Checkbox
                        checked={settings.shape.lineLookToOn}
                        id="shape-lineLookToOn"
                        onChange={handleChange}
                    />
                </Label>
                <Label className={classes.label}>
                    Line rounded:
                    <Checkbox
                        checked={settings.shape.lineRounded}
                        className="line-rounded"
                        id="shape-lineRounded"
                        onChange={handleChange}
                    />
                </Label>
                <br/>
                <ConditionalPanel active={!settings.shape.lineLookToOn}>
                    <Label className={classes.label}>
                        Line angle:
                        <Slider
                            className={classes.slider}
                            value={settings.shape.lineAngle}
                            id="shape-lineAngle"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step={0.05}
                        />
                    </Label>
                </ConditionalPanel>
                <Label className={classes.label}>
                    Line angle rand:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.lineAngleRand}
                        id="shape-lineAngleRand"
                        onChange={handleChange}
                        type="range"
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Line ratio:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.lineRatio}
                        id="shape-lineRatio"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <Label className={classes.label}>
                    Line ratio rand:
                    <Slider
                        className={classes.slider}
                        value={settings.shape.lineRatioRand}
                        id="shape-lineRatioRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <ConditionalPanel active={settings.shape.lineLookToOn}>
                    <div className={classes.row}>
                        <Label>
                            Look to X:
                            <Input
                                size="small"
                                value={settings.shape.lineLookToX}
                                className={classes.numberInput}
                                id="shape-lineLookToX"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Label>
                            Look to Y:
                            <Input
                                size="small"
                                value={settings.shape.lineLookToY}
                                className={classes.numberInput}
                                id="shape-lineLookToY"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Button size="small" id="shape-lineLookTo" onClick={setClickAndSetProp}>Click and set</Button>
                    </div>
                    <CoordinateFlag
                        id="shape-lineLookTo"
                        title="Look to point"
                        onMouseDown={setDragProp}
                        settings={settings}
                        color="pink"
                    />
                </ConditionalPanel>
            </ConditionalPanel>
        </>
    );
};