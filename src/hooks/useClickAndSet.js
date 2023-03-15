import {useEffect} from 'react';
import {useImmer} from 'use-immer';


export const useClickAndSet = ({setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    const [dragProperty, setDragProperty] = useImmer(null);
    useEffect(() => {
        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            setSettings(draft => {
                draft[clickAndSetProperty[0]][`${clickAndSetProperty[1]}X`] = event.pageX;
                draft[clickAndSetProperty[0]][`${clickAndSetProperty[1]}Y`] = event.pageY;
            });
            setClickAndSetProperty(null);
        };

        const mousemoveHandler = (event) => {
            if (!dragProperty) return;

            setSettings(draft => {
                draft[dragProperty[0]][`${dragProperty[1]}X`] = event.pageX;
                draft[dragProperty[0]][`${dragProperty[1]}Y`] = event.pageY;
            });
        };

        const touchmoveHandler = (event) => {
            if (!dragProperty) return;

            setSettings(draft => {
                draft[dragProperty[0]][`${dragProperty[1]}X`] = event.targetTouches[0].pageX;
                draft[dragProperty[0]][`${dragProperty[1]}Y`] = event.targetTouches[0].pageY;
            });
        };

        const mouseUpHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };
        window.addEventListener('click', clickAndSetHandler);
        window.addEventListener('mousemove', mousemoveHandler);
        window.addEventListener('touchmove', touchmoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        window.addEventListener('touchend', mouseUpHandler);
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
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        setClickAndSetProperty([category, subcategory1]);
    };

    const setDragProp = (event) => {
        event.stopPropagation();
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        setDragProperty([category, subcategory1]);
    };
    return {setClickAndSetProp, setDragProp};
};