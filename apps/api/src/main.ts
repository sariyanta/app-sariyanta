import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';

import { AppModule } from './app/app.module';
import { HttpTimingInterceptor } from './app/interceptor/http-timing.interceptor';
import { CONFIG_PROVIDER, TConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Get the Configs */
  const { PORT } = app.get<TConfig>(CONFIG_PROVIDER);
  const { ALLOWED_CORS_HOST } = app.get<TConfig>(CONFIG_PROVIDER);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new HttpTimingInterceptor());

  app.enableCors({
    origin: ALLOWED_CORS_HOST,
  });

  /** Swagger Configuration */
  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder().setTitle('Sariyanta API'),
    {
      webServerOptions: {
        enabled: false,
        path: `${globalPrefix}/docs`,
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: '../../packages/api-client/src/openapi.json',
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    },
  )
    .then(() => {
      Logger.log('Swagger documentation generated successfully', 'OpenAPI');
    })
    .catch((error) => {
      Logger.error('Error configuring Swagger', error);
      process.exit(1);
    });

  await app.listen(PORT);
  Logger.log(
    `Server is running on http://0.0.0.0:${PORT}/${globalPrefix}`,
    'Bootstrap',
  );
}

bootstrap().catch((error) => {
  Logger.error('Error starting the server', error);
  process.exit(1);
});
