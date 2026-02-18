import { openDB, DBSchema } from 'idb';

interface Activity {
  id: string;
  type: 'SALE' | 'HARVEST' | 'EXPENSE';
  amount: number;
  timestamp: string;
  // 1. Change boolean to 0 | 1 so IndexedDB can index it natively
  synced: 0 | 1; 
}

interface ImpaktoDB extends DBSchema {
  activities: {
    key: string;
    value: Activity;
    // 2. Map the index directly to a number, removing the array brackets
    indexes: { 'by-sync': number }; 
  };
}

const DB_NAME = 'impakto-vault';

export const initDB = async () => {
  return openDB<ImpaktoDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('activities')) {
        const store = db.createObjectStore('activities', { keyPath: 'id' });
        store.createIndex('by-sync', 'synced'); 
      }
    },
  });
};

export const saveActivity = async (activity: ImpaktoDB['activities']['value']) => {
  const db = await initDB();
  return db.put('activities', activity);
};

export const getPendingSyncs = async () => {
  const db = await initDB();
  // 3. Query for 0 instead of [false]
  return db.getAllFromIndex('activities', 'by-sync', 0); 
};