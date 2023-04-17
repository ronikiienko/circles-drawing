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
                    id="position-startPos"
                    x={settings.position.startPos.x}
                    y={settings.position.startPos.y}
                    title="Start point"
                    onMouseDown={setDragProp}
                    color="green"
                    size={coordinateFlagsSize}
                />
                <CoordinateFlag
                    id="position-endPos"
                    x={settings.position.endPos.x}
                    y={settings.position.endPos.y}
                    title="End point"
                    onMouseDown={setDragProp}
                    color="red"
                    size={coordinateFlagsSize}
                />
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.off}>
                <CoordinateFlag
                    id="position-biasPos"
                    title="Bias point"
                    x={settings.position.biasPos.x}
                    y={settings.position.biasPos.y}
                    onMouseDown={setDragProp}
                    settings={settings}
                    color="blue"
                    size={coordinateFlagsSize}/>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                <CoordinateFlag
                    id="position-biasRadiusPos"
                    title="Bias radius point"
                    x={settings.position.biasRadiusPos.x}
                    y={settings.position.biasRadiusPos.y}
                    onMouseDown={setDragProp}
                    color="gray"
                    size={coordinateFlagsSize}/>
            </ConditionalPanel>
            <ConditionalPanel
                active={settings.shape.lookToOn && settings.shape.shape !== shapeTypes.random3 && settings.shape.shape !== shapeTypes.random4 && settings.shape.shape !== shapeTypes.circle}>
                <CoordinateFlag
                    id="shape-lookToPos"
                    title="Look to point"
                    x={settings.shape.lookToPos.x}
                    y={settings.shape.lookToPos.y}
                    onMouseDown={setDragProp}
                    color="pink"
                    size={coordinateFlagsSize}
                />
            </ConditionalPanel>
        </>
    );
};