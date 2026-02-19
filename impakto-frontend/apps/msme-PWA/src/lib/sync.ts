import { getPendingSyncs, initDB } from './db';

const API_URL = 'http://127.0.0.1:8000/api/ledger/sync';

export const syncData = async () => {
  if (!navigator.onLine) {
    console.log("📴 Offline: Skipping sync");
    return;
  }

  const pendingItems = await getPendingSyncs();

  if (pendingItems.length === 0) return;

  console.log(`🔄 Syncing ${pendingItems.length} items...`);

  for (const item of pendingItems) {
    const formData = new FormData();
    
    // 1. Append the file (if it exists)
    if (item.photoBlob) {
      formData.append('evidence', item.photoBlob, 'evidence.jpg');
    }

    // 2. Append data fields matching your Django Pydantic Schema
    formData.append('id', item.id);
    formData.append('type', item.type);
    formData.append('amount', item.amount.toString());
    formData.append('timestamp', item.timestamp);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData, // No headers needed (browser sets multipart automatically)
      });

      if (response.ok) {
        // 3. Mark as synced in local DB so we don't send it again
        const db = await initDB();
        const tx = db.transaction('activities', 'readwrite');
        const store = tx.objectStore('activities');
        
        // Update the record
        await store.put({...item, synced: true });
        console.log(`✅ Synced item: ${item.id}`);
      } else {
        console.error(`❌ Server rejected item: ${item.id}`);
      }
    } catch (error) {
      console.error("Network error during sync", error);
    }
  }
};