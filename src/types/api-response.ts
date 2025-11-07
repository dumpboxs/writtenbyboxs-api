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
  createdAt: Date;
  updatedAt: Date;
};
