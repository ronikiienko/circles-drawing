import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef} from 'react';
import {getRemapLevel} from '../../../consts/consts';


const useStyles = makeStyles({
    canvasWrapper: {
        ...shorthands.padding('3px'),
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke1),
        display: 'flex',
    },
    canvas: {
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
    },
});
export const Remap = ({mod, classes, settings, setSettings, handleChange, modIndex}) => {
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
        for (let i = 0; i < mod.settings.remapLevels.length; i++) {
            const x = i / (mod.settings.remapLevels.length - 1) * canvasWidth;
            const y = canvasHeight - mod.settings.remapLevels[i].y * canvasHeight;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }, [mod.settings.remapLevels, mod.settings.remapLevels.length]);
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
                let i = Math.trunc(draft.mods[modIndex].settings.remapLevels.length * canvasXOffset / canvasWidth);
                i = Math.max(0, Math.min(i, draft.mods[modIndex].settings.remapLevels.length - 1));
                let newVal = 1 - canvasYOffset / canvasHeight;
                newVal = Math.max(0, Math.min(newVal, 1));
                draft.mods[modIndex].settings.remapLevels[i] = getRemapLevel(newVal);
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
    }, [modIndex, setSettings]);
    return (
        <>
            <div className={localClasses.canvasWrapper}>
                <canvas className={localClasses.canvas} ref={canvasRef} width={120} height={70}>

                </canvas>
            </div>
        </>
    );
};