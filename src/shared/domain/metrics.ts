export interface Metrics {
    appliedCount: number, //this is the total
    leadCount: number,
    archivedCount: number,
    percentLead: number,
    percentArchived: number,
    sourceBreakdown: Source[],
    weeklyData: WeekData[],
    avgTimeToStatusChange: number,
    formerLeads: number
}

export interface Source {
    name: string,
    total: number,
    leadCount: number
}

export interface WeekData {
    startDate: string,
    endDate: string,
    jobsApplied: number
}