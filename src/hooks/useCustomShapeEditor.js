import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useCustomShapeEditor = ({canvasRef, setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const pageXYToShapeXY = (pageX, pageY) => {
            const boundingClientRect = canvas.getBoundingClientRect();
            let shapeX;
            switch (true) {
                case pageX < boundingClientRect.left:
                    shapeX = 0;
                    break;
                case pageX > boundingClientRect.right:
                    shapeX = 1;
                    break;
                default:
                    shapeX = (pageX - boundingClientRect.left) / canvas.width;
            }
            let shapeY;
            switch (true) {
                case pageY < boundingClientRect.top:
                    shapeY = 0;
                    break;
                case pageY > boundingClientRect.bottom:
                    shapeY = 1;
                    break;
                default:
                    shapeY = (pageY - boundingClientRect.top) / canvas.height;
            }
            return [shapeX, shapeY];
        }

        const dragHandler = (event) => {
            if (!dragProperty) return;

            let pageX;
            let pageY;
            if (event.type === 'touchmove') {
                pageX = event.targetTouches[0].pageX;
                pageY = event.targetTouches[0].pageY;
            } else {
                pageX = event.pageX;
                pageY = event.pageY;
            }

            const [shapeX, shapeY] = pageXYToShapeXY(pageX, pageY);

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

            const pageX = event.pageX;
            const pageY = event.pageY;

            const [shapeX, shapeY] = pageXYToShapeXY(pageX, pageY);

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
        return () => {
            window.removeEventListener('touchmove', dragHandler);
            window.removeEventListener('mousemove', dragHandler);
            window.removeEventListener('mouseup', endHandler);
            window.removeEventListener('touchend', endHandler);
            window.removeEventListener('click', clickAndSetHandler);
        };
    }, [clickAndSetProperty, setSettings, dragProperty, canvasRef, setDragProperty, setClickAndSetProperty]);

    const setDragProp = (event) => {
        event.stopPropagation();
        setDragProperty(event.target.id);
    };

    const setClickAndSetProp = (event) => {
        event.stopPropagation();
        setClickAndSetProperty(event.target.id);
    };

    return {setDragProp, setClickAndSetProp};
};