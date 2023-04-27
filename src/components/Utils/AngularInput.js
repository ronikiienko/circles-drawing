import {makeStyles, mergeClasses, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef, useState} from 'react';
import {getEventObj, getVectorByTwoPoints} from '../../utils/generalUtils';
import {getTranslatedAngle} from '../../utils/layerSettings/remappers';


const useStyles = makeStyles({
    container: {
        ...shorthands.borderRadius(tokens.borderRadiusCircular),
        backgroundColor: tokens.colorNeutralStencil2,
        position: 'relative',
        ...shorthands.overflow('hidden', 'hidden'),
        ...shorthands.border('1px', 'solid', tokens.colorNeutralForegroundDisabled),
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
        },
        ':active': {
            backgroundColor: tokens.colorSubtleBackgroundLightAlphaPressed,
        },
    },
    arrow: {
        backgroundColor: tokens.colorBrandBackground,
        position: 'absolute',
        ...shorthands.borderRadius(tokens.borderRadiusCircular),
    },
});

export const AngularInput = ({value, onChange, id, style, className, size = 30, max}) => {
    const localClasses = useStyles();
    const inputRef = useRef(null);
    const start = useAngularInput({value, onChange, id, inputRef, max});
    return (
        <div ref={inputRef} onMouseDown={start}
             style={{transform: `rotate(${getTranslatedAngle(value)}deg)`, height: size, width: size, ...style}}
             className={mergeClasses(localClasses.container, className)}>
            <div style={{width: size, height: size / 10, top: size / 2 - size / 10 / 2, left: size / 2 - size / 10 / 2}}
                 className={localClasses.arrow}></div>
        </div>
    );
};

const useAngularInput = ({value, onChange, id, inputRef, max}) => {
    const [isDragging, setIsDragging] = useState(false);
    useEffect(() => {
        const mousemoveHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const rect = inputRef.current.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;
            const [, angle] = getVectorByTwoPoints(centerX, centerY, event.pageX, event.pageY);
            let newValue = angle / 360 * max;
            newValue = parseFloat(newValue.toFixed(2));
            onChange(getEventObj(newValue, id));
        };
        const mouseupHandler = () => {
            setIsDragging(false);
        };
        if (isDragging) {
            window.addEventListener('mouseup', mouseupHandler);
            window.addEventListener('mousemove', mousemoveHandler);
        }
        return () => {
            window.removeEventListener('mouseup', mouseupHandler);
            window.removeEventListener('mousemove', mousemoveHandler);
        };
    }, [id, inputRef, isDragging, onChange, value]);
    return () => setIsDragging(true);
};