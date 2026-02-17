import Database from "better-sqlite3";

export function getDatabase(path: string) {
    const db = new Database(path);

    db.pragma('journal_mode=WAL'); //allows concurrent read/write
    db.pragma('foreign_keys=ON');

    db.exec(`
        CREATE TABLE IF NOT EXISTS applications
        (
            uid TEXT PRIMARY KEY,
            company_name TEXT NOT NULL,
            url TEXT,
            source TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('Applied', 'Lead', 'Archived')),
            reason TEXT,
            notes TEXT,
            created_date TEXT NOT NULL,
            updated_date TEXT,
            job_title TEST NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sources
        (
            name TEXT NOT NULL PRIMARY KEY
        );
        INSERT OR IGNORE INTO sources (name) VALUES ('LinkedIn');
        INSERT OR IGNORE INTO sources (name) VALUES ('BuiltIn');
        INSERT OR IGNORE INTO sources (name) VALUES ('Levels.fyi');
        INSERT OR IGNORE INTO sources (name) VALUES ('Indeed');

        CREATE TABLE IF NOT EXISTS status_history
        (
            uid TEXT PRIMARY KEY,
            application_uid TEXT NOT NULL,
            old_status TEXT,
            new_status TEXT NOT NULL,
            changed_at TEXT NOT NULL,
            FOREIGN KEY (application_uid) REFERENCES applications (uid) ON DELETE CASCADE
        );
    `);

    const tableinfo = db.pragma("table_info('applications')");
    if (!(tableinfo as unknown as unknown[]).find((c: any) => c.name === 'job_title')) {
        //make job_title column
        db.exec("ALTER TABLE applications ADD COLUMN job_title TEXT NOT NULL DEFAULT ''");
    }

    return db;
}