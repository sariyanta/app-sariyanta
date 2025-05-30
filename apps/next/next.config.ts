import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nest:4000/api/:path*',
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
