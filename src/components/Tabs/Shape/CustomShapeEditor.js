import {Button, Input, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {ArrowDown16Filled, ArrowUp16Filled, Delete16Regular} from '@fluentui/react-icons';
import {nanoid} from 'nanoid';
import React, {useEffect, useRef} from 'react';
import {shapeEditorCanvasSize, shapeEditorFlagsSize} from '../../../consts/consts';
import {useCustomShapeEditor} from '../../../hooks/useCustomShapeEditor';
import {drawCustomShape} from '../../../utils/drawingUtils';
import {getRandomHsl, swapArrElements} from '../../../utils/generalUtils';
import {CoordinateFlag} from '../../Utils/CoordinateFlag';


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
        ...shorthands.padding(`${shapeEditorFlagsSize / 1.5}px`),
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

export const CustomShapeEditor = ({settings, setSettings, classes, handleChange}) => {
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const {setDragProp, setClickAndSetProp} = useCustomShapeEditor({setSettings, canvasRef});

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = shapeEditorCanvasSize;
        canvasRef.current.height = shapeEditorCanvasSize;
        ctxRef.current.fillStyle = 'violet';
    }, []);
    useEffect(() => {
        ctxRef.current.clearRect(0, 0, shapeEditorCanvasSize, shapeEditorCanvasSize);
        ctxRef.current.beginPath();
        drawCustomShape(
            ctxRef.current,
            [shapeEditorCanvasSize / 2, shapeEditorCanvasSize / 2],
            settings.shape.customShape,
            0,
            shapeEditorCanvasSize,
        );
    }, [settings.shape.customShape]);

    const addPoint = () => {
        setSettings(draft => {
            draft.shape.customShape.push([0.4, 0.4, nanoid(8), getRandomHsl()]);
        });
    };

    const removePoint = (index) => {
        setSettings(draft => {
            draft.shape.customShape.splice(index, 1);
        });
    };

    const swapPointUp = (index) => {
        setSettings(draft => {
            swapArrElements(draft.shape.customShape, index, index - 1);
        });
    };

    const swapPointDown = (index) => {
        setSettings(draft => {
            swapArrElements(draft.shape.customShape, index, index + 1);
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
                            size={shapeEditorFlagsSize}
                            color={point[3]}
                            x={point[0] * shapeEditorCanvasSize}
                            y={point[1] * shapeEditorCanvasSize}
                            style={{position: 'absolute', opacity: 0.7}}
                            dot={false}
                            text={index}
                        />;
                    })}
                </div>
            </div>
            <Button onClick={addPoint}>Add point</Button>
            {settings.shape.customShape.map((point, index) => {
                return <span
                    className={localClasses.pointElement}
                    key={point[2]}
                    style={{backgroundColor: point[3]}}
                >
                    <span
                        className={localClasses.pointElementIndex}
                    >
                        {index}
                    </span>
                    <span className={localClasses.pointElementId}>
                        {point[2].substring(point[2].length - 5)}
                    </span>
                    <Input
                        id={`shape-customShape-${index}-0`}
                        value={point[0]}
                        onChange={handleChange}
                        className={classes.number}
                        size="small"
                    />
                    <Input
                        id={`shape-customShape-${index}-1`}
                        value={point[1]}
                        onChange={handleChange}
                        className={classes.number}
                        size="small"
                    />
                    <Button onClick={() => removePoint(index)} className={classes.buttonInline} size="small"
                            icon={<Delete16Regular/>}></Button>
                    <Button id={`shape-customShape-${index}`} onClick={setClickAndSetProp}
                            className={classes.buttonInline} size="small">Click and set</Button>
                    <Button onClick={() => swapPointUp(index)} className={classes.buttonInline} size="small"
                            icon={<ArrowUp16Filled/>}></Button>
                    <Button onClick={() => swapPointDown(index)} className={classes.buttonInline} size="small"
                            icon={<ArrowDown16Filled/>}></Button>
                </span>;
            })}
        </>
    );
};