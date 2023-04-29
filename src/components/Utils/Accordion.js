import {createContext, useCallback, useContext} from 'react';
import {getObjectPropertyByStringPath, setObjectPropertyByStringPath} from '../../utils/generalUtils';


export const AccordionContext = createContext(null);

export function Accordion({children, state, setState, statePath = ''}) {
    const reverseOpenedState = useCallback(
        (id) => {
            setState((draft) => {
                let path;
                if (statePath) path = statePath + '-' + id;
                else path = id;
                setObjectPropertyByStringPath(
                    draft,
                    path,
                    !getObjectPropertyByStringPath(path, draft),
                );
            });
        },
        [setState, statePath],
    );

    return (
        <AccordionContext.Provider
            value={{
                reverseOpenedState,
                state,
            }}
        >
            {children}
        </AccordionContext.Provider>
    );
}

export const AccordionItem = ({id, header, panel, className}) => {
    const {state, reverseOpenedState} = useContext(AccordionContext);
    return (
        <div className={className}>
            <div
                onClick={() => reverseOpenedState(id)}
            >
                {header}
            </div>
            {state[id] && panel}
        </div>
    );
};

