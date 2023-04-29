import {Button, Input, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {ArrowDown16Filled, ArrowUp16Filled, Delete16Regular} from '@fluentui/react-icons';
import React, {memo, useEffect, useRef} from 'react';
import {getCustomShapePoint, shapeEditorCanvasSize, shapeEditorFlagsSize} from '../../../consts/consts';
import {useCustomShapeEditor} from '../../../hooks/useCustomShapeEditor';
import {drawCustomShape} from '../../../utils/drawingUtils';
import {hslArrToHsl, swapArrElements} from '../../../utils/generalUtils';
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

const areEqual = (prevProps, nextProps) => {
    let areEqual = prevProps.settings.shape.customShape === nextProps.settings.shape.customShape;
    if (areEqual) {
        for (const key of Object.keys(prevProps)) {
            if (key !== 'settings' && prevProps[key] !== nextProps[key]) {
                areEqual = false;
                break;
            }
        }
    }

    return areEqual;
};

export const CustomShapeEditor = memo(({settings, setSettings, classes, handleChange}) => {
    console.log('hello');
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const {setDragProp, setClickAndSetProp} = useCustomShapeEditor({setSettings, canvasRef});

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
        drawCustomShape(
            ctxRef.current,
            [shapeEditorCanvasSize / 2, shapeEditorCanvasSize / 2],
            settings.shape.customShape,
            0,
            shapeEditorCanvasSize,
        );
        settings.shape.strokeOn && ctxRef.current.stroke();
        settings.shape.fillOn && ctxRef.current.fill();
    }, [settings.shape.customShape, settings.shape.fillOn, settings.shape.strokeOn]);

    const addPoint = () => {
        setSettings(draft => {
            draft.shape.customShape.push(getCustomShapePoint());
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
                            key={point.id}
                            id={`shape-customShape-${index}`}
                            onMouseDown={setDragProp}
                            onDoubleClick={() => removePoint(index)}
                            size={shapeEditorFlagsSize}
                            color={hslArrToHsl(point.color, 0.7)}
                            x={point.x * shapeEditorCanvasSize}
                            y={point.y * shapeEditorCanvasSize}
                            style={{position: 'absolute'}}
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
                    key={point.id}
                    style={{backgroundColor: hslArrToHsl(point.color, 0.5)}}
                >
                    <span
                        className={localClasses.pointElementIndex}
                    >
                        {index}
                    </span>
                    <span className={localClasses.pointElementId}>
                        {point.id.substring(point.id.length - 5)}
                    </span>
                    <Input
                        id={`shape-customShape-${index}-x`}
                        value={point.x}
                        onChange={handleChange}
                        className={classes.number}
                        size="small"
                    />
                    <Input
                        id={`shape-customShape-${index}-y`}
                        value={point.y}
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
}, areEqual);