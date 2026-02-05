import { v4 } from "uuid";
import { JobApplication, Status } from "../../shared/domain";
import { getDatabase } from "../database";
import { Repository } from "../repository";
import { expect, test, describe } from 'vitest';
import { Database } from "better-sqlite3";


function getFreshRepo(): { repo: Repository, db: Database } {
    const db = getDatabase(':memory:');
    return { repo: new Repository(db), db: db};
}

function getTestApp(dummyData?: Partial<JobApplication>): JobApplication {
    return {
        uid: v4(),
        companyName: 'Test Company',
        url: 'https://www.google.com',
        source: 'LinkedIn',
        status: Status.Applied,
        reason: null,
        notes: null,
        createdDate: new Date().toISOString(),
        updatedDate: null,
        ...dummyData
    };
}

describe('getSources', () => {
    const { repo } = getFreshRepo();

    test('default sources as expected', () => {
        const sources = repo.getSources();
        expect(sources).toContain('LinkedIn');
        expect(sources).toContain('BuiltIn');
        expect(sources).toContain('Indeed');
        expect(sources).toContain('Levels.fyi');
    });

    test('adding new source', () => {
        repo.addSource('Glassdoor');
        const newSources = repo.getSources();
        expect(newSources).toContain('Glassdoor');
    });

    test('no duplicate sources', () => {
        const result = repo.addSource('LinkedIn');
        expect(result.success).toBe(false);
        const sources = repo.getSources();
        expect(sources).lengthOf(5);
    });
});

describe('saveApplication', () => {
    const { repo, db } = getFreshRepo();
    const testApp = getTestApp();

    test('adding new repo', () => {
        const addResult = repo.addApplication(testApp);
        expect(addResult.success).toBe(true);
    });

    test('get added repo', () => {
        const getOneResult = repo.getApplication(testApp.uid);
        expect(getOneResult).not.toBeNull();
        expect(getOneResult).toStrictEqual(testApp);
    });

    test('get all applications', () => {
        const apps = repo.getApplications();
        expect(apps).toContainEqual(testApp);
    });

    test('made a status history row', () => {
        const statusStatement = db.prepare("SELECT * FROM status_history WHERE application_uid = ?");
        const statement = statusStatement.get(testApp.uid);
        expect(statement).not.toBeNull();
    });
});

describe('getApplication', () => {
    const { repo } = getFreshRepo();

    test('invalid id returns null', () => {
        const result = repo.getApplication('abcdefgh');
        expect(result).toBeNull();
    });

    test('only get 1', () => {
        const app1 = getTestApp();
        const app2 = getTestApp({ companyName: 'ACME Corp' });

        //add both
        repo.addApplication(app1);
        repo.addApplication(app2);

        const savedApp2 = repo.getApplication(app2.uid);
        expect(savedApp2).toStrictEqual(app2);
    });
});

describe('updateApplication', () => {
    const { repo, db } = getFreshRepo();

    test('notes field updates', () => {
        const testApp = getTestApp();
        const notesText = "This will be our test note.";

        repo.addApplication(testApp);

        const updateResult = repo.updateApplication(testApp.uid, { notes: notesText });
        expect(updateResult.success).toBe(true);

        const savedApp = repo.getApplication(testApp.uid);
        expect(savedApp).toStrictEqual({ ...testApp, updatedDate: savedApp?.updatedDate, notes: notesText });
    });

    test('status change makes new log', () => {
        const testApp = getTestApp();

        repo.addApplication(testApp);
        repo.updateApplication(testApp.uid, { status: Status.Archived });

        const appHistoriesStatement = db.prepare("SELECT * FROM status_history WHERE application_uid = ?");
        const histories = appHistoriesStatement.all(testApp.uid);

        expect(histories).toHaveLength(2);
        expect(histories).toContainEqual(
            expect.objectContaining({ old_status: Status.Applied, new_status: Status.Archived })
        );
    });

    test('dont make log for non-status update', () => {
        const testApp = getTestApp();
        repo.addApplication(testApp);
        repo.updateApplication(testApp.uid, { source: 'Levels.fyi' });

        const appHistoriesStatement = db.prepare("SELECT * FROM status_history WHERE application_uid = ?");
        const histories = appHistoriesStatement.all(testApp.uid);

        expect(histories).toHaveLength(1);
    });

    test('cant update invalid uid app', () => {
        const result = repo.updateApplication('1234', { notes: "woah" });
        expect(result.success).toBe(false);
    });
});

describe('deleteApplication', () => {
    const { repo, db } = getFreshRepo();
    const testApp = getTestApp();

    test('cant get a deleted app', () => {
        repo.addApplication(testApp);

        const del = repo.deleteApplication(testApp.uid);
        expect(del.success).toBe(true);

        const result = repo.getApplication(testApp.uid);
        expect(result).toBeNull();
    });

    test('deleted app shouldnt have status history', () => {
        const appHistoriesStatement = db.prepare("SELECT * FROM status_history WHERE application_uid = ?");
        const histories = appHistoriesStatement.all(testApp.uid);

        expect(histories).toHaveLength(0);
    });

    test('deleting nonexistant has success false', () => {
        const result = repo.deleteApplication('1122334455');
        expect(result.success).toBe(false);
    });
});

describe('null handling', () => {
    const { repo } = getFreshRepo();

    test('null notes indeed null', () => {
        const testApp = getTestApp({ notes: null });
        repo.addApplication(testApp);
        const result = repo.getApplication(testApp.uid);
        expect(result).not.toBeNull();
        expect(result?.notes).not.toBe(undefined);
        expect(result?.notes).not.toBe("");
        expect(result?.notes).toBe(null);
    });

    test('null reason indeed null', () => {
        const testApp = getTestApp({ reason: null });
        repo.addApplication(testApp);
        const result = repo.getApplication(testApp.uid);
        expect(result?.reason).toBe(null);
    });
});