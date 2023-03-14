import {Input, Label, makeStyles} from '@fluentui/react-components';
import React from 'react';


const useStyles = makeStyles({
    input: {
        width: '70px',
        marginLeft: '7px',
    },
});
export const Number = ({settings, handleChange}) => {
    const classes = useStyles();
    return (
        <Label className={classes.label}>
            Number:
            <Input
                size="small"
                value={settings.number.number}
                className={classes.input}
                id="number-number"
                onChange={handleChange}
                type="text"
            />
        </Label>
    );
};