import { JobApplication, Metrics, Source, Status, WeekData } from ".";

export function computeMetrics(applications: JobApplication[]): Metrics {
    const appliedCount = applications.length;
    const leadCount = applications.filter(a => a.status === Status.Lead).length;
    const archivedCount = applications.filter(a => a.status === Status.Archived).length;

    const percentLead = appliedCount > 0 ? (leadCount / appliedCount) * 100 : 0;
    const percentArchived = appliedCount > 0 ? (archivedCount / appliedCount) * 100 : 0;

    const distinctSources = new Set(applications.map(a => a.source));
    const sourceBreakdown = new Array(...distinctSources).map(s => {
        const appsOfSourceS = applications.filter(a => a.source === s);
        return {
            name: s,
            total: appsOfSourceS.length,
            leadCount: appsOfSourceS.filter(a => a.status === Status.Lead).length
        }
    });


    return {
        appliedCount,
        leadCount,
        archivedCount,
        percentLead,
        percentArchived,
        sourceBreakdown,
        weeklyData: [],
        avgTimeToStatusChange: 1
    }
}