import type { NextConfig } from 'next';

import { configuration } from './src/config/configuration';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${configuration.API_BASE_URL}/:path*`,
      },
    ];
  },
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-core', '@t3-oss/env-nextjs'],
};

export default nextConfig;
