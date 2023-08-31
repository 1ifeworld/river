/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ['@river/design-system'],
};

const withMDX = require('@next/mdx')();

module.exports = withMDX(nextConfig);
