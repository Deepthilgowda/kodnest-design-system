/**
 * Job Notification Tracker — Saved
 * Clean premium empty state.
 */

import { EmptyState } from '../components/EmptyState';

export function SavedPage() {
  return (
    <main className="kn-page">
      <h1 className="kn-page__heading">Saved</h1>
      <EmptyState
        title="Nothing saved yet"
        message="Jobs you save will appear here."
      />
    </main>
  );
}
