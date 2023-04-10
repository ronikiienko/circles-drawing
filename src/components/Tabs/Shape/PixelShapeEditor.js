import {Button, Input, Label, makeStyles, shorthands, Slider, tokens} from '@fluentui/react-components';
import {Delete16Regular, Eraser20Regular, PaintBrush20Regular} from '@fluentui/react-icons';
import React, {useCallback, useEffect, useRef} from 'react';
import {shapeEditorCanvasSize} from '../../../consts/consts';
import {pixelShapeBrushTypes} from '../../../consts/sharedConsts';
import {useDebouncedCallback} from '../../../hooks/useDebouncedCallback';
import {usePixelShapeEditor} from '../../../hooks/usePixelShapeEditor';
import {drawPixelShape} from '../../../utils/drawingUtils';
import {squareMatrixByRes} from '../../../utils/generalUtils';
import {getTranslatedPixelShapeBrushSize} from '../../../utils/translaters';


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
});


export const PixelShapeEditor = ({
                                     settings,
                                     setSettings,
                                     classes,
                                     handleChange,
                                     appSettings,
                                     handleAppSettingsChange,
                                 }) => {
    const localClasses = useStyles();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const pixelShapeReset = useCallback(() => {
        setSettings(draft => {
            draft.shape.pixelShape = squareMatrixByRes(parseInt(settings.shape.pixelShapeRes, 10), 0);
        });
    }, [setSettings, settings.shape.pixelShapeRes]);

    const debouncedPixelShapeReset = useDebouncedCallback(pixelShapeReset, 200);

    const handlePixelResChange = (event) => {
        handleChange(event);
        debouncedPixelShapeReset();
    };

    usePixelShapeEditor({canvasRef, setSettings, settings, appSettings});

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = shapeEditorCanvasSize;
        canvasRef.current.height = shapeEditorCanvasSize;
        ctxRef.current.fillStyle = 'purple';
        ctxRef.current.strokeStyle = 'purple';
    }, []);

    useEffect(() => {
        ctxRef.current.clearRect(0, 0, shapeEditorCanvasSize, shapeEditorCanvasSize);
        ctxRef.current.beginPath();
        drawPixelShape(ctxRef.current, settings.shape.pixelShape, shapeEditorCanvasSize, [shapeEditorCanvasSize / 2, shapeEditorCanvasSize / 2]);
        settings.shape.strokeOn && ctxRef.current.stroke();
        settings.shape.fillOn && ctxRef.current.fill();
    }, [settings.shape.fillOn, settings.shape.pixelShape, settings.shape.strokeOn]);

    return (
        <>
            <div className={localClasses.superContainer}>
                <div className={localClasses.canvasContainer}>
                    <canvas className={localClasses.canvas} id="shape-editor-canvas" ref={canvasRef}></canvas>
                </div>
            </div>
            <div className={classes.row}>
                <Button
                    appearance={appSettings.pixelShapeBrushType === pixelShapeBrushTypes.pencil ? 'primary' : 'undefined'}
                    value={pixelShapeBrushTypes.pencil}
                    id="pixelShapeBrushType"
                    className={classes.button}
                    icon={<PaintBrush20Regular onClick={() => handleAppSettingsChange({
                        target: {
                            id: 'pixelShapeBrushType',
                            value: pixelShapeBrushTypes.pencil,
                        },
                    })}/>}
                    onClick={handleAppSettingsChange}
                ></Button>
                <Button
                    appearance={appSettings.pixelShapeBrushType === pixelShapeBrushTypes.eraser ? 'primary' : 'undefined'}
                    value={pixelShapeBrushTypes.eraser}
                    id="pixelShapeBrushType"
                    className={classes.button}
                    icon={<Eraser20Regular onClick={() => handleAppSettingsChange({
                        target: {
                            id: 'pixelShapeBrushType',
                            value: pixelShapeBrushTypes.eraser,
                        },
                    })}/>}
                    onClick={handleAppSettingsChange}
                ></Button>
            </div>
            <Label className={classes.row}>
                Shape res:
                <Slider
                    id="shape-pixelShapeRes"
                    value={settings.shape.pixelShapeRes}
                    onChange={handlePixelResChange}
                    step={1}
                    min={2}
                    max={50}
                    className={classes.slider}
                    size="small"
                />
                <Input
                    className={classes.number}
                    id="shape-pixelShapeRes"
                    value={settings.shape.pixelShapeRes}
                    size="small"
                />
            </Label>

            <Label className={classes.row}>
                Brush size res:
                <Slider
                    id="pixelShapeBrushSize"
                    value={appSettings.pixelShapeBrushSize}
                    onChange={handleAppSettingsChange}
                    step={0.05}
                    min={0}
                    max={1}
                    className={classes.slider}
                    size="small"
                />
                <Input
                    className={classes.number}
                    id="shape-pixelShapeRes"
                    value={getTranslatedPixelShapeBrushSize(appSettings.pixelShapeBrushSize)}
                    size="small"
                />
            </Label>
            <Button
                className={classes.row}
                onClick={pixelShapeReset}
                icon={<Delete16Regular/>}
            >Clear</Button>
        </>
    );
};