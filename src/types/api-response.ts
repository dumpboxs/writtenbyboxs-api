export type ApiErrorResponse = {
  success: false;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
};
