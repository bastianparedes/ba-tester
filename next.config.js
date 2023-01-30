/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
