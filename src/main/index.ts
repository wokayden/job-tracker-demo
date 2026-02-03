//main process entry point
import { app, BrowserWindow } from 'electron';
import path from 'path';

//when app is ready, create a new browserwindow
app.on('ready', () => {
    const mainWindow = new BrowserWindow({ width: 500, height: 500, webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
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