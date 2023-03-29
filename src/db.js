import Dexie from 'dexie';


export const db = new Dexie('history');

db.version(1).stores({
    history: '++index',
    appState: 'historyIndex',
});