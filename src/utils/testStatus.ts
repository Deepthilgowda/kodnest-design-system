/**
 * Job Notification Tracker — Test Status Utility
 * Centralized logic for system verification.
 */

export const TEST_STORAGE_KEY = 'jt_test_checklist';
export const ARTIFACTS_STORAGE_KEY = 'jobTrackerArtifacts';

// Cleanup legacy keys
['jobTrackerTestStatus', 'testChecklist', 'checklist', 'jt_tests'].forEach(key => {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
    }
});

export interface TestItem {
    id: string;
    label: string;
    howTo: string;
}

export interface ProjectArtifacts {
    lovable: string;
    github: string;
    vercel: string;
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

export const PROJECT_STEPS = [
    { id: 's1', label: 'Initialization' },
    { id: 's2', label: 'Job Feed' },
    { id: 's3', label: 'Scoring Engine' },
    { id: 's4', label: 'Digest Simulation' },
    { id: 's5', label: 'Status Tracking' },
    { id: 's6', label: 'Persistence' },
    { id: 's7', label: 'Verification' },
    { id: 's8', label: 'Final Proof' },
];

export const TOTAL_TESTS = TEST_ITEMS.length;

function getChecklistObject(): Record<string, boolean> {
    try {
        const saved = localStorage.getItem(TEST_STORAGE_KEY);
        if (!saved) return {};
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return {};
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
        return {};
    }
}

export function getPassedTestIds(): string[] {
    const checklist = getChecklistObject();
    return Object.keys(checklist).filter(id => checklist[id] === true);
}

export function getArtifacts(): ProjectArtifacts {
    try {
        const saved = localStorage.getItem(ARTIFACTS_STORAGE_KEY);
        if (!saved) return { lovable: '', github: '', vercel: '' };
        return JSON.parse(saved);
    } catch {
        return { lovable: '', github: '', vercel: '' };
    }
}

export function setArtifacts(artifacts: ProjectArtifacts): void {
    localStorage.setItem(ARTIFACTS_STORAGE_KEY, JSON.stringify(artifacts));
}

export function isShippingUnlocked(): boolean {
    const checklist = getChecklistObject();
    const values = Object.values(checklist);
    const allChecked = values.length === TOTAL_TESTS && values.every(v => v === true);
    return allChecked;
}

export type ShipStatus = 'Not Started' | 'In Progress' | 'Shipped';

export function getShipStatus(): ShipStatus {
    const checklist = getChecklistObject();
    const values = Object.values(checklist);
    const testsPassed = values.filter(v => v === true).length;

    const artifacts = getArtifacts();
    const linksProvided = !!(artifacts.lovable || artifacts.github || artifacts.vercel);

    if (testsPassed === TOTAL_TESTS) {
        return 'Shipped';
    }

    if (testsPassed > 0 || linksProvided) {
        return 'In Progress';
    }

    return 'Not Started';
}

export function setTestItemStatus(id: string, checked: boolean): void {
    const checklist = getChecklistObject();
    checklist[id] = checked;
    localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(checklist));
}

export function resetAllTests(): void {
    localStorage.removeItem(TEST_STORAGE_KEY);
}

