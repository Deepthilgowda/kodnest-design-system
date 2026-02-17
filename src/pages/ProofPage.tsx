/**
 * Job Notification Tracker — Proof
 * Placeholder for artifact collection.
 */

import { useState, useEffect } from 'react';
import { PROJECT_STEPS, getPassedTestIds, TOTAL_TESTS, getArtifacts, setArtifacts } from '../utils/testStatus';
import type { ProjectArtifacts } from '../utils/testStatus';

export function ProofPage() {
  const [artifacts, setLocalArtifacts] = useState<ProjectArtifacts>({
    lovable: '',
    github: '',
    vercel: ''
  });
  const [passCount, setPassCount] = useState(0);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    setLocalArtifacts(getArtifacts());
    setPassCount(getPassedTestIds().length);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...artifacts, [name]: value };
    setLocalArtifacts(next);
    setArtifacts(next);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopy = () => {
    const submissionText = `
Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovable || '[Missing]'}

GitHub Repository:
${artifacts.github || '[Missing]'}

Live Deployment:
${artifacts.vercel || '[Missing]'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

    navigator.clipboard.writeText(submissionText).then(() => {
      setCopyStatus('Copied to clipboard!');
      setTimeout(() => setCopyStatus(null), 3000);
    });
  };

  return (
    <section className="kn-container">
      <header className="kn-page__header" style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="kn-page__heading">Final Proof</h1>
        <p className="kn-page__subheading">Review your progress and collect artifacts for submission.</p>
      </header>

      <div className="kn-grid kn-grid--2" style={{ gap: 'var(--space-6)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {/* A) Step Completion Summary */}
        <section className="kn-card">
          <h2 className="kn-card__title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>A) Step Completion Summary</span>
            <span className="kn-badge kn-badge--primary" style={{ fontSize: '0.8rem' }}>
              {passCount === TOTAL_TESTS ? 'Verified' : `${passCount}/${TOTAL_TESTS} Tests`}
            </span>
          </h2>
          <div className="kn-digest-list">
            {PROJECT_STEPS.map((step, index) => {
              // Logic: Step 7 is Verification (TestPage), Step 8 is Proof (this page)
              // We can simulate completion based on current state.
              let isCompleted = true; // Most steps are assumed done if we are here
              if (step.id === 's7') isCompleted = passCount === TOTAL_TESTS;
              if (step.id === 's8') isCompleted = artifacts.lovable && artifacts.github && artifacts.vercel ? true : false;

              return (
                <div key={step.id} className="kn-digest-item" style={{ padding: 'var(--space-3) var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: 500, opacity: isCompleted ? 1 : 0.6 }}>
                      {index + 1}. {step.label}
                    </span>
                    <span style={{
                      color: isCompleted ? 'var(--color-success)' : 'var(--color-warning)',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {isCompleted ? '✓ Completed' : '○ Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* B) Artifact Collection Inputs */}
        <section className="kn-card">
          <h2 className="kn-card__title" style={{ marginBottom: 'var(--space-4)' }}>B) Artifact Collection</h2>
          <div className="kn-settings-form" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="kn-form-group">
              <label className="kn-label" htmlFor="lovable">Lovable Project Link</label>
              <input
                type="url"
                id="lovable"
                name="lovable"
                className={`kn-input ${artifacts.lovable && !isValidUrl(artifacts.lovable) ? 'kn-input--error' : ''}`}
                placeholder="https://lovable.dev/projects/..."
                value={artifacts.lovable}
                onChange={handleChange}
              />
              {artifacts.lovable && !isValidUrl(artifacts.lovable) && (
                <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>Invalid URL format</p>
              )}
            </div>

            <div className="kn-form-group">
              <label className="kn-label" htmlFor="github">GitHub Repository Link</label>
              <input
                type="url"
                id="github"
                name="github"
                className={`kn-input ${artifacts.github && !isValidUrl(artifacts.github) ? 'kn-input--error' : ''}`}
                placeholder="https://github.com/username/repo"
                value={artifacts.github}
                onChange={handleChange}
              />
              {artifacts.github && !isValidUrl(artifacts.github) && (
                <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>Invalid URL format</p>
              )}
            </div>

            <div className="kn-form-group">
              <label className="kn-label" htmlFor="vercel">Deployed URL (Vercel/Live)</label>
              <input
                type="url"
                id="vercel"
                name="vercel"
                className={`kn-input ${artifacts.vercel && !isValidUrl(artifacts.vercel) ? 'kn-input--error' : ''}`}
                placeholder="https://your-project.vercel.app"
                value={artifacts.vercel}
                onChange={handleChange}
              />
              {artifacts.vercel && !isValidUrl(artifacts.vercel) && (
                <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>Invalid URL format</p>
              )}
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <button
                className="kn-btn kn-btn-primary"
                style={{ width: '100%' }}
                onClick={handleCopy}
                disabled={!artifacts.lovable || !artifacts.github || !artifacts.vercel}
              >
                {copyStatus || 'Copy Final Submission'}
              </button>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-2)' }}>
                All 3 links must be provided to export.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
