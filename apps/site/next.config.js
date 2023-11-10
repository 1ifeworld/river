/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'res.cloudinary.com', 'nft-cdn.alchemy.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  experimental: {
    serverActions: true,
  },
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
}
