/**
 * Node modules
 */
import { pinoLogger } from 'hono-pino';

/**
 * Lib
 */
import { logger } from '@/lib';

export default function appLogger() {
  return pinoLogger({ pino: logger });
}
