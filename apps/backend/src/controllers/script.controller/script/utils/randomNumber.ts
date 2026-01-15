const getRandomNumber = (min: number, max: number) => {
  const range = max - min + 1;
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  return (randomBytes[0] % range) + min;
};

export default getRandomNumber;
