/**
 * Node modules
 */
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  username,
  anonymous,
  admin,
  bearer,
  multiSession,
  openAPI,
  jwt,
} from 'better-auth/plugins';

/**
 * Lib
 */
import { db } from '@/lib';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Types
 */
import { type BetterAuthOptions } from 'better-auth';

export const auth = betterAuth<BetterAuthOptions>({
  appName: 'writtenbyboxs-api',
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: env.CORS_ORIGINS,
  secret: env.BETTER_AUTH_SECRET,
  advanced: {
    database: {
      generateId: false,
    },
  },
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  logger: {
    level: env.LOG_LEVEL,
    disabled: env.NODE_ENV === 'production',
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt(),
    openAPI(),
    multiSession(),
    bearer(),
    admin(),
    anonymous(),
    username(),
  ],
});
