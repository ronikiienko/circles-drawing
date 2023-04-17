import {Button, Checkbox, Input, Label} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';


export const LookTo = ({classes, handleChange, settings, setClickAndSetProp, setSettings}) => {
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
        </>
    );
};