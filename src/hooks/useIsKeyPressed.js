import {useEffect, useState} from 'react';


export const useIsKeyPressed = (keyCode) => {
    const [isPressed, setIsPressed] = useState(false);
    useEffect(() => {
        const keydownHandler = (event) => {
            if (event.repeat) return;
            if (event.code === keyCode) setIsPressed(true);
        };

        const keyupHandler = (event) => {
            if (event.code === keyCode) setIsPressed(false);
        };

        window.addEventListener('keydown', keydownHandler);
        window.addEventListener('keyup', keyupHandler);

        return () => {
            window.removeEventListener('keydown', keydownHandler);
            window.removeEventListener('keyup', keyupHandler);
        };
    }, [keyCode]);

    return isPressed;
};