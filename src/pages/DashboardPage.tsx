/**
 * Job Notification Tracker — Dashboard
 * Clean empty state. No dataset yet.
 */

import { EmptyState } from '../components/EmptyState';

export function DashboardPage() {
  return (
    <main className="kn-page">
      <h1 className="kn-page__heading">Dashboard</h1>
      <EmptyState
        title="No jobs yet"
        message="In the next step, you will load a realistic dataset."
      />
    </main>
  );
}
