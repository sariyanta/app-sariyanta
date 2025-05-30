import { z } from 'zod';

import { registerAs } from '@nestjs/config';

export const appConfigSchema = z.object({
  PORT: z.coerce.number().default(3000),

  /** HubSpot */
  HUBSPOT_ACCESS_TOKEN: z.string(),
  ALLOWED_CORS_HOST: z.string(),
});

export const getConfig = () => ({
  ...appConfigSchema.parse(process.env),
});

export type TConfig = z.infer<typeof appConfigSchema>;

const configuration = registerAs('config', getConfig);

export const CONFIG_PROVIDER = configuration.KEY;

export default configuration;
