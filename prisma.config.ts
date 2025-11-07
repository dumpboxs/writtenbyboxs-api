import 'dotenv/config';
import path from 'path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
