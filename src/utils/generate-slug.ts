/**
 * Generate a random slug from a title (e.g. my-title-abc123)
 * @param title The title to generate a slug from
 * @returns A random slug
 */
export const generateSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const randomChars = Math.random().toString(36).substring(2, 8);
  const slugUri = encodeURIComponent(slug);
  const uniqueSlug = `${slugUri}-${randomChars}`;

  return uniqueSlug;
};
