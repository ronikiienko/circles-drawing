import {Label, Select} from '@fluentui/react-components';
import React from 'react';
import {biasTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {BiasCharacter} from './BiasCharacter';
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
                                key={biasType}
                                value={biasType}
                            >
                                {biasType}
                            </option>)
                        }
                    </Select>
                </Label>
            </div>
            <ConditionalPanel
                active={settings.position.biasType === biasTypes.rectangular || settings.position.biasType === biasTypes.off}>
                <div className={classes.block}>
                    <StartEnd classes={classes} settings={settings} handleChange={handleChange}
                              setClickAndSetProp={setClickAndSetProp}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off}>
                <ConditionalPanel active={settings.position.biasType === biasTypes.rectangular}>
                    <div className={classes.block}>
                        <RectangularSpecific settings={settings} handleChange={handleChange} classes={classes}
                                             setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType === biasTypes.spiral}>
                    <div className={classes.block}>
                        <SpiralSpecific classes={classes} settings={settings} handleChange={handleChange}
                                        setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                    <div className={classes.block}>
                        <RadialSpecific settings={settings} handleChange={handleChange} classes={classes}
                                        setClickAndSetProp={setClickAndSetProp}/>
                    </div>
                </ConditionalPanel>
                <div className={classes.block}>
                    <BiasCharacter handleChange={handleChange} classes={classes} settings={settings}
                                   setSettings={setSettings}/>
                </div>
                <div className={classes.block}>
                    <Gradient setSettings={setSettings} handleChange={handleChange} classes={classes}
                              settings={settings}/>
                </div>
            </ConditionalPanel>
        </>
    );
};