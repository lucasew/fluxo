export function formatBytes(bytes: number | string | null | undefined, decimals = 2): string {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(n) / Math.log(k));

  return parseFloat((n / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatSpeed(bytesPerSec: number): string {
  return formatBytes(bytesPerSec) + '/s';
}

export function formatTime(seconds: number | null | undefined): string {
    if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return 'Unknown';
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

    return parts.slice(0, 2).join(' ') || 'Unknown';
}
