import { JobApplication } from "./jobApplication";

export interface JobApplicationRepository {
    getApplications: () => JobApplication[];
    getApplication: (uid: string) => JobApplication | null;
    addApplication: (ja: JobApplication) => RepoResponse; //success/fail
    updateApplication: (uid: string, updates: Partial<JobApplication>) => RepoResponse;
    deleteApplication: (uid: string) => RepoResponse;
    getSources: () => string[];
    addSource: (s: string) => RepoResponse;
}

export interface RepoResponse {
    success: boolean;
    message: string | null; //errors go here
}