import {createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {getObjectPropertyByStringPath, setObjectPropertyByStringPath, typeofWithArray} from '../../utils/generalUtils';


export const AccordionContext = createContext(null);

export const Accordion = ({children, state, setState, statePath}) => {
    // TODO when removing items, they are still in array. clear it (filter)
    useEffect(() => {
        setState((draft) => {
            if (typeofWithArray(getObjectPropertyByStringPath(draft, statePath)) !== 'array') {
                setObjectPropertyByStringPath(draft, statePath, []);
            }
        });
    }, [setState, statePath]);

    const accordionState = useMemo(() => {
        return getObjectPropertyByStringPath(state, statePath);
    }, [state, statePath]);

    const reverseOpenedState = useCallback((id) => {
            setState((draft) => {
                if (accordionState.includes(id)) {
                    setObjectPropertyByStringPath(
                        draft,
                        statePath,
                        (value) => {
                            value.splice(value.indexOf(id), 1);
                        },
                    );
                } else {
                    setObjectPropertyByStringPath(
                        draft,
                        statePath,
                        (value) => {
                            value?.push(id);
                        },
                    );
                }
            });
        },
        [accordionState, setState, statePath],
    );

    const contextValue = useMemo(() => ({
        reverseOpenedState,
        state: accordionState,
    }), [accordionState, reverseOpenedState]);

    return (
        <AccordionContext.Provider
            value={contextValue}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({id, header, panel, className}) => {
    const {state, reverseOpenedState} = useContext(AccordionContext);
    return (
        <div className={className}>
            <div
                onClick={() => reverseOpenedState(id)}
            >
                {header}
            </div>
            {state?.includes(id) && panel}
        </div>
    );
};

