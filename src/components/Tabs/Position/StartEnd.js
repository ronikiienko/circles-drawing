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
                        value={settings.position.startPos.x}
                        id="position-startPos-x"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Start y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.startPos.y}
                        id="position-startPos-y"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-startPos" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    End x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endPos.x}
                        id="position-endPos-x"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    End y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endPos.y}
                        id="position-endPos-y"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-endPos" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
        </>
    );
};