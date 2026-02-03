//preload bridge script
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld('api', {}) //for now nothing fancy