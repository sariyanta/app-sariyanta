import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

import configuration, {
  appConfigSchema,
  CONFIG_PROVIDER,
  TConfig,
} from '../config/configuration';
import { AppService } from './service/app.service';
import { Client } from '@hubspot/api-client';
import { AppController } from './controller/app.controller';

export const HUBSPOT_CLIENT = 'HUBSPOT_CLIENT';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (env) => appConfigSchema.parse(env),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: HUBSPOT_CLIENT,
      useFactory: (config: TConfig) => {
        const accessToken = config.HUBSPOT_ACCESS_TOKEN;
        if (!accessToken) {
          throw new Error(
            'HUBSPOT_ACCESS_TOKEN is not defined in the environment variables',
          );
        }
        return new Client({ accessToken });
      },
      inject: [CONFIG_PROVIDER],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
