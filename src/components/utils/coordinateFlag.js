import React from 'react';
import {coordinateFlagsSize} from '../../consts';


export const CoordinateFlag = ({id, onMouseDown, color, settings, title}) => {
    const categoriesArray = id.split('-');
    const category = categoriesArray[0];
    const subcategory1 = categoriesArray[1];
    return (
        <div onMouseDown={onMouseDown} className="settings-coords-flag" title={title}
             style={{
                 left: settings[category][`${subcategory1}X`] - coordinateFlagsSize / 2,
                 top: settings[category][`${subcategory1}Y`] - coordinateFlagsSize / 2,
                 width: coordinateFlagsSize, height: coordinateFlagsSize,
                 backgroundColor: color,
             }}
             id={id}
        >
            <div className="dot"></div>
        </div>
    );
};
