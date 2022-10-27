/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/launchpad',
  images: {
    domains: ['gateway.ipfscdn.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/launchpad',
        permanent: false,
        basePath: false,
      },
    ]
  }
};
