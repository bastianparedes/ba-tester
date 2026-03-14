export class IndexedDBCrud {
  private dbName = 'ba_tester_v1';
  private db!: IDBDatabase;
  private stores: string[];

  constructor(stores: string[]) {
    this.stores = stores;
  }

  async init(): Promise<void> {
    const currentVersion = await this.getCurrentVersion();
    await this.openDatabase(currentVersion);
  }

  // Leer la versión actual de la DB
  private getCurrentVersion(): Promise<number> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => {
        const db = request.result;
        const version = db.version;
        db.close(); // cerramos temporalmente
        resolve(version);
      };

      request.onerror = () => reject(request.error);
      request.onupgradeneeded = () => {
        // DB no existía, así que versión será 1
      };
    });
  }

  // Abrir DB y crear stores nuevas si no existen
  private openDatabase(currentVersion: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, currentVersion + 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { autoIncrement: true, keyPath: 'id' });
          }
        });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  // CREATE
  add(storeName: string, data: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.add(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
