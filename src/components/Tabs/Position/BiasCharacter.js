import {
    Label,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Slider,
} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import React from 'react';
import {biasPresets} from '../../../consts/consts';
import {BiasRemapGraph} from '../../Utils/BiasRemapGraph';


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

export const BiasCharacter = ({settings, handleChange, classes, setSettings}) => {
    const localClasses = useStyles();
    return (
        <>
            <div className={localClasses.biasSection}>
                <div>
                    <Label className={classes.label}>
                        Bias A:
                        <Slider
                            size="small"
                            className={classes.slider}
                            value={settings.position.biasA}
                            id="position-biasA"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                    <br/>
                    <Label className={classes.label}>
                        Bias B:
                        <Slider
                            size="small"
                            className={classes.slider}
                            value={settings.position.biasB}
                            id="position-biasB"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                    <br/>
                    <Label className={classes.label}>
                        Bias I:
                        <Slider
                            size="small"
                            value={settings.position.biasInf}
                            className={classes.slider}
                            id="position-biasInf"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                </div>
                <div>
                    <BiasRemapGraph biasInf={settings.position.biasInf} biasA={settings.position.biasA}
                                    biasB={settings.position.biasB}/>

                </div>
                <div className={localClasses.biasGraphHelpersContainer}>
                    <InfoButton
                        content={<>
                            <div>
                                On this graph:
                            </div>
                            <br/>
                            <div>

                                <div><strong>X</strong> determines <strong>HOW MANY SHAPES</strong> will be affected
                                    by
                                    bias (all width of graph = all
                                    shapes)
                                </div>
                                <div><strong>Y</strong> determines <strong>HOW MUCH AFFECTED</strong> (closer to top
                                    =
                                    more affected)
                                </div>
                            </div>
                            <br/>
                            <div>
                                You can reach desired effect by manipulating three parameters (biasA, biasB,
                                biasInf)
                            </div>
                            <br/>
                            <div>
                                Bias can play different roles in different types of bias, but generally it makes
                                shapes
                                have higher chance of spawning in some certain place rather than fully random.
                            </div>
                        </>}
                    />
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <MenuButton appearance="transparent"></MenuButton>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList>
                                {Object.entries(biasPresets).map(([presetId, preset]) => {
                                    return (
                                        <MenuItem
                                            onClick={() => {
                                                setSettings(draft => {
                                                    draft.position.biasA = preset.biasA;
                                                    draft.position.biasB = preset.biasB;
                                                    draft.position.biasInf = preset.biasInf;
                                                });
                                            }}
                                            key={presetId}
                                            title={preset.description}
                                        >
                                            {preset.name}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            </div>
        </>
    );
};