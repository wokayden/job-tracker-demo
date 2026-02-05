import {defineConfig} from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {
        build: {
            lib: {
                entry: "src/main/index.ts"
            }
        }
    },
    preload: {
        build: {
            lib: {
                entry: "src/preload/index.ts"
            },
            rollupOptions: {
                output: {
                    format: 'cjs'
                }
            }
        }
    },
    renderer: {
        root: "src/renderer",
        plugins: [react()]
    }
})