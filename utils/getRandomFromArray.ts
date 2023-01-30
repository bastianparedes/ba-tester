const getRandomFromArray = (array: any[]): any | undefined => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const item = array[randomIndex];
  return item;
};

export default getRandomFromArray;
