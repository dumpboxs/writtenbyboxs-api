/**
 * Types
 */
import { type Env } from 'hono';
import type { auth } from '@/lib';

export interface AppBindings extends Env {
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
}
