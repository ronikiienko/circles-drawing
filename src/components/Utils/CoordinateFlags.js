import React from 'react';
import {coordinateFlagsSize} from '../../consts/consts';
import {biasTypes, shapeTypes} from '../../consts/sharedConsts';
import {ConditionalPanel} from './ConditionalPanel';
import {CoordinateFlag} from './CoordinateFlag';


export const CoordinateFlags = ({settings, setDragProp}) => {
    // TODO look to on is visible even if turned of (at least with custom shape)

    return (
        <>
            <ConditionalPanel
                active={settings.position.biasType === biasTypes.rectangular || settings.position.biasType === biasTypes.off}>
                <CoordinateFlag
                    id="position-start"
                    x={settings.position.startX}
                    y={settings.position.startY}
                    title="Start point"
                    onMouseDown={setDragProp}
                    color="green"
                    size={coordinateFlagsSize}
                />
                <CoordinateFlag
                    id="position-end"
                    x={settings.position.endX}
                    y={settings.position.endY}
                    title="End point"
                    onMouseDown={setDragProp}
                    color="red"
                    size={coordinateFlagsSize}
                />
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off}>
                <CoordinateFlag
                    id="position-bias"
                    title="Bias point"
                    x={settings.position.biasX}
                    y={settings.position.biasY}
                    onMouseDown={setDragProp}
                    settings={settings}
                    color="blue"
                    size={coordinateFlagsSize}/>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                <CoordinateFlag
                    id="position-biasRadius"
                    title="Bias radius point"
                    x={settings.position.biasRadiusX}
                    y={settings.position.biasRadiusY}
                    onMouseDown={setDragProp}
                    color="gray"
                    size={coordinateFlagsSize}/>
            </ConditionalPanel>

            <ConditionalPanel
                active={settings.shape.lookToOn && (settings.shape.shape === shapeTypes.line || settings.shape.shape === shapeTypes.ellipse) || settings.shape.shape === shapeTypes.custom}>
                <CoordinateFlag
                    id="shape-lookTo"
                    title="Look to point"
                    x={settings.shape.lookToX}
                    y={settings.shape.lookToY}
                    onMouseDown={setDragProp}
                    color="pink"
                    size={coordinateFlagsSize}
                />
            </ConditionalPanel>
        </>
    );
};