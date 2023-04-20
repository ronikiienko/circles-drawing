import {Button, Input, Label} from '@fluentui/react-components';
import React from 'react';
import {getTranslatedChessPlateDim} from '../../../utils/layerSettings/remappers';


export const ChessPlateSpecific = ({settings, classes, handleChange, setSettings}) => {
    const shapesNeeded = (getTranslatedChessPlateDim(settings.position.chessPlateWidth) * getTranslatedChessPlateDim(settings.position.chessPlateHeight)) || 0;
    return (
        <div className={classes.rowSmall}>
            <Label className={classes.label}>
                Plate width:
                <Input
                    className={classes.number}
                    size="small"
                    value={settings.position.chessPlateWidth}
                    id="position-chessPlateWidth"
                    onChange={handleChange}
                />
            </Label>
            <Label className={classes.label}>
                Plate height:
                <Input
                    className={classes.number}
                    size="small"
                    value={settings.position.chessPlateHeight}
                    id="position-chessPlateHeight"
                    onChange={handleChange}
                />
            </Label>
            <Button
                size="small"
                onClick={() => setSettings(draft => {
                    draft.number.number = shapesNeeded;
                })}
            >
                {shapesNeeded}
            </Button>
        </div>
    );
};
