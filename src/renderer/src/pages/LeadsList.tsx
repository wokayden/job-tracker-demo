import React, { ReactElement, useState, useEffect } from "react";
import { JobApplication, Status } from "../../../shared/domain";
import { ApplicationCard } from "../components/ApplicationCard";

export function LeadsList(): ReactElement {
    const [appLEads, setAppLeads] = useState<JobApplication[]>([]);

    function fetchApplications() {
        window.api.getApplications().then(r => {
            if (r.length > 0) {
                setAppLeads(r.filter(a => a.status === Status.Lead));
            };
        });        
    };

    function onChangeApplicationStatus(uid: string, status: Status, reason?: string) {
        window.api.updateApplication(uid, {status}).then(r => {
            if (r.success) {
                alert('Updated successfuly');
                fetchApplications();
            } else {
                alert(`Update failed: ${r.message}`);
            }
        });
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <div>
                <h1>Job Leads</h1>
            </div>
            <ul>
                {appLEads.map(app => {
                    return <ApplicationCard app={app} onStatusChange={onChangeApplicationStatus} key={app.uid} />
                })}
            </ul>
        </div>
    );
}