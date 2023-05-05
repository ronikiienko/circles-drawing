import {Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';
import {ModRemapGraph} from './ModRemapGraph';


const useStyles = makeStyles({
    graphSection: {
        display: 'flex',
        alignItems: 'center',
    },
});
export const RemapCharacter = ({mod, handleChange, classes, index}) => {
    const localClasses = useStyles();
    return (
        <div className={localClasses.graphSection}>
                <span>
                    <Label className={classes.label}>
                        A:
                        <Slider
                            min={0}
                            max={1}
                            step={0.04}
                            className={classes.slider}
                            size="small"
                            onChange={handleChange}
                            id={`mods-${index}-settings-modA`}
                            value={mod.settings.modA}
                        />
                    </Label>
                    <br/>
                    <Label className={classes.label}>
                        B:
                        <Slider
                            min={0}
                            max={1}
                            step={0.04}
                            className={classes.slider}
                            size="small"
                            onChange={handleChange}
                            id={`mods-${index}-settings-modB`}
                            value={mod.settings.modB}
                        />
                    </Label>
                </span>
            <ModRemapGraph modA={mod.settings.modA} modB={mod.settings.modB}/>
        </div>
    );
};
