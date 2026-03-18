import { AppError } from "./AppError";
import { formatPrismaError } from "./formatPrismaError";
import { isPrismaError } from "./isPrismaError";

export function toAppError(
  error: unknown,
  fallbackMessage = "An unexpected error occurred.",
  fallbackStatus = 500,
): AppError {
  if (error instanceof AppError) return error;

  if (isPrismaError(error)) return formatPrismaError(error);

  if (error instanceof Error) {
    return new AppError(error.message || fallbackMessage, fallbackStatus, {
      cause: error,
    });
  }

  return new AppError(fallbackMessage, fallbackStatus, { cause: error });
}
