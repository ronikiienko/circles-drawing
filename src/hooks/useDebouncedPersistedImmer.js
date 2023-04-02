import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {getItemFromStorage, setItemToStorage} from '../utils/generalUtils';
import {useDebouncedValue} from './useDebouncedValue';


export const useDebouncedPersistedImmer = (defaultValue, storageKey, debounceTime, getterFunction) => {
    const [state, setState] = useImmer(() => {
        const storageValue = getterFunction ? getterFunction(getItemFromStorage(storageKey)) : getItemFromStorage(storageKey);
        return storageValue || defaultValue;
    });

    let debouncedState = useDebouncedValue(state, debounceTime);
    // TODO for some reason after settings to storage rerenders happen
    useEffect(() => {
        setItemToStorage(storageKey, debouncedState);
    }, [debouncedState, storageKey]);

    return [state, setState];
};