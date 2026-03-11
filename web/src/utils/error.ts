/**
 * Centralized error reporting function.
 * Ensures all unexpected errors and catch blocks funnel through a single point.
 */
export function reportError(error: unknown, context?: Record<string, any>) {
    const errorData = {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context,
        timestamp: new Date().toISOString(),
    };

    // If Sentry was available, it would be called here: Sentry.captureException(error, { extra: context })
    console.error('[ErrorReporter]', errorData);
}
