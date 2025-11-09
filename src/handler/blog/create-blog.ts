/**
 * Node modules
 */
import { zValidator } from '@hono/zod-validator';
import { StatusCodes } from 'http-status-codes';

/**
 * Lib
 */
import { factory, logger } from '@/lib';
import uploadToCloudinary from '@/lib/cloudinary';

/**
 * Middleware
 */
import { requireAuth } from '@/middleware';

/**
 * Schemas
 */
import { createBlogSchema } from '@/schemas';

/**
 * Utils
 */
import { contentCleaner, generateSlug } from '@/utils';

/**
 * Types
 */
import type { ApiErrorResponse, ApiSuccessResponse, Blog } from '@/types';

const createBlogHandler = factory.createHandlers(
  requireAuth,
  zValidator('form', createBlogSchema),
  async c => {
    const { title, description, content, status, banner } = c.req.valid('form');
    const user = c.get('user')!;

    const bannerBuffer = Buffer.from(await banner.arrayBuffer());
    const bannerResult = await uploadToCloudinary(bannerBuffer);

    if (!bannerResult) {
      logger.error(`Error while uploading blog banner to cloudinary`);

      return c.json<ApiErrorResponse>(
        {
          success: false,
          message: 'Failed to upload blog banner',
          details: {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Failed to upload blog banner',
            url: c.req.url,
            path: c.req.path,
            method: c.req.method,
            timestamp: new Date().toISOString(),
          },
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const slug = generateSlug(title);
    const cleanedContent = contentCleaner(content);

    // First, create the banner
    const bannerData = await c.var.db.blogBanner.create({
      data: {
        publicId: bannerResult.public_id,
        url: bannerResult.url,
        secureUrl: bannerResult.secure_url,
        width: bannerResult.width,
        height: bannerResult.height,
      },
    });

    // Then create the blog and associate it with the banner
    const newBlog = await c.var.db.blog.create({
      data: {
        title,
        description,
        content: cleanedContent,
        slug,
        status,
        authorId: user.id,
        bannerId: bannerData.id,
      },
      include: {
        author: true,
        banner: true,
      },
    });

    logger.info(newBlog, 'Blog created');

    const transformedBlog: Blog = {
      id: newBlog.id,
      title: newBlog.title,
      description: newBlog.description,
      slug: newBlog.slug,
      content: newBlog.content,
      status: newBlog.status,
      author: {
        id: newBlog.author.id,
        name: newBlog.author.name,
        image: newBlog.author.image,
        username: newBlog.author.username,
      },
      banner: newBlog.banner,
      createdAt: newBlog.createdAt.toISOString(),
      updatedAt: newBlog.updatedAt.toISOString(),
    };

    return c.json<ApiSuccessResponse<Blog>>(
      {
        success: true,
        message: 'Blog created successfully',
        data: transformedBlog,
      },
      StatusCodes.CREATED
    );
  }
);

export default createBlogHandler;
