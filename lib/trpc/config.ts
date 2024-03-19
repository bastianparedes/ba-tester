import nextConfig from '../../next.config';

const url = (() => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const domain = process.env.DOMAIN ?? 'localhost:3000';
  const url = `${protocol}://${domain}${nextConfig.basePath}/api/trpc`;
  return url;
})();

export { url };
