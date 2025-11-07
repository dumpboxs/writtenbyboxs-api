/**
 * Node modules
 */
import { createFactory } from 'hono/factory';

export default createFactory({
  defaultAppOptions: {
    strict: false,
  },
});
