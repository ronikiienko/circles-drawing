import {Input, Label} from '@fluentui/react-components';
import React from 'react';


export const ChessPlateSpecific = ({settings, classes, handleChange}) => {
    return (
        <div>
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
        </div>
    );
};
