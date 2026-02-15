/**
 * Job Notification Tracker — Job card for dashboard and saved
 */

import type { Job } from '../types/job';
import { formatPostedDaysAgo } from '../utils/format';
import { isJobSaved, saveJobId, unsaveJobId } from '../utils/savedJobs';

type JobCardProps = {
  job: Job;
  onView: (job: Job) => void;
  onSavedChange?: () => void;
  showUnsave?: boolean;
};

export function JobCard({ job, onView, onSavedChange, showUnsave }: JobCardProps) {
  const saved = isJobSaved(job.id);

  function handleSave() {
    if (saved) {
      unsaveJobId(job.id);
    } else {
      saveJobId(job.id);
    }
    onSavedChange?.();
  }

  function handleApply() {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <article className="kn-job-card">
      <div className="kn-job-card__header">
        <h3 className="kn-job-card__title">{job.title}</h3>
        <span className={`kn-job-card__source kn-job-card__source--${job.source.toLowerCase()}`}>
          {job.source}
        </span>
      </div>
      <p className="kn-job-card__company">{job.company}</p>
      <div className="kn-job-card__meta">
        <span className="kn-job-card__location">{job.location}</span>
        <span className="kn-job-card__sep">·</span>
        <span className="kn-job-card__mode">{job.mode}</span>
      </div>
      <div className="kn-job-card__row">
        <span className="kn-job-card__exp">Exp: {job.experience}</span>
        <span className="kn-job-card__salary">{job.salaryRange}</span>
      </div>
      <p className="kn-job-card__posted">{formatPostedDaysAgo(job.postedDaysAgo)}</p>
      <div className="kn-job-card__actions">
        <button type="button" className="kn-btn kn-btn-secondary kn-job-card__btn" onClick={() => onView(job)}>
          View
        </button>
        <button
          type="button"
          className={`kn-btn kn-job-card__btn ${saved ? 'kn-btn-saved' : 'kn-btn-secondary'}`}
          onClick={handleSave}
        >
          {saved ? (showUnsave ? 'Unsave' : 'Saved') : 'Save'}
        </button>
        <button type="button" className="kn-btn kn-btn-primary kn-job-card__btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </article>
  );
}
