import {Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';
import {ModRemapGraph} from './ModRemapGraph';


const useStyles = makeStyles({
    graphSection: {
        display: 'flex',
        alignItems: 'center',
    },
});
export const RemapCharacter = ({settings, handleChange, classes, index}) => {
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
                            id={`mods-${index}-modA`}
                            value={settings.mods[index].modA}
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
                            id={`mods-${index}-modB`}
                            value={settings.mods[index].modB}
                        />
                    </Label>
                </span>
            <ModRemapGraph modA={settings.mods[index].modA} modB={settings.mods[index].modB}/>
        </div>
    );
};
