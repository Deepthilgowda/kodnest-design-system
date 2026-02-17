/**
 * Job Notification Tracker — Match Score Engine
 * Calculates a 0-100 score based on user preferences.
 */

import type { Job } from '../types/job';
import type { Preferences } from './preferences';

export function calculateMatchScore(job: Job, prefs: Preferences): number {
    let score = 0;

    // 1. Role Keyword in Title (+25)
    const title = job.title.toLowerCase();
    const hasKeywordInTitle = prefs.roleKeywords.some(kw =>
        title.includes(kw.toLowerCase())
    );
    if (hasKeywordInTitle) score += 25;

    // 2. Role Keyword in Description (+15)
    const desc = job.description.toLowerCase();
    const hasKeywordInDesc = prefs.roleKeywords.some(kw =>
        desc.includes(kw.toLowerCase())
    );
    if (hasKeywordInDesc) score += 15;

    // 3. Location matches (+15)
    const jobLoc = job.location.toLowerCase();
    const hasLocMatch = prefs.preferredLocations.some(loc =>
        jobLoc.includes(loc.toLowerCase()) || loc.toLowerCase().includes(jobLoc)
    );
    if (hasLocMatch) score += 15;

    // 4. Mode matches (+10)
    if (prefs.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience matches (+10)
    if (prefs.experienceLevel === job.experience) {
        score += 10;
    }

    // 6. Skill overlap (+15)
    const userSkillsLower = prefs.skills.map(s => s.toLowerCase());
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    const hasSkillOverlap = userSkillsLower.some(us =>
        jobSkillsLower.some(js => js.includes(us) || us.includes(js))
    );
    if (hasSkillOverlap) score += 15;

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source is LinkedIn (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100 and return as integer
    return Math.min(Math.round(score), 100);
}
