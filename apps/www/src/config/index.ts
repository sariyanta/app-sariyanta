import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export default createEnv({
  server: {
    API_BASE_URL: z.string().url().min(1),
    API_ACCESS_TOKEN: z.string().min(1, 'API key is required'),
  },
  client: {},
  runtimeEnv: {
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
