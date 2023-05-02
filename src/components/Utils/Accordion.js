import {createContext, useCallback, useContext, useMemo} from 'react';
import {getObjectPropertyByStringPath, setObjectPropertyByStringPath} from '../../utils/generalUtils';


export const AccordionContext = createContext(null);

export const Accordion = ({children, state, setState, statePath}) => {
    const accordionState = useMemo(() => {
        return getObjectPropertyByStringPath(state, statePath);
    }, [state, statePath]);
    // TODO when removing items, they are still in array. clear it (filter)

    // here, I validate state on top level
    // useEffect(() => {
    //     if (!Array.isArray(accordionState)) {
    //         setState((draft) => {
    //             console.log('hi');
    //             setObjectPropertyByStringPath(draft, statePath, []);
    //         });
    //     }
    // }, [accordionState, setState, statePath]);


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
            {Array.isArray(state) && state?.includes(id) && panel}
        </div>
    );
};

