/**
 * Job Notification Tracker — Saved jobs from localStorage
 * Premium empty state when none saved.
 */

import { useMemo, useState } from 'react';
import { JOBS } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { EmptyState } from '../components/EmptyState';
import { getSavedJobIds } from '../utils/savedJobs';
import type { Job } from '../types/job';

export function SavedPage() {
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [savedVersion, setSavedVersion] = useState(0);

  const savedIds = useMemo(() => getSavedJobIds(), [savedVersion]);
  const savedJobs = useMemo(
    () => JOBS.filter((j) => savedIds.includes(j.id)),
    [savedIds]
  );

  return (
    <section className="kn-container">
      <h1 className="kn-page__heading">Saved</h1>
      {savedJobs.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          message="Save jobs from the Dashboard and they’ll appear here. Your list stays in this browser until you clear it."
        />
      ) : (
        <>
          <p className="kn-page__subtext">{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved</p>
          <div className="kn-job-grid">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={setViewJob}
                onSavedChange={() => setSavedVersion((v) => v + 1)}
                onStatusChange={() => setSavedVersion((v) => v + 1)}
                showUnsave
              />
            ))}
          </div>
          <JobModal job={viewJob} onClose={() => setViewJob(null)} />
        </>
      )}
    </section>
  );
}
