import './src/config/configuration';

import type { NextConfig } from 'next';
import { configuration } from '@/config/configuration';

const API_BASE_URL = configuration.API_BASE_URL || 'http://localhost:4000/api';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
