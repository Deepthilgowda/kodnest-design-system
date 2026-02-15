/**
 * Job Notification Tracker — Digest
 * Clean premium empty state.
 */

import { EmptyState } from '../components/EmptyState';

export function DigestPage() {
  return (
    <main className="kn-page">
      <h1 className="kn-page__heading">Digest</h1>
      <EmptyState
        title="No digest yet"
        message="Your daily job digest will arrive at 9AM once you start tracking."
      />
    </main>
  );
}
