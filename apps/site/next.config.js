const { IgnorePlugin } = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.w3s.link',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fallback settings
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // External libraries that should not be bundled
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Alias configurations
    config.resolve.alias.canvas = false;

    // Using IgnorePlugin to ignore specific modules
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^aws-sdk\/clients\/lambda$/,
      })
    );

    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
  transpilePackages: ['scrypt'],
};
