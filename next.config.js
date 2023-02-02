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
        //pathname: '/dev/media/**',
      },
    ],
  },
}

module.exports = nextConfig
