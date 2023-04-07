import {Checkbox, Label} from '@fluentui/react-components';
import React from 'react';


export const LineSpecific = ({settings, classes, handleChange}) => {
    return (
        <>
            <Label className={classes.label}>
                Line rounded:
                <Checkbox
                    checked={settings.shape.lineRounded}
                    className="line-rounded"
                    id="shape-lineRounded"
                    onChange={handleChange}
                />
            </Label>
        </>
    );
};