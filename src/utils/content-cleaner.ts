/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);
export const contentCleaner = (content: string): string => {
  return purify.sanitize(content);
};
