/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tasks.vitasoftsolutions.com',
      },
    ],
  },
};

export default nextConfig;
