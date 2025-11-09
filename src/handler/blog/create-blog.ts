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
import { createBlogSchema } from '@/schemas';

/**
 * Utils
 */
import { contentCleaner, generateSlug } from '@/utils';

/**
 * Types
 */
import type { ApiSuccessResponse, Blog } from '@/types';

const createBlogHandler = factory.createHandlers(
  requireAuth,
  zValidator('form', createBlogSchema),
  async c => {
    const { title, description, content, status } = c.req.valid('form');
    const user = c.get('user')!;

    const slug = generateSlug(title);
    const cleanedContent = contentCleaner(content);

    const newBlog = await c.var.db.blog.create({
      data: {
        title,
        description,
        content: cleanedContent,
        slug,
        status,
        authorId: user.id,
      },
      include: {
        author: true,
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
