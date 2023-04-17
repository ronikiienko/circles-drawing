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
                        value={settings.position.biasRadiusPos.x}
                        id="position-biasRadiusPos-x"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Radius Y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasRadiusPos.y}
                        id="position-biasRadiusPos-y"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-biasRadiusPos" onClick={setClickAndSetProp}>Click and
                    set</Button>
            </div>
            <BiasCoords setClickAndSetProp={setClickAndSetProp} settings={settings} handleChange={handleChange}
                        classes={classes}/>
        </>
    );
};