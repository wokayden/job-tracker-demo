import React, { ReactElement, useContext } from 'react';
import { Status } from '../../../shared/domain';
import { ApplicationContext } from '../context/ApplicationContext';

type ApplicationListProps = {
    status: Status
}

export default function AplicationList(props: ApplicationListProps): ReactElement {
    const { status } = props;

    const {
        appliedApplications, 
        archivedApplications, 
        leadApplications, 
        isLoading, 
        fetchApplications
    } = useContext(ApplicationContext);

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

    return (
        <ul>

        </ul>
    )
}