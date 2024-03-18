import constants from '../config/constants';
import type { ba_tester } from '../types';
import { getHistory } from '../utils/info';

declare global {
  interface Window {
    ba_tester: ba_tester;
  }
}

const setPageViewSaver = (storage: Storage) => {
  const storageHistory = getHistory(storage);

  const data = {
    date: new Date().getTime(),
    url: location.href.replace(location.origin, '')
  };
  storageHistory.events.pageView.push(data);
};

const setClickListenerSaver = (storage: Storage) => {
  document.addEventListener('click', (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const newClickHistory = {
      class: clickedElement.getAttribute('class'),
      date: new Date().getTime(),
      id: clickedElement.getAttribute('id'),
      tagName: clickedElement.tagName
    };
    const storageHistory = getHistory(storage);
    storageHistory.events.click.push(newClickHistory);
    storage.setItem(constants.storage.name, JSON.stringify(storageHistory));
  });
};

const script = () => {
  [localStorage, sessionStorage].forEach((storage) => {
    setPageViewSaver(storage);
    setClickListenerSaver(storage);
  });
};

export default script;
