/**
 * Lib
 */
import { createApp } from '@/lib';

/**
 * Routes
 */
import indexRoute from '@/routes';
import authRoute from '@/routes/auth';

const app = createApp();

const routes = [indexRoute, authRoute] as const;

routes.forEach(route => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
