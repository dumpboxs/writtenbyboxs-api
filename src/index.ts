/**
 * Node modules
 */
import { serve } from '@hono/node-server';

/**
 * App
 */
import app from '@/app';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Lib
 */
import { logger } from '@/lib';

const port = env.PORT;

serve(
  {
    fetch: app.fetch,
    port,
  },
  info => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  }
);
