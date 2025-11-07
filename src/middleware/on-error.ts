/**
 * Node modules
 */
import { StatusCodes } from 'http-status-codes';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Types
 */
import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ApiErrorResponse } from '@/types';

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== StatusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : StatusCodes.INTERNAL_SERVER_ERROR;

  return c.json<ApiErrorResponse>(
    {
      success: false,
      message: err.message,
      details: {
        code: statusCode,
        message: err.message,
        url: c.req.url,
        path: c.req.path,
        method: c.req.method,
        timestamp: new Date().toISOString(),
      },
      stack: env.NODE_ENV === 'production' ? undefined : err.stack,
    },
    statusCode
  );
};

export default onError;
