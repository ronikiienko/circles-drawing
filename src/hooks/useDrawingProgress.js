import {useEffect, useState} from 'react';
import {CMD, progressStatuses} from '../consts/sharedConsts';
import {worker} from '../worker/canvasWorkerMediators';


export const useDrawingProgress = () => {
    const [progress, setProgress] = useState({
        progress: 1,
        currentIndex: 0,
        totalNumber: 0,
        status: progressStatuses.finished.id,
    });
    useEffect(() => {
        const messageHandler = (event) => {
            if (event.data.cmd === CMD.progress) {
                setProgress(event.data.data);
            }
        };
        worker.addEventListener('message', messageHandler);
        return () => {
            worker.removeEventListener('message', messageHandler);
        };
    }, []);
    return progress;
};