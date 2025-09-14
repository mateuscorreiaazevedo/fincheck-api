import { plainToInstance, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  NotEquals,
  IsNumber,
  validateSync,
} from 'class-validator';
import 'dotenv/config';

class Env {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('secret')
  JWT_SECRET: string;

  @Transform(({ value }) => parseInt(value as string, 10))
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  COOKIE_DOMAIN: string;
}

export const env: Env = plainToInstance(Env, process.env);

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
