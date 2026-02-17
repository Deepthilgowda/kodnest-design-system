/**
 * Job Notification Tracker — Filter and sort jobs (integrated with Match Score)
 */

import type { Job } from '../types/job';
import { calculateMatchScore } from './scoring';
import type { Preferences } from './preferences';

export type SortOption = 'latest' | 'oldest' | 'company' | 'match-score' | 'salary';

export interface FilterOptions {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: SortOption;
  showMatchesOnly?: boolean;
}

export type JobWithScore = Job & { matchScore: number };

export function filterAndSortJobs(
  jobs: Job[],
  filters: FilterOptions,
  preferences: Preferences
): JobWithScore[] {
  // 1. Calculate scores and map to new type
  let result: JobWithScore[] = jobs.map((job) => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences),
  }));

  // 2. Apply "Show only matches" threshold filter
  if (filters.showMatchesOnly) {
    result = result.filter((j) => j.matchScore >= preferences.minMatchScore);
  }

  // 3. Apply other filters (AND behavior)
  const kw = filters.keyword.trim().toLowerCase();
  if (kw) {
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) ||
        j.description.toLowerCase().includes(kw)
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

  // 4. Sorting
  switch (filters.sort) {
    case 'match-score':
      result.sort((a, b) => b.matchScore - a.matchScore);
      break;
    case 'latest':
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
      break;
    case 'oldest':
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
      break;
    case 'company':
      result.sort((a, b) => a.company.localeCompare(b.company));
      break;
    case 'salary':
      // Extract numeric value for salary sorting
      const getSalaryValue = (range: string) => {
        const numbers = range.match(/\d+/g);
        if (!numbers) return 0;
        let val = parseInt(numbers[0]); // Use lower bound

        // Handle LPA (Lakhs Per Annum)
        if (range.toLowerCase().includes('lpa')) {
          return val * 100000;
        }
        // Handle monthly internship (e.g., ₹25k-₹50k/month)
        if (range.toLowerCase().includes('month') || range.toLowerCase().includes('internship')) {
          return val * 1000 * 12; // Annualize it
        }
        return val;
      };

      result.sort((a, b) => getSalaryValue(b.salaryRange) - getSalaryValue(a.salaryRange));
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
