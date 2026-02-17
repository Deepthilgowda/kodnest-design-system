/**
 * Job Notification Tracker — Preference Management
 * Stores and retrieves user preferences from localStorage.
 */

import type { JobMode, JobExperience } from '../types/job';

export interface Preferences {
    roleKeywords: string[];
    rawRoleKeywords: string;
    preferredLocations: string[];
    preferredMode: JobMode[];
    experienceLevel: JobExperience | '';
    skills: string[];
    rawSkills: string;
    minMatchScore: number;
}

const STORAGE_KEY = 'jobTrackerPreferences';

export const DEFAULT_PREFERENCES: Preferences = {
    roleKeywords: [],
    rawRoleKeywords: '',
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: [],
    rawSkills: '',
    minMatchScore: 40,
};

export function getPreferences(): Preferences {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return DEFAULT_PREFERENCES;
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed } as Preferences;
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return DEFAULT_PREFERENCES;
    }
}

export function savePreferences(prefs: Preferences): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
}
