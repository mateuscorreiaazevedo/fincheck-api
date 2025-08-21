import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/infra/database/schemas/**.ts',
  out: './src/infra/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})