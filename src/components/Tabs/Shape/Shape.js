import React from 'react';
import {shapeTypes} from '../../../consts/sharedConsts';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';
import {Angle} from './Angle';
import {Common} from './Common';
import {CustomShapeEditor} from './CustomShapeEditor';
import {PixelShapeEditor} from './PixelShapeEditor';
import {RectangleSpecific} from './RectangleSpecific';
import {WidthRatio} from './WidthRatio';


export const Shape = ({
                          settings,
                          setClickAndSetProp,
                          handleChange,
                          setSettings,
                          classes,
                          appSettings,
                          handleAppSettingsChange,
                      }) => {
    return (
        <>
            <div className={classes.block}>
                <Common settings={settings} handleChange={handleChange} classes={classes}/>
            </div>
            <ConditionalPanel active={settings.shape.shape === shapeTypes.rectangle}>
                <div className={classes.block}>
                    <RectangleSpecific settings={settings} handleChange={handleChange} classes={classes}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel
                active={settings.shape.shape !== shapeTypes.circle && settings.shape.shape !== shapeTypes.random3 && settings.shape.shape !== shapeTypes.random4}>
                <div className={classes.block}>
                    <Angle settings={settings} handleChange={handleChange} classes={classes}
                           setClickAndSetProp={setClickAndSetProp}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel
                active={settings.shape.shape === shapeTypes.ellipse || settings.shape.shape === shapeTypes.rectangle}>
                <div className={classes.block}>
                    <WidthRatio settings={settings} handleChange={handleChange} classes={classes}/>
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.shape === shapeTypes.custom}>
                <div className={classes.block}>
                    <CustomShapeEditor
                        settings={settings}
                        setSettings={setSettings}
                        classes={classes}
                        handleChange={handleChange}
                    />
                </div>
            </ConditionalPanel>
            <ConditionalPanel active={settings.shape.shape === shapeTypes.pixel}>
                <div className={classes.block}>
                    <PixelShapeEditor
                        handleAppSettingsChange={handleAppSettingsChange}
                        appSettings={appSettings}
                        setSettings={setSettings}
                        classes={classes}
                        handleChange={handleChange}
                        settings={settings}
                    />
                </div>
            </ConditionalPanel>
        </>
    );
};