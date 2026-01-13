import client from './client';

export const save = async ({
  key,
  value,
  ttlMinutes,
}: {
  key: string;
  value: string;
  ttlMinutes?: number;
}) => {
  if (ttlMinutes === undefined) {
    await client.set(key, value);
    return;
  }
  await client.setEx(key, 60 * ttlMinutes, value);
};

export const get = async (key: string) => {
  return await client.get(key);
};
