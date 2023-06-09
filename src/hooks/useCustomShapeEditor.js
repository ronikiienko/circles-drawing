import {useCallback, useEffect} from 'react';
import {useImmer} from 'use-immer';
import {getCustomShapePoint} from '../consts/consts';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useCustomShapeEditor = ({canvasRef, setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const clientXYToShapeXY = (clientX, clientY) => {
            const boundingClientRect = canvas.getBoundingClientRect();
            let shapeX;
            switch (true) {
                case clientX < boundingClientRect.left:
                    shapeX = 0;
                    break;
                case clientX > boundingClientRect.right:
                    shapeX = 1;
                    break;
                default:
                    shapeX = (clientX - boundingClientRect.left) / canvas.width;
            }
            let shapeY;
            switch (true) {
                case clientY < boundingClientRect.top:
                    shapeY = 0;
                    break;
                case clientY > boundingClientRect.bottom:
                    shapeY = 1;
                    break;
                default:
                    shapeY = (clientY - boundingClientRect.top) / canvas.height;
            }
            return [shapeX, shapeY];
        }

        const dragHandler = (event) => {
            if (!dragProperty) return;

            event.stopPropagation();

            let clientX;
            let clientY;
            if (event.type === 'touchmove') {
                clientX = event.targetTouches[0].clientX;
                clientY = event.targetTouches[0].clientY;
            } else {
                clientX = event.clientX;
                clientY = event.clientY;
            }

            const [shapeX, shapeY] = clientXYToShapeXY(clientX, clientY);

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-x', parseFloat(shapeX.toFixed(2)));
                setObjectPropertyByStringPath(draft, dragProperty + '-y', parseFloat(shapeY.toFixed(2)));
            });
        };

        const endHandler = () => {
            setDragProperty(null);
        };

        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            const clientX = event.clientX;
            const clientY = event.clientY;

            const [shapeX, shapeY] = clientXYToShapeXY(clientX, clientY);

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-x', shapeX);
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-y', shapeY);
            });
            setClickAndSetProperty(null);
        };


        if (clickAndSetProperty) {
            window.addEventListener('click', clickAndSetHandler);
        }
        if (dragProperty) {
            window.addEventListener('touchmove', dragHandler);
            window.addEventListener('mousemove', dragHandler);
            window.addEventListener('mouseup', endHandler);
            window.addEventListener('touchend', endHandler);
        }

        const canvasMousedownHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const [shapeX, shapeY] = clientXYToShapeXY(event.clientX, event.clientY);
            setSettings(draft => {
                draft.shape.customShape.push(getCustomShapePoint(shapeX, shapeY));
                setDragProperty(`shape-customShape-${draft.shape.customShape.length - 1}`);
            });
        };

        canvas.addEventListener('mousedown', canvasMousedownHandler);
        return () => {
            window.removeEventListener('touchmove', dragHandler);
            window.removeEventListener('mousemove', dragHandler);
            window.removeEventListener('mouseup', endHandler);
            window.removeEventListener('touchend', endHandler);
            window.removeEventListener('click', clickAndSetHandler);
            canvas.removeEventListener('mousedown', canvasMousedownHandler);
        };
    }, [clickAndSetProperty, setSettings, dragProperty, canvasRef, setDragProperty, setClickAndSetProperty]);
    const setDragProp = useCallback((event) => {
        event.stopPropagation();
        setDragProperty(event.target.id);
    }, [setDragProperty]);
    const setClickAndSetProp = useCallback((event) => {
        event.stopPropagation();
        setClickAndSetProperty(event.target.id);
    }, [setClickAndSetProperty]);

    return {setDragProp, setClickAndSetProp};
};