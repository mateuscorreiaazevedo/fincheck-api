import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().default(''),
  PORT: z.coerce.number().default(8080),
  JWT_SECRET: z.string().default('secret'),
  REFRESH_TOKEN_SECRET: z.string().default('refresh_secret'),
});

export const env = envSchema.parse(process.env);
