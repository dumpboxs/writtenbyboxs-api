/**
 * Lib
 */
import { factory } from '@/lib';

/**
 * Handler
 */
import bannerUploadHandler from '@/handler/banner-upload';

const bannerUploadRoute = factory.createApp().basePath('/banner-upload');

// Banner upload (private)
bannerUploadRoute.post('/', ...bannerUploadHandler);

export default bannerUploadRoute;
