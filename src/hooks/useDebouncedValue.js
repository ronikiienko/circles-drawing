import {useEffect, useState} from 'react';


export const useDebouncedValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

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