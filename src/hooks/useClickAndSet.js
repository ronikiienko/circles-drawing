import {useEffect} from 'react';
import {useImmer} from 'use-immer';


export const useClickAndSet = ({setSettings}) => {
    const [clickAndSetProperty, setClickAndSetProperty] = useImmer(null);
    useEffect(() => {
        const clickAndSetHandler = (event) => {
            if (!clickAndSetProperty) return;

            setSettings(draft => {
                draft[clickAndSetProperty[0]][`${clickAndSetProperty[1]}X`] = event.pageX;
                draft[clickAndSetProperty[0]][`${clickAndSetProperty[1]}Y`] = event.pageY;
            });
            setClickAndSetProperty(null);
        };
        window.addEventListener('click', clickAndSetHandler);
        return () => window.removeEventListener('click', clickAndSetHandler);
    }, [setClickAndSetProperty, clickAndSetProperty, setSettings]);

    return (event) => {
        event.stopPropagation();
        const categoriesArray = event.target.id.split('-');
        const category = categoriesArray[0];
        const subcategory1 = categoriesArray[1];
        setClickAndSetProperty([category, subcategory1]);
    };
};