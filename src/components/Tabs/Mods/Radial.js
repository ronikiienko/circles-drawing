import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {CoordinateFlag} from '../../Utils/CoordinateFlag';


export const Radial = ({settings, handleChange, setDragProp, setClickAndSetProp, classes, index}) => {
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
                <Button onClick={setClickAndSetProp} id={`mods-${index}-radialCenter`} size="small">Click and
                    set</Button>
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
                <Button onClick={setClickAndSetProp} id={`mods-${index}-radialRadius`} size="small">Click and
                    set</Button>
            </div>
            <CoordinateFlag
                size={25}
                id={`mods-${index}-radialCenter`}
                x={settings.mods[index].radialCenterX}
                y={settings.mods[index].radialCenterY}
                text="C"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial center (${settings.mods[index].name})`}
                color={hslArrToHsl(settings.mods[index].color)}
            />
            <CoordinateFlag
                size={25}
                id={`mods-${index}-radialRadius`}
                x={settings.mods[index].radialRadiusX}
                y={settings.mods[index].radialRadiusY}
                text="R"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial radius (${settings.mods[index].name})`}
                color={hslArrToHsl(settings.mods[index].color)}
            />
        </>
    );
};