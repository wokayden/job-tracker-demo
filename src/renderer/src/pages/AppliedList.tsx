import React, { ReactElement, useState } from "react";
import { Status } from "../../../shared/domain";
import { ApplicationList } from '../components';
import { SearchBar } from "../components/SearchBar";

export function AppliedList(): ReactElement {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <div>
                <h1>Applied Jobs</h1>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <ApplicationList status={Status.Applied} searchQuery={searchQuery} />
        </div>
    )
}
