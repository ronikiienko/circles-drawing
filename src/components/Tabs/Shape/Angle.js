import {Button, Checkbox, Input, Label, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {AngularInput} from '../../Utils/AngularInput';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


export const Angle = ({settings, classes, handleChange, setClickAndSetProp}) => {
    return (
        <>
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
            <Label className={classes.label}>
                Angle:
                <AngularInput
                    className={classes.slider}
                    value={settings.shape.angle}
                    id="shape-angle"
                    onChange={handleChange}
                    size={30}
                />
            </Label>
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
            <ConditionalPanel active={settings.shape.lookToOn}>
                <div className={classes.row}>
                    <Label className={classes.label}>
                        Look to X:
                        <Input
                            size="small"
                            value={settings.shape.lookToPos.x}
                            className={classes.number}
                            id="shape-lookToPos-x"
                            onChange={handleChange}
                            type="text"
                        />
                    </Label>
                    <Label className={classes.label}>
                        Look to Y:
                        <Input
                            size="small"
                            value={settings.shape.lookToPos.y}
                            className={classes.number}
                            id="shape-lookToPos-y"
                            onChange={handleChange}
                            type="text"
                        />
                    </Label>
                    <Button size="small" id="shape-lookToPos" onClick={setClickAndSetProp}>Click and set</Button>
                </div>
            </ConditionalPanel>
        </>
    );
};