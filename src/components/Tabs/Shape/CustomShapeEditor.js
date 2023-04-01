import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {useEffect, useRef} from 'react';
import {useCustomShapeEditor} from '../../../hooks/useCustomShapeEditor';
import {drawCustomShape} from '../../../utils/drawingUtils';
import {CoordinateFlag} from '../../Utils/CoordinateFlag';


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
        ctxRef.current.fillStyle = 'violet';
    }, []);
    useEffect(() => {
        ctxRef.current.clearRect(0, 0, 1000, 1000);
        ctxRef.current.beginPath();
        drawCustomShape(
            ctxRef.current,
            [canvasSize / 2, canvasSize / 2],
            settings.shape.customShape,
            0,
            canvasSize,
        );
    }, [settings.shape.customShape]);

    return (
        <>
            <div className={localClasses.canvasContainer}>
                <canvas className={localClasses.canvas} id="shape-editor-canvas" ref={canvasRef}></canvas>
                {settings.shape.customShape.map((point, index) => {
                    return <CoordinateFlag
                        key={index}
                        id={`shape-customShape-${index}`}
                        onMouseDown={setDragProp}
                        size={10}
                        color="red"
                        x={point[0] * canvasSize}
                        y={point[1] * canvasSize}
                        style={{position: 'absolute'}}
                    />;
                })}
            </div>
        </>

    );
};