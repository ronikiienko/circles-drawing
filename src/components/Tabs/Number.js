import {Button, Input, Label, makeStyles, shorthands} from '@fluentui/react-components';
import React from 'react';


const useStyles = makeStyles({
    buttonsContainer: {
        ...shorthands.padding('5px'),
    },
});
export const Number = ({settings, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
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
                <div className={localClasses.buttonsContainer}>
                    <Button onClick={() => setNumber(1)} className={classes.button} size="small">1</Button>
                    <Button onClick={() => setNumber(10)} className={classes.button} size="small">10</Button>
                    <Button onClick={() => setNumber(50)} className={classes.button} size="small">50</Button>
                    <Button onClick={() => setNumber(100)} className={classes.button} size="small">100</Button>
                    <Button onClick={() => setNumber(500)} className={classes.button} size="small">500</Button>
                    <Button onClick={() => setNumber(1000)} className={classes.button} size="small">1000</Button>
                    <Button onClick={() => setNumber(2500)} className={classes.button} size="small">2500</Button>
                    <Button onClick={() => setNumber(5000)} className={classes.button} size="small">5000</Button>
                    <Button onClick={() => setNumber(10000)} className={classes.button} size="small">10 000</Button>
                    <Button onClick={() => setNumber(50000)} className={classes.button} size="small">50 000</Button>
                    <Button onClick={() => setNumber(100000)} className={classes.button} size="small">100 000</Button>
                    <Button onClick={() => setNumber(500000)} className={classes.button} size="small">500 000</Button>
                    <Button onClick={() => setNumber(1000000)} className={classes.button} size="small">1 000
                        000</Button>
                </div>
            </div>
        </>
    );
};