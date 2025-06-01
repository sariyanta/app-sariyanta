import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api/docs', app, document);

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
