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
  const { ALLOWED_CORS_ORIGIN, NODE_ENV } = app.get<TConfig>(CONFIG_PROVIDER);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new HttpTimingInterceptor());

  app.enableCors({
    origin: ALLOWED_CORS_ORIGIN,
  });

  /** Swagger Configuration */
  const document = new DocumentBuilder()
    .setTitle('Sariyanta API')
    .addBearerAuth();

  const openApiOptions = {
    webServerOptions: {
      enabled: true,
      path: `${globalPrefix}/docs`,
    },
    fileGeneratorOptions: {
      enabled: NODE_ENV !== 'production',
      outputFilePath: '../../packages/api-client/src/openapi.json',
    },
  };

  await OpenApiNestFactory.configure(app, document, openApiOptions, {
    operationIdFactory: (_: string, method: string) => method,
  });

  /** Start the Application */
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
