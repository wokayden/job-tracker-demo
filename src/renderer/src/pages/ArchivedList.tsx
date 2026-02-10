import React, { ReactElement } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from "../components";

export function ArchivedList(): ReactElement {
    return (
        <div>
            <div>
                <h1>Archived Jobs</h1>
            </div>
            <ApplicationList status={Status.Archived} />
        </div>
    );
}