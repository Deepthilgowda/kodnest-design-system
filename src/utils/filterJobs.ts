/**
 * Job Notification Tracker — Filter and sort jobs (basic logic)
 */

import type { Job } from '../types/job';

export type SortOption = 'latest' | 'oldest' | 'company';

export function filterAndSortJobs(
  jobs: Job[],
  filters: {
    keyword: string;
    location: string;
    mode: string;
    experience: string;
    source: string;
    sort: SortOption;
  }
): Job[] {
  let result = [...jobs];

  const kw = filters.keyword.trim().toLowerCase();
  if (kw) {
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw)
    );
  }
  if (filters.location) {
    result = result.filter((j) => j.location === filters.location);
  }
  if (filters.mode) {
    result = result.filter((j) => j.mode === filters.mode);
  }
  if (filters.experience) {
    result = result.filter((j) => j.experience === filters.experience);
  }
  if (filters.source) {
    result = result.filter((j) => j.source === filters.source);
  }

  switch (filters.sort) {
    case 'latest':
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
      break;
    case 'oldest':
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
      break;
    case 'company':
      result.sort((a, b) => a.company.localeCompare(b.company));
      break;
    default:
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }

  return result;
}

export function getUniqueLocations(jobs: Job[]): string[] {
  const set = new Set(jobs.map((j) => j.location));
  return Array.from(set).sort();
}
