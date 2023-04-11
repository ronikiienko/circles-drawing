import {Checkbox, Label, makeStyles, Slider} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {BiasRemapGraph} from './BiasRemapGraph';


const useStyles = makeStyles({
    biasSection: {
        display: 'flex',
        alignItems: 'center',
    },
    biasGraphHelpersContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const Gradient = ({classes, settings, handleChange}) => {
    const localClasses = useStyles();
    return (
        <>
            <Label className={classes.label}>
                Gradient on:
                <Checkbox
                    checked={settings.position.gradOn}
                    id="position-gradOn"
                    onChange={handleChange}
                />
            </Label>
            <ConditionalPanel active={settings.position.gradOn}>
                <div className={localClasses.biasSection}>
                    <div>
                        <Label className={classes.label}>
                            Gradient A:
                            <Slider
                                size="small"
                                className={classes.slider}
                                value={settings.position.gradA}
                                id="position-gradA"
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.04"
                            />
                        </Label>
                        <br/>
                        <Label className={classes.label}>
                            Gradient B:
                            <Slider
                                size="small"
                                className={classes.slider}
                                value={settings.position.gradB}
                                id="position-gradB"
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.04"
                            />
                        </Label>
                        <br/>
                        <Label className={classes.label}>
                            Gradient I:
                            <Slider
                                size="small"
                                value={settings.position.gradInf}
                                className={classes.slider}
                                id="position-gradInf"
                                onChange={handleChange}
                                min="0"
                                max="1"
                                step="0.04"
                            />
                        </Label>
                    </div>
                    <div>
                        <BiasRemapGraph biasInf={settings.position.gradInf} biasA={settings.position.gradA}
                                        biasB={settings.position.gradB}/>

                    </div>
                </div>
            </ConditionalPanel>

        </>
    );
};