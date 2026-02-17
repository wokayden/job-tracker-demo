import React, { ReactElement } from 'react';
import styles from './ApplicationCard.module.css';
import { JobApplication, Status } from '../../../shared/domain';
import { RiExternalLinkFill } from "react-icons/ri";

type ApplicationCardProps = {
    app: JobApplication,
    onStatusChange: (uid: string, newStatus: Status, reason?: string) => void
}

export function ApplicationCard(props: ApplicationCardProps): ReactElement {
    const { app, onStatusChange } = props;

    return (
        <div className={styles.appCard}>
            <div>
                <span>{app.jobTitle}</span>
            </div>
            <div>
                <span>{app.companyName}</span>
                <span>{new Date(app.createdDate).toDateString()}</span>
            </div>
            <div>
                <span>{app.source}</span>
                {app.url && (
                    <RiExternalLinkFill onClick={() => { window.api.openExternal(app.url!) }} />
                )}
            </div>
            <div>
                <button disabled={app.status !== Status.Applied} onClick={() => {onStatusChange(app.uid, Status.Lead)}}>lead</button>
                <button disabled={app.status === Status.Archived} onClick={() => {onStatusChange(app.uid, Status.Archived)}}>archive</button>
            </div>
        </div>
    )
};