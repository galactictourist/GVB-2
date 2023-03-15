/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'n4g-staging.sgp1.digitaloceanspaces.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.nftstorage.link',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
