import constants from '../config/constants';
import cookie from './cookie';
import randomNumber from './randomNumber';

const getId = () => {
  const cookieName = constants.cookie.name;
  const value = cookie.get({ name: cookieName });
  const savedValueIsNumber = value !== null && /^-?\d+$/.test(value);
  const id = savedValueIsNumber
    ? parseInt(value, 10)
    : randomNumber(constants.cookie.min, constants.cookie.max);
  cookie.set({
    name: constants.cookie.name,
    value: id,
    exdays: constants.cookie.duration,
  });
  return id;
};

export { getId };
