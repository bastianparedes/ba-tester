import cookie from './cookie';
import randomNumber from './randomNumber';
import constants from '../config/constants';
import type { History } from '../types';

const getId = () => {
  const cookieName = constants.cookie.name;
  const value = cookie.get(cookieName);
  const savedValueIsNumber = value !== null && /^-?\d+$/.test(value);
  const id = savedValueIsNumber
    ? parseInt(value)
    : randomNumber(constants.cookie.min, constants.cookie.max);
  cookie.set(constants.cookie.name, id, constants.cookie.duration);
  return id;
};

const getHistory = (storage: Storage): History => {
  const defaultData = {
    events: {
      click: [],
      pageView: [],
      paymentMade: [],
      userSession: []
    }
  };
  const returnDefault = () => {
    storage.setItem(constants.storage.name, JSON.stringify(defaultData));
    return defaultData;
  };

  const contentString = storage.getItem(constants.storage.name);
  if (contentString === null) return returnDefault();

  try {
    const contentObject = JSON.parse(contentString);
    if (
      Array.isArray(contentObject.events.click) &&
      Array.isArray(contentObject.events.pageView) &&
      Array.isArray(contentObject.events.paymentMade) &&
      Array.isArray(contentObject.events.userSession)
    )
      return contentObject;

    return returnDefault();
  } catch {
    return returnDefault();
  }
};

export { getId, getHistory };
