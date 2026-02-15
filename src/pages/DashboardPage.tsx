/**
 * Job Notification Tracker — Dashboard
 * Job cards, filter bar, View modal, Save, Apply.
 */

import { useMemo, useState } from 'react';
import { JOBS } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { FilterBar } from '../components/FilterBar';
import { filterAndSortJobs, getUniqueLocations } from '../utils/filterJobs';
import type { Job } from '../types/job';
import type { SortOption } from '../utils/filterJobs';

const DEFAULT_SORT: SortOption = 'latest';

export function DashboardPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('');
  const [experience, setExperience] = useState('');
  const [source, setSource] = useState('');
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [, setSavedVersion] = useState(0);

  const locations = useMemo(() => getUniqueLocations(JOBS), []);

  const filteredJobs = useMemo(
    () =>
      filterAndSortJobs(JOBS, {
        keyword,
        location,
        mode,
        experience,
        source,
        sort,
      }),
    [keyword, location, mode, experience, source, sort]
  );

  return (
    <main className="kn-page">
      <h1 className="kn-page__heading">Dashboard</h1>
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
        locations={locations}
      />
      <div className="kn-job-grid">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onView={setViewJob}
            onSavedChange={() => setSavedVersion((v) => v + 1)}
          />
        ))}
      </div>
      {filteredJobs.length === 0 && (
        <div className="kn-empty-state">
          <h2 className="kn-empty-state__title">No jobs match your filters</h2>
          <p className="kn-empty-state__message">
            Try adjusting the search or filter criteria.
          </p>
        </div>
      )}
      <JobModal job={viewJob} onClose={() => setViewJob(null)} />
    </main>
  );
}
