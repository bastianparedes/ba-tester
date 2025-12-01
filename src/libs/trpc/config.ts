import env from '@/libs/env';

const url = (() => {
  const protocol = env.NODE_ENV === 'production' ? 'https' : 'http';
  const domain = env.DOMAIN ?? 'localhost:3000';
  const url = `${protocol}://${domain}/api/trpc`;
  return url;
})();

export { url };
