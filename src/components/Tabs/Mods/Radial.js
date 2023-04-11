import {Input, Label} from '@fluentui/react-components';
import React from 'react';


export const Radial = ({settings, handleChange, setClickAndSetProp, classes, index}) => {
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Center x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialCenterX}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialCenterX`}
                    />
                </Label>
                <Label className={classes.label}>
                    Center y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialCenterY}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialCenterY`}
                    />
                </Label>
            </div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Radius x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialRadiusX}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialRadiusX`}
                    />
                </Label>
                <Label className={classes.label}>
                    Radius y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialRadiusY}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialRadiusY`}
                    />
                </Label>
            </div>
        </>
    );
};