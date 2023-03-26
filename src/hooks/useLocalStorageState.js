import {useCallback, useEffect, useMemo, useRef, useSyncExternalStore} from 'react';
import {parseJSON, setItemToStorage} from '../utils';


const callbacks = new Set();
const inMemoryData = new Map();

const triggerCallbacks = (key) => {
    for (const callback of [...callbacks]) {
        callback(key);
    }
};

export const useLocalStorageState = (key, defaultValue, options) => {
    const parse = options?.parse || parseJSON;
    const stringify = options?.stringify || JSON.stringify;

    if (localStorage.getItem(key) === null && !inMemoryData.has(key) && defaultValue !== undefined) {
        localStorage.setItem(key, stringify(defaultValue));
    }

    const storageValue = useRef({
        item: null,
        parsed: defaultValue,
    });

    const subscriber = useCallback((onStoreChange) => {
        const onChange = (localKey) => {
            if (key === localKey) {
                onStoreChange();
            }
        };
        callbacks.add(onChange);

        return () => callbacks.delete(onChange);
    }, [key]);

    const getter = () => {
        // TODO called 3 times
        const item = localStorage.getItem(key);

        if (inMemoryData.has(key)) {
            storageValue.current = {
                item,
                parsed: inMemoryData.get(key),
            };
        } else if (item !== storageValue.current.item) {
            let parsed;
            try {
                parsed = item === null ? defaultValue : parse(item);
            } catch {
                parsed = defaultValue;
            }
            storageValue.current = {
                item: item,
                parsed: parsed,
            };
        }

        return storageValue.current.parsed;
    };

    const value = useSyncExternalStore(subscriber, getter);

    const setState = useCallback((newValue) => {
        // TODO review if i can mutate prevValue when calling setState(prev => ...)
        const newCalculatedValue = newValue instanceof Function ? newValue(storageValue.current.parsed) : newValue;

        try {
            setItemToStorage(key, newCalculatedValue);

            inMemoryData.delete(key);
        } catch {
            inMemoryData.set(key, newCalculatedValue);
        }

        triggerCallbacks(key);
    }, [key]);

    useEffect(() => {
        const onStorage = (event) => {
            if (event.storageArea === localStorage && event.key === key) {
                triggerCallbacks(key);
            }
        };
        window.addEventListener('storage', onStorage);
    }, [key]);


    return useMemo(() => [
        value,
        setState,
        {
            removeItem() {
                inMemoryData.delete(key);
                localStorage.removeItem(key);

                triggerCallbacks(key);
            },
        },
    ], [key, setState, value]);
};