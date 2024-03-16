const startWithZero = (number: number) => {
  if (number % 1 !== 0) throw new Error('Integer number expected');
  if (number < 0 || 60 <= number)
    throw new Error('Number between 0 and 59 included expected');
  if (0 <= number && number < 10) return '0' + String(number);
  return String(number);
};

export { startWithZero };
