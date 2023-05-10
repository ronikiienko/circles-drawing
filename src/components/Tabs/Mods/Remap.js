import React, {useEffect, useRef} from 'react';
import {getRemapLevel} from '../../../consts/consts';


export const Remap = ({mod, classes, settings, setSettings, handleChange, modIndex}) => {
    const canvasRef = useRef(null);
    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     const ctx = canvas.getContext('2d')
    //     const resolutionMult = window.devicePixelRatio
    //
    //     canvas.style.width = canvas.width.toString() + 'px'
    //     canvas.style.height = canvas.height.toString() + 'px'
    //
    //     canvas.width = canvas.width * resolutionMult;
    //     canvas.height = canvas.height * resolutionMult;
    //
    //     ctx.scale(resolutionMult, resolutionMult);
    // }, [])
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.strokeStyle = 'violet';
        ctx.strokeWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < mod.settings.remapLevels.length; i++) {
            const x = i / mod.settings.remapLevels.length * canvasWidth;
            const y = canvasHeight - mod.settings.remapLevels[i].y * canvasHeight;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }, [mod.settings.remapLevels, mod.settings.remapLevels.length]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const mousedownHandler = (event) => {
            window.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
        };
        const mousemoveHandler = (event) => {
            setSettings(draft => {
                let i = Math.trunc(draft.mods[modIndex].settings.remapLevels.length * event.offsetX / canvasWidth);
                console.log('basi', i, event.offsetX, event.offsetX / canvasWidth);
                console.log('offx', event.offsetX);
                i = Math.min(i, draft.mods[modIndex].settings.remapLevels.length - 1);

                const newVal = Math.min(1 - event.offsetY / canvasHeight, 1);
                draft.mods[modIndex].settings.remapLevels[i] = getRemapLevel(newVal);
            });
        };
        const mouseupHandler = (event) => {
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
            <canvas ref={canvasRef} width={120} height={70}>

            </canvas>
        </>
    );
};