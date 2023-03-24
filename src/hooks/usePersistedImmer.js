import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {getItemFromStorage, setItemToStorage} from '../utils';
import {useDebouncedValue} from './useDebouncedValue';


export const usePersistedImmer = (defaultValue, storageKey, getterFunction, debounceTime) => {
    const [state, setState] = useImmer(() => getterFunction(getItemFromStorage(storageKey)) || defaultValue);
    let debouncedState = useDebouncedValue(state, debounceTime);

    useEffect(() => {
        setItemToStorage(storageKey, debouncedState);
    }, [debouncedState, storageKey]);

    return [state, setState];
};