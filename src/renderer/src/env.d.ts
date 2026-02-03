//hey window.api exists!
export {}

interface Api {}

declare global {
    interface Window {
        api: Api
    }
}