/**
 * Types
 */
import { type Env } from 'hono';
import type { auth } from '@/lib';
import type { PrismaClient } from '@/generated/prisma/client';

export interface AppBindings extends Env {
  Variables: {
    db: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
}
