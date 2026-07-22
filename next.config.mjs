/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ar/contact-us-ar',
        destination: '/ar/contact',
      },
      {
        source: '/en/contact-us-en',
        destination: '/en/contact',
      },
    ];
  },
};

export default nextConfig;