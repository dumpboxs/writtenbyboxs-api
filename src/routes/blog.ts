/**
 * Lib
 */
import { factory } from '@/lib';

/**
 * Handler
 */
import createBlogHandler from '@/handler/blog/create-blog';

const blogRoute = factory.createApp().basePath('/blogs');

// Create blog (private)
blogRoute.post('/', ...createBlogHandler);

export default blogRoute;
