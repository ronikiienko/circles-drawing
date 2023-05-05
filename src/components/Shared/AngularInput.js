import {makeStyles, mergeClasses, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef, useState} from 'react';
import {getEventObj, getTFromLerp, getVectorByTwoPoints} from '../../utils/generalUtils';


const useStyles = makeStyles({
    container: {
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
        // ...shorthands.borderRadius(tokens.borderRadiusCircular)
    },
    arrow: {
        backgroundColor: tokens.colorBrandBackground,
        position: 'absolute',
        ...shorthands.borderRadius(tokens.borderRadiusCircular),
    },
});

// TODO when give min 0 and max 360, when rotate left it is negative up to -180. It's not what i need
export const AngularInput = ({value, onChange, id, style, className, size = 30, min = 0, max, half = false}) => {
    const localClasses = useStyles();
    const inputRef = useRef(null);
    const start = useAngularInput({value, onChange, id, inputRef, min, max, half});
    return (
        <div
            ref={inputRef}
            onMouseDown={start}
            onTouchStart={start}
            style={{
                height: half ? size / 2 : size,
                width: size,
                borderTopLeftRadius: half ? '1000px' : '50%',
                borderTopRightRadius: half ? '1000px' : '50%',
                borderBottomRightRadius: half ? '0%' : '50%',
                borderBottomLeftRadius: half ? '0%' : '50%',
                ...style,
            }}
            className={mergeClasses(localClasses.container, className)}
        >
            <div
                style={{
                    transformOrigin: `left`,
                    transform: `rotate(${half ? 180 - getTFromLerp(value, min, max) * -180 : getTFromLerp(value, min, max) * 360}deg)`,
                    width: size,
                    height: size / 10,
                    top: size / 2 - size / 10 / 2,
                    left: size / 2 - size / 10 / 2,
                }}
                className={localClasses.arrow}
            >

            </div>
        </div>
    );
};

const useAngularInput = ({value, onChange, id, inputRef, min, max, half}) => {
    const [isDragging, setIsDragging] = useState(false);
    useEffect(() => {
        const mousemoveHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const rect = inputRef.current.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;
            let pageX;
            let pageY;
            if (event.type === 'touchmove') {
                pageX = event.targetTouches[0].pageX;
                pageY = event.targetTouches[0].pageY;
            } else {
                pageX = event.pageX;
                pageY = event.pageY;
            }
            let [, angle] = getVectorByTwoPoints(centerX, centerY, pageX, pageY);

            if (half) {
                if (angle >= 0 && angle <= 90) angle = 0;
                if (angle > 90 && angle <= 180) angle = -180;
                angle = 180 + angle;
            }

            let newValue;
            if (half) newValue = (angle / 360 * (max - min) + min) * 2;
            else newValue = angle / 360 * (max - min) + min;
            newValue = parseFloat(newValue.toFixed(2));
            onChange(getEventObj(newValue, id));
        };
        const mouseupHandler = () => {
            setIsDragging(false);
        };
        if (isDragging) {
            window.addEventListener('touchend', mouseupHandler);
            window.addEventListener('touchmove', mousemoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
            window.addEventListener('mousemove', mousemoveHandler);
        }
        return () => {
            window.removeEventListener('mouseup', mouseupHandler);
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('touchend', mouseupHandler);
            window.removeEventListener('touchmove', mousemoveHandler);
        };
    }, [half, id, inputRef, isDragging, max, min, onChange, value]);
    return () => setIsDragging(true);
};