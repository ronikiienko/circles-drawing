import {useEffect} from 'react';
import {useImmer} from 'use-immer';


export const useDebouncedValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useImmer(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, setDebouncedValue]);

    return debouncedValue;
};

// export const useDebounceWithCallback = (value, callback, delay) => {
//     const handler = useRef(callback);
//
//     useEffect(() => {
//         handler.current = callback;
//     }, [callback]);
//
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             handler.current();
//         }, delay);
//
//         return () => clearTimeout(handler);
//     }, [value, delay]);
// }