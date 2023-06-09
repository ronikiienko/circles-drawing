import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {getItemFromStorage, setItemToStorage} from '../utils/generalUtils';
import {useDebouncedValue} from './useDebouncedValue';


export const useDebouncedPersistedImmer = (defaultValue, storageKey, debounceTime, getterFunction) => {
    const [state, setState] = useImmer(() => {
        let storageValue = getItemFromStorage(storageKey);
        if (storageValue && getterFunction) storageValue = getterFunction(storageValue);
        return storageValue || defaultValue;
    });

    let debouncedState = useDebouncedValue(state, debounceTime);

    useEffect(() => {
        setItemToStorage(storageKey, debouncedState);
    }, [debouncedState, storageKey]);

    return [state, setState];
};