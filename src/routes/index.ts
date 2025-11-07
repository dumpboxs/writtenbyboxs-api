/**
 * Lib
 */
import { factory } from '@/lib';

const indexRoute = factory.createApp().basePath('/');

indexRoute.get('/', c => {
  return c.json({
    success: true,
    message: 'WrittenByBoxs API',
    version: '1.0.0',
    author: '@mrboxs',
    timestamp: new Date().toISOString(),
  });
});

export default indexRoute;
