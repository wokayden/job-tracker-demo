import {defineConfig} from 'electron-vite';

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
            }
        }
    },
    renderer: {
        root: "src/renderer"
    }
})

// export default config {
//     return {
//         "main": "src/main/index.ts",
//         "preload": "src/preload/index.ts",
//         "renderer": "src/renderer/"
//     }
// }