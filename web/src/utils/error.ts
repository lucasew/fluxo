/**
 * Centralized error reporting utility for unexpected errors.
 * This should be used for unhandled exceptions, not expected user errors (like validation).
 */
export function reportError(error: Error | unknown, context?: Record<string, unknown>) {
    // In the future, this would integrate with Sentry or similar:
    // Sentry.captureException(error, { extra: context })

    // eslint-disable-next-line no-console
    console.error('[Centralized Error Reporter]', error, context ? `Context: ${JSON.stringify(context)}` : '');
}
