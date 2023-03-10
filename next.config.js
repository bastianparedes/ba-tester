/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/ba-tester',
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
