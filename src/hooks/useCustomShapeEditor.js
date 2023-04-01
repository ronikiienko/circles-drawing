import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useCustomShapeEditor = ({canvasRef, setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const mousemoveHandler = (event) => {
            const boundingClientRect = canvas.getBoundingClientRect();
            const eventX = event.pageX;
            const eventY = event.pageY;
            if (eventX < boundingClientRect.left || eventX > boundingClientRect.right || eventY < boundingClientRect.top || eventY > boundingClientRect.bottom) return;
            console.log('boun', boundingClientRect);
            if (!dragProperty) return;
            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-0', (event.pageX - boundingClientRect.left) / canvas.width);
                setObjectPropertyByStringPath(draft, dragProperty + '-1', (event.pageY - boundingClientRect.top) / canvas.height);
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