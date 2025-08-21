import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import {config} from 'dotenv'
import path from 'node:path'

async function bootstrap() {
  const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env'
  config({ path: path.resolve(process.cwd(), envFile) })

  const port = process.env.PORT ? Number(process.env.PORT) : 8080

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
