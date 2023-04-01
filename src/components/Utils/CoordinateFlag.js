import React from 'react';


export const CoordinateFlag = ({id, onMouseDown, color, x, y, title, size, style = {}}) => {
    return (
        <div onMouseDown={onMouseDown} onTouchStart={onMouseDown} className="settings-coords-flag" title={title}
             style={{
                 left: x - size / 2,
                 top: y - size / 2,
                 width: size, height: size,
                 backgroundColor: color,
                 ...style,
             }}
             id={id}
        >
            <div className="dot"></div>
        </div>
    );
};
