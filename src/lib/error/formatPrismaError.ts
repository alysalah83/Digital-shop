import { Prisma } from "@/generated/prisma/client";
import { AppError } from "./AppError";
import { PRISMA_ERROR_MESSAGE_BY_CODE } from "./error.const";

export function formatPrismaError(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientUnknownRequestError,
): AppError {
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new AppError("Invalid data format.", 400, {
      code: "PRISMA_VALIDATION",
      cause: error,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const message =
      PRISMA_ERROR_MESSAGE_BY_CODE[error.code] ?? "A database error occurred.";
    const status =
      error.code === "P2025" ? 404 : error.code === "P2002" ? 409 : 400;

    return new AppError(message, status, { code: error.code, cause: error });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new AppError("Database connection failed.", 503, {
      code: "PRISMA_INIT",
      cause: error,
    });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new AppError("Database engine crashed.", 500, {
      code: "PRISMA_PANIC",
      cause: error,
    });
  }

  return new AppError("A database error occurred.", 500, {
    code: "PRISMA_UNKNOWN",
    cause: error,
  });
}
