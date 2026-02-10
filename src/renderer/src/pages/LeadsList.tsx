import React, { ReactElement } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from "../components";

export function LeadsList(): ReactElement {
    return (
        <div>
            <div>
                <h1>Job Leads</h1>
            </div>
            <ApplicationList status={Status.Lead} />
        </div>
    );
}