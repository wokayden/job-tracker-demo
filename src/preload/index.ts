//preload bridge script
import { contextBridge, ipcRenderer } from "electron";
import { channelKeys } from "../shared/ipc/channels";
import { JobApplication } from "../shared/domain";

contextBridge.exposeInMainWorld('api', {
    getApplications: () => ipcRenderer.invoke(channelKeys.getApplications),
    getApplication: (uid: string) => ipcRenderer.invoke(channelKeys.getApplication, uid),
    addApplication: (ja: JobApplication) => ipcRenderer.invoke(channelKeys.addApplication, ja),
    updateApplication: (ja: Partial<JobApplication>) => ipcRenderer.invoke(channelKeys.updateApplication, ja),
    deleteApplication: (uid: string) => ipcRenderer.invoke(channelKeys.deleteApplication, uid),
    getSources: () => ipcRenderer.invoke(channelKeys.getSources),
    addSource: (s: string) => ipcRenderer.invoke(channelKeys.addSource, s)
});