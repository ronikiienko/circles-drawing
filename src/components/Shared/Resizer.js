import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useState} from 'react';


const useStyles = makeStyles({
    topLeft: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'nwse-resize',
        height: '20px',
        width: '20px',
        zIndex: 3,
        left: 0,
        top: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    top: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'ns-resize',
        height: '8px',
        width: '100%',
        zIndex: 2,
        left: 0,
        top: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    topRight: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'nesw-resize',
        height: '20px',
        width: '20px',
        zIndex: 3,
        right: 0,
        top: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    right: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'ew-resize',
        height: '100%',
        width: '8px',
        zIndex: 2,
        right: 0,
        top: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    bottomLeft: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'nesw-resize',
        width: '20px',
        height: '20px',
        zIndex: 3,
        left: 0,
        bottom: '0',
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    bottom: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'ns-resize',
        width: '100%',
        height: '8px',
        zIndex: 2,
        left: 0,
        bottom: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    bottomRight: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'nwse-resize',
        width: '20px',
        height: '20px',
        zIndex: 3,
        right: 0,
        bottom: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
    left: {
        ':hover': {
            backgroundColor: tokens.colorSubtleBackgroundInvertedSelected,
        },
        position: 'absolute',
        cursor: 'ew-resize',
        width: '8px',
        height: '100%',
        zIndex: 2,
        left: 0,
        top: 0,
        ...shorthands.transition('background-color', '100ms', '0ms', 'ease-out'),
    },
});

export const Resizer = ({onResize}) => {
    const localClasses = useStyles();

    const [direction, setDirection] = useState('');
    const [mouseDown, setMouseDown] = useState(false);

    const mouseDownHandler = (event) => {
        setDirection(event.target.id);
        setMouseDown(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!direction) return;
            event.stopPropagation();
            event.preventDefault();
            onResize(direction, event.movementX, event.movementY);
        };

        if (mouseDown) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseDown, direction, onResize]);

    useEffect(() => {
        const mouseUpHandler = () => setMouseDown(false);

        window.addEventListener('mouseup', mouseUpHandler);

        return () => {
            window.removeEventListener('mouseup', mouseUpHandler);
        };
    }, []);

    return (
        <>
            <div onMouseDown={mouseDownHandler} id="topLeft" className={localClasses.topLeft}></div>
            <div onMouseDown={mouseDownHandler} id="top" className={localClasses.top}></div>
            <div onMouseDown={mouseDownHandler} id="topRight" className={localClasses.topRight}></div>
            <div onMouseDown={mouseDownHandler} id="right" className={localClasses.right}></div>
            <div onMouseDown={mouseDownHandler} id="bottomLeft" className={localClasses.bottomLeft}></div>
            <div onMouseDown={mouseDownHandler} id="bottom" className={localClasses.bottom}></div>
            <div onMouseDown={mouseDownHandler} id="bottomRight" className={localClasses.bottomRight}></div>
            <div onMouseDown={mouseDownHandler} id="left" className={localClasses.left}></div>
        </>
    );
};