import React, { ReactElement, useContext, useEffect, useState } from "react";
import { computeMetrics, Metrics, StatusHistory } from "../../../shared/domain";
import { ApplicationContext } from "../context/ApplicationContext";

export function MetricsDashboard(): ReactElement {
    const [statusHistories, setStatusHistories] = useState<StatusHistory[]>([]);
    const [metrics, setMetrics] = useState<Metrics|undefined>();

    const { allApplications, leadApplications, archivedApplications } = useContext(ApplicationContext);
    
    function fetchStatusHistories() {
        window.api.getStatusHistory().then((h) => {
            if (h) setStatusHistories(h);
        });
    }

    useEffect(() => {
        fetchStatusHistories();
    }, []);

    useEffect(() => {
        setMetrics(computeMetrics(allApplications, statusHistories));
    }, [statusHistories, allApplications, leadApplications, archivedApplications]);

    return (
        <div>
            <h1>Metrics Dashboard</h1>
            {
                metrics && (
                    <div>
                        <div>
                            Applied to {metrics.appliedCount} jobs so far.
                        </div>
                        <div>
                            Total archived: {metrics.archivedCount} ({metrics.percentArchived.toFixed(2)}%)
                        </div>
                        <div>
                            Total leads: {metrics.leadCount} current ({metrics.percentLead.toFixed(2)}%) <br /> {metrics.formerLeads} leads - all time ({((metrics.formerLeads/metrics.appliedCount)*100).toFixed(2)}%)
                        </div>
                        <div>
                            Avg time to status change: {metrics.avgTimeToStatusChange.toFixed()} days
                        </div>
                    </div>
                )
            }
        </div>
    )
}