import React from 'react';
import {biasTypes} from '../../consts';
import {ConditionalPanel} from './ConditionalPanel';
import {CoordinateFlag} from './coordinateFlag';


export const CoordinateFlags = ({settings, setDragProp}) => {
    return (
        <>
            <ConditionalPanel active={settings.position.biasType !== biasTypes.radial}>
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
            <CoordinateFlag
                id="position-bias"
                title="Bias point"
                onMouseDown={setDragProp}
                onTouchStart={setDragProp}
                settings={settings}
                color="blue"/>
            <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                <CoordinateFlag
                    id="position-biasRadius"
                    title="Bias radius point"
                    onMouseDown={setDragProp}
                    onTouchStart={setDragProp}
                    settings={settings}
                    color="gray"/>
            </ConditionalPanel>

            <ConditionalPanel active={settings.shape.lineLookToOn}>
                <CoordinateFlag
                    id="shape-lineLookTo"
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