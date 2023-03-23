// import Dexie from 'dexie';
//
//
// export const db = new Dexie("history")
//
// db.version(1).stores({
//     history: '++'
// })
//
// export const pushToHistory = (data) => {
//     return db.table('history').put(data)
// }
//
// export const getUndo = () => {
//     db.table('history').get(1)
//         .then(value => {
//             console.log(value);
//         })
// }
// // export const getLast
//
// db.table('history').put({
//     hello: 'hibo'
// })
//
// getUndo()