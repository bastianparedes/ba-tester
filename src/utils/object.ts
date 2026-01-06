export const isObject = (object: unknown) => {
  return Object.prototype.toString.call(object) === '[object Object]';
};

type NestedObject<T extends string | number | boolean> = {
  [key: string]: T | NestedObject<T>;
};
export function flattenObject<T extends string | number | boolean>(obj: NestedObject<T>): T[] {
  const result: T[] = [];

  const keys = Object.keys(obj) as (keyof typeof obj)[];
  keys.forEach((key) => {
    const value = obj[key];
    if (isObject(value)) {
      const nestedValues = flattenObject(value as NestedObject<T>);
      nestedValues.forEach((value) => result.push(value));
    } else {
      value
    }
  });

  return result;

  function recurse(value: string | NestedStringObject) {
    if (typeof value === 'string') {
      result.push(value);
    } else {
      for (const key in value) {
        recurse(value[key]);
      }
    }
  }
  recurse(obj);
  return result as FlattenValues<T>;
}
