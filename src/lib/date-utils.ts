/**
 * Format date consistently for server and client to avoid hydration mismatches
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat('en-MY', {
    ...options,
    // Ensure consistent formatting
    hour12: options?.hour12 ?? true,
  });
  return formatter.format(dateObj);
}

/**
 * Format time consistently (12-hour format with AM/PM)
 * Uses explicit formatting to avoid hydration mismatches
 */
export function formatTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Format date consistently (long format)
 */
export function formatDateLong(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDate(dateObj, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date consistently (short format)
 */
export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDate(dateObj, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
