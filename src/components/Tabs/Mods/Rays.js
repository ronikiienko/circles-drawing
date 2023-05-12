import {Button, Input, Label, makeStyles} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React, {useCallback} from 'react';
import {getDefaultRay} from '../../../consts/consts';
import {hslArrToHsl} from '../../../utils/generalUtils';
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
                            From angle:
                            <Input
                                className={classes.number}
                                size="small"
                                value={ray.from}
                                type="text"
                                onChange={handleChange}
                                id={`mods-${modIndex}-settings-rays-${rayIndex}-from`}
                            />
                        </Label>
                        <Label className={classes.label}>
                            To angle:
                            <Input
                                className={classes.number}
                                size="small"
                                value={ray.to}
                                type="text"
                                onChange={handleChange}
                                id={`mods-${modIndex}-settings-rays-${rayIndex}-to`}
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
