import * as z from 'zod';

export const bannerSchema = z.object({
  banner: z
    .file()
    .min(1, 'Banner is required')
    .max(1024 * 1024 * 3, {
      abort: true,
      error: `Banner size should be less than 3MB`,
    })
    .mime(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], {
      abort: true,
      error: `Banner should be an image`,
    }),
});
