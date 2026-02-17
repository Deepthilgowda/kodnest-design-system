/**
 * Job Notification Tracker — Modal for job description + skills
 */

import type { Job } from '../types/job';
import { useEffect } from 'react';

type JobModalProps = {
  job: Job | null;
  onClose: () => void;
};

export function JobModal({ job, onClose }: JobModalProps) {
  useEffect(() => {
    if (!job) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [job, onClose]);

  if (!job) return null;

  return (
    <div className="kn-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
      <div className="kn-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kn-modal__header">
          <h2 id="job-modal-title" className="kn-modal__title">{job.title}</h2>
          <button type="button" className="kn-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="kn-modal__company">{job.company}</p>
        <div className="kn-modal__meta">
          <span>{job.location}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>{job.mode}</span>
          <span>+</span>
          <span>{job.experience}</span>
        </div>
        <div className="kn-modal__section">
          <h4 className="kn-modal__label">Description</h4>
          <p className="kn-modal__description">{job.description}</p>
        </div>
        <div className="kn-modal__section">
          <h4 className="kn-modal__label">Skills</h4>
          <div className="kn-modal__skills">
            {job.skills.map((s) => (
              <span key={s} className="kn-modal__skill-tag">{s}</span>
            ))}
          </div>
        </div>
        <div className="kn-modal__footer">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="kn-btn kn-btn-primary">
            Apply on company site
          </a>
        </div>
      </div>
    </div>
  );
}
