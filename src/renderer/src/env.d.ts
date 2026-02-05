type JobApplication = import("../../shared/domain").JobApplication;
type RepoResponse = import("../../shared/domain").RepoResponse;

interface Api {
    getApplications: () => Promise<JobApplication[]>,
    getApplication: (uid: string) => Promise<JobApplication | null>,
    addApplication: (ja: JobApplication) => Promise<RepoResponse>,
    updateApplication: (uid: string, ja: Partial<JobApplication>) => Promise<RepoResponse>,
    deleteApplication: (uid: string) => Promise<RepoResponse>,
    getSources: () => Promise<string[]>,
    addSource: (s: string) => Promise<RepoResponse>
}

declare module "*.module.css"{
    const classes: { [key: string]: string };
    export default classes;
}

declare global {
    interface Window {
        api: Api
    }
}