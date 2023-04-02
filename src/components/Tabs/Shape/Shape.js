import {Button, Checkbox, Input, Label, Select, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {shapeTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {CustomShapeEditor} from './CustomShapeEditor';


export const Shape = ({settings, setClickAndSetProp, handleChange, setSettings, classes}) => {
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
            <ConditionalPanel active={settings.shape.shape === shapeTypes.rectangle}>
                <br/>
                <Label className={classes.label}>
                    Rectangle roundness:
                    <Slider
                        id="shape-rectRoundness"
                        value={settings.shape.rectRoundness}
                        onChange={handleChange}
                        className={classes.slider}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <Label className={classes.label}>
                    Rectangle roundness rand:
                    <Slider
                        id="shape-rectRoundnessRand"
                        value={settings.shape.rectRoundnessRand}
                        onChange={handleChange}
                        className={classes.slider}
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
            </ConditionalPanel>
            <ConditionalPanel
                active={settings.shape.shape !== shapeTypes.circle && settings.shape.shape !== shapeTypes.random3 && settings.shape.shape !== shapeTypes.random4}>
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
                <ConditionalPanel active={settings.shape.shape === shapeTypes.line}>
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
                        min="0"
                        max="1"
                        step={0.05}
                    />
                </Label>
                <br/>
                <ConditionalPanel active={settings.shape.shape !== shapeTypes.custom}>
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
                </ConditionalPanel>
                <ConditionalPanel active={settings.shape.lookToOn}>
                    <div className={classes.row}>
                        <Label className={classes.label}>
                            Look to X:
                            <Input
                                size="small"
                                value={settings.shape.lookToX}
                                className={classes.number}
                                id="shape-lookToX"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Label className={classes.label}>
                            Look to Y:
                            <Input
                                size="small"
                                value={settings.shape.lookToY}
                                className={classes.number}
                                id="shape-lookToY"
                                onChange={handleChange}
                                type="text"
                            />
                        </Label>
                        <Button size="small" id="shape-lookTo" onClick={setClickAndSetProp}>Click and set</Button>
                    </div>
                </ConditionalPanel>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.shape === shapeTypes.custom}>
                <CustomShapeEditor
                    settings={settings}
                    setSettings={setSettings}
                    classes={classes}
                    handleChange={handleChange}
                />
            </ConditionalPanel>
        </>
    );
};