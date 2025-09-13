import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './infra/config';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.enableCors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  } as CorsOptions);

  await app.listen(env.PORT);
}

void bootstrap();
