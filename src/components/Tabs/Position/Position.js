import {Label, Select} from '@fluentui/react-components';
import React from 'react';
import {biasTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';
import {BiasCharacter} from './BiasCharacter';
import {Branches} from './Branches';
import {BranchesDirection} from './BranchesDirection';
import {BranchesDirectionDelta} from './BranchesDirectionDelta';
import {BranchesMagnitude} from './BranchesMagnitude';
import {ChessPlateSpecific} from './ChessPlateSpecific';
import {RadialSpecific} from './RadialSpecific';
import {RectangularSpecific} from './RectangularSpecific';
import {SpiralSpecific} from './SpiralSpecific';
import {StartEnd} from './StartEnd';
import {XOffset} from './XOffset';
import {YOffset} from './YOffset';

// TODO separate x and y offsets that will only determine start position (now they also apply to every shape in a branch)
export const Position = ({settings, setClickAndSetProp, setSettings, handleChange, classes}) => {
    return (
        <>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Bias type:
                    <Select
                        size="small"
                        value={settings.position.biasType}
                        className={classes.select}
                        id="position-biasType"
                        onChange={handleChange}
                    >
                        {Object.values(biasTypes).map(biasType =>
                            <option
                                key={biasType.id}
                                value={biasType.id}
                            >
                                {biasType.name}
                            </option>)
                        }
                    </Select>
                </Label>
            </div>
            <ConditionalPanel
                active={
                    settings.position.biasType === biasTypes.rectangular.id ||
                    settings.position.biasType === biasTypes.off.id ||
                    settings.position.biasType === biasTypes.chessPlate.id ||
                    settings.position.branchesOn
                }
            >
                <div className={classes.block}>
                    <StartEnd setSettings={setSettings} classes={classes} settings={settings}
                              handleChange={handleChange}
                              setClickAndSetProp={setClickAndSetProp}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off.id}>
                <ConditionalPanel active={settings.position.biasType === biasTypes.chessPlate.id}>
                    <div className={classes.block}>
                        <ChessPlateSpecific
                            setSettings={setSettings}
                            handleChange={handleChange}
                            classes={classes}
                            settings={settings}
                        />
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType === biasTypes.rectangular.id}>
                    <div className={classes.block}>
                        <RectangularSpecific settings={settings} handleChange={handleChange} classes={classes}
                                             setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType === biasTypes.spiral.id}>
                    <div className={classes.block}>
                        <SpiralSpecific classes={classes} settings={settings} handleChange={handleChange}
                                        setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType === biasTypes.radial.id}>
                    <div className={classes.block}>
                        <RadialSpecific settings={settings} handleChange={handleChange} classes={classes}
                                        setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType !== biasTypes.chessPlate.id}>
                    <div className={classes.block}>
                        <BiasCharacter handleChange={handleChange} classes={classes} settings={settings}
                                       setSettings={setSettings}/>
                    </div>
                </ConditionalPanel>
            </ConditionalPanel>
            <div className={classes.block}>
                <XOffset
                    classes={classes}
                    settings={settings}
                    handleChange={handleChange}
                    setSettings={setSettings}
                />
            </div>
            <div className={classes.block}>
                <YOffset
                    classes={classes}
                    settings={settings}
                    handleChange={handleChange}
                    setSettings={setSettings}
                />
            </div>
            <div className={classes.block}>
                <Branches
                    classes={classes}
                    settings={settings}
                    handleChange={handleChange}
                    setSettings={setSettings}
                />
            </div>
            <ConditionalPanel active={settings.position.branchesOn}>
                <div className={classes.block}>
                    <BranchesMagnitude
                        classes={classes}
                        settings={settings}
                        handleChange={handleChange}
                        setSettings={setSettings}
                    />
                </div>
                <div className={classes.block}>
                    <BranchesDirectionDelta
                        classes={classes}
                        settings={settings}
                        handleChange={handleChange}
                        setSettings={setSettings}
                    />
                </div>
                <div className={classes.block}>
                    <BranchesDirection
                        classes={classes}
                        settings={settings}
                        handleChange={handleChange}
                        setSettings={setSettings}
                    />
                </div>
            </ConditionalPanel>
        </>
    );
};