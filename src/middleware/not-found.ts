/**
 * Node modules
 */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/**
 * Types
 */
import type { NotFoundHandler } from 'hono';
import type { ApiErrorResponse } from '@/types';

const notFound: NotFoundHandler = c => {
  return c.json<ApiErrorResponse>(
    {
      success: false,
      message: `${ReasonPhrases.NOT_FOUND} - ${c.req.path}`,
      details: {
        code: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
        url: c.req.url,
        path: c.req.path,
        method: c.req.method,
        timestamp: new Date().toISOString(),
      },
    },
    StatusCodes.NOT_FOUND
  );
};

export default notFound;
