import { startWithZero } from '../../../../utils/date';

const getDateString = (dateAsString: string) => {
  const date = new Date(dateAsString);
  const day = startWithZero(date.getDate());
  const month = startWithZero(date.getMonth());
  const year = String(date.getFullYear());
  const hour = startWithZero(date.getHours());
  const minute = startWithZero(date.getMinutes());
  return `${day}/${month}/${year} ${hour}:${minute}`;
};

export { getDateString };
