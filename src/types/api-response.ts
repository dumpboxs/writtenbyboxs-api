export type ApiErrorResponse = {
  success: false;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
};

export type ApiSuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });

export type BlogBanner = {
  id: string;
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  status: 'PUBLISHED' | 'DRAFT';
  author: {
    id: string;
    name: string;
    image: string | null;
    username: string | null;
  };
  banner: BlogBanner;
  createdAt: string;
  updatedAt: string;
};
