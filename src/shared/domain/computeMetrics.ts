import { JobApplication, Metrics, Source, Status, WeekData } from ".";
import { isSameWeek, min, max, eachWeekOfInterval, add } from "date-fns";

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

    const earliestDate = min(applications.map(a => a.createdDate));
    const latestDate = max(applications.map(a => a.createdDate));
    const weekRange = eachWeekOfInterval({ start: earliestDate, end: latestDate });

    const weeklyData: WeekData[] = weekRange.map((d, i) => {
        const jobsApplied = applications.filter(a => isSameWeek(a.createdDate, d)).length;
        return {
            startDate: d.toISOString(),
            endDate: add(d, { days: 6 }).toISOString(),
            jobsApplied
        }
    }).sort((a, b) =>  new Date(b.startDate).getTime() - new Date(a.startDate).getTime());



    return {
        appliedCount,
        leadCount,
        archivedCount,
        percentLead,
        percentArchived,
        sourceBreakdown,
        weeklyData,
        avgTimeToStatusChange: 1
    }
}