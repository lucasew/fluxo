/**
 * Centralized error reporting function.
 * All unexpected, unhandled exceptions should route through this function.
 * Expected user-generated errors (e.g., validation errors) should NOT be sent here.
 */
export function reportError(error: unknown, context?: Record<string, any>) {
    // Determine the error message and stack if available
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;

    // Build the payload
    const payload = {
        message: errorMessage,
        stack,
        context,
        timestamp: new Date().toISOString(),
    };

    // Placeholder for a real error tracker (e.g. Sentry)
    // If Sentry is added later, this is where Sentry.captureException(error, { extra: context }) would go.

    // In the meantime, log it with context so we don't lose the information
    // We use console.error here as this is the single centralized place allowed to do so.
    // eslint-disable-next-line no-console
    console.error('[ErrorReport]', payload);
}
