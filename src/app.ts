/**
 * Lib
 */
import { createApp } from '@/lib';

/**
 * Routes
 */
import indexRoute from '@/routes';
import authRoute from '@/routes/auth';
import blogRoute from '@/routes/blog';
import bannerUploadRoute from '@/routes/banner-upload';

const app = createApp();

const routes = [indexRoute, authRoute, blogRoute, bannerUploadRoute] as const;

routes.forEach(route => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
