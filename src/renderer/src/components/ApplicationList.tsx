import React, { ReactElement, useContext } from 'react';
import { Status } from '../../../shared/domain';
import { ApplicationContext } from '../context/ApplicationContext';
import { ApplicationCard } from '.';

type ApplicationListProps = {
    status: Status
}

export function ApplicationList(props: ApplicationListProps): ReactElement {
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
        <>
            {
                isLoading ? (<span>Loading...</span>) : (
                    <ul>
                        {
                            status === Status.Applied && appliedApplications.map(a => {
                                return (
                                    <ApplicationCard key={a.uid} app={a} onStatusChange={(uid, newStatus, reason) => {onChangeApplicationStatus(uid, newStatus, reason)}} />
                                )
                            })
                        }
                        {
                            status === Status.Archived && archivedApplications.map(a => {
                                return (
                                    <ApplicationCard key={a.uid} app={a} onStatusChange={(uid, newStatus, reason) => {onChangeApplicationStatus(uid, newStatus, reason)}} />
                                )
                            })
                        }
                        {
                            status === Status.Lead && leadApplications.map(a => {
                                return (
                                    <ApplicationCard key={a.uid} app={a} onStatusChange={(uid, newStatus, reason) => {onChangeApplicationStatus(uid, newStatus, reason)}} />
                                )
                            })
                        }
                    </ul>
            )}
        </>
    )
}