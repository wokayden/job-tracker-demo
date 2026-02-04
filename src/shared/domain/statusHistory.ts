import { Status } from "./status";

export interface StatusHistory {
    uid: string,
    applicationUid: string,
    oldStatus: Status | null,
    newStatus: Status,
    changedAt: string
}