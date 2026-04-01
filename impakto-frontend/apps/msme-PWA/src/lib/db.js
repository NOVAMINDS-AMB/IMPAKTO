import { openDB } from 'idb';
const DB_NAME = 'impakto-vault';
export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('activities')) {
                const store = db.createObjectStore('activities', { keyPath: 'id' });
                store.createIndex('by-sync', 'synced');
            }
        },
    });
};
export const saveActivity = async (activity) => {
    const db = await initDB();
    return db.put('activities', activity);
};
export const getPendingSyncs = async () => {
    const db = await initDB();
    // 3. Query for 0 instead of [false]
    return db.getAllFromIndex('activities', 'by-sync', 0);
};
