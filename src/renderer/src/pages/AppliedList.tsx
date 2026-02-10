import React, { ReactElement } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from '../components';

export function AppliedList(): ReactElement {
    return (
        <div>
            <div>
                <h1>Applied Jobs</h1>
            </div>
            <ApplicationList status={Status.Applied} />
        </div>
    )
}