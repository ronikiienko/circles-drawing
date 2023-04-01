import {Button, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {nanoid} from 'nanoid';
import React, {useEffect, useRef} from 'react';
import {useCustomShapeEditor} from '../../../hooks/useCustomShapeEditor';
import {drawCustomShape} from '../../../utils/drawingUtils';
import {getColorByIndex} from '../../../utils/generalUtils';
import {CoordinateFlag} from '../../Utils/CoordinateFlag';


const shapeFlagsSize = 15;

const canvasSize = 250;


const useStyles = makeStyles({
    canvas: {},
    canvasContainer: {
        width: `${canvasSize}px`,
        height: `${canvasSize}px`,
        position: 'relative',
    },
    superContainer: {
        width: 'fit-content',
        ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke1),
        ...shorthands.padding(`${shapeFlagsSize / 1.5}px`),
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
        ctxRef.current.clearRect(0, 0, canvasSize, canvasSize);
        ctxRef.current.beginPath();
        drawCustomShape(
            ctxRef.current,
            [canvasSize / 2, canvasSize / 2],
            settings.shape.customShape,
            0,
            canvasSize,
        );
    }, [settings.shape.customShape]);

    const addPoint = () => {
        setSettings(draft => {
            draft.shape.customShape.push([0.4, 0.4, nanoid(8)]);
        });
    };

    return (
        <>
            <div className={localClasses.superContainer}>
                <div className={localClasses.canvasContainer}>
                    <canvas className={localClasses.canvas} id="shape-editor-canvas" ref={canvasRef}></canvas>
                    {settings.shape.customShape.map((point, index) => {
                        return <CoordinateFlag
                            key={point[2]}
                            id={`shape-customShape-${index}`}
                            onMouseDown={setDragProp}
                            size={shapeFlagsSize}
                            color={getColorByIndex(index)}
                            x={point[0] * canvasSize}
                            y={point[1] * canvasSize}
                            style={{position: 'absolute', opacity: 0.7}}
                            dot={false}
                            text={index}
                        />;
                    })}
                </div>
            </div>
            <Button onClick={addPoint}>Add point</Button>
        </>

    );
};