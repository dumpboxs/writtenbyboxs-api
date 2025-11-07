/**
 * Lib
 */
import { auth, factory } from '@/lib';

const authRoute = factory.createApp().basePath('/auth');

authRoute.on(['POST', 'GET'], '/*', c => {
  return auth.handler(c.req.raw);
});

export default authRoute;
