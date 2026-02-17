/**
 * Job Notification Tracker — Filter bar (keyword, location, mode, experience, source, sort)
 */

import type { JobExperience, JobMode, JobSource } from '../types/job';

type FilterBarProps = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  location: string;
  onLocationChange: (v: string) => void;
  mode: string;
  onModeChange: (v: string) => void;
  experience: string;
  onExperienceChange: (v: string) => void;
  source: string;
  onSourceChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  locations: string[];
  showMatchesOnly?: boolean;
  onShowMatchesOnlyChange?: (v: boolean) => void;
};

const MODES: JobMode[] = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCES: JobExperience[] = ['Fresher', '0-1', '1-3', '3-5'];
const SOURCES: JobSource[] = ['LinkedIn', 'Naukri', 'Indeed'];
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'match-score', label: 'Match Score' },
  { value: 'salary', label: 'Salary' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'company', label: 'Company A–Z' },
];

export function FilterBar({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  mode,
  onModeChange,
  experience,
  onExperienceChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
  locations,
  showMatchesOnly,
  onShowMatchesOnlyChange,
}: FilterBarProps) {
  return (
    <div className="kn-filter-bar">
      <div className="kn-filter-bar__top">
        <input
          type="search"
          className="kn-input kn-filter-bar__search"
          placeholder="Search title or company..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          aria-label="Search jobs by title or company"
        />
        <div className="kn-filter-bar__toggle-container">
          <label className="kn-toggle">
            <input
              type="checkbox"
              checked={showMatchesOnly}
              onChange={(e) => onShowMatchesOnlyChange?.(e.target.checked)}
            />
            <span className="kn-toggle__label">Show only jobs above my threshold</span>
          </label>
        </div>
      </div>
      <div className="kn-filter-bar__filters">
        <select
          className="kn-input kn-filter-bar__select"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label="Filter by location"
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          className="kn-input kn-filter-bar__select"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
          aria-label="Filter by mode"
        >
          <option value="">All modes</option>
          {MODES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="kn-input kn-filter-bar__select"
          value={experience}
          onChange={(e) => onExperienceChange(e.target.value)}
          aria-label="Filter by experience"
        >
          <option value="">All experience</option>
          {EXPERIENCES.map((exp) => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>
        <select
          className="kn-input kn-filter-bar__select"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          aria-label="Filter by source"
        >
          <option value="">All sources</option>
          {SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="kn-input kn-filter-bar__select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort jobs"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
