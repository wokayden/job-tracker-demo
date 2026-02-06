//main process entry point
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { getDatabase } from './database';
import { Repository } from './repository';
import { channelKeys } from '../shared/ipc/channels';
import { JobApplication } from '../shared/domain';

//when app is ready, create a new browserwindow
app.on('ready', () => {
    const dbPath = path.join(app.getPath('userData'), 'job-tracker.db');
    const db = getDatabase(dbPath);
    const repo: Repository = new Repository(db);

    ipcMain.handle(channelKeys.getApplications, () => {
        return repo.getApplications()
    });
    ipcMain.handle(channelKeys.getApplication, (_e, uid: string) => {
        return repo.getApplication(uid)
    });
    ipcMain.handle(channelKeys.addApplication, (_e, ja: JobApplication) => {
        return repo.addApplication(ja)
    });
    ipcMain.handle(channelKeys.updateApplication, (_e, uid: string, ja: Partial<JobApplication>) => {
        return repo.updateApplication(uid, ja)
    });
    ipcMain.handle(channelKeys.deleteApplication, (_e, uid: string) => {
        return repo.deleteApplication(uid)
    });
    ipcMain.handle(channelKeys.getSources, () => {
        return repo.getSources()
    });
    ipcMain.handle(channelKeys.addSource, (_e, s: string) => {
        return repo.addSource(s)
    });

    ipcMain.handle(channelKeys.openExternal, (_e, url: string) => {
        if (url.startsWith("http://") || url.startsWith("https://")) return shell.openExternal(url)
    });

    
    const mainWindow = new BrowserWindow({ width: 1000, height: 650, webPreferences: {
        preload: path.join(__dirname, '../preload/index.cjs'),
        nodeIntegration: false,
        contextIsolation: true
    } });

    if (process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']!)
    } else {
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
});

app.on('window-all-closed', () =>{
    //don't go to tray
    app.quit();
});