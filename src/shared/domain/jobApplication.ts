import { Status } from "./status";

export interface JobApplication {
    uid: string,
    companyName: string,
    url: string | null,
    source: string,
    status: Status,
    reason: string | null,
    notes: string | null,
    createdDate: string,
    updatedDate: string | null
}