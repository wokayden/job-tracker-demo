//root react component
import React, { useState, useMemo, useEffect } from 'react';
import styles from './App.module.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ApplicationForm, AppliedList, ArchivedList, LeadsList, MetricsDashboard } from './pages';
import { Sidebar } from './components';
import { ApplicationContext } from './context/ApplicationContext';
import { JobApplication, Status } from '../../shared/domain';

export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [applications, setApplications] = useState<JobApplication[]>([]);

    const appliedApplications: JobApplication[] = useMemo(() => {
        return applications.filter(a => a.status === Status.Applied);
    }, [applications]);
    const archivedApplications: JobApplication[] = useMemo(() => {
        return applications.filter(a => a.status === Status.Archived);
    }, [applications]);
    const leadApplications: JobApplication[] = useMemo(() => {
        return applications.filter(a => a.status === Status.Lead);
    }, [applications]);

    function fetchApplications() {
        setIsLoading(true);
        window.api.getApplications().then(r => {
            setApplications(r);
            setIsLoading(false);
        });        
    };

    useEffect(() => {
        fetchApplications();
    }, []);
    return (
        <HashRouter>
            <ApplicationContext value={{ allApplications: applications, appliedApplications, archivedApplications, leadApplications, isLoading, fetchApplications }}>
                <div className={styles.container}>
                    <Sidebar />
                    <main className={styles.content}>
                        <Routes>
                            <Route path="/" element={<ApplicationForm />} />
                            <Route path="/applied" element={<AppliedList />} />
                            <Route path="/leads" element={<LeadsList />} />
                            <Route path="/archived" element={<ArchivedList />} />
                            <Route path="/metrics" element={<MetricsDashboard />} />
                        </Routes>
                    </main>
                </div>
            </ApplicationContext>
        </HashRouter>
    )
}