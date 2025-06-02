import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export const appConfigSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  ALLOWED_CORS_ORIGIN: z.string(),

  /** HubSpot */
  HUBSPOT_ACCESS_TOKEN: z.string(),
});

export const getConfig = () => ({
  ...appConfigSchema.parse(process.env),
});

export type TConfig = z.infer<typeof appConfigSchema>;

const configuration = registerAs('config', getConfig);

export const CONFIG_PROVIDER = configuration.KEY;

export default configuration;
