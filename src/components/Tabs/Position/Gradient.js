import {Checkbox, Label} from '@fluentui/react-components';
import React from 'react';


export const Gradient = ({classes, settings, handleChange}) => {
    return (
        <>
            <Label className={classes.label}>
                Gradient on:
                <Checkbox
                    checked={settings.position.gradOn}
                    id="position-gradOn"
                    onChange={handleChange}
                />
            </Label>
        </>
    );
};