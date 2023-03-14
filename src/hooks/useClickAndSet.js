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

        const dragHandler = (event) => {
            if (!dragProperty) return;

            setSettings(draft => {
                draft[dragProperty[0]][`${dragProperty[1]}X`] = event.pageX;
                draft[dragProperty[0]][`${dragProperty[1]}Y`] = event.pageY;
            });
        };

        const mouseUpHandler = () => {
            if (!dragProperty) return;
            setDragProperty(null);
        };
        window.addEventListener('click', clickAndSetHandler);
        window.addEventListener('mousemove', dragHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        return () => {
            window.removeEventListener('click', clickAndSetHandler);
            window.removeEventListener('mousemove', dragHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
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
        console.log('setting drag prop:', category, '?', subcategory1);
        setDragProperty([category, subcategory1]);
    };
    return {setClickAndSetProp, setDragProp};
};