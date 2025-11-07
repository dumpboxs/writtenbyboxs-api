/**
 * Node modules
 */
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

/**
 * Lib
 */
import { auth, factory } from '@/lib';

export const requireAuth = factory.createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      cause: 'Unauthorized',
      message: 'You are not authorized to access this resource',
    });
  }

  c.set('session', session.session);
  c.set('user', session.user);
  await next();
});
