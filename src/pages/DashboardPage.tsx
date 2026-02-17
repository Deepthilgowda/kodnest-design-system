/**
 * Job Notification Tracker — Dashboard
 * Job cards, filter bar, View modal, Save, Apply.
 */

import { useMemo, useState, useEffect } from 'react';
import { JOBS } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { FilterBar } from '../components/FilterBar';
import { filterAndSortJobs, getUniqueLocations, type SortOption } from '../utils/filterJobs';
import { getPreferences, type Preferences } from '../utils/preferences';
import type { Job } from '../types/job';
import { Link } from 'react-router-dom';


const DEFAULT_SORT: SortOption = 'latest';

export function DashboardPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('');
  const [experience, setExperience] = useState('');
  const [source, setSource] = useState('');
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [status, setStatus] = useState('');
  const [showMatchesOnly, setShowMatchesOnly] = useState(false);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [savedVersion, setSavedVersion] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>(getPreferences());

  // Refresh preferences when page focuses or on mount
  useEffect(() => {
    const handleFocus = () => {
      const saved = localStorage.getItem('jobTrackerPreferences');
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const locations = useMemo(() => getUniqueLocations(JOBS), []);

  const jobsWithScores = useMemo(() => {
    return filterAndSortJobs(JOBS, {
      keyword,
      location,
      mode,
      experience,
      source,
      sort,
      status,
      showMatchesOnly,
    }, preferences);
  }, [keyword, location, mode, experience, source, sort, status, showMatchesOnly, preferences, savedVersion]);

  const handleClearAll = () => {
    setKeyword('');
    setLocation('');
    setMode('');
    setExperience('');
    setSource('');
    setStatus('');
    setShowMatchesOnly(false);
  };

  const isPreferencesSet = preferences.roleKeywords.length > 0 || preferences.skills.length > 0;

  return (
    <main className="kn-page">
      <h1 className="kn-page__heading">Dashboard</h1>

      {!isPreferencesSet && (
        <div className="kn-banner">
          <p className="kn-banner__text">
            Set your preferences to activate intelligent matching.
          </p>
          <Link to="/settings" className="kn-btn kn-btn-secondary kn-btn--sm">
            Go to Settings
          </Link>
        </div>
      )}

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        location={location}
        onLocationChange={setLocation}
        mode={mode}
        onModeChange={setMode}
        experience={experience}
        onExperienceChange={setExperience}
        source={source}
        onSourceChange={setSource}
        sort={sort}
        onSortChange={(v) => setSort(v as SortOption)}
        status={status}
        onStatusChange={setStatus}
        locations={locations}
        showMatchesOnly={showMatchesOnly}
        onShowMatchesOnlyChange={setShowMatchesOnly}
        onClearAll={handleClearAll}
      />

      <div className="kn-job-grid">
        {jobsWithScores.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onView={setViewJob}
            onSavedChange={() => setSavedVersion((v) => v + 1)}
            onStatusChange={() => setSavedVersion((v) => v + 1)}
          />
        ))}
      </div>

      {jobsWithScores.length === 0 && (
        <div className="kn-empty-state">
          <h2 className="kn-empty-state__title">
            {showMatchesOnly
              ? "No roles match your criteria."
              : "No jobs match your filters."}
          </h2>
          <p className="kn-empty-state__message">
            {showMatchesOnly
              ? "No roles match your criteria. Adjust filters or lower threshold."
              : "Try adjusting the search or filter criteria."}
          </p>
        </div>
      )}

      <JobModal job={viewJob} onClose={() => setViewJob(null)} />
    </main>
  );
}
