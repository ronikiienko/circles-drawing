import {Children, createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {getObjectPropertyByStringPath, setObjectPropertyByStringPath} from '../../utils/generalUtils';


export const AccordionContext = createContext(null);
export const AccordionItemContext = createContext(null);

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

    const setOpenedState = useCallback((id, newValue) => {
            setState((draft) => {
                const itemIndex = accordionState.findIndex(element => element === id);
                const isItemOpened = itemIndex >= 0;
                let actualNewValue;
                if (newValue instanceof Function) {
                    actualNewValue = newValue(isItemOpened);
                } else {
                    actualNewValue = newValue;
                }
                if (!isItemOpened && actualNewValue === true) {
                    setObjectPropertyByStringPath(
                        draft,
                        statePath,
                        (value) => {
                            value.push(id);
                        },
                    );
                }
                if (isItemOpened && actualNewValue === false) {
                    setObjectPropertyByStringPath(
                        draft,
                        statePath,
                        (value) => {
                            value.splice(itemIndex, 1);
                        },
                    );
                }
            });
        },
        [accordionState, setState, statePath],
    );

    const contextValue = useMemo(() => ({
        setOpenedState: setOpenedState,
        state: accordionState,
    }), [accordionState, setOpenedState]);

    return (
        <AccordionContext.Provider
            value={contextValue}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({id, header, className, children}) => {
    const {state, setOpenedState} = useContext(AccordionContext);
    const contextValue = useMemo(() => ([
        state?.includes(id),
        (newValue) => setOpenedState(id, newValue),
    ]), [id, setOpenedState, state]);
    return (
        <AccordionItemContext.Provider
            value={contextValue}
        >
            <div className={className}>
                <div
                    onClick={() => setOpenedState(id, (prevValue) => !prevValue)}
                >
                    {header}
                </div>
                {Array.isArray(state) && state?.includes(id) && children}
            </div>
        </AccordionItemContext.Provider>
    );
};

export const useAccordionState = () => {
    return useContext(AccordionItemContext);
};

