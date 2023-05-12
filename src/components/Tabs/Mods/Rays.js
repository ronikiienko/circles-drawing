import {Button, Input, Label, makeStyles, Slider} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React, {useCallback} from 'react';
import {getDefaultRay} from '../../../consts/consts';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {AngularInput} from '../../Shared/AngularInput';
import {CoordinateFlag} from '../../Shared/CoordinateFlag';


const useStyles = makeStyles({
    addRayButton: {
        width: '150px',
    },
});

export const Rays = ({classes, modIndex, handleChange, mod, setSettings, setDragProp, setClickAndSetProp}) => {
    const localClasses = useStyles();
    const removeRay = useCallback((rayIndex) => {
        setSettings(draft => {
            draft.mods[modIndex].settings.rays.splice(rayIndex, 1);
        });
    }, [modIndex, setSettings]);
    return (
        <div>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Rays source x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.raysSourcePos.x}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-raysSourcePos-x`}
                    />
                </Label>
                <Label className={classes.label}>
                    Rays source y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={mod.settings.raysSourcePos.y}
                        type="text"
                        onChange={handleChange}
                        id={`mods-${modIndex}-settings-raysSourcePos-y`}
                    />
                </Label>
                <Button
                    onClick={setClickAndSetProp}
                    id={`mods-${modIndex}-settings-raysSourcePos`}
                    size="small"
                >
                    Click and set
                </Button>
            </div>
            {mod.settings.rays.map((ray, rayIndex) => {
                return <React.Fragment key={ray.id}>
                    <div className={classes.row}>
                        <Label className={classes.label}>
                            Angle:
                            <AngularInput
                                size={20}
                                className={classes.slider}
                                value={ray.angle}
                                onChange={handleChange}
                                id={`mods-${modIndex}-settings-rays-${rayIndex}-angle`}
                                min={1}
                                max={360}
                            />
                        </Label>
                        <Label className={classes.label}>
                            Width:
                            <Slider
                                size="small"
                                value={ray.width}
                                onChange={handleChange}
                                id={`mods-${modIndex}-settings-rays-${rayIndex}-width`}
                                min={1}
                                max={360}
                            />
                            <Input
                                className={classes.number}
                                type="text"
                                appearance="underline"
                                size="small"
                                value={ray.width}
                                onChange={handleChange}
                                id={`mods-${modIndex}-settings-rays-${rayIndex}-width`}
                            />
                        </Label>
                        <Button onClick={() => removeRay(rayIndex)} size="small" icon={<Delete16Regular/>}/>
                    </div>
                </React.Fragment>;
            })}
            <Button
                className={localClasses.addRayButton}
                size="small"
                onClick={() => {
                    setSettings(draft => {
                        draft.mods[modIndex].settings.rays.push(getDefaultRay());
                    });
                }}
            >
                Add ray
            </Button>
            <CoordinateFlag
                size={25}
                id={`mods-${modIndex}-settings-raysSourcePos`}
                x={mod.settings.raysSourcePos.x}
                y={mod.settings.raysSourcePos.y}
                text="S"
                onMouseDown={setDragProp}
                dot={false}
                title={`Rays source pos (${mod.name})`}
                color={hslArrToHsl(mod.color, 0.7)}
            />
        </div>
    );
};
