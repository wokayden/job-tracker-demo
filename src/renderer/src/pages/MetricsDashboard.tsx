import React, { ReactElement, useEffect, useState } from "react";
import { StatusHistory } from "../../../shared/domain";

export function MetricsDashboard(): ReactElement {
    const [statusHistories, setStatusHistories] = useState<StatusHistory[]>([]);
    
    function fetchStatusHistories() {
        window.api.getStatusHistory().then((h) => {
            if (h) setStatusHistories(h);
        });
    }

    useEffect(() => {
        fetchStatusHistories();
    }, [])

    return (
        <div>
            metrics dashboard
        </div>
    )
}