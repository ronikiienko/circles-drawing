import React from 'react';
import {coordinateFlagsSize} from '../../consts/consts';
import {biasTypes} from '../../consts/sharedConsts';
import {ConditionalPanel} from './ConditionalPanel';
import {CoordinateFlag} from './CoordinateFlag';


export const CoordinateFlags = ({settings, setDragProp}) => {
    // TODO look to on is visible even if turned of (at least with custom shape)

    return (
        <>
            <ConditionalPanel
                active={
                    settings.position.biasType === biasTypes.rectangular.id ||
                    settings.position.biasType === biasTypes.off.id ||
                    settings.position.biasType === biasTypes.chessPlate.id ||
                    settings.position.branchesOn
                }
            >
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
            <ConditionalPanel
                active={settings.position.biasType !== biasTypes.off.id && settings.position.biasType !== biasTypes.chessPlate.id}>
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
            <ConditionalPanel active={settings.position.biasType === biasTypes.radial.id}>
                <CoordinateFlag
                    id="position-biasRadiusPos"
                    title="Bias radius point"
                    x={settings.position.biasRadiusPos.x}
                    y={settings.position.biasRadiusPos.y}
                    onMouseDown={setDragProp}
                    color="gray"
                    size={coordinateFlagsSize}/>
            </ConditionalPanel>
        </>
    );
};