import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { CONFIG_PROVIDER, TConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = app.get<TConfig>(CONFIG_PROVIDER);
  await app.listen(PORT);
  Logger.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap().catch((error) => {
  Logger.error('Error starting the server', error);
  process.exit(1);
});
