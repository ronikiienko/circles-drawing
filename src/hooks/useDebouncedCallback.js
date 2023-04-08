import {useEffect, useMemo, useRef} from 'react';
import {debounce} from '../utils/generalUtils';


export const useDebouncedCallback = (callback, timeout) => {
    const callbackRef = useRef(callback);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            callbackRef.current?.();
        };

        return debounce(func, timeout);
    }, [timeout]);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return debouncedCallback;
};