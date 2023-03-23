import React from 'react';
import ReactDom from 'react-dom/client';
import {App} from './components/App';


ReactDom.createRoot(document.getElementById('root')).render(<App/>);

// const db = new Dexie("history")
//
// db.version(1).stores({
//     history: '++ind'
// })
//
// export const pushToHistory = (data) => {
//     return db.table('history').put(data)
// }
//
// export const getUndo = () => {
//     return db.table('history').orderBy('ind').last()
// }
//
// getUndo()
//     .then(value => console.log(value))
//
// pushToHistory({imageData: 'dfdfdfdfdf'})