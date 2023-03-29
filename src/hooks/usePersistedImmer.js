import {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {getItemFromStorage, setItemToStorage} from '../utils/generalUtils';


export const usePersistedImmer = (defaultValue, storageKey, getterFunction) => {
    const [state, setState] = useImmer(() => {
        const storageValue = getterFunction ? getterFunction(getItemFromStorage(storageKey)) : getItemFromStorage(storageKey);
        return storageValue || defaultValue;
    });

    useEffect(() => {
        setItemToStorage(storageKey, state);
    }, [state, storageKey]);

    return [state, setState];
};