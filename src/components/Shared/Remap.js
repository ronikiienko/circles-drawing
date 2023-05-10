import {makeStyles, shorthands, Text, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef} from 'react';
import {getRemapLevel} from '../../consts/consts';
import {setObjectPropertyByStringPath} from '../../utils/generalUtils';


const useStyles = makeStyles({
    canvasWrapper: {
        // ...shorthands.padding('3px'),
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke1),
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...shorthands.borderRadius('5px'),
        ...shorthands.overflow('hidden', 'hidden'),
        width: 'fit-content',
        height: 'fit-content',
    },
    canvas: {
        position: 'relative',
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
    },
    labelInputs: {
        position: 'absolute',
        bottom: '0px',
        fontSize: '8px',
        opacity: 0.3,
        left: '0px',
        right: '0px',
        textAlign: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        height: '16px',
    },
    labelOutputs: {
        width: '16px',
        fontSize: '8px',
        opacity: 0.3,
        position: 'absolute',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        textAlign: 'center',
        top: '0px',
        bottom: '0px',
        left: '0px',
        userSelect: 'none',
        pointerEvents: 'none',
    },
});
export const Remap = ({setSettings, id, value}) => {
    const localClasses = useStyles();
    const canvasRef = useRef(null);
    const canvasSizeRef = useRef({width: null, height: null});
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resolutionMult = window.devicePixelRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvasSizeRef.current = {
            width: canvas.width,
            height: canvas.height,
        };

        canvas.width = canvas.width * resolutionMult;
        canvas.height = canvas.height * resolutionMult;

        ctx.scale(resolutionMult, resolutionMult);

        ctx.strokeStyle = 'violet';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
    }, []);
    useEffect(() => {
        const canvasWidth = canvasSizeRef.current.width;
        const canvasHeight = canvasSizeRef.current.height;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.beginPath();
        for (let i = 0; i < value.length; i++) {
            const x = i / (value.length - 1) * canvasWidth;
            const y = canvasHeight - value[i].y * canvasHeight;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }, [value]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWidth = canvasSizeRef.current.width;
        const canvasHeight = canvasSizeRef.current.height;
        const mousedownHandler = () => {
            window.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
        };
        const mousemoveHandler = (event) => {
            event.stopPropagation();
            event.preventDefault();
            const boundingClientRect = canvas.getBoundingClientRect();
            const canvasXOffset = event.clientX - boundingClientRect.left;
            const canvasYOffset = event.clientY - boundingClientRect.top;
            setSettings(draft => {
                let i = Math.trunc(value.length * canvasXOffset / canvasWidth);
                i = Math.max(0, Math.min(i, value.length - 1));
                let newVal = 1 - canvasYOffset / canvasHeight;
                newVal = Math.max(0, Math.min(newVal, 1));
                setObjectPropertyByStringPath(draft, id + `-${i}`, getRemapLevel(newVal));
            });
        };
        const mouseupHandler = () => {
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
        };
        canvas.addEventListener('mousedown', mousedownHandler);

        return () => {
            canvas.removeEventListener('mousedown', mousedownHandler);
        };
    }, [id, setSettings, value.length]);
    return (
        <>
            <div className={localClasses.canvasWrapper}>
                <canvas className={localClasses.canvas} ref={canvasRef} width={100} height={100}>
                </canvas>
                <Text className={localClasses.labelOutputs}>outputs</Text>
                <Text className={localClasses.labelInputs}>inputs</Text>
            </div>
        </>
    );
};