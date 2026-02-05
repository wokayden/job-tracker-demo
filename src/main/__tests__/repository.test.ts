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

describe.skip('getSources', () => {
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

describe.skip('saveApplication', () => {
    const { repo, db } = getFreshRepo();
    const testApp = getTestApp();

    test('adding new repo', () => {
        const addResult = repo.saveApplication(testApp);
        expect(addResult.success).toBe(true);
    });

    test('get added repo', () => {
        const getOneResult = repo.getApplication(testApp.uid);
        expect(getOneResult).not.toBeNull;
        expect(getOneResult).toStrictEqual(testApp);
    });

    test('get all applications', () => {
        const apps = repo.getApplications();
        expect(apps).toContainEqual(testApp);
    });

    test('made a status history row', () => {
        const statusStatement = db.prepare("SELECT * FROM status_history WHERE application_uid = ?");
        const statement = statusStatement.get(testApp.uid);
        console.log('statement', statement);
        expect(statement).not.toBeNull;
    });
});

// describe('getApplication', () => {

// })

// describe('updateApplication', () => {

// })

// describe('deleteApplication', () => {

// })

// describe('null handling', () => {

// })