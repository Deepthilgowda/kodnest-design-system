/**
 * Job Notification Tracker — Format helpers
 */

export function formatPostedDaysAgo(days: number): string {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}
