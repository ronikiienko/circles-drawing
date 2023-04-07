import {Button, Input, Label, makeStyles} from '@fluentui/react-components';
import React from 'react';


const useStyles = makeStyles({
    button: {
        marginTop: '10px',
    },
});
export const Number = ({settings, setSettings, handleChange, classes}) => {
    const setNumber = (number) => {
        setSettings(draft => {
            draft.number.number = number;
        });
    };
    return (
        <>
            <div className={classes.block}>
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
                <br/>
                <Button onClick={() => setNumber(1)} className={classes.button} size="small">1</Button>
                <Button onClick={() => setNumber(10)} className={classes.button} size="small">10</Button>
                <Button onClick={() => setNumber(50)} className={classes.button} size="small">50</Button>
                <Button onClick={() => setNumber(100)} className={classes.button} size="small">100</Button>
                <Button onClick={() => setNumber(500)} className={classes.button} size="small">500</Button>
                <Button onClick={() => setNumber(1000)} className={classes.button} size="small">1000</Button>
                <Button onClick={() => setNumber(5000)} className={classes.button} size="small">5000</Button>
                <Button onClick={() => setNumber(10000)} className={classes.button} size="small">10000</Button>
                <Button onClick={() => setNumber(50000)} className={classes.button} size="small">50000</Button>
                <Button onClick={() => setNumber(100000)} className={classes.button} size="small">100000</Button>
            </div>
        </>
    );
};