/**
 * Job Notification Tracker — Job Status Storage
 * Persistent status tracking with requested structure:
 * jobTrackerStatus = { jobId: { status: string, date: timestamp } }
 */

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface JobStatusEntry {
    status: JobStatus;
    date: number;
}

const STATUS_KEY = 'jobTrackerStatus';

export function getJobStatuses(): Record<string, JobStatusEntry> {
    try {
        const raw = localStorage.getItem(STATUS_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);

        // Migration/Validation: Handle old format (string values) if any
        const validated: Record<string, JobStatusEntry> = {};
        for (const key in parsed) {
            if (typeof parsed[key] === 'string') {
                validated[key] = { status: parsed[key] as JobStatus, date: Date.now() };
            } else {
                validated[key] = parsed[key];
            }
        }
        return validated;
    } catch {
        return {};
    }
}

export function getJobStatus(jobId: string): JobStatus {
    const entry = getJobStatuses()[jobId];
    return entry ? entry.status : 'Not Applied';
}

export function setJobStatus(jobId: string, status: JobStatus): void {
    const statuses = getJobStatuses();
    if (status === 'Not Applied') {
        delete statuses[jobId];
    } else {
        statuses[jobId] = {
            status,
            date: Date.now()
        };
    }
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
}

// Deprecated: Moving to direct object reading as per user request
export function getStatusHistory() {
    return [];
}

export function clearAllStatuses(): void {
    localStorage.removeItem(STATUS_KEY);
}
