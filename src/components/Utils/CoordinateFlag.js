import React from 'react';
import {ConditionalPanel} from './ConditionalPanel';


export const CoordinateFlag = ({
                                   id,
                                   onMouseDown,
                                   onDoubleClick,
                                   color,
                                   x,
                                   y,
                                   title,
                                   size,
                                   style = {},
                                   dot = true,
                                   text = '',
                               }) => {
    return (
        <div onMouseDown={onMouseDown} onDoubleClick={onDoubleClick} onTouchStart={onMouseDown}
             className="settings-coords-flag" title={title}
             style={{
                 left: x - size / 2,
                 top: y - size / 2,
                 width: size, height: size,
                 backgroundColor: color,
                 ...style,
                 fontSize: size,
                 color: 'black',
             }}
             id={id}
        >
            {text}
            <ConditionalPanel active={dot}>
                <div className="dot"></div>
            </ConditionalPanel>
        </div>
    );
};
