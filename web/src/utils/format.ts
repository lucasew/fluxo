/**
 * Converts a raw byte count into a human-readable string with units (e.g., "1.5 MB").
 * Handles string inputs transparently (useful when dealing with GraphQL integer limits).
 *
 * @param bytes - The number of bytes. Accepts strings to prevent precision loss on massive files.
 * @param decimals - Maximum decimal places to show (defaults to 2). Negative values are clamped to 0.
 * @returns Formatted size string, or "0 B" for zero inputs.
 */
export function formatBytes(bytes: number | string, decimals = 2): string {
  if (bytes === 0 || bytes === '0') return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(Number(bytes)) / Math.log(k));

  return parseFloat((Number(bytes) / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Wraps `formatBytes` to display transfer rates.
 *
 * @param bytesPerSec - Current speed in bytes per second.
 * @returns Human-readable speed appended with "/s".
 */
export function formatSpeed(bytesPerSec: number): string {
  return formatBytes(bytesPerSec) + '/s';
}

/**
 * Converts a raw duration in seconds into a concise readable string.
 * Truncates output to the two most significant time units to keep UI clean
 * (e.g., returns "1d 12h" instead of "1d 12h 5m 30s").
 *
 * @param seconds - Total remaining duration in seconds.
 * @returns A formatted string or edge case constants ('Unknown' for negative values, 'Done' for zero).
 */
export function formatTime(seconds: number): string {
    if (seconds < 0) return 'Unknown';
    if (seconds === 0) return 'Done';

    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds - minutes * 60;

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0) parts.push(`${secs}s`);

    return parts.slice(0, 2).join(' ');
}
