import { createContext } from 'react';
import { JobApplication, Status } from '../../../shared/domain';

const allAppsDefault: JobApplication[] = [];

export const ApplicationContext = createContext({ 
    allApplications: allAppsDefault,
    appliedApplications: allAppsDefault.filter(a => a.status === Status.Applied),
    archivedApplications: allAppsDefault.filter(a => a.status === Status.Archived),
    leadApplications: allAppsDefault.filter(a => a.status === Status.Lead),
    isLoading: true, 
    fetchAplications: () => {return} 
});