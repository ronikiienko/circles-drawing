import Dexie from 'dexie';


const db = new Dexie('history');

db.version(1).stores({
    history: '++ind',
    lastState: '++ind',
});

export const pushToHistory = (data) => {
    return db.table('history').put(data);
};

export const getUndo = () => {
    return db.table('history').orderBy('ind').last();
};

export const setLastState = (data) => {
    db.table('lastState').clear()
        .then(() => db.table('lastState').put(data));
};

export const getLastState = () => {
    return db.table('lastState').orderBy('ind').last();
};