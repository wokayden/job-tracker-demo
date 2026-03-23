import React, { ReactElement, useState } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from "../components";
import { SearchBar } from "../components/SearchBar";

export function LeadsList(): ReactElement {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <div>
                <h1>Job Leads</h1>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <ApplicationList status={Status.Lead} searchQuery={searchQuery} />
        </div>
    );
}
