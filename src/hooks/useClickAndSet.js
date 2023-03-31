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
                setObjectPropertyByStringPath(draft, clickAndSetProperty + 'X', event.pageX);
                setObjectPropertyByStringPath(draft, clickAndSetProperty + 'Y', event.pageY);
            });
            setClickAndSetProperty(null);
        };

        const mousemoveHandler = (event) => {
            if (!dragProperty) return;
            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + 'X', event.pageX);
                setObjectPropertyByStringPath(draft, dragProperty + 'Y', event.pageY);
            });
        };
        // TODO make useClick and set more universal
        const touchmoveHandler = (event) => {
            if (!dragProperty) return;

            setSettings(draft => {
                setObjectPropertyByStringPath(draft, dragProperty + 'X', Math.trunc(event.targetTouches[0].pageX));
                setObjectPropertyByStringPath(draft, dragProperty + 'Y', Math.trunc(event.targetTouches[0].pageY));
            });
        };

        const mouseUpHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };

        if (clickAndSetProperty) {
            window.addEventListener('click', clickAndSetHandler);
        }
        if (dragProperty) {
            window.addEventListener('mousemove', mousemoveHandler);
            window.addEventListener('touchmove', touchmoveHandler);
            window.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('touchend', mouseUpHandler);
        }
        return () => {
            window.removeEventListener('click', clickAndSetHandler);
            window.removeEventListener('mousemove', mousemoveHandler);
            window.removeEventListener('touchmove', touchmoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            window.removeEventListener('touchend', mouseUpHandler);
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