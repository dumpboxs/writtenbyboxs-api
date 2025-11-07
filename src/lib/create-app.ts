/**
 * Node modules
 */
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Lib
 */
import { factory } from '@/lib';

/**
 * Middleware
 */
import { appLogger, notFound, onError, serveEmojiFavicon } from '@/middleware';

export default function createApp() {
  const app = factory.createApp();

  app.use(requestId());
  app.use(appLogger());
  app.use(prettyJSON());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  );
  app.use(serveEmojiFavicon('🐱'));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
