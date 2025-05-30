import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'nest/api/:path*',
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
