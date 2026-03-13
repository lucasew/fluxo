export function reportError(error: unknown) {
  // Centralized error reporting
  // Future: Wire to Sentry or another reporting backend
  console.error('[Reported Error]:', error);
}
