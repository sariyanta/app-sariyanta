import type { NextConfig } from 'next';

const NEST_SERVER_URL = process.env.NEST_SERVER_URL;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${NEST_SERVER_URL}/api/:path*`,
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
