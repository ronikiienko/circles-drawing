import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {nanoid} from 'nanoid';
import React, {useEffect, useRef} from 'react';
import {useCustomShapeEditor} from '../../../hooks/useCustomShapeEditor';
import {drawCustomShape} from '../../../utils/drawingUtils';


const canvasSize = 250;


const useStyles = makeStyles({
    canvas: {
        ...shorthands.borderWidth('1px'),
        ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
        ...shorthands.borderStyle('solid'),
    },
    canvasContainer: {
        overflowX: 'hidden',
        width: '300px',
        height: '300px',
        position: 'relative',
    },
});

export const CustomShapeEditor = ({settings, setSettings}) => {
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const {setDragProp} = useCustomShapeEditor({setSettings, canvasRef});

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = canvasSize;
        canvasRef.current.height = canvasSize;
        ctxRef.current.beginPath();
        ctxRef.current.fillStyle = 'violet';
    }, []);
    useEffect(() => {
        ctxRef.current.clearRect(0, 0, 1000, 1000);
        drawCustomShape(
            ctxRef.current,
            [canvasSize / 2, canvasSize / 2],
            settings.shape.customShape,
            0,
            canvasSize,
        );
    }, [settings.shape.customShape]);
    return (
        <div className={localClasses.canvasContainer}>
            <canvas className={localClasses.canvas} id="shape-editor-canvas" ref={canvasRef}></canvas>
            {settings.shape.customShape.map((point, index) => {
                return <div
                    id={`shape-customShape-${index}`}
                    key={nanoid()}
                    style={{
                        backgroundColor: 'red',
                        position: 'absolute',
                        left: point[0] * canvasSize - 5,
                        top: point[1] * canvasSize - 5,
                        width: '10px',
                        height: '10px',
                        borderRadius: '10px',
                    }}
                    onMouseDown={setDragProp}
                ></div>;
            })}
        </div>
    );
};