import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {nanoid} from 'nanoid';
import React, {useEffect, useRef} from 'react';
import {drawCustomShape} from '../../../utils/drawingUtils';
import {CoordinateFlag} from '../../Utils/coordinateFlag';


const canvasSize = 250;


const useStyles = makeStyles({
    canvas: {
        ...shorthands.borderWidth('1px'),
        ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
        ...shorthands.borderStyle('solid'),
    },
    canvasContainer: {
        width: '250px',
        height: '250px',
        position: 'relative',
    },
});
export const CustomShapeEditor = ({settings, setSettings}) => {
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = canvasSize;
        canvasRef.current.height = canvasSize;
        ctxRef.current.beginPath();
        ctxRef.current.fillStyle = 'violet';
    }, []);
    useEffect(() => {
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
                return <CoordinateFlag
                    id={`shape-customShape-${index}`}
                    size={15}
                    key={nanoid()}
                    x={point[0] * canvasSize}
                    y={point[1] * canvasSize}
                    color="yellow"
                />;
            })}
        </div>
    );
};