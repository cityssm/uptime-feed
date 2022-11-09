export interface Config {
    applicationName?: string;
    httpPort?: number;
    urlPrefix?: string;
    ntfy?: {
        server?: string;
        topic: string;
    };
}
