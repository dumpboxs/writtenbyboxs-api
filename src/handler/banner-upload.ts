/**
 * Node modules
 */
import { zValidator } from '@hono/zod-validator';
import { StatusCodes } from 'http-status-codes';

/**
 * Lib
 */
import { factory, logger } from '@/lib';

/**
 * Middleware
 */
import { requireAuth } from '@/middleware';

/**
 * Schemas
 */
import { bannerSchema } from '@/schemas/banner';

/**
 * Types
 */
import type { ApiSuccessResponse } from '@/types';
import uploadToCloudinary from '@/lib/cloudinary';

const bannerUploadHander = factory.createHandlers(
  requireAuth,
  zValidator('form', bannerSchema),
  async c => {
    const { banner } = c.req.valid('form');

    logger.info(`Banner uploaded: ${banner.name}`);
    logger.info(`Banner size: ${banner.size}`);
    logger.info(`Banner type: ${banner.type}`);

    const buffer = Buffer.from(await banner.arrayBuffer());

    const result = await uploadToCloudinary(buffer);

    return c.json<ApiSuccessResponse<typeof result>>(
      {
        success: true,
        message: 'Banner uploaded successfully',
        data: result,
      },
      StatusCodes.OK
    );
  }
);

export default bannerUploadHander;
