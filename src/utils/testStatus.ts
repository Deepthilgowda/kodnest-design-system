/**
 * Job Notification Tracker — Test Status Utility
 * Centralized logic for system verification.
 */

export const TEST_STORAGE_KEY = 'jobTrackerTestStatus';

export interface TestItem {
    id: string;
    label: string;
    howTo: string;
}

export const TEST_ITEMS: TestItem[] = [
    { id: 't1', label: 'Preferences persist after refresh', howTo: 'Change keywords/skills in Settings, refresh page, and check if they remain.' },
    { id: 't2', label: 'Match score calculates correctly', howTo: 'Check if match scores on Dashboard align with your skills and preferred keywords.' },
    { id: 't3', label: '"Show only matches" toggle works', howTo: 'Toggle the switch on Dashboard and verify only jobs above threshold are shown.' },
    { id: 't4', label: 'Save job persists after refresh', howTo: 'Save a job, refresh page, and check if it is still in the Saved tab.' },
    { id: 't5', label: 'Apply opens in new tab', howTo: 'Click "Apply" on any job and verify it opens the external link in a new tab.' },
    { id: 't6', label: 'Status update persists after refresh', howTo: 'Change a job status (e.g. to "Applied"), refresh, and see if badge remains.' },
    { id: 't7', label: 'Status filter works correctly', howTo: 'Use the status dropdown on Dashboard to filter by Applied, Rejected, etc.' },
    { id: 't8', label: 'Digest generates top 10 by score', howTo: 'Go to Digest page and verify it lists up to 10 jobs sorted by match score.' },
    { id: 't9', label: 'Digest persists for the day', howTo: 'Verify the digest content stays consistent throughout the current calendar day.' },
    { id: 't10', label: 'No console errors on main pages', howTo: 'Open Browser Console (F12) and verify no red error logs appear while navigating.' },
];

export const TOTAL_TESTS = TEST_ITEMS.length;

export function getPassedTestIds(): string[] {
    try {
        const saved = localStorage.getItem(TEST_STORAGE_KEY);
        if (!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function isShippingUnlocked(): boolean {
    return getPassedTestIds().length === TOTAL_TESTS;
}

export function setTestItemStatus(id: string, checked: boolean): void {
    const current = getPassedTestIds();
    let next: string[];

    if (checked) {
        if (current.includes(id)) return;
        next = [...current, id];
    } else {
        next = current.filter(i => i !== id);
    }

    localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(next));
}

export function resetAllTests(): void {
    localStorage.removeItem(TEST_STORAGE_KEY);
}
