export const getRandomIntegerNumber = (min: number, max: number) => {
  const range = max - min + 1;
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  return (randomBytes[0] % range) + min;
};

export const getRandomFromArray = <T>(array: T[]): T | undefined => {
  const element = array[getRandomIntegerNumber(0, array.length - 1)];
  return element;
};
