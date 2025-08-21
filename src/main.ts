import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import 'dotenv/config'
import { envConfig } from './infra/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.PORT);
}
bootstrap();
