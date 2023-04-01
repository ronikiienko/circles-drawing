import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useCustomShapeEditor = ({canvasRef, setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const mousemoveHandler = (event) => {
            console.log(event);
            const boundingClientRect = canvas.getBoundingClientRect();
            const eventX = event.pageX;
            const eventY = event.pageY;
            let shapeX;
            switch (true) {
                case eventX < boundingClientRect.left:
                    shapeX = 0;
                    break;
                case eventX > boundingClientRect.right:
                    shapeX = 1;
                    break;
                default:
                    shapeX = (event.pageX - boundingClientRect.left) / canvas.width;
            }
            let shapeY;
            switch (true) {
                case eventY < boundingClientRect.top:
                    shapeY = 0;
                    break;
                case eventY > boundingClientRect.bottom:
                    shapeY = 1;
                    break;
                default:
                    shapeY = (event.pageY - boundingClientRect.top) / canvas.height;
            }

            if (!dragProperty) return;
            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-0', shapeX);
                setObjectPropertyByStringPath(draft, dragProperty + '-1', shapeY);
            });
        };

        const mouseUpHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };

        if (dragProperty) {
            window.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('mouseup', mouseUpHandler);
        }
        return () => {
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [setClickAndSetProperty, clickAndSetProperty, setSettings, dragProperty, setDragProperty, canvasRef]);

    const setDragProp = (event) => {
        event.stopPropagation();
        setDragProperty(event.target.id);
    };
    return {setDragProp};
};