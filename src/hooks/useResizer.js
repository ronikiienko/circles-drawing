import {useCallback} from 'react';


export const useResizer = (containerRef) => {
    return useCallback((direction, movementX, movementY) => {
        const container = containerRef.current;

        const {width, height, x, y} = container.getBoundingClientRect();
        const resizeTop = () => {
            container.style.height = `${height - movementY}px`;
            container.style.top = `${y + movementY}px`;
        };

        const resizeRight = () => {
            container.style.width = `${width + movementX}px`;
        };

        const resizeBottom = () => {
            container.style.height = `${height + movementY}px`;
        };

        const resizeLeft = () => {
            container.style.width = `${width - movementX}px`;
            container.style.left = `${x + movementX}px`;
        };

        switch (direction) {
            case 'topLeft':
                resizeTop();
                resizeLeft();
                break;
            case 'top':
                resizeTop();
                break;
            case 'topRight':
                resizeTop();
                resizeRight();
                break;
            case 'right':
                resizeRight();
                break;
            case 'bottomRight':
                resizeRight();
                resizeBottom();
                break;
            case 'bottom':
                resizeBottom();
                break;
            case 'bottomLeft':
                resizeBottom();
                resizeLeft();
                break;
            case 'left':
                resizeLeft();
                break;
            default:
                break;
        }
    }, [containerRef]);
};