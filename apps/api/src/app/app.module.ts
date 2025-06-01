import { Client } from '@hubspot/api-client';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from '../app/service/app.service';
import configuration, {
  appConfigSchema,
  CONFIG_PROVIDER,
  TConfig,
} from '../config/configuration';

import { HUBSPOT_CLIENT } from './constant/hubspot.constant';
import { AppController } from './controller/app.controller';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './service/posts.service';

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
    HttpModule.register({
      timeout: 3000,
    }),
  ],
  controllers: [AppController, PostsController],
  providers: [
    AppService,
    PostsService,
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
