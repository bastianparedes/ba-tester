/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
