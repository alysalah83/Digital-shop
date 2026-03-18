type AppErrorOptions = {
  code?: string;
  cause?: unknown;
};

class AppError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly cause?: unknown;

  constructor(message: string, status = 500, options?: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = options?.code;
    this.cause = options?.cause;
  }
}

export { AppError };
