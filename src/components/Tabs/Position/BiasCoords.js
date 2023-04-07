import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';


export const BiasCoords = ({settings, classes, handleChange, setClickAndSetProp}) => {
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Bias x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasX}
                        id="position-biasX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Bias y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasY}
                        id="position-biasY"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-bias" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
        </>
    );
};
