/**
 * Job Notification Tracker — Settings
 * Preference management for match scoring.
 */

import { useState, useEffect } from 'react';
import { DEFAULT_PREFERENCES, getPreferences, savePreferences, type Preferences } from '../utils/preferences';
import type { JobMode, JobExperience } from '../types/job';

import { getUniqueLocations } from '../utils/filterJobs';
import { JOBS } from '../data/jobs';

const MODES: JobMode[] = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCES: JobExperience[] = ['Fresher', '0-1', '1-3', '3-5'];
const ALL_LOCATIONS = getUniqueLocations(JOBS);

export function SettingsPage() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Load preferences from localStorage on mount
  useEffect(() => {
    setPrefs(getPreferences());
  }, []);

  const handleSavePreferences = () => {
    savePreferences(prefs);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleRawChange = (
    field: 'roleKeywords' | 'skills',
    value: string
  ) => {
    const rawField = field === 'roleKeywords' ? 'rawRoleKeywords' : 'rawSkills';
    const parsedArray = value
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0);

    setPrefs((prev) => ({
      ...prev,
      [rawField]: value,
      [field]: parsedArray,
    }));
  };

  const handleToggle = (field: 'preferredMode' | 'preferredLocations', value: any) => {
    setPrefs((prev) => {
      const arr = (prev[field] as any[]) || [];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [field]: next };
    });
  };

  return (
    <section className="kn-settings-section">
      <div className="kn-settings-page__header">
        <h1 className="kn-settings-page__heading">Settings</h1>
        {saveStatus === 'saved' && (
          <span className="kn-settings-page__status">Saved</span>
        )}
      </div>
      <p className="kn-settings-page__subtext" style={{ maxWidth: 'none' }}>
        Configure your job preferences to activate intelligent matching.
      </p>

      <div className="kn-settings-page__form">
        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="role-keywords">
            Role Keywords
          </label>
          <input
            id="role-keywords"
            type="text"
            className="kn-input"
            placeholder="e.g. Frontend Developer, React Developer"
            value={prefs.rawRoleKeywords}
            onChange={(e) => handleRawChange('roleKeywords', e.target.value)}
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label">Preferred Locations</label>
          <div className="kn-form-field__options kn-form-field__options--scroll">
            {ALL_LOCATIONS.map((loc) => (
              <label key={loc} className="kn-form-field__option">
                <input
                  type="checkbox"
                  checked={prefs.preferredLocations.includes(loc)}
                  onChange={() => handleToggle('preferredLocations', loc)}
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label">Preferred Mode</label>
          <div className="kn-form-field__options">
            {MODES.map((mode) => (
              <label key={mode} className="kn-form-field__option">
                <input
                  type="checkbox"
                  checked={prefs.preferredMode.includes(mode)}
                  onChange={() => handleToggle('preferredMode', mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="experience">
            Experience level
          </label>
          <select
            id="experience"
            className="kn-input"
            value={prefs.experienceLevel}
            onChange={(e) =>
              setPrefs((prev) => ({
                ...prev,
                experienceLevel: e.target.value as JobExperience,
              }))
            }
          >
            <option value="">Select experience</option>
            {EXPERIENCES.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="skills">
            My Skills
          </label>
          <input
            id="skills"
            type="text"
            className="kn-input"
            placeholder="e.g. JavaScript, CSS, Node.js"
            value={prefs.rawSkills}
            onChange={(e) => handleRawChange('skills', e.target.value)}
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="min-score">
            Minimum Match Score: {prefs.minMatchScore}
          </label>
          <input
            id="min-score"
            type="range"
            min="0"
            max="100"
            className="kn-range"
            value={prefs.minMatchScore}
            onChange={(e) =>
              setPrefs((prev) => ({
                ...prev,
                minMatchScore: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="kn-settings-page__actions">
          <button
            type="button"
            className="kn-btn kn-btn-primary"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
