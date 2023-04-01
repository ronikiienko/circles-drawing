import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useCustomShapeEditor = ({canvasRef, setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
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
            return {shapeX, shapeY};
        }

        const canvas = canvasRef.current;
        const dragHandler = (event) => {
            if (!dragProperty) return;

            const pageX = event.pageX;
            const pageY = event.pageY;

            const {shapeX, shapeY} = pageXYToShapeXY(pageX, pageY);

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-0', parseFloat(shapeX.toFixed(2)));
                setObjectPropertyByStringPath(draft, dragProperty + '-1', parseFloat(shapeY.toFixed(2)));
            });
        };

        const mouseUpHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };

        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            const pageX = event.pageX;
            const pageY = event.pageY;

            const {shapeX, shapeY} = pageXYToShapeXY(pageX, pageY);

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-0', shapeX);
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-1', shapeY);
            });
            setClickAndSetProperty(null);
        };


        if (clickAndSetProperty) {
            window.addEventListener('click', clickAndSetHandler);
        }
        if (dragProperty) {
            window.addEventListener('mousemove', dragHandler);
            window.addEventListener('mouseup', mouseUpHandler);
        }
        return () => {
            window.removeEventListener('click', clickAndSetHandler);
            window.removeEventListener('mousemove', dragHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
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