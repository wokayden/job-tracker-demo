//root react component
import React from 'react';
import styles from './App.module.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ApplicationForm, AppliedList, ArchivedList, LeadsList, MetricsDashboard } from './pages';
import { Sidebar } from './components';

export default function App() {
    return (
        <HashRouter>
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
        </HashRouter>
    )
}