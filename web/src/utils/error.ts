/**
 * Centralized error reporting function.
 * All unhandled exceptions and catch blocks MUST route through this function
 * to ensure errors are not swallowed and can be easily integrated with
 * error tracking systems like Sentry in the future.
 *
 * @param error The error object or message to report
 * @param context Additional context about where the error occurred
 */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
    // In the future, this is where we'd add Sentry.captureException or similar

    // For now, we log to console with any additional context
    if (context && Object.keys(context).length > 0) {
        console.error('[ErrorReporter]', error, context);
    } else {
        console.error('[ErrorReporter]', error);
    }
}
