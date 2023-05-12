import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {CoordinateFlag} from '../../Shared/CoordinateFlag';


export const Radial = ({mod, handleChange, setDragProp, setClickAndSetProp, classes, modIndex}) => {
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Center x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.radialCenterPos.x}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-radialCenterPos-x`}
                    />
                </Label>
                <Label className={classes.label}>
                    Center y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.radialCenterPos.y}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-radialCenterPos-y`}
                    />
                </Label>
                <Button onClick={setClickAndSetProp} id={`mods-${modIndex}-settings-radialCenterPos`} size="small">Click
                    and
                    set</Button>
            </div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Radius x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.radialRadiusPos.x}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-radialRadiusPos-x`}
                    />
                </Label>
                <Label className={classes.label}>
                    Radius y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.radialRadiusPos.y}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-radialRadiusPos-y`}
                    />
                </Label>
                <Button onClick={setClickAndSetProp} id={`mods-${modIndex}-settings-radialRadiusPos`} size="small">Click
                    and
                    set</Button>
            </div>
            <CoordinateFlag
                size={25}
                id={`mods-${modIndex}-settings-radialCenterPos`}
                x={mod.settings.radialCenterPos.x}
                y={mod.settings.radialCenterPos.y}
                text="C"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial center (${mod.name})`}
                color={hslArrToHsl(mod.color, 0.7)}
            />
            <CoordinateFlag
                size={25}
                id={`mods-${modIndex}-settings-radialRadiusPos`}
                x={mod.settings.radialRadiusPos.x}
                y={mod.settings.radialRadiusPos.y}
                text="R"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial radius (${mod.name})`}
                color={hslArrToHsl(mod.color, 0.7)}
            />
        </>
    );
};