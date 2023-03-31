import React from 'react';
import {biasTypes, shapeTypes} from '../../consts/sharedConsts';
import {ConditionalPanel} from './ConditionalPanel';
import {CoordinateFlag} from './coordinateFlag';


export const CoordinateFlags = ({settings, setDragProp}) => {
    return (
        <>
            <ConditionalPanel
                active={settings.position.biasType === biasTypes.rectangular || settings.position.biasType === biasTypes.off}>
                <CoordinateFlag
                    id="position-start"
                    title="Start point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="green"
                />
                <CoordinateFlag
                    id="position-end"
                    title="End point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="red"
                />
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off}>
                <CoordinateFlag
                    id="position-bias"
                    title="Bias point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="blue"/>
            </ConditionalPanel>

            <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                <CoordinateFlag
                    id="position-biasRadius"
                    title="Bias radius point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="gray"/>
            </ConditionalPanel>

            <ConditionalPanel
                active={settings.shape.lookToOn && (settings.shape.shape === shapeTypes.line || settings.shape.shape === shapeTypes.ellipse) || settings.shape.shape === shapeTypes.custom}>
                <CoordinateFlag
                    id="shape-lookTo"
                    title="Look to point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="pink"
                />
            </ConditionalPanel>
        </>
    );
};