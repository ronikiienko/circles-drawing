import {Label, Select} from '@fluentui/react-components';
import React from 'react';
import {biasTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {BiasCharacter} from './BiasCharacter';
import {ChessPlateSpecific} from './ChessPlateSpecific';
import {Gradient} from './Gradient';
import {RadialSpecific} from './RadialSpecific';
import {RectangularSpecific} from './RectangularSpecific';
import {SpiralSpecific} from './SpiralSpecific';
import {StartEnd} from './StartEnd';


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
                active={settings.position.biasType === biasTypes.rectangular.id || settings.position.biasType === biasTypes.off.id || settings.position.biasType === biasTypes.chessPlate.id}>
                <div className={classes.block}>
                    <StartEnd classes={classes} settings={settings} handleChange={handleChange}
                              setClickAndSetProp={setClickAndSetProp}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off.id}>
                <ConditionalPanel active={settings.position.biasType === biasTypes.chessPlate.id}>
                    <div className={classes.block}>
                        <ChessPlateSpecific
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
                <div className={classes.block}>
                    <Gradient setSettings={setSettings} handleChange={handleChange} classes={classes}
                              settings={settings}/>
                </div>
            </ConditionalPanel>
        </>
    );
};