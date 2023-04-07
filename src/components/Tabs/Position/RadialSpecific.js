import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';
import {BiasCoords} from './BiasCoords';


export const RadialSpecific = ({settings, classes, handleChange, setClickAndSetProp}) => {
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Radius X:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasRadiusX}
                        id="position-biasRadiusX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Radius Y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasRadiusY}
                        id="position-biasRadiusY"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-biasRadius" onClick={setClickAndSetProp}>Click and
                    set</Button>
            </div>
            <BiasCoords setClickAndSetProp={setClickAndSetProp} settings={settings} handleChange={handleChange}
                        classes={classes}/>
        </>
    );
};