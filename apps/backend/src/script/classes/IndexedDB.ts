type TypeData<T = unknown> = {
  date: Date;
  value: T;
};

class IndexedDBCrud {
  private dbName = 'ba_tester_v1';
  private db!: IDBDatabase;
  private stores: number[];
  private initPromise: Promise<void>;

  private cache = new Map<string, unknown[]>();

  constructor(stores: number[]) {
    this.stores = stores;
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    const currentVersion = await this.getCurrentVersion();
    await this.openDatabase(currentVersion);
  }

  private async ready() {
    await this.initPromise;
  }

  private getCurrentVersion(): Promise<number> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => {
        const db = request.result;
        const version = db.version;
        db.close();
        resolve(version);
      };

      request.onerror = () => reject(request.error);

      request.onupgradeneeded = () => {
        const db = request.result;
        const version = db.version;
        db.close();
        resolve(version);
      };
    });
  }

  private openDatabase(currentVersion: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, currentVersion + 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.stores.forEach((store) => {
          const name = String(store);
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, {
              autoIncrement: true,
              keyPath: 'id',
            });
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

  async add<T = unknown>(storeName: string, data: TypeData<T>): Promise<void> {
    await this.ready();

    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.add(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T = unknown>(storeName: number): Promise<TypeData<T>[]> {
    await this.ready();

    if (this.cache.has(String(storeName))) {
      return this.cache.get(String(storeName)) as TypeData<T>[];
    }

    return new Promise((resolve, reject) => {
      const store = this.getStore(String(storeName));
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result as TypeData<T>[];
        this.cache.set(String(storeName), result);

        resolve(result);
      };

      request.onerror = () => reject(request.error);
    });
  }
}

const events = window.ba_tester.trackEventsData;
const storeNames = events.map((event) => event.id);

export const indexedDBCrud = new IndexedDBCrud(storeNames);
