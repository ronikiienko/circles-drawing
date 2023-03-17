import {useEffect} from 'react';


export const useKeyboardControls = (setHidden) => {
    useEffect(() => {
        const keydownHandler = (event) => {
            if (event.repeat) return;
            switch (event.key) {
                case 'h':
                    setHidden(prevHidden => !prevHidden);
            }
        };
        window.addEventListener('keydown', keydownHandler);
        return () => window.removeEventListener('keydown', keydownHandler);
    }, [setHidden]);
};