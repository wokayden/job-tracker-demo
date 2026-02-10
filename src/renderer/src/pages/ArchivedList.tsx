import React, { ReactElement, useState, useEffect } from "react";
import { JobApplication, Status } from "../../../shared/domain";
import { ApplicationCard } from "../components/ApplicationCard";

export function ArchivedList(): ReactElement {
    const [archivedApps, setArchivedApps] = useState<JobApplication[]>([]);

    function fetchApplications() {
        window.api.getApplications().then(r => {
            if (r.length > 0) {
                setArchivedApps(r.filter(a => a.status === Status.Archived));
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
                <h1>Archived Jobs</h1>
            </div>
            <ul>
                {archivedApps.map(app => {
                    return <ApplicationCard app={app} onStatusChange={onChangeApplicationStatus} key={app.uid} />
                })}
            </ul>
        </div>
    );
}