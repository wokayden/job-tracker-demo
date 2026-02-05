import { JobApplication, RepoResponse } from "../../shared/domain";

export interface Api {
    getApplications: () => Promise<JobApplication[]>,
    getApplication: (uid: string) => Promise<JobApplication | null>,
    addApplication: (ja: JobApplication) => Promise<RepoResponse>,
    updateApplication: (uid: string, ja: Partial<JobApplication>) => Promise<RepoResponse>,
    deleteApplication: (uid: string) => Promise<RepoResponse>,
    getSources: () => Promise<string[]>,
    addSource: (s: string) => Promise<RepoResponse>
}

declare global {
    interface Window {
        api: Api
    }
}