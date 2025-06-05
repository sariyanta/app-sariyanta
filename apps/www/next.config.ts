import type { NextConfig } from 'next';

import env from './src/config';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

if (!process?.env?.VERCEL) {
  nextConfig.output = 'standalone';
  nextConfig.transpilePackages = ['@t3-oss/env-core', '@t3-oss/env-nextjs'];
}

export default nextConfig;
