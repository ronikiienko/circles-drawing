import {useCallback, useEffect} from 'react';
import {useImmer} from 'use-immer';
import {setObjectPropertyByStringPath} from '../utils/generalUtils';


export const useClickAndSet = ({setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);

    useEffect(() => {
        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-x', event.clientX);
                setObjectPropertyByStringPath(draft, clickAndSetProperty + '-y', event.clientY);
            });
            setClickAndSetProperty(null);
        };

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

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + '-x', Math.trunc(clientX));
                setObjectPropertyByStringPath(draft, dragProperty + '-y', Math.trunc(clientY));
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
    const setClickAndSetProp = useCallback((event) => {
        event.stopPropagation();
        setClickAndSetProperty(event.target.id);
    }, [setClickAndSetProperty]);

    const setDragProp = useCallback((event) => {
        event.stopPropagation();
        setDragProperty(event.target.id);
    }, [setDragProperty]);
    return {setClickAndSetProp, setDragProp};
};