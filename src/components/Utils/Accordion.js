import {Children, createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {getObjectPropertyByStringPath, setObjectPropertyByStringPath} from '../../utils/generalUtils';


export const AccordionContext = createContext(null);

// state path shouldn't be empty so that setObjectPropertyByStringPath work
export const Accordion = ({children, state, setState, statePath}) => {
    useEffect(() => {
        // if item was removed, compare what ids are present now and later remove all unused
        const existingIds = Children.map(children, (child) => {
            if (!child?.props?.id) throw 'direct child of accordion should have id (same as accordion item inside it)';
            return child.props.id;
        });
        setState(draft => {
            setObjectPropertyByStringPath(draft, statePath, (array) => {
                for (let i = array.length - 1; i >= 0; i--) {
                    if (existingIds.includes(array[i])) continue;
                    array.splice(i, 1);
                }
            });
        });
    }, []);

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

export const AccordionItem = ({id, header, className, children}) => {
    const {state, reverseOpenedState} = useContext(AccordionContext);
    return (
        <div className={className}>
            <div
                onClick={() => reverseOpenedState(id)}
            >
                {header}
            </div>
            {Array.isArray(state) && state?.includes(id) && children}
        </div>
    );
};

