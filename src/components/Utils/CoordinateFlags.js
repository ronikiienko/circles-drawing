import React from 'react';
import {ConditionalPanel} from './ConditionalPanel';
import {CoordinateFlag} from './coordinateFlag';


export const CoordinateFlags = ({settings, setDragProp}) => {
    return (
        <>
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
            <CoordinateFlag
                id="position-bias"
                title="Bias point"
                onMouseDown={setDragProp}
                onTouchStart={setDragProp}
                settings={settings}
                color="blue"/>
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