/**
 * Job Notification Tracker — Digest
 * Premium daily engine with persistence and action buttons.
 */

import { useState, useEffect, useMemo } from 'react';
import { JOBS } from '../data/jobs';
import { getPreferences } from '../utils/preferences';
import { calculateMatchScore } from '../utils/scoring';
import type { JobWithScore } from '../utils/filterJobs';
import { getJobStatuses } from '../utils/jobStatus';

export function DigestPage() {
  const [digest, setDigest] = useState<JobWithScore[] | null>(null);
  const [dateStr] = useState(new Date().toISOString().split('T')[0]);
  const storageKey = `jobTrackerDigest_${dateStr}`;

  const preferences = useMemo(() => getPreferences(), []);
  const isPreferencesSet = preferences.roleKeywords.length > 0 || preferences.skills.length > 0;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setDigest(JSON.parse(saved));
    }
  }, [storageKey]);

  const generateDigest = () => {
    const scoredJobs: JobWithScore[] = JOBS.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences)
    }));

    // Select top 10: matchScore desc, postedDaysAgo asc
    const topJobs = scoredJobs
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        return a.postedDaysAgo - b.postedDaysAgo;
      })
      .slice(0, 10);

    setDigest(topJobs);
    localStorage.setItem(storageKey, JSON.stringify(topJobs));
  };

  const [copied, setCopied] = useState(false);

  const formattedDigestText = digest?.map((j, i) =>
    `${i + 1}. ${j.title} @ ${j.company}\n   ${j.location} | ${j.experience} | Score: ${j.matchScore}%\n`
  ).join('\n') || '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My 9AM Job Digest - ${dateStr}\n\n${formattedDigestText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoUrl = useMemo(() => {
    if (!digest || digest.length === 0) return '';

    const subjectText = "My 9AM Job Digest";
    let maxJobs = digest.length;
    let url = "";

    // Windows/Chrome strictly caps mailto links. 800 is extremely safe.
    while (maxJobs >= 0) {
      if (maxJobs === 0) {
        url = `mailto:?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent("Check your dashboard for today's matches.")}`;
        break;
      }

      const bodyText = digest.slice(0, maxJobs).map(job =>
        `${job.title} at ${job.company}\nLocation: ${job.location} | Exp: ${job.experience} | Match: ${job.matchScore}%\nApply: ${job.applyUrl || ""}`
      ).join("\n\n");

      const subject = encodeURIComponent(subjectText);
      const body = encodeURIComponent(bodyText);
      url = `mailto:?subject=${subject}&body=${body}`;

      if (url.length < 800) break;
      maxJobs--;
    }
    return url;
  }, [digest]);


  if (!isPreferencesSet) {
    return (
      <section className="kn-page-section">
        <h1 className="kn-page__heading">Digest</h1>
        <div className="kn-empty-state">
          <h2 className="kn-empty-state__title">Set preferences to generate a personalized digest.</h2>
          <p className="kn-empty-state__message">We need your keywords and skills to find the best roles for you.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="kn-digest-page">
      <div className="kn-digest-header-actions" style={{ maxWidth: 'none' }}>
        <h1 className="kn-page__heading">Daily Digest</h1>
        {!digest && (
          <button onClick={generateDigest} className="kn-btn kn-btn-primary">
            Generate Today's 9AM Digest (Simulated)
          </button>
        )}
        {digest && (
          <div className="kn-digest-actions">
            <button onClick={copyToClipboard} className="kn-btn kn-btn-secondary kn-btn--sm">
              {copied ? 'Copied!' : 'Copy Digest to Clipboard'}
            </button>
            <a href={mailtoUrl} className="kn-btn kn-btn-secondary kn-btn--sm" style={{ textDecoration: 'none' }}>
              Create Email Draft
            </a>
          </div>
        )}
      </div>



      <div className="kn-digest-simulation-note">
        Demo Mode: Daily 9AM trigger simulated manually.
      </div>

      {!digest && (
        <div className="kn-empty-state">
          <p className="kn-empty-state__message">Click the button above to simulate your daily 9AM briefing.</p>
        </div>
      )}

      {digest && digest.length === 0 && (
        <div className="kn-empty-state">
          <h2 className="kn-empty-state__title">No matching roles today. Check again tomorrow.</h2>
        </div>
      )}

      {digest && digest.length > 0 && (
        <div className="kn-digest-container" style={{ maxWidth: 'none' }}>
          <div className="kn-digest-card">
            <header className="kn-digest-card__header">
              <h2 className="kn-digest-card__title">Top 10 Jobs For You — 9AM Digest</h2>
              <p className="kn-digest-card__date">{dateStr}</p>
            </header>

            <div className="kn-digest-list">
              {digest.map((job) => (
                <div key={job.id} className="kn-digest-item">
                  <div className="kn-digest-item__main">
                    <h3 className="kn-digest-item__title">{job.title}</h3>
                    <p className="kn-digest-item__meta">{job.company} • {job.location} • {job.experience}</p>
                  </div>
                  <div className="kn-digest-item__side">
                    <div className="kn-score-badge">
                      <span className="kn-score-badge__value">{job.matchScore}</span>
                      <span className="kn-score-badge__label">Match</span>
                    </div>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="kn-btn kn-btn-primary kn-btn--sm">
                      Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <footer className="kn-digest-card__footer">
              This digest was generated based on your preferences.
            </footer>
          </div>

          <div className="kn-digest-card" style={{ marginTop: 'var(--space-4)' }}>
            <header className="kn-digest-card__header">
              <h2 className="kn-digest-card__title">Recent Status Updates</h2>
            </header>
            <div className="kn-digest-list">
              {(() => {
                const jobStatuses = getJobStatuses();
                const updates = Object.entries(jobStatuses)
                  .map(([jobId, entry]) => {
                    const job = JOBS.find(j => j.id === jobId);
                    return {
                      jobId,
                      jobTitle: job?.title || 'Unknown Role',
                      company: job?.company || 'Unknown Company',
                      status: entry.status,
                      date: entry.date
                    };
                  })
                  .sort((a, b) => b.date - a.date);

                if (updates.length === 0) {
                  return (
                    <div className="kn-digest-item" style={{ justifyContent: 'center' }}>
                      <p className="kn-empty-state__message">No recent status updates.</p>
                    </div>
                  );
                }

                return updates.map((update, idx) => (
                  <div key={`${update.jobId}-${idx}`} className="recent-status-card">
                    <div className="recent-status-header">
                      <div className="recent-status-info">
                        <div className="job-title" style={{ fontWeight: 600, fontSize: '1rem' }}>{update.jobTitle}</div>
                        <div className="company" style={{ color: 'var(--color-text-muted)' }}>{update.company}</div>
                      </div>
                      <div className="recent-status-side">
                        <div className="recent-status-badge">
                          <span className={`kn-badge kn-badge--sm ${update.status === 'Applied' ? 'kn-badge--blue' :
                            update.status === 'Rejected' ? 'kn-badge--red' :
                              update.status === 'Selected' ? 'kn-badge--green' : ''
                            }`}>
                            {update.status}
                          </span>
                        </div>
                        <div className="recent-status-date">
                          {new Date(update.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

