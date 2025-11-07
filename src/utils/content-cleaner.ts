/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export const contentCleaner = (content: string): string => {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  return purify.sanitize(content);
};
