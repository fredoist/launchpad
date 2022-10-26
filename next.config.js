/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/launchpad',
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
