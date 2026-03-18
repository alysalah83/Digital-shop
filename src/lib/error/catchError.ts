import { toAppError } from "./convertErrorToAppError";

export function catchError<TArgs extends any[], TReturn>(
  handler: (...args: TArgs) => Promise<TReturn>,
  fallbackMessage?: string,
  fallbackStatus?: number,
): (...args: TArgs) => Promise<TReturn> {
  return async function (...args: TArgs): Promise<TReturn> {
    try {
      return await handler(...args);
    } catch (error) {
      throw toAppError(error, fallbackMessage, fallbackStatus);
    }
  };
}
