import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { CONFIG_PROVIDER } from './config/configuration';
import type { TConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api/docs', app, document);
  console.log('stuff');
  const { PORT } = app.get<TConfig>(CONFIG_PROVIDER);
  const { ALLOWED_CORS_HOST } = app.get<TConfig>(CONFIG_PROVIDER);
  app.enableCors({
    origin: ALLOWED_CORS_HOST,
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
