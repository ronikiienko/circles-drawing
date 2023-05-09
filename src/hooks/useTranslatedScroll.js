import {useEffect} from 'react';


export const useTranslatedScroll = (ref, scrollMult = 1 / 4) => {
    useEffect(() => {
        const element = ref.current;
        const wheelHandler = (event) => {
            element.scrollBy(event.deltaY * scrollMult, 0);
        };
        element.addEventListener('wheel', wheelHandler);
        return () => {
            element.removeEventListener('wheel', wheelHandler);
        };
    }, [ref, scrollMult]);
};