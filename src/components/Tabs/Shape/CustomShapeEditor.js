import {nanoid} from 'nanoid';
import React, {useEffect, useRef} from 'react';
import {drawCustomShape} from '../../../utils/drawingUtils';


export const CustomShapeEditor = ({settings, setSettings}) => {
    const canvasRef = useRef(null);

    const canvasSize = 250;

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = canvasSize;
        canvasRef.current.height = canvasSize;
        ctx.beginPath();
    }, []);
    useEffect(() => {
        drawCustomShape(
            canvasRef.current.getContext('2d'),
            [canvasSize / 2, canvasSize / 2],
            settings.shape.customShape,
            0,
            canvasSize,
        );
    }, [settings]);
    return (
        <div>
            <canvas id="shape-editor-canvas" ref={canvasRef}></canvas>
            {settings.shape.customShape.map(point => {
                console.log(point[1] * canvasSize);
                return <div
                    key={nanoid()}
                    className="settings-coords-flag"
                    style={
                        {
                            position: 'fixed',
                            backgroundColor: 'yellow',
                            width: '20px',
                            height: '20px',
                            left: `${point[0] * canvasSize}`,
                            top: `${point[1] * canvasSize}`,
                        }
                    }></div>;
            })}
        </div>
    );
};