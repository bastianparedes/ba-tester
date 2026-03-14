import { TypeBaTester } from '../types';
import { IndexedDBCrud } from '../utils/indexedDB';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const WINDOW_MS = 500;
const MAX_COUNT = 5;

const applyTrackEvent = async (eventData: (typeof window.ba_tester.trackEventsData)[number], productDB: IndexedDBCrud, storeName: string) => {
  let count = 0;
  let windowStart = Date.now();

  async function* generatorFunction() {
    while (true) {
      yield await eventData.getData();
      if (!eventData.multipleTimes) return;
    }
  }

  for await (const value of generatorFunction()) {
    const now = Date.now();

    if (now - windowStart >= WINDOW_MS) {
      windowStart = now;
      count = 0;
    }

    count++;

    if (count > MAX_COUNT) {
      return;
    }

    await productDB.add(storeName, {
      date: new Date(),
      value,
    });
  }
};

const getStoreName = (trackEventData: (typeof window.ba_tester.trackEventsData)[number]) => String(trackEventData.id);

export const setTrackEvents = async () => {
  const events = window.ba_tester.trackEventsData;
  const storeNames = events.map((event) => getStoreName(event));

  const productDB = new IndexedDBCrud(storeNames);
  await productDB.init();

  events.forEach((trackEventData) => {
    applyTrackEvent(trackEventData, productDB, getStoreName(trackEventData));
  });
};
