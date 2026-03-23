import React, { ReactElement, useState } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from "../components";
import { SearchBar } from "../components/SearchBar";

export function ArchivedList(): ReactElement {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <div>
                <h1>Archived Jobs</h1>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <ApplicationList status={Status.Archived} searchQuery={searchQuery} />
        </div>
    );
}
