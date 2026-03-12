export function reportError(error: unknown, context?: Record<string, any>) {
  // Centralized error reporting function.
  // Can be connected to Sentry or other error tracking services in the future.
  if (context) {
    console.error(error, context);
  } else {
    console.error(error);
  }
}
