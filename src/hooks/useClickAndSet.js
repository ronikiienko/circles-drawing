import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useClickAndSet = ({setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-x', event.pageX);
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-y', event.pageY);
            });
            setClickAndSetProperty(null);
        };

        const dragHandler = (event) => {
            if (!dragProperty) return;

            event.stopPropagation();

            let pageX;
            let pageY;
            if (event.type === 'touchmove') {
                pageX = event.targetTouches[0].pageX;
                pageY = event.targetTouches[0].pageY;
            } else {
                pageX = event.pageX;
                pageY = event.pageY;
            }

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-x', Math.trunc(pageX));
                setObjectPropertyByStringPath(draft, dragProperty + '-y', Math.trunc(pageY));
            });
        };
        // TODO standartize coordinates. [x, y] or {x, y} or x: suzuki, y: suzuki
        const endHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };

        if (clickAndSetProperty) {
            window.addEventListener('click', clickAndSetHandler);
        }
        if (dragProperty) {
            window.addEventListener('mousemove', dragHandler);
            window.addEventListener('touchmove', dragHandler);
            window.addEventListener('mouseup', endHandler);
            window.addEventListener('touchend', endHandler);
        }
        return () => {
            window.removeEventListener('mousemove', dragHandler);
            window.removeEventListener('touchmove', dragHandler);
            window.removeEventListener('mouseup', endHandler);
            window.removeEventListener('touchend', endHandler);
            window.removeEventListener('click', clickAndSetHandler);
        };
    }, [setClickAndSetProperty, clickAndSetProperty, setSettings, dragProperty, setDragProperty]);
    const setClickAndSetProp = (event) => {
        event.stopPropagation();
        setClickAndSetProperty(event.target.id);
    };

    const setDragProp = (event) => {
        event.stopPropagation();
        setDragProperty(event.target.id);
    };
    return {setClickAndSetProp, setDragProp};
};