/**
 * Job Notification Tracker — Match Score Engine
 * Calculates a 0-100 score based on user preferences.
 */

import type { Job } from '../types/job';
import type { Preferences } from './preferences';

export function calculateMatchScore(job: Job, prefs: Preferences): number {
    let score = 0;

    // 1. Role Keywords (+25)
    // Check if any keyword matches job title (partial match, case-insensitive)
    const title = job.title.toLowerCase();
    const hasTitleMatch = prefs.roleKeywords.some((kw) =>
        title.includes(kw.toLowerCase())
    );
    if (hasTitleMatch) score += 25;

    // 2. Description Keywords (+15)
    const desc = job.description.toLowerCase();
    const hasDescMatch = prefs.roleKeywords.some((kw) =>
        desc.includes(kw.toLowerCase())
    );
    if (hasDescMatch) score += 15;

    // 3. Location (+15)
    // Check if job location is in preferred locations
    // We handle simple substring matching or exact matching. 
    // Let's do exact match or check if job location is included in preference list strings
    const jobLoc = job.location.toLowerCase();
    const hasLocMatch = prefs.preferredLocations.some(
        (loc) => jobLoc.includes(loc.toLowerCase()) || loc.toLowerCase().includes(jobLoc)
    );
    if (hasLocMatch) score += 15;

    // 4. Mode (+10)
    if (prefs.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience (+10)
    if (prefs.experienceLevel === job.experience) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    // Check if any user skill matches job skills
    // Job skills are an array of strings.
    const userSkillsLower = prefs.skills.map((s) => s.toLowerCase());
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const hasSkillMatch = userSkillsLower.some((us) =>
        jobSkillsLower.some((js) => js.includes(us) || us.includes(js))
    );
    if (hasSkillMatch) score += 15;

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
}
