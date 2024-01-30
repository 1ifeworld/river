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
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.alias.canvas = false
    return config
  },
  experimental: {
    webpackBuildWorker: true,
  },
  transpilePackages: ['scrypt'],
}
