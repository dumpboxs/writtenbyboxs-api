/**
 * Node modules
 */
import * as z from 'zod';

const blogStatusSchema = z.enum(['PUBLISHED', 'DRAFT']);

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, {
      error: 'Title is required',
    })
    .max(180, {
      error: 'Title must be at most 180 characters long',
    }),
  description: z
    .string()
    .min(1, {
      error: 'Description is required',
    })
    .max(360, {
      error: 'Description must be at most 360 characters long',
    }),
  content: z
    .string()
    .min(1, {
      error: 'Content is required',
    })
    .max(50000, {
      error: 'Content must be at most 50000 characters long',
    }),
  status: blogStatusSchema.default('DRAFT'),
});
