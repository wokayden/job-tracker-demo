interface Api {}

declare module "*.module.css"{
    const classes: { [key: string]: string };
    export default classes;
}

declare global {
    interface Window {
        api: Api
    }
}