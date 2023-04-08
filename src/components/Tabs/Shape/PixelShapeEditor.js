import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef} from 'react';
import {shapeEditorCanvasSize} from '../../../consts/consts';
import {usePixelShapeEditor} from '../../../hooks/usePixelShapeEditor';
import {drawPixelShape} from '../../../utils/drawingUtils';


const useStyles = makeStyles({
    canvas: {
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
    },
    canvasContainer: {
        width: `${shapeEditorCanvasSize}px`,
        height: `${shapeEditorCanvasSize}px`,
        position: 'relative',
    },
    superContainer: {
        width: 'fit-content',
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke1),
    },
    pointElement: {
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content',
        ...shorthands.padding('5px'),
    },
    pointElementIndex: {
        marginRight: '5px',
        width: '20px',
    },
    pointElementId: {
        width: '50px',
    },
});


export const PixelShapeEditor = ({settings, setSettings, classes, handleChange}) => {
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    usePixelShapeEditor({canvasRef, setSettings, settings});

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = shapeEditorCanvasSize;
        canvasRef.current.height = shapeEditorCanvasSize;
        ctxRef.current.fillStyle = 'violet';
        ctxRef.current.strokeStyle = 'violet';
    }, []);

    useEffect(() => {
        ctxRef.current.clearRect(0, 0, shapeEditorCanvasSize, shapeEditorCanvasSize);
        ctxRef.current.beginPath();
        drawPixelShape(ctxRef.current, settings.shape.pixelShape, shapeEditorCanvasSize, [shapeEditorCanvasSize / 2, shapeEditorCanvasSize / 2]);
        settings.shape.strokeOn && ctxRef.current.stroke();
        settings.shape.fillOn && ctxRef.current.fill();
    }, [settings.shape.customShape, settings.shape.fillOn, settings.shape.pixelShape, settings.shape.strokeOn]);

    return (
        <>
            <div className={localClasses.superContainer}>
                <div className={localClasses.canvasContainer}>
                    <canvas className={localClasses.canvas} id="shape-editor-canvas" ref={canvasRef}></canvas>
                </div>
            </div>
        </>
    );
};