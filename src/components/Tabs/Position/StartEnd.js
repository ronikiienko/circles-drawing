import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';


export const StartEnd = ({classes, settings, handleChange, setClickAndSetProp}) => {
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Start x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.startX}
                        id="position-startX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Start y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.startY}
                        id="position-startY"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-start" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    End x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endX}
                        id="position-endX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    End y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endY}
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-end" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
        </>
    );
};