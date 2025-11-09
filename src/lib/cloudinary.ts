/**
 * Node modules
 */
import { v2 as cloudinary } from 'cloudinary';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Lib
 */
import { logger } from '@/lib';

/**
 * Types
 */
import type { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: env.NODE_ENV === 'production',
});

const uploadToCloudinary = (
  buffer: Buffer<ArrayBufferLike>,
  publicId?: string
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
          resource_type: 'image',
          folder: 'writtenbyboxs-api',
          public_id: publicId,
          transformation: { quality: 'auto' },
        },
        (err, result) => {
          if (err) {
            logger.error(err, 'Error uploading image to Cloudinary');

            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(err);
          }

          resolve(result);
        }
      )
      .end(buffer);
  });
};

export default uploadToCloudinary;
