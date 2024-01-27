/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false
      }
    ]
  }
  // logging: { fetches: { fullUrl: true } }
}

module.exports = nextConfig
