import { Database, Statement } from "better-sqlite3";
import { v4 } from "uuid";
import { JobApplication, JobApplicationRepository, RepoResponse, StatusHistory } from "../shared/domain";

export class Repository implements JobApplicationRepository {
    private database: Database;
    private selectApps: Statement;
    private selectApp: Statement;
    private insertApp: Statement;
    private updateApp: Statement;
    private deleteApp: Statement;
    private selectSources: Statement;
    private insertSource: Statement;
    private insertStatusHistory: Statement;

    constructor(db: Database) {
        this.database = db;

        this.selectApps = db.prepare("SELECT * FROM applications;");
        this.selectApp = db.prepare("SELECT * FROM applications WHERE uid = ? LIMIT 1;");
        this.insertApp = db.prepare("INSERT INTO applications (uid, company_name, url, source, status, reason, notes, created_date, updated_date, job_title) VALUES (@uid, @company_name, @url, @source, @status, @reason, @notes, @created_date, @updated_date, @job_title);");
        this.updateApp = db.prepare("UPDATE applications SET company_name = @company_name, url = @url, source = @source, status = @status, reason = @reason, notes = @notes, created_date = @created_date, updated_date = @updated_date, job_title = @job_title WHERE uid = @uid;");
        this.deleteApp = db.prepare("DELETE FROM applications WHERE uid = ?;");
        this.selectSources = db.prepare("SELECT * FROM sources;");
        this.insertSource = db.prepare("INSERT OR IGNORE INTO sources (name) VALUES (?);");
        this.insertStatusHistory = db.prepare("INSERT INTO status_history (uid, application_uid, old_status, new_status, changed_at) VALUES (@uid, @application_uid, @old_status, @new_status, @changed_at)")
    }

    //map data
    private toJobApp(dbRow: any): JobApplication {
        return {
            uid: dbRow.uid,
            companyName: dbRow.company_name,
            url: dbRow.url,
            source: dbRow.source,
            status: dbRow.status,
            reason: dbRow.reason,
            notes: dbRow.notes,
            createdDate: dbRow.created_date,
            updatedDate: dbRow.updated_date,
            jobTitle: dbRow.job_title
        }
    };
    private toApplicationDbRow(jobApp: JobApplication) {
        return {
            uid: jobApp.uid,
            company_name: jobApp.companyName,
            url: jobApp.url,
            source: jobApp.source,
            status: jobApp.status,
            reason: jobApp.reason,
            notes: jobApp.notes,
            created_date: jobApp.createdDate,
            updated_date: jobApp.updatedDate,
            job_title: jobApp.jobTitle
        }
    };
    private toStatusDbRow(statusHistory: StatusHistory) {
        return {
            uid: statusHistory.uid,
            application_uid: statusHistory.applicationUid,
            old_status: statusHistory.oldStatus,
            new_status: statusHistory.newStatus,
            changed_at: statusHistory.changedAt
        }
    };

    private makeStatusRowFromJobApp(newJobApp: JobApplication, oldJobApp?: JobApplication) {
        const statusChange: StatusHistory = {
            uid: v4(),
            applicationUid: newJobApp.uid,
            oldStatus: oldJobApp?.status ?? null,
            newStatus: newJobApp.status,
            changedAt: new Date().toISOString()
        };
        return this.toStatusDbRow(statusChange);
    }

    //calls
    getApplications() {
        const rows = this.selectApps.all();
        if (rows.length === 0) return [];
        return rows.map(r => { return this.toJobApp(r) });
    }
    getApplication(uid: string) {
        const app = this.selectApp.get(uid);
        if (app === undefined) return null;
        return this.toJobApp(app);
    }
    addApplication(ja: JobApplication) {
        let response: RepoResponse = { success: false, message: null };

        try {
            const asDbRow = this.toApplicationDbRow(ja);

            this.database.transaction(() => {
                const result = this.insertApp.run(asDbRow);
                response.message = `${result.changes} application row(s) updated.`;

                //make a status change row
                const statusChangeRow = this.makeStatusRowFromJobApp(ja);
                const statusResult = this.insertStatusHistory.run(statusChangeRow);
                response.message += `\n${statusResult.changes} status history row(s) updated.`;                
                response.success = true;
            })();


        } catch (ex) {
            response.success = false;
            response.message = `${ex}`;
        }

        return response;
    };
    updateApplication(uid: string, updates: Partial<JobApplication>) {
        let response: RepoResponse = { success: false, message: null };

        try {
            const existingRow = this.getApplication(uid);

            if (existingRow === null) {
                return {
                    success: false,
                    message: "Couldn't find existing job application, update cancelled."
                }
            }

            const existingWithUpdates: JobApplication = { ...existingRow, ...updates, updatedDate: new Date().toISOString() };
            this.database.transaction(() => {
                const result = this.updateApp.run(this.toApplicationDbRow(existingWithUpdates));
                response.message = `${result.changes} application row(s) updated.`;

                if (!!updates['status'] && existingRow.status !== updates.status) {
                    const statusHistoryToAdd = this.makeStatusRowFromJobApp(existingWithUpdates, existingRow);
                    const statusResult = this.insertStatusHistory.run(statusHistoryToAdd);
                    response.message += `\n${statusResult.changes} status history row(s) updated.`;
                }

                response.success = true;
            })();

        } catch (ex) {
            response.success = false;
            response.message = `${ex}`;
        }

        return response;
    };
    deleteApplication(uid: string) {
        const result = this.deleteApp.run(uid);

        return {
            success: result.changes > 0 ? true : false,
            message: `${result.changes} application rows removed.`
        };
    };
    getSources() {
        return this.selectSources.all().map((r:any) => `${r.name}`);
    }
    addSource(s: string) {
        let response: RepoResponse = { success: false, message: null };

        try {
            const result = this.insertSource.run(s);

            if (result.changes > 0) {
                response.success = true;
                response.message = `${result.changes} source row(s) updated.`;
            } else {
                response.message = "Source already exists, didn't add."
            }
        } catch (ex) {
            response.message = `${ex}`;
        }

        return response;
    };
}