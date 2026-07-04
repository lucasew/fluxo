/**
 * Centralized error reporting function.
 * All unhandled or unexpected errors should be funneled through this function
 * instead of calling console.error or other reporting mechanisms directly.
 */
export function reportError(error: any, context?: Record<string, any>) {
    // In a real application, this would send the error to Sentry, DataDog, etc.
    // For now, we just log it to the console with extra context.
    console.error('[Error Tracker]', error, context ? context : '');
}
