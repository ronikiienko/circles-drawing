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
                        value={settings.mods[index].radialCenterPos.x}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialCenterPos-x`}
                    />
                </Label>
                <Label className={classes.label}>
                    Center y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialCenterPos.y}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialCenterPos-y`}
                    />
                </Label>
                <Button onClick={setClickAndSetProp} id={`mods-${index}-radialCenterPos`} size="small">Click and
                    set</Button>
            </div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Radius x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialRadiusPos.x}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialRadiusPos-x`}
                    />
                </Label>
                <Label className={classes.label}>
                    Radius y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.mods[index].radialRadiusPos.y}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${index}-radialRadiusPos-y`}
                    />
                </Label>
                <Button onClick={setClickAndSetProp} id={`mods-${index}-radialRadiusPos`} size="small">Click and
                    set</Button>
            </div>
            <CoordinateFlag
                size={25}
                id={`mods-${index}-radialCenterPos`}
                x={settings.mods[index].radialCenterPos.x}
                y={settings.mods[index].radialCenterPos.y}
                text="C"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial center (${settings.mods[index].name})`}
                color={hslArrToHsl(settings.mods[index].color, 0.7)}
            />
            <CoordinateFlag
                size={25}
                id={`mods-${index}-radialRadiusPos`}
                x={settings.mods[index].radialRadiusPos.x}
                y={settings.mods[index].radialRadiusPos.y}
                text="R"
                onMouseDown={setDragProp}
                dot={false}
                title={`Radial radius (${settings.mods[index].name})`}
                color={hslArrToHsl(settings.mods[index].color, 0.7)}
            />
        </>
    );
};