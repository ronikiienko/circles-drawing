import {Input, Label} from '@fluentui/react-components';
import React from 'react';


export const Number = ({settings, handleChange, classes}) => {
    return (
        <Label className={classes.label}>
            Number:
            <Input
                size="small"
                value={settings.number.number}
                className={classes.number}
                id="number-number"
                onChange={handleChange}
                type="text"
            />
        </Label>
    );
};