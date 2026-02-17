/**
 * Job Notification Tracker — Job card for dashboard and saved
 */

import type { Job } from '../types/job';
import { formatPostedDaysAgo } from '../utils/format';
import { isJobSaved, saveJobId, unsaveJobId } from '../utils/savedJobs';
import { getJobStatus, setJobStatus, type JobStatus } from '../utils/jobStatus';
import { useState } from 'react';

type JobCardProps = {
  job: Job;
  onView: (job: Job) => void;
  onSavedChange?: () => void;
  onStatusChange?: (status: JobStatus) => void;
  showUnsave?: boolean;
};

export function JobCard({ job, onView, onSavedChange, onStatusChange, showUnsave }: JobCardProps) {
  const saved = isJobSaved(job.id);
  const [status, setStatus] = useState<JobStatus>(getJobStatus(job.id));
  const [showToast, setShowToast] = useState(false);

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

  function handleStatusChange(newStatus: JobStatus) {
    if (newStatus === status) return;
    setJobStatus(job.id, newStatus);
    setStatus(newStatus);
    onStatusChange?.(newStatus);

    // Simple toast logic
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  const getStatusColorClass = (s: JobStatus) => {
    switch (s) {
      case 'Applied': return 'kn-badge--blue';
      case 'Rejected': return 'kn-badge--red';
      case 'Selected': return 'kn-badge--green';
      default: return '';
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'kn-badge--shipped'; // Greenish
    if (score >= 60) return 'kn-badge--in-progress'; // Amberish
    if (score >= 40) return ''; // Neutral (default border)
    return 'kn-badge--not-started'; // Greyish
  };

  return (
    <article className="kn-job-card">
      <div className="kn-job-card__header">
        <div className="kn-job-card__title-section">
          <h3 className="kn-job-card__title">{job.title}</h3>
          <p className="kn-job-card__company">{job.company}</p>
          <div className="kn-job-card__meta">
            <span className="kn-job-card__location">{job.location}</span>
            <span className="kn-job-card__sep">•</span>
            <span className="kn-job-card__mode">{job.mode}</span>
            <span>+</span>
            <span className="kn-job-card__exp">{job.experience}</span>
          </div>
          <div className="kn-job-card__badges-secondary">
            {(job as any).matchScore !== undefined && (
              <span className={`kn-badge kn-badge--sm ${getScoreColorClass((job as any).matchScore)}`}>
                {(job as any).matchScore}% Match
              </span>
            )}
            <span className={`kn-job-card__source kn-job-card__source--${job.source.toLowerCase()}`}>
              {job.source}
            </span>
          </div>
        </div>

        {status !== 'Not Applied' && (
          <div className="kn-job-card__status-badge-container">
            <span className={`kn-badge kn-job-card__status-badge ${getStatusColorClass(status)}`}>
              {status}
            </span>
          </div>
        )}
      </div>
      <div className="kn-job-card__row">
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

      <div className="kn-job-card__status-actions">
        <span className="kn-job-card__status-label">Status:</span>
        <div className="kn-btn-group">
          {(['Not Applied', 'Applied', 'Rejected', 'Selected'] as JobStatus[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`kn-btn kn-btn--xs ${status === s ? 'kn-btn--active' : 'kn-btn-secondary'}`}
              onClick={() => handleStatusChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {showToast && (
        <div className="kn-toast">
          Status updated: {status}
        </div>
      )}
    </article>
  );
}
