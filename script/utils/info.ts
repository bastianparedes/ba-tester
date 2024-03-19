import cookie from './cookie';
import randomNumber from './randomNumber';
import constants from '../config/constants';

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

export { getId };
